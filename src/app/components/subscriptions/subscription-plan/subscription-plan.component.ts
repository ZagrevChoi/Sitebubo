import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SubscriptionApiService } from 'src/app/apis/subscription/subscription-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ExDomainsPage } from 'src/app/pages/modals/ex-domains/ex-domains.page';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { InAppPurchaseService } from 'src/app/services/in-app-purchase/in-app-purchase.service';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.scss'],
})
export class SubscriptionPlanComponent implements OnInit {
  @Input() plansList: Array<any>;
  @Input() freeTrialAvailable: boolean;
  currentPlanID: number;
  currnetPlanName: string;
  oldPlanName: string;
  daysLeft: number;
  isNewUser: boolean;
  userID: number;
  token: string;
  product: any;
  productIds = [];
  paidPlanDowngradeData: any;
  constructor(
    private storage: Storage,
    private subscriptionAPI: SubscriptionApiService,
    private ionService: IongadgetService,
    private router: Router,
    private modalCtrl: ModalController,
    private iap: InAppPurchase2,
    private purchaseService: InAppPurchaseService
  ) { }

  ngOnInit() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.initData();
      }
    });
  }

  async listenInapppurchase(productIds) {
    alert(productIds);
    // this.iap.validator = 'https://validator.fovea.cc/v1/validate?appName=com.sitebubo.app&apiKey=5f308137-76e7-4d0c-b339-4cfc4b7406ed';
    this.iap.verbosity = this.iap.INFO;
    this.iap.sandbox = true;
    productIds.forEach((productId) => {
      this.iap.register({
        id: productId,
        type: this.iap.PAID_SUBSCRIPTION
      });
      this.registerHandlersForPurchase(productId);
    });
    // restore purchase
    this.iap.refresh();
  }

  ionViewWillLeave() {
    this.iap.off(this.registerHandlersForPurchase);
  }

  checkout(productId) {
    try {
      this.iap.get(productId);
      this.iap.order(productId).then((p) => {
        alert(JSON.stringify(p));
      }).catch((e) => {
      });
    } catch (err) {
    }
  }

  registerHandlersForPurchase(productId) {
    // this.iap.validator = 'https://validator.fovea.cc/v1/validate?appName=com.sitebubo.app&apiKey=5f308137-76e7-4d0c-b339-4cfc4b7406ed';
    const self = this.iap;
    this.iap.once(productId).updated((product) => {
      if (product.loaded && product.valid && product.state === self.APPROVED && product.transaction != null) {

      }
    });
    this.iap.once(productId).owned((product: IAPProduct) => {
      alert('owned' + JSON.stringify(product));
      this.purchaseService.saveSubscriptionDetailByGoogle(this.userID, this.token, JSON.stringify(product))
      .then((res) => {
        if (res) {
          if (this.paidPlanDowngradeData) {
            this.removeDomains(this.paidPlanDowngradeData).then((result) => {
              if (result) {
                const params: NavigationExtras = {
                  queryParams: {
                    isNewUser: this.isNewUser,
                    platform: 'android',
                    status: 'downgrade',
                    oldPlan: this.oldPlanName
                  }
                };
                this.router.navigate(['subscription-welcome'], params);
              }
            });
          } else {
            const params: NavigationExtras = {
              queryParams: {
                isNewUser: this.isNewUser,
                platform: 'android',
                status: 'upgrade',
                isFreeTrial: this.freeTrialAvailable,
                oldPlan: this.oldPlanName
              }
            };
            this.router.navigate(['subscription-welcome'], params);
          }
        }
      });
    });
    this.iap.once(productId).approved((product: IAPProduct) => {
      product.finish();
    });
    this.iap.once(productId).refunded((product: IAPProduct) => {
      product.finish();
    });
    this.iap.once(productId).expired((product: IAPProduct) => {
      product.finish();
    });
    this.iap.once(productId).cancelled((product: IAPProduct) => {
    });
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      console.log(user);
      if (user) {
        this.isNewUser = user.new_user;
        this.userID = user.id;
        this.token = user.token;
      }
    });
    this.storage.get('planInfo').then((info) => {
      console.log(info);
      if (info) {
        this.currentPlanID = info.id;
        this.definePlansList().then((productIds) => {
          this.listenInapppurchase(productIds);
        });
        this.currnetPlanName = info.name;
        this.oldPlanName = info.name + ' Plan';
        this.daysLeft = info.days_left;
      }
    });
  }

  async definePlansList() {
    return new Promise((resolve) => {
      const productIds = [];
      for (let i = 2; i < 5; i++) {
        if (i !== this.currentPlanID) {
          const temp = 'p' + i + 'm';
          const temp1 = 'p' + i + 'a';
          productIds.push(temp);
          productIds.push(temp1);
        }
      }
      resolve(productIds);
    });
  }

  carryOutPayment(newPlanID, newPlanName, noofDomain, durationType) {
    let tempPlan: string;
    if (durationType === 'month') {
      tempPlan = 'm';
    } else {
      tempPlan = 'a';
    }
    tempPlan = 'p' + newPlanID + tempPlan;
    if (this.isNewUser && newPlanID === 1) {
      this.subscribeToFreePlan().then((res) => {
        if (res) {
          this.router.navigate(['subscription-welcome'],  {
            queryParams: {
              isNewUser: this.isNewUser,
              planID: 1
            }
          });
        }
      });
    } else if (newPlanID < this.currentPlanID) {
      this.getDomainsToRemove(newPlanID, tempPlan, newPlanName, noofDomain);
    } else  {
      this.gotoGooglePay(newPlanID, tempPlan, null);
    }
  }

  async getDomainsToRemove(newPlanID, tempPlan, newPlanName, noofDomain) {
    const exDomain = await this.modalCtrl.create({
      component: ExDomainsPage,
      componentProps: {
        selectedPlan: newPlanName,
        currentPlan: this.currnetPlanName,
        allowedCnt: noofDomain,
        reason: false,
      },
      swipeToClose: true
    });
    exDomain.onDidDismiss().then((result) => {
      if (result.role === 'success') {
        this.gotoGooglePay(newPlanID, tempPlan, result.data);
      }
    });
    await exDomain.present();
  }

  gotoGooglePay(newPlanID, tempPlan, downgradeData = null) {
    if (newPlanID === 1) {
      this.ionService.showLoading();
      this.subscribeToFreePlan().then((result) => {
        this.ionService.closeLoading();
        if (result) {
          this.removeDomains(downgradeData).then((res) => {
            this.router.navigate(['subscription-welcome'], {
              queryParams: {
                isNewuser: this.isNewUser,
                oldPlan: this.oldPlanName,
                platform: 'android',
                status: 'downgrade'
              }
            });
          });
        }
      }).catch((err) => {
        this.ionService.closeLoading();
      });
    } else {
      this.checkout(tempPlan);
      if (downgradeData) {
        this.paidPlanDowngradeData = downgradeData;
      }
      // this.paypal.payNow(this.userID, newPlanID, this.token, this.freeTrialAvailable, durationType)
      // .then((res) => {
      //   this.ionService.closeLoading();
      //   if (res === 'success') {
      //     if (downgradeData !== null) {
      //       this.removeDomains(downgradeData).then( result => {
      //         if (result) {
      //           const params: NavigationExtras = {
      //             queryParams: {
      //               isNewUser: this.isNewUser,
      //               platform: 'android',
      //               status: 'downgrade',
      //               oldPlan: this.oldPlanName
      //             }
      //           };
      //           this.router.navigate(['subscription-welcome'], params);
      //         }
      //       }).catch((err) => {
      //         this.ionService.closeLoading();
      //         this.ionService.presentToast('Downgrading failed due to server api');
      //       });
      //     } else {
      //       const params: NavigationExtras = {
      //         queryParams: {
      //           isNewUser: this.isNewUser,
      //           platform: 'android',
      //           status: 'upgrade',
      //           isFreeTrial: this.freeTrialAvailable,
      //           oldPlan: this.oldPlanName
      //         }
      //       };
      //       this.router.navigate(['subscription-welcome'], params);
      //     }
      //   }
      // });
    }
  }

  subscribeToFreePlan(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.subscriptionAPI.activatefreesubscription(1, this.userID, this.token)
      .subscribe((result) => {
        console.log(result);
        if (result.RESPONSECODE === 1) {
          resolve(true);
        } else {
          this.ionService.presentToast(result.RESPONSE);
          reject(false);
        }
      }, err => {
        this.ionService.presentToast('Free Plan activation failed.');
      });
    });
  }

  removeDomains(domainsToRemove): Promise<boolean> {
    this.ionService.showLoading();
    return new Promise((resolve, reject) => {
      this.subscriptionAPI.downgradePlan(domainsToRemove.domains, this.userID, this.token, domainsToRemove.feedback)
      .subscribe((res) => {
        if (res.RESPONSECODE === 1) {
          resolve(true);
        } else {
          this.ionService.presentToast(res.RESPONSE);
        }
      }, err => {
        this.ionService.closeLoading();
        this.ionService.presentToast('Something might be wrong with the server');
        reject(false);
      });
    });
  }
}
