import { Injectable } from '@angular/core';
import { SubscriptionApiService } from 'src/app/apis/subscription/subscription-api.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class InAppPurchaseService {
  userID: string;
  token: string;
  constructor(
    private subscriptionAPI: SubscriptionApiService,
    private iap: InAppBrowser,
    private storage: Storage
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

  cancelSubscription() {
    return new Promise((resolve, reject) => {
      const browser = this.iap.create('https://play.google.com/store/account/subscriptions', '_blank');
      browser.show();
      browser.on('exit').subscribe(() => {
        this.verifyCurrentSubscription(this.userID, this.token).then((res) => {
          alert(JSON.stringify(res));
        });
      });
    });
  }
}
