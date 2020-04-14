import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-no-trial',
  templateUrl: './no-trial.component.html',
  styleUrls: ['./no-trial.component.scss'],
})
export class NoTrialComponent implements OnInit {
  @Input() details: any;
  @Input() newUser: any;
  @Input() viewStatus: boolean;
  constructor(
    private router: Router,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {}

  upgrade() {
    this.router.navigate(['plans']);
  }

  cancelMemebership() {
    this.router.navigate(['cancel-membership']);
  }

  openInvoice(url) {
    // alert(url);
    // this.fileOpener.open(url, 'application/pdf');
    const browser = this.iab.create(url, '_blank');
    browser.show();
    // window.open(url, '_blank');
  }

  addDomain() {
    this.router.navigate(['add-site']);
  }

  changePlan() {
    this.router.navigate(['plans'], { replaceUrl: true });
  }
}
