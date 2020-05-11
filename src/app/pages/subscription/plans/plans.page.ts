import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SubscriptionApiService } from 'src/app/apis/subscription/subscription-api.service';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {
  newUser: boolean;
  products: any;
  plansList: any;
  plat: string;
  freeTrialAvailable: boolean;
  currentPlanID: number;
  constructor(
    private storage: Storage,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private subscriptionApi: SubscriptionApiService,
    private ionService: IongadgetService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initData();
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      if (user) {
        this.newUser = user.new_user;
        this.getSubscriptions(user.id, user.token);
      } else {
        this.router.navigate(['welcome'], { replaceUrl: true });
      }
    });
    this.storage.get('planInfo').then((info) => {
      if (info) {
        this.currentPlanID = info.id;
      }
    });
    // this.activatedRoute.queryParams.subscribe((params) => {
    //   if (params.newUser !== undefined) {
    //     this.newUser = params.newUser;
    //   }
    // });
  }

  getSubscriptions(userID, token) {
      this.subscriptionApi.getSubscriptionPlan(userID, token).subscribe(async (plans) => {
        if (plans.RESPONSECODE === 1) {
          console.log(plans);
          this.plansList = plans.data.plan.reverse();
          // this.plansList = [plans.data['3'], plans.data['2'], plans.data['1'], plans.data['0']];
          this.freeTrialAvailable = plans.data.freeTrial_available;
        } else {
          this.ionService.showAlert('Error while fetching Plans', 'Something might be wrong from the api');
        }
      }, err => {
        console.log(err);
        this.ionService.showAlert('Connection Error to the Server', 'Couldnot fetch the plans');
      });
  }

  goback() {
    this.navCtrl.back();
  }

  // restore() {
  //   this.iap.restorePurchases().then((res) => {
  //     console.log(JSON.stringify(res));
  //     this.ionService.presentToast('Successfully restored.');
  //   });
  // }
}
