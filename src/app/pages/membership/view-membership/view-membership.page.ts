import { NavController } from '@ionic/angular';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { TransactionApiService } from 'src/app/apis/transaction/transaction-api.service';
import { GeneralService } from 'src/app/services/generalComponents/general.service';
import { SubscriptionApiService } from 'src/app/apis/subscription/subscription-api.service';
import { ConstantsService } from 'src/app/constants/constants.service';


@Component({
  selector: 'app-view-membership',
  templateUrl: './view-membership.page.html',
  styleUrls: ['./view-membership.page.scss'],
})
export class ViewMembershipPage implements OnInit {
  subscriptionID: any;
  planInfo: any;
  userID: string;
  token: string;
  freeTrial: boolean;
  transactions = [];
  displayValue = 0;
  plansList: any;
  freeTrialAvailable: boolean;
  viewStatus = true;
  currentPlanID: number;
  constructor(
    private ionService: IongadgetService,
    private navCtrl: NavController,
    private storage: Storage,
    private cdr: ChangeDetectorRef,
    private transactionAPI: TransactionApiService,
    private generalService: GeneralService,
    private subscriptionApi: SubscriptionApiService,
    private constants: ConstantsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initData();
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.userID = user.id;
        this.token = user.token;
      }
    });
    this.storage.get('planInfo').then((planInfo) => {
      this.currentPlanID = planInfo.id;
      console.log(planInfo);
      const temp = planInfo;
      if (planInfo.pending_productid) {
        temp.bigprc = this.constants.plans[planInfo.pending_productid].price;
        temp.smallprc = '99';
        temp.name = this.constants.plans[planInfo.pending_productid].label;
      } else {
        const arr = temp.price.toString().split('.');
        temp.bigprc = arr[0];
        temp.smallprc = arr[1];
      }
      this.planInfo = temp;
      this.subscriptionID = planInfo.id;
      this.freeTrial = planInfo.free_trial;
      this.defineDisplay();
    });
  }

  getTransactionHistory(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.transactionAPI.getTransactionHistory(this.userID, this.token).subscribe(result => {
        console.log(result);
        if (result.RESPONSECODE === 1) {
          if (result.data && result.data.length > 0) {
            this.planInfo.invoice_pdf = result.data[0].invoice_pdf;
            this.planInfo.lastpaymentAmount = result.data[0].amount;
            this.planInfo.payment_method = result.data[0].payment_method;
          }
          resolve(true);
        } else {
          this.ionService.presentToast(result.RESPONSE);
          reject(false);
        }
      }, err => {
      });
    });
  }

  defineDisplay() {
    if (this.subscriptionID === 1) {
      this.getSubscriptions(this.userID, this.token).then((res) => {
        this.displayValue = 1;
      });
    } else if (this.subscriptionID > 1 && this.freeTrial === true) {
      this.displayValue = 2;
    } else  {
      this.getTransactionHistory().then((result) => {
        if (result) {
          console.log(result);
          this.displayValue = 4;
        }
      });
    }
    this.ionService.closeLoading();
    this.cdr.detectChanges();
  }

  getSubscriptions(userID, token): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.ionService.showLoading();
      this.subscriptionApi.getSubscriptionPlan(userID, token).subscribe(async (plans) => {
        this.ionService.closeLoading();
        if (plans.RESPONSECODE === 1) {
          this.plansList = plans.data.plan.reverse();
          this.freeTrialAvailable = plans.data.freeTrial_available;
          resolve(true);
        } else {
          this.ionService.showAlert('Error while fetching Plans', 'Something might be wrong from the api');
          reject(false);
        }
      }, err => {
        this.ionService.showAlert('Connection Error to the Server', 'Couldnot fetch the plans');
        reject(false);
      });
    });
}

  back() {
    this.navCtrl.back();
  }

  toggleMenu() {
    this.ionService.toggleMenu();
  }

  openFeedback() {
    this.generalService.openFeedback();
  }

}

