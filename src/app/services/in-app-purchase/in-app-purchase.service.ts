import { Injectable } from '@angular/core';
import { SubscriptionApiService } from 'src/app/apis/subscription/subscription-api.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import { ExDomainsPage } from 'src/app/pages/modals/ex-domains/ex-domains.page';
import { ModalController } from '@ionic/angular';
import { IongadgetService } from '../ionGadgets/iongadget.service';
import { AuthApiService } from 'src/app/apis/auth/auth-api.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class InAppPurchaseService {
  userID: string;
  token: string;
  currentPlanName: string;
  constructor(
    private subscriptionAPI: SubscriptionApiService,
    private iap: InAppBrowser,
    private storage: Storage,
    private modalCtrl: ModalController,
    private ionService: IongadgetService,
    private authAPI: AuthApiService,
    private router: Router
  ) {
    this.storage.get('userInfo').then(user => {
      this.userID = user.id;
      this.token = user.token;
    });
  }

  verifyCurrentSubscription(userID, token): any {
    return new Promise((resolve, reject) => {
      this.subscriptionAPI.verifyCurrentSubscription(userID, token).subscribe((res) => {
        alert(JSON.stringify(res));
        if (res.RESPONSECODE === 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      }, err => {
        reject('The api is not working properly at the moment');
      });
    });
  }

  saveSubscriptionDetailByGoogle(userID, token, receiptData): Promise<any> {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.subscriptionAPI.saveSubscriptionDetailByGoogle(userID, token, receiptData)
      .subscribe((res) => {
        resolve(res);
      }, err => {
        reject(false);
      });
    });
  }

  cancelSubscription(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const browser = this.iap.create('https://play.google.com/store/account/subscriptions', '_blank');
      browser.show();
      browser.on('exit').subscribe(() => {
        this.verifyCurrentSubscription(this.userID, this.token).then((res) => {
          resolve(!res);
        });
      });
    });
  }

  getDomainsToRemove(newPlanName, noofDomain, userClose): Promise<any> {
    return new Promise(async (resolve) => {
      const exDomain = await this.modalCtrl.create({
        component: ExDomainsPage,
        componentProps: {
          selectedPlan: newPlanName,
          allowedCnt: noofDomain,
          autoClose: userClose
        },
        backdropDismiss: userClose
      });
      exDomain.onDidDismiss().then((result) => {
        if (result.role === 'success') {
          resolve(result.data);
        } else {
          resolve(false);
        }
      });
      await exDomain.present();
    });
  }

  removeDomains(domainsToRemove, userID, token): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.subscriptionAPI.downgradePlan(domainsToRemove.domains, userID, token, domainsToRemove.feedback)
      .subscribe((res) => {
        if (res.RESPONSECODE === 1) {
          resolve(true);
        } else {
          this.ionService.presentToast(res.RESPONSE);
          resolve(false);
        }
      }, err => {
        this.ionService.presentToast('Something might be wrong with the server');
        reject(false);
      });
    });
  }

  veryifyToken() {
    return new Promise((resolve, reject) => {
        this.storage.get('userInfo').then((user) => {
            if (user) {
                this.authAPI.verifyToken(user.token).subscribe((result) => {
                    if (result.RESPONSECODE === 1) {
                        resolve(result.data);
                    } else {
                        this.storage.clear();
                        this.router.navigate(['welcome'], {replaceUrl: true});
                        reject('error');
                    }
                });
            } else {
                this.storage.clear();
                this.router.navigate(['welcome'], { replaceUrl: true });
                reject('error');
            }
        });
    });
}
}
