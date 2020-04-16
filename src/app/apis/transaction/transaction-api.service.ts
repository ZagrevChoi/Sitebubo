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
export class TransactionApiService extends BaseApiService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public facebook: Facebook,
    public events: Events
    ) {
    super(https, router, storage, facebook, events);
  }

  getTransactionHistory(userID, token): any {
    let url = this.subscription_url + 'transactionhistroy?';
    url += 'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getLastPaymentHistory(userID, token): any {
    let url = this.subscription_url + 'getlastpayment?';
    url +=  'user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }
}
