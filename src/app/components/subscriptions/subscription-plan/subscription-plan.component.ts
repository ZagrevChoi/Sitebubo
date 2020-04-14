import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SubscriptionApiService } from 'src/app/apis/subscription/subscription-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ExDomainsPage } from 'src/app/pages/modals/ex-domains/ex-domains.page';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MembershipService } from 'src/app/services/membership/membership.service';

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
  changeData: {
    newPlanID: number, newPlanName: string, noofDomain: any, durationType: any
  };
  constructor(
    private storage: Storage,
    private subscriptionAPI: SubscriptionApiService,
    private ionService: IongadgetService,
    private router: Router,
    private modalCtrl: ModalController,
    private iap: InAppPurchase,
    private membership: MembershipService
  ) { }

  ngOnInit() {
    this.initData();
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
        this.currnetPlanName = info.name;
        this.oldPlanName = info.name + ' Plan';
        this.daysLeft = info.days_left;
      }
    });
  }

  carryOutPayment(newPlanIDTemp, newPlanNameTemp, noofDomainTemp, durationTypeTemp) {
    // console.log(newPlanID, newPlanName, noofDomain, durationType);
    this.changeData = {
      newPlanID: newPlanIDTemp,
      newPlanName: newPlanNameTemp,
      noofDomain: noofDomainTemp,
      durationType: durationTypeTemp
    };
    if (newPlanIDTemp === 1) {
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
    } else {
      this.gotoInappPurchase();
    }
  }

  getDomainsToRemove(): Promise<any> {
    return new Promise(async (resolve) => {
      const exDomain = await this.modalCtrl.create({
        component: ExDomainsPage,
        componentProps: {
          selectedPlan: this.changeData.newPlanName,
          currentPlan: this.currnetPlanName,
          allowedCnt: this.changeData.noofDomain,
          reason: false
        },
        swipeToClose: true
      });
      exDomain.onDidDismiss().then((result) => {
        if (result.role === 'success') {
          resolve(result.data);
        }
      });
      await exDomain.present();
    });
  }

  async paymentContinue(downgradeData = null) {
    let productID: string;
    if (this.changeData.durationType === 'month') {
      productID = 'P' + this.changeData.newPlanID + 'M';
    } else {
      productID = 'P' + this.changeData.newPlanID + 'A';
    }
    await this.iap.getProducts([productID]);
    this.iap.subscribe(productID).then((data) => {
        this.ionService.showLoading();
        this.subscriptionAPI.verifyReceipt(this.userID, data.receipt, this.token, productID)
        .subscribe((result) => {
          alert(JSON.stringify(result));
          this.ionService.closeLoading();
          if (result.RESPONSECODE === 1 && result.data.status === 'Success') {
            if (downgradeData !== null) {
              this.removeDomains(downgradeData).then(res => {
                const params: NavigationExtras = {
                  queryParams: {
                    isNewUser: this.isNewUser,
                    status: 'downgrade',
                    oldPlan: this.oldPlanName,
                    isFreeTrial: result.data.free_trail,
                    subscribed: result.data.subscribed,
                  }
                };
                this.router.navigate(['subscription-welcome'], params);
              });
            } else {
              const params: NavigationExtras = {
                queryParams: {
                  isNewUser: this.isNewUser,
                  status: 'upgrade',
                  oldPlan: this.oldPlanName,
                  isFreeTrial: result.data.free_trail,
                  subscribed: result.data.subscribed
                }
              };
              this.router.navigate(['subscription-welcome'], params);
            }
          } else {
            this.ionService.presentToast('Please try again later. ' + result.RESPONSE );
          }
        }, err => {
          this.ionService.closeLoading();
          this.ionService.presentToast('Server Api Problem');
        });
    }).catch(err => {
      this.ionService.presentToast('Payment via In app purchase failed. Try again later.');
    });
  }

  async gotoInappPurchase() {
    if (this.changeData.newPlanID < this.currentPlanID) {
      this.getDomainsToRemove().then((data) => {
        this.paymentContinue(data);
      });
    } else {
      this.paymentContinue();
    }
  }

  subscribeToFreePlan(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.isNewUser) {
        this.continueToFreePlan();
      } else {
        this.membership.confirmToFreePlan().then((res) => {
          if (res) {
            this.getDomainsToRemove().then((data) => {
              this.removeDomains(data).then((result) => {
                if (result) {
                  this.continueToFreePlan();
                }
              });
            });
          }
        });
      }
    });
  }

  continueToFreePlan() {
    this.ionService.showLoading();
    this.subscriptionAPI.activatefreesubscription(1, this.userID, this.token)
    .subscribe((result) => {
      this.ionService.closeLoading();
      if (result.RESPONSECODE === 1) {
        this.router.navigate(['subscription-welcome'], {
          queryParams: {
            isNewUser: this.isNewUser,
            planID: 1
          }
        });
      } else {
        this.ionService.presentToast(result.RESPONSE);
      }
    }, err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Server Api Problem');
    });
  }

  askIfDowngradeToFreePlan(): Promise<boolean> {
    return new Promise((resolve, reject) => {

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

  restore() {
    this.iap.restorePurchases().then((res) => {
      console.log(JSON.stringify(res));
      this.ionService.presentToast('Successfully restored.');
    });
  }
}
