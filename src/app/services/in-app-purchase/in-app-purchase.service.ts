import { Injectable } from '@angular/core';
import { SubscriptionApiService } from 'src/app/apis/subscription/subscription-api.service';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class InAppPurchaseService {

  constructor(
    private subscriptionAPI: SubscriptionApiService
  ) { }

  verifyCurrentSubscription(): any {
    this.subscriptionAPI.verifyCurrentSubscription().toPromise()
    .then((result) => {
      return true;
    }).catch((err) => {
      return false;
    });
  }

  saveSubscriptionDetailByGoogle(userID, token, receiptData) {
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.subscriptionAPI.saveSubscriptionDetailByGoogle(userID, token, receiptData)
      .subscribe((res) => {
        if (res.RESPONSECODE === 1) {
          resolve(true);
        } else {
          reject(false);
        }
      }, err => {
        reject(false);
      });
    });
  }
}
