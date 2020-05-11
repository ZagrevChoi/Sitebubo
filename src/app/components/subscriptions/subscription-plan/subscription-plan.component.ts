import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SubscriptionApiService } from 'src/app/apis/subscription/subscription-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { Router, NavigationExtras } from '@angular/router';
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
  newPlanName: string;
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
    private iap: InAppPurchase2,
    private purchaseService: InAppPurchaseService
  ) { }

  ngOnInit() {
    this.initData();
  }

  ionViewWillEnter() {
  }

  async listenInapppurchase(productIds) {
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
      this.purchaseService.saveSubscriptionDetailByGoogle(this.userID, this.token, JSON.stringify(product))
      .then((res) => {
        if (res.RESPONSE === 'Success') {
          if (this.paidPlanDowngradeData) {
            this.purchaseService.removeDomains(this.paidPlanDowngradeData, this.userID, this.token).then((result) => {
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
                isFreeTrial: res.free_trail,
                oldPlan: this.oldPlanName
              }
            };
            this.router.navigate(['subscription-welcome'], params);
          }
        } else {
          if (res.RESPONSE === 'Pending') {
            this.router.navigate(['subscription-welcome'], {
              queryParams: {
                status: 'pending',
                oldPlan: this.oldPlanName,
                newPlan: this.newPlanName + ' Plan'
              }
            });
          } else {
            this.ionService.closeLoading();
          }
        }
      }).catch((err) => {
        this.ionService.closeLoading();
        this.ionService.presentToast('Error happend while subscribing to the new plan.');
      });
    });
    this.iap.once(productId).approved((product: IAPProduct) => {
      alert('approved' + product.id);
      product.finish();
    });
    this.iap.once(productId).refunded((product: IAPProduct) => {
      product.finish();
    });
    this.iap.once(productId).expired((product: IAPProduct) => {
      product.finish();
    });
    this.iap.once(productId).cancelled((product: IAPProduct) => {
      product.finish();
    });
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
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

  cancelPreviousPlan(): Promise<boolean> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve) => {
      this.purchaseService.cancelPreviousPlan(this.userID, this.token)
      .then((res) => {
        resolve(true);
      });
    });
  }

  async carryOutPayment(newPlanID, newPlanName, noofDomain, durationType) {
    if (!this.isNewUser) {
      await this.cancelPreviousPlan();
    }
    this.newPlanName = newPlanName;
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
      this.purchaseService.getDomainsToRemove(newPlanName, noofDomain, true)
      .then((res) => {
        if (res) {
          this.gotoGooglePay(newPlanID, tempPlan, res);
        }
      });
    } else  {
      this.gotoGooglePay(newPlanID, tempPlan, null);
    }
  }

  gotoGooglePay(newPlanID, tempPlan, downgradeData = null) {
    if (newPlanID === 1) {
          this.subscribeToFreePlan().then((result) => {
            if (result) {
              this.purchaseService.removeDomains(downgradeData, this.userID, this.token).then((res) => {
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
          });
    } else {
      this.checkout(tempPlan);
      if (downgradeData) {
        this.paidPlanDowngradeData = downgradeData;
      }
    }
  }

  subscribeToFreePlan(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.get('userInfo').then((user) => {
        this.ionService.showLoading();
        this.subscriptionAPI.activatefreesubscription(1, user.id, user.token)
        .subscribe(async (result) => {
          await this.ionService.closeLoading();
          console.log(result);
          if (result.RESPONSECODE === 1) {
            resolve(true);
          } else {
            this.ionService.presentToast(result.RESPONSE);
            reject(false);
          }
        }, err => {
          this.ionService.closeLoading();
          this.ionService.presentToast('Free Plan activation failed.');
        });
      });
    });
  }
}
