import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Storage } from '@ionic/storage';
import { SubscriptionApiService } from 'src/app/apis/subscription/subscription-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { Router, NavigationExtras } from '@angular/router';
// import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { InAppPurchaseService } from 'src/app/services/in-app-purchase/in-app-purchase.service';
import { InAppPurchase } from '@ionic-native/in-app-purchase/ngx';
@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.scss'],
})
export class SubscriptionPlanComponent implements OnInit, OnChanges {
  @Input() plansList: Array<any>;
  @Input() freeTrialAvailable: boolean;
  @Input() currentPlanID: number;
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
  tempApprovedID: string;
  maySaveDetails = false;
  constructor(
    private storage: Storage,
    private subscriptionAPI: SubscriptionApiService,
    private ionService: IongadgetService,
    private router: Router,
    // private iap: InAppPurchase2,
    private purchaseService: InAppPurchaseService,
    private iap: InAppPurchase
    ) { }

  ngOnInit() {
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
      if (info) {
        this.oldPlanName = info.name + ' Plan';
        this.daysLeft = info.days_left;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.initData();
    }
  }

  saveSubscriptionDetails(gProduct) {
    this.purchaseService.saveSubscriptionDetailByGoogle(this.userID, this.token, gProduct)
    .then((res) => {
      if (res) {
        if (this.paidPlanDowngradeData) {
          this.purchaseService.removeDomains(this.paidPlanDowngradeData, this.userID, this.token).then((result) => {
            if (result) {
              const params: NavigationExtras = {
                queryParams: {
                  isNewUser: this.isNewUser,
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
              status: 'upgrade',
              oldPlan: this.oldPlanName,
              isFreeTrial: this.freeTrialAvailable
            }
          };
          this.router.navigate(['subscription-welcome'], params);
        }
      }
    }).catch((err) => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Error happend while subscribing to the new plan.');
    });
  }


  async definePlansList(): Promise<any[]> {
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
    return new Promise((resolve, reject) => {
      this.purchaseService.cancelPreviousPlan(this.userID, this.token)
      .then((res) => {
        if (res) {
          resolve(true);
        }
      }).catch(() => {
        reject(false);
      });
    });
  }

  async carryOutPayment(newPlanID, newPlanName, noofDomain, durationType) {
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
          this.paidPlanDowngradeData = res;
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
                    status: 'downgrade',
                    newPlan: 'Free Plan'
                  }
                });
              });
            }
          }).catch((err) => {
          });
    } else {
      this.definePlansList().then((result) => {
        this.iap.getProducts(result).then((res) => {
          this.iap.subscribe(tempPlan).then((subscribed) => {
            if (this.currentPlanID !== 1) {
              this.cancelPreviousPlan().then((host) => {
                if (host) {
                  this.saveSubscriptionDetails(subscribed.receipt);
                }
              });
            } else {
              this.saveSubscriptionDetails(subscribed.receipt);
            }
          });
        });
      });
    }
  }

  subscribeToFreePlan(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.currentPlanID > 1) {
        this.cancelPreviousPlan().then((res) => {
          this.storage.get('userInfo').then((user) => {
            this.ionService.showLoading();
            this.subscriptionAPI.activatefreesubscription(1, user.id, user.token)
            .subscribe((result) => {
              this.ionService.closeLoading();
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
      } else {
        this.storage.get('userInfo').then((user) => {
          this.ionService.showLoading();
          this.subscriptionAPI.activatefreesubscription(1, user.id, user.token)
          .subscribe((result) => {
            this.ionService.closeLoading();
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
      }
    });
  }
}
