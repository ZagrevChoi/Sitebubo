import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './../base/base-api.service';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Events } from 'src/app/services/events/events.service';
import { Observable } from 'rxjs';

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

  getSubscriptionPlan(userID, token): Observable<any> {
    let url = this.subscription_url + 'getsubscription?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getSubscriptionPlanDetails(subscriptionID, userID, token): Observable<any> {
    let url = this.subscription_url + 'subscriptiondetails?';
    url  += 'subscription_id=' + subscriptionID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  activatefreesubscription(subscriptionID, userID, token): Observable<any> {
    let url = this.subscription_url + 'activatefreesubscription?';
    url += 'subscription_id=' + subscriptionID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  activateSubscriptionIos(subscriptionID, transactionID, productType, userID, token): Observable<any> {
    let url = this.subscription_url + 'activatesubscriptionios?';
    url += 'subscription_id=' + subscriptionID + '&transaction_id=' + transactionID;
    url += '&producttype=' +  productType;
    url += '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  currentSubscription(userID, token): Observable<any> {
    let url = this.subscription_url + 'currentsubscription?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  downgradePlan(domains, userID, tokenValue, feedback): Observable<any> {
    const postData = {
      user_id: userID,
      token: tokenValue,
      reason: feedback,
      domains_to_remove: JSON.stringify(domains)
    };
    console.log(postData);
    const url = this.subscription_url + 'downgradeplan';
    return this.sendPostRequest(url, postData);
  }

  verifyCurrentSubscription(userID, token): Observable<any> {
    let url = this.subscription_url + 'verifysubscriptionbygoogle?';
    url += 'user_id=' + userID + '&token=' + token;
    return  this.sendGetRequest(url);
  }

  verifypurchasetokenbygoogle(userID, tokenData, purchaseToken, subscriptionID) {
    const postData = {
      user_id: userID,
      token: tokenData,
      purchase_token: purchaseToken,
      subscription_id: subscriptionID
    };
    const url = this.subscription_url + 'verifypurchasetokenbygoogle';
    return this.sendPostRequest(url, postData);
  }

  saveSubscriptionDetailByGoogle(userID, tokenData, receiptData): Observable<any> {
    const postData = {
      user_id: userID,
      token: tokenData,
      receipt: receiptData
    };
    const url = this.subscription_url + 'savesubscriptiondetailbygoogle';
    return this.sendPostRequest(url, postData);
  }

  cancelPreviousGoogleSubscription(userID, token) {
    let url = this.subscription_url + 'cancelpurchasebygoogle?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }
}
