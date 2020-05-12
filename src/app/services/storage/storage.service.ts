import { Injectable } from '@angular/core';
import { Events } from '../events/events.service';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private events: Events,
    private storage: Storage
  ) { }

  async setStorage(result) {
    return new Promise(async (resolve, reject) => {
      this.events.publish('userInfo_set', result.user);
      this.events.publish('planInfo_set', result.subscription);
      this.restDomainInfo(result.domain);
      resolve(true);
    });
  }


  restDomainInfo(result) {
    const domain = {
      current_domains: result.current_domains ? result.current_domains : result.domains,
      my_domains: result.my_domains,
      invited_domains: result.invited_domains
    };
    this.storage.set('domainInfo', domain).then(() => {
      this.events.publish('domainInfo_set', domain);
    });
  }
}
