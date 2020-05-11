import { Component, ChangeDetectorRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// modules
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { BranchIo } from '@ionic-native/branch-io/ngx';
// api
import { AuthApiService } from './apis/auth/auth-api.service';
// services
import { GeneralService } from './services/generalComponents/general.service';
import { StorageService } from './services/storage/storage.service';
import { IongadgetService } from './services/ionGadgets/iongadget.service';
import { NetworkService } from './services/network/network.service';
import { Events } from './services/events/events.service';
import { InAppPurchaseService } from './services/in-app-purchase/in-app-purchase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  email: string;
  plan: string;
  domainCount: number;
  showMenu = false;
  newUser: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private generalService: GeneralService,
    private events: Events,
    private cdr: ChangeDetectorRef,
    private ionService: IongadgetService,
    private storageService: StorageService,
    private network: NetworkService,
    private fcm: FCM,
    private branchIO: BranchIo,
    private purchaseService: InAppPurchaseService
  ) {
      this.treatFCM();
      this.listenBranch();
      this.network.initNetwork();
      this.listenEvents();
      this.initializeApp();
    }

    ionViewWillEnter() {
        this.cdr.detectChanges();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.purchaseService.veryifyToken()
            .then((result) => {
                if (result) {
                    // tslint:disable-next-line: no-string-literal
                    if (result['user'].terms) {
                    this.generalService.openTermsAndConditions(true);
                    }
                    this.storageService.setStorage(result).then(() => {
                        this.generalService.defineInitialRoutering();
                    });
                } else {

                }
            }).catch((err) => {

            });
        });
    }

    listenEvents() {
        this.events.subscribe('denied_token', () => {
            this.ionService.closeLoading();
        });

        this.events.subscribe('userInfo_set', (user) => {
            console.log('userInfo set', user);
            this.email = user.email;
            this.newUser = user.new_user;
            this.storage.set('userInfo', user);
            this.cdr.detectChanges();
        });

        this.events.subscribe('planInfo_set', (info) => {
            console.log('planInfo set', info);
            this.storage.set('planInfo', info);
            this.cdr.detectChanges();
        });

        this.events.subscribe('domainInfo_set', (info) => {
            console.log('domainInfo set', info);
            this.domainCount = info.current_domains;
            alert(this.domainCount);
            this.storage.set('domainInfo', info);
            this.cdr.detectChanges();
        });

        this.events.subscribe('log_out', () => {
            this.showMenu = false;
            this.cdr.detectChanges();
        });
    }

    listenBranch() {
        this.platform.ready().then(() => {
            this.branchIO.initSession().then((data) => {
                this.generalService.branchIOTreat(data);
            });
            this.platform.resume.subscribe(() => {
                this.branchIO.initSession().then((data) => {
                    this.generalService.branchIOTreat(data);
                 });
            });
        });
    }

    treatFCM() {
        this.fcm.onNotification().subscribe((res) => {
            if (res.wasTapped) {
                
            } else {
                
            }
        });
    }

    openDomainList() {
        this.router.navigate(['domain-list']);
    }

    openMembership() {
        this.router.navigate(['view-membership']);
    }

    openMyProfile() {
        this.generalService.openMyProfile();
    }

    openNotificationSettings() {
        this.router.navigate(['notification-setting']);
    }

    openFeedback() {
        this.generalService.openFeedback();
    }

    openRating() {
        this.generalService.openRating();
    }

    logout() {
        this.generalService.logOut();
        this.events.publish('log_out', true);
    }

    ChangePlan() {
        this.router.navigate(['plans']);
    }
}
