import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './../base/base-api.service';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Events } from 'src/app/services/events/events.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionApiService extends BaseApiService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public facebook: Facebook,
    public events: Events
    ) {
    super(https, router, storage, facebook, events);
  }

  getSubscriptionPlan(userID, token): any {
    let url = this.subscription_url + 'getsubscription?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getSubscriptionPlanDetails(subscriptionID, userID, token): any {
    let url = this.subscription_url + 'subscriptiondetails?';
    url  += 'subscription_id=' + subscriptionID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  activatefreesubscription(subscriptionID, userID, token): any {
    let url = this.subscription_url + 'activatefreesubscription?';
    url += 'subscription_id=' + subscriptionID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  activateSubscriptionIos(subscriptionID, transactionID, productType, userID, token): any {
    let url = this.subscription_url + 'activatesubscriptionios?';
    url += 'subscription_id=' + subscriptionID + '&transaction_id=' + transactionID;
    url += '&producttype=' +  productType;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  currentSubscription(userID, token): any {
    let url = this.subscription_url + 'currentsubscription?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  downgradePlan(domains, userID, tokenValue, feedback): any {
    const postData = {
      user_id: userID,
      token: tokenValue,
      reason: feedback,
      domains_to_remove: JSON.stringify(domains)
    };
    const url = this.subscription_url + 'downgradeplan';
    return this.sendPostRequest(url, postData);
  }

  verifyReceipt(userID, receiptData, tokenValue, productID) {
    const postData = {
      user_id: userID,
      receipt: receiptData,
      token: tokenValue,
      subscription_id: productID
    };
    const url = this.subscription_url + 'verifyreceipt';
    return this.sendPostRequest(url, postData);
  }
}
