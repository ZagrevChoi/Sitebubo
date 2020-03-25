import { Component, OnInit, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PaypalService } from 'src/app/services/paypal/paypal.service';
import { SubscriptionApiService } from 'src/app/apis/subscription/subscription-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ExDomainsPage } from 'src/app/pages/modals/ex-domains/ex-domains.page';

@Component({
  selector: 'app-subscription-plan',
  templateUrl: './subscription-plan.component.html',
  styleUrls: ['./subscription-plan.component.scss'],
})
export class SubscriptionPlanComponent implements OnInit {
  @Input() plansList: Array<any>;
  currentPlanID: number;
  currnetPlanName: string;
  oldPlanName: string;
  freeTrial: boolean;
  daysLeft: number;
  isNewUser: boolean;
  userID: number;
  token: string;
  constructor(
    private storage: Storage,
    private paypal: PaypalService,
    private subscriptionAPI: SubscriptionApiService,
    private ionService: IongadgetService,
    private router: Router,
    private modalCtrl: ModalController
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

  carryOutPayment(newPlanID, newPlanName, noofDomain, durationType) {
    console.log(newPlanID, newPlanName, noofDomain, durationType);
    if (this.isNewUser && newPlanID === 1) {
      console.log('asdfasdfasdf');
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
      this.getDomainsToRemove(newPlanID, newPlanName, noofDomain, durationType);
    } else  {
      this.gotoPayPal(newPlanID, null, durationType);
    }
  }

  async getDomainsToRemove(newPlanID, newPlanName, noofDomain, durationType) {
    const exDomain = await this.modalCtrl.create({
      component: ExDomainsPage,
      componentProps: {
        selectedPlan: newPlanName,
        currentPlan: this.currnetPlanName,
        allowedCnt: noofDomain,
        reason: false
      }
    });
    exDomain.onDidDismiss().then((result) => {
      if (result.role === 'success') {
        this.gotoPayPal(newPlanID, result.data, durationType);
      }
    });
    await exDomain.present();
  }

  gotoPayPal(newPlanID, downgradeData = null, durationType) {
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
      this.paypal.payNow(this.userID, newPlanID, this.token, this.freeTrial, durationType)
      .then((res) => {
        this.ionService.closeLoading();
        if (res === 'success') {
          if (downgradeData !== null) {
            this.removeDomains(downgradeData).then( result => {
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
            }).catch((err) => {
              this.ionService.closeLoading();
              this.ionService.presentToast('Downgrading failed due to server api');
            });
          } else {
            const params: NavigationExtras = {
              queryParams: {
                isNewUser: this.isNewUser,
                platform: 'android',
                status: 'upgrade',
                isFreeTrial: this.freeTrial,
                oldPlan: this.oldPlanName
              }
            };
            this.router.navigate(['subscription-welcome'], params);
          }
        }
      });
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
