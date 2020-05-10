import { Injectable } from '@angular/core';
import { Events } from '../events/events.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private events: Events,
  ) { }

  async setStorage(result) {
    return new Promise(async (resolve, reject) => {
      this.events.publish('userInfo_set', result.user);
      this.events.publish('planInfo_set', result.subscription);
      this.events.publish('domainInfo_set', result.domain);
      resolve(true);
    });
  }
}
