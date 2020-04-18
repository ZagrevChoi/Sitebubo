import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
// modules
import { CountoModule } from 'angular2-counto';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
// pipes
import { DatetimePipe } from '../pipes/datetime/datetime.pipe';
import { CamelCasePipe } from './../pipes/camelCase/camel-case.pipe';
import { SmallCasePipe } from './../pipes/smallCase/small-case.pipe';
import { FloatonePipe } from './../pipes/floatone/floatone.pipe';
import { IntparsePipe } from './../pipes/intparse/intparse.pipe';
import { NoyearPipe } from '../pipes/noyear/noyear.pipe';
import { FloattwoPipe } from '../pipes/floattwo/floattwo.pipe';
// components
import { OldFreeComponent } from './membership/old-free/old-free.component';
import { NoTrialComponent } from './membership/no-trial/no-trial.component';
import { FreeTrialComponent } from './membership/free-trial/free-trial.component';
import { FirstPayComponent } from './membership/first-pay/first-pay.component';
import { FirstFreeComponent } from './membership/first-free/first-free.component';
import { CmoreOptionsComponent } from './more/cmore-options/cmore-options.component';
import { CdomainExpireComponent } from './more/cdomain-expire/cdomain-expire.component';
import { CbrokenLinksComponent } from './more/cbroken-links/cbroken-links.component';
import { CspeedComponent } from './pagespeed/cspeed/cspeed.component';
import { CseoComponent } from './security/cseo/cseo.component';
import { CsecurityComponent } from './security/csecurity/csecurity.component';
import { CmalwareComponent } from './security/cmalware/cmalware.component';
import { CblacklistComponent } from './security/cblacklist/cblacklist.component';
import { SsecurityComponent } from './skeletons/ssecurity/ssecurity.component';
import { SdomainListComponent } from './skeletons/sdomain-list/sdomain-list.component';
import { CgoogleVisitorsComponent } from './more/cgoogle-visitors/cgoogle-visitors.component';
import { CdesktopComponent } from './pagespeed/cdesktop/cdesktop.component';
import { CmobileComponent } from './pagespeed/cmobile/cmobile.component';
import { RamComponent } from './serverMonitor/ram/ram.component';
import { CpuComponent } from './serverMonitor/cpu/cpu.component';
import { DiskComponent } from './serverMonitor/disk/disk.component';
import { OverviewComponent } from './serverMonitor/overview/overview.component';
import { NetworkComponent } from './serverMonitor/network/network.component';
import { SdiagramComponent } from './skeletons/sdiagram/sdiagram.component';
import { ScardComponent } from './skeletons/scard/scard.component';
import { SthreechartsComponent } from './skeletons/sthreecharts/sthreecharts.component';
import { SdatatableComponent } from './skeletons/sdatatable/sdatatable.component';
import { SubscriptionPlanComponent } from './subscriptions/subscription-plan/subscription-plan.component';

@NgModule({
    declarations: [
        SdomainListComponent,
        SsecurityComponent,
        CblacklistComponent,
        CmalwareComponent,
        CsecurityComponent,
        CseoComponent,
        CspeedComponent,
        CbrokenLinksComponent,
        CdomainExpireComponent,
        CmoreOptionsComponent,
        FirstFreeComponent,
        FirstPayComponent,
        FreeTrialComponent,
        NoTrialComponent,
        OldFreeComponent,
        CgoogleVisitorsComponent,
        CdesktopComponent,
        CmobileComponent,
        RamComponent,
        CpuComponent,
        DiskComponent,
        OverviewComponent,
        NetworkComponent,
        SdiagramComponent,
        SthreechartsComponent,
        ScardComponent,
        SdatatableComponent,
        SubscriptionPlanComponent,
        CamelCasePipe,
        SmallCasePipe,
        FloatonePipe,
        IntparsePipe,
        DatetimePipe,
        NoyearPipe,
        FloattwoPipe
    ],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        FormsModule,
        NgCircleProgressModule.forRoot({
            radius: 70,
            outerStrokeWidth: 10,
            innerStrokeWidth: 5,
            showTitle: false,
            showSubtitle: false,
            showUnits: false,
            showBackground: false,
            startFromZero: false
        }),
        Ng2GoogleChartsModule,
        MatExpansionModule,
        CountoModule
    ],
    providers: [
        InAppPurchase2,
        { provide: 'googleChartsVersion', useValue: '46' },
        { provide: 'mapsApiKey', useValue: 'AIzaSyCHjrW83Zc1vwk4mzxztYbvk2by0PQZoIE' }
    ],
    exports: [
        CamelCasePipe,
        SmallCasePipe,
        FloatonePipe,
        IntparsePipe,
        DatetimePipe,
        NoyearPipe,
        FloattwoPipe,
        // componenets
        SdomainListComponent,
        SsecurityComponent,
        CblacklistComponent,
        CmalwareComponent,
        CsecurityComponent,
        CseoComponent,
        CspeedComponent,
        CbrokenLinksComponent,
        CdomainExpireComponent,
        CmoreOptionsComponent,
        FirstFreeComponent,
        FirstPayComponent,
        FreeTrialComponent,
        NoTrialComponent,
        OldFreeComponent,
        CgoogleVisitorsComponent,
        CdesktopComponent,
        CmobileComponent,
        RamComponent,
        CpuComponent,
        DiskComponent,
        OverviewComponent,
        NetworkComponent,
        SdiagramComponent,
        ScardComponent,
        SthreechartsComponent,
        SdatatableComponent,
        SubscriptionPlanComponent
    ]
})
export class ComponentsModule {}
