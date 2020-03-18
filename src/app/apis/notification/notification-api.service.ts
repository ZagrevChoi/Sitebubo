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
export class NotificationApiService extends BaseApiService {

  constructor(
    public https: HttpClient,
    public router: Router,
    public storage: Storage,
    public facebook: Facebook,
    public events: Events
    ) {
    super(https, router, storage, facebook, events);
  }

  getNotifications(domainName, domainUserID, userID, token): any {
    let url = this.auth_url + 'notification?';
    url += 'domain_name=' + domainName + '&domain_user_id=' + domainUserID + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  readNotifications(domainName, userID, token): any {
    let url = this.auth_url + 'notificationupdate?';
    url += 'domain_name=' + domainName + '&user_id=' + userID + '&token=' + token;
    return this.sendGetRequest(url);
  }

  getNotificationSetting(userID, token): any {
    let url = this.auth_url + 'pushconfigurations?';
    url += 'user_id=' + userID + '&token=' +  token;
    return this.sendGetRequest(url);
  }

  saveGeneralPermission(userID, token, monitors): any {
    let url = this.auth_url + 'pushgeneralpermission?';
    url += 'user_id=' + userID + '&token=' + token + '&monitors=' + monitors;
    return this.sendGetRequest(url);
  }

  saveDomainPushPermission(userID, token, domainID, monitors): any {
    let url = this.auth_url + 'pushdomainpermission?';
    url += 'user_id=' + userID + '&token=' + token + '&monitors=' + monitors + '&domain_id=' + domainID;
    return this.sendGetRequest(url);
  }

  // getDomainScanStatus(params): any {
  //   // tslint:disable-next-line: max-line-length
  //   const url = this.server_url + 'cronreportcontroller/webscanstatus/' + params.user_id + '/' + params.domain_name + '/' + params.domain_id;
  //   console.log(url);
  //   return this.sendGetRequest(url);
  // }
}
