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
    this.subscriptionAPI.saveSubscriptionDetailByGoogle(userID, token, receiptData)
    .subscribe((res) => {

    });
  }
}
