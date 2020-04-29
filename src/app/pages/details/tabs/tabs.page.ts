import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { GeneralService } from './../../../services/generalComponents/general.service';
import { TempService } from './../../../services/temp/temp.service';
import { Component, ViewChild, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { IongadgetService } from 'src/app/services/ionGadgets/iongadget.service';
import { AdmobService } from 'src/app/services/admob/admob.service';
import { Events } from 'src/app/services/events/events.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit, OnDestroy {
  @ViewChild('header', { static: false }) header: HTMLElement;
  @ViewChild('tabs', { static: false }) tabs: HTMLElement;
  domainName: string;
  notifications: any;
  userID: number;
  token: string;
  unreadCount = 0;
  constructor(
    private tempSerivce: TempService,
    private events: Events,
    private ionService: IongadgetService,
    private generalService: GeneralService,
    private storage: Storage,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private admob: AdmobService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.reload) {
        this.events.publish('reloadresult', true);
      }
    });
    this.defineAdmobShow();
    this.initData();
  }

  ngOnDestroy() {
    this.admob.removeBanner();
  }

  defineAdmobShow() {
    this.storage.get('planInfo').then((info) => {
      if (info.id === 1) {
        this.admob.showAdmobBanner();
      } else {
        this.admob.removeBanner();
      }
    });
  }

  initData() {
    this.storage.get('userInfo').then((user) => {
      this.userID = user.id;
      this.token = user.token;
    });
  }

  ionViewWillEnter() {
    if (this.tempSerivce.dashboardParams) {
      this.domainName = this.tempSerivce.dashboardParams.domainName;
      this.notifications = this.tempSerivce.notifications.notifications;
      this.unreadCount = this.tempSerivce.unreadCount;
      this.cdr.detectChanges();
    }
  }

  toggleMenu() {
    this.ionService.toggleMenu();
  }

  openNotificationModal() {
    this.generalService.openNotifications(this.notifications, 1).then((result) => {
      if (result) {
        this.generalService.updateNotifications(this.domainName, this.userID, this.token).then((res) => {
          if (res) {
            this.unreadCount = 0;
            this.cdr.detectChanges();
          }
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }
}
