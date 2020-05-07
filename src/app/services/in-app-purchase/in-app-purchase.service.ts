import { Injectable } from '@angular/core';
import { SubscriptionApiService } from 'src/app/apis/subscription/subscription-api.service';
import { IongadgetService } from '../ionGadgets/iongadget.service';

@Injectable({
  providedIn: 'root'
})
export class InAppPurchaseService {

  constructor(
    private subscriptionAPI: SubscriptionApiService,
    private ionService: IongadgetService
  ) { }

  verifyCurrentSubscription(): any {
    return new Promise((resolve, reject) => {
      this.subscriptionAPI.verifyCurrentSubscription().subscribe((res) => {
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
    this.ionService.showLoading();
    // tslint:disable-next-line: no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.subscriptionAPI.saveSubscriptionDetailByGoogle(userID, token, receiptData)
      .subscribe((res) => {
        this.ionService.closeLoading();
        resolve(res);
      }, err => {
        this.ionService.closeLoading();
        reject(false);
      });
    });
  }
}
