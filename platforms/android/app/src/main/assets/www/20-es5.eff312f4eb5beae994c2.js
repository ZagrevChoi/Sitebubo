function _classCallCheck(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(n,e){for(var t=0;t<e.length;t++){var l=e[t];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(n,l.key,l)}}function _createClass(n,e,t){return e&&_defineProperties(n.prototype,e),t&&_defineProperties(n,t),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"5miV":function(n,e,t){"use strict";t.d(e,"a",(function(){return d}));var l=t("mrSG"),o=t("PXR4"),i=t("HF2u"),r=t("xehS"),c=t("XhpJ"),a=t("8Y7J"),u=t("sZkV"),s=t("xgBC"),d=function(){var n=function(){function n(e,t,l,o,i,r){_classCallCheck(this,n),this.actionCtrl=e,this.modalCtrl=t,this.generalService=l,this.ionService=o,this.userAPI=i,this.storage=r}return _createClass(n,[{key:"deleteAccount",value:function(){return l.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){var e,t=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.actionCtrl.create({header:"Are you sure to delete your account ?",buttons:[{text:"Yes",icon:"checkmark",handler:function(){t.submitDeletion().then((function(n){n&&t.allDone()})).catch((function(n){}))}},{text:"No",icon:"close",role:"cancel"}]});case 2:return e=n.sent,n.next=5,e.present();case 5:case"end":return n.stop()}}),n,this)})))}},{key:"submitDeletion",value:function(){var n=this;return new Promise((function(e,t){n.storage.get("userInfo").then((function(l){n.ionService.showLoading(),n.userAPI.deleteAccount(l.id,l.token).subscribe((function(l){n.ionService.closeLoading(),1===l.RESPONSECODE?e(!0):(n.ionService.presentToast(l.RESPONSE),t(!1))}),(function(e){n.ionService.presentToast("Account Deletion Failed due to the server"),t(!1)}))}))}))}},{key:"allDone",value:function(){return l.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){var e,t=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.modalCtrl.create({component:o.a});case 2:return(e=n.sent).onDidDismiss().then((function(){t.generalService.logOut()})),n.next=6,e.present();case 6:return n.abrupt("return",n.sent);case 7:case"end":return n.stop()}}),n,this)})))}}]),n}();return n.ngInjectableDef=a["\u0275\u0275defineInjectable"]({factory:function(){return new n(a["\u0275\u0275inject"](u.a),a["\u0275\u0275inject"](u.Fb),a["\u0275\u0275inject"](i.a),a["\u0275\u0275inject"](r.a),a["\u0275\u0275inject"](c.a),a["\u0275\u0275inject"](s.b))},token:n,providedIn:"root"}),n}()},GeNc:function(n,e,t){"use strict";t.r(e);var l=t("8Y7J"),o=function n(){_classCallCheck(this,n)},i=t("pMnS"),r=t("MKJQ"),c=t("sZkV"),a=t("mrSG"),u=t("10do"),s=t("HF2u"),d=t("5miV"),g=t("Tddt"),f=t("xehS"),p=function(){function n(e,t,l,o,i,r,c,a){_classCallCheck(this,n),this.navCtrl=e,this.storage=t,this.subscriptionAPI=l,this.modalCtrl=o,this.ionService=i,this.generalService=r,this.router=c,this.memberService=a}return _createClass(n,[{key:"ngOnInit",value:function(){}},{key:"ionViewWillEnter",value:function(){this.initData()}},{key:"initData",value:function(){var n=this;this.storage.get("planInfo").then((function(e){console.log(e),e&&(n.daysLeft=e.days_left,n.currentPlanName=e.name)})),this.storage.get("userInfo").then((function(e){n.userID=e.id,n.token=e.token}))}},{key:"goback",value:function(){this.navCtrl.back()}},{key:"activateFreePlan",value:function(n){var e=this;this.ionService.showLoading(),this.subscriptionAPI.activatefreesubscription(1,this.userID,this.token).subscribe((function(t){console.log(t),1===t.RESPONSECODE?e.downgradeDomains(n).then((function(n){console.log(n),e.ionService.closeLoading(),n?e.generalService.updatePlanInfo(e.userID,e.token).then((function(n){console.log(n),n&&e.router.navigate(["view-membership"],{replaceUrl:!0})})):(e.ionService.closeLoading(),e.ionService.presentToast("Downgrading plan failed."))})).catch((function(n){e.ionService.closeLoading(),e.ionService.presentToast("Server API error while downgrading with domains.")})):(e.ionService.closeLoading(),e.ionService.presentToast(t.RESPONSE))}),(function(n){e.ionService.closeLoading(),e.ionService.presentToast("Server API Problem while activating free plan")}))}},{key:"deleteAccount",value:function(){this.memberService.deleteAccount()}},{key:"checkExDomainList",value:function(){return a.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){var e,t=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.modalCtrl.create({component:u.a,componentProps:{selectedPlan:"Starter",currentPlan:this.currentPlanName,allowedCnt:1,reason:!0}});case 2:return(e=n.sent).onDidDismiss().then((function(n){"success"===n.role&&(console.log(n.data),t.activateFreePlan(n.data))})),n.next=6,e.present();case 6:return n.abrupt("return",n.sent);case 7:case"end":return n.stop()}}),n,this)})))}},{key:"downgradeDomains",value:function(n){var e=this;return new Promise((function(t,l){e.ionService.showLoading(),e.subscriptionAPI.downgradePlan(n.domains,e.userID,e.token,n.feedback).subscribe((function(n){e.ionService.closeLoading(),console.log(n),1===n.RESPONSECODE?t(!0):(e.ionService.presentToast(n.RESPONSE),l(!1))}),(function(n){e.ionService.closeLoading(),e.ionService.presentToast("Somthing might be wrong"),l(!1)}))}))}}]),n}(),m=t("xgBC"),h=t("iInd"),b=l["\u0275crt"]({encapsulation:0,styles:[["ion-header[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%]{text-align:center;font-size:17px}ion-header[_ngcontent-%COMP%]   ion-button.back[_ngcontent-%COMP%]{position:absolute;left:0}ion-content[_ngcontent-%COMP%]   .extra[_ngcontent-%COMP%]{background-color:#dcdcdc;border-radius:5px}ion-content[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{display:block;text-align:center}ion-content[_ngcontent-%COMP%]   ion-label.sorry[_ngcontent-%COMP%]{font-size:22px;margin-bottom:20px;font-weight:500}ion-content[_ngcontent-%COMP%]   ion-label.days-left[_ngcontent-%COMP%]{padding:10px 30px;font-size:16px}ion-content[_ngcontent-%COMP%]   ion-label.expire[_ngcontent-%COMP%]{margin-top:40px;margin-bottom:25px;font-weight:700;font-size:14px}ion-content[_ngcontent-%COMP%]   ion-label.revert[_ngcontent-%COMP%]{display:block;text-align:center;padding:0 42px;color:#484545}ion-content[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]{display:-webkit-box;display:flex;align-content:center;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;padding:40px 10%}ion-content[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]   .each[_ngcontent-%COMP%]{width:42%;height:1.5px;background-color:#9b9898}ion-content[_ngcontent-%COMP%]   .line[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{font-size:14px;padding:0 3%;color:#484849}ion-content[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{display:block;width:82%;height:53px;font-size:16px;margin:auto;--border-radius:30px;text-transform:none}ion-content[_ngcontent-%COMP%]   ion-button.to-free[_ngcontent-%COMP%]{margin-top:30px}ion-content[_ngcontent-%COMP%]   ion-button.delete-account[_ngcontent-%COMP%]{margin-bottom:30px}"]],data:{}});function v(n){return l["\u0275vid"](0,[(n()(),l["\u0275eld"](0,0,null,null,12,"ion-header",[["class","small-header"]],null,null,null,r.fb,r.p)),l["\u0275did"](1,49152,null,0,c.B,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],null,null),(n()(),l["\u0275eld"](2,0,null,0,10,"ion-toolbar",[["class","toolbar"]],null,null,null,r.Fb,r.P)),l["\u0275did"](3,49152,null,0,c.zb,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],null,null),(n()(),l["\u0275eld"](4,0,null,0,8,"ion-buttons",[],null,null,null,r.T,r.d)),l["\u0275did"](5,49152,null,0,c.l,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],null,null),(n()(),l["\u0275eld"](6,0,null,0,2,"ion-title",[],null,null,null,r.Db,r.N)),l["\u0275did"](7,49152,null,0,c.xb,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],null,null),(n()(),l["\u0275ted"](-1,0,["Cancel Membership"])),(n()(),l["\u0275eld"](9,0,null,0,3,"ion-button",[["class","back"],["mode","ios"]],null,[[null,"click"]],(function(n,e,t){var l=!0;return"click"===e&&(l=!1!==n.component.goback()&&l),l}),r.S,r.c)),l["\u0275did"](10,49152,null,0,c.k,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],{mode:[0,"mode"]},null),(n()(),l["\u0275eld"](11,0,null,0,1,"ion-icon",[["class","back"],["mode","ios"],["name","arrow-back"],["slot","icon-only"]],null,null,null,r.gb,r.q)),l["\u0275did"](12,49152,null,0,c.C,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],{mode:[0,"mode"],name:[1,"name"]},null),(n()(),l["\u0275eld"](13,0,null,null,29,"ion-content",[["padding",""]],null,null,null,r.bb,r.l)),l["\u0275did"](14,49152,null,0,c.u,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],null,null),(n()(),l["\u0275eld"](15,0,null,0,2,"ion-label",[["class","sorry"]],null,null,null,r.mb,r.w)),l["\u0275did"](16,49152,null,0,c.N,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],null,null),(n()(),l["\u0275ted"](-1,0,["SORRY TO SEE YOU GO!"])),(n()(),l["\u0275eld"](18,0,null,0,6,"div",[["class","extra"]],null,null,null,null,null)),(n()(),l["\u0275eld"](19,0,null,null,5,"ion-label",[["class","days-left"]],null,null,null,r.mb,r.w)),l["\u0275did"](20,49152,null,0,c.N,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],null,null),(n()(),l["\u0275ted"](-1,0,["You still have "])),(n()(),l["\u0275eld"](22,0,null,0,1,"b",[],null,null,null,null,null)),(n()(),l["\u0275ted"](23,null,[""," days"])),(n()(),l["\u0275ted"](-1,0,[" left of your membership."])),(n()(),l["\u0275eld"](25,0,null,0,2,"ion-label",[["class","expire"]],null,null,null,r.mb,r.w)),l["\u0275did"](26,49152,null,0,c.N,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],null,null),(n()(),l["\u0275ted"](-1,0,["ONCE MEMBERSHIP EXPIRES..."])),(n()(),l["\u0275eld"](28,0,null,0,2,"ion-label",[["class","revert"]],null,null,null,r.mb,r.w)),l["\u0275did"](29,49152,null,0,c.N,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],null,null),(n()(),l["\u0275ted"](-1,0,["You can revert to the free service where you get to keep a single user and domain active."])),(n()(),l["\u0275eld"](31,0,null,0,2,"ion-button",[["class","red to-free"]],null,[[null,"click"]],(function(n,e,t){var l=!0;return"click"===e&&(l=!1!==n.component.checkExDomainList()&&l),l}),r.S,r.c)),l["\u0275did"](32,49152,null,0,c.k,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],null,null),(n()(),l["\u0275ted"](-1,0,[" Revert to free service "])),(n()(),l["\u0275eld"](34,0,null,0,5,"div",[["class","line"]],null,null,null,null,null)),(n()(),l["\u0275eld"](35,0,null,null,0,"div",[["class","each left"]],null,null,null,null,null)),(n()(),l["\u0275eld"](36,0,null,null,2,"ion-label",[],null,null,null,r.mb,r.w)),l["\u0275did"](37,49152,null,0,c.N,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],null,null),(n()(),l["\u0275ted"](-1,0,["OR"])),(n()(),l["\u0275eld"](39,0,null,null,0,"div",[["class","each right"]],null,null,null,null,null)),(n()(),l["\u0275eld"](40,0,null,0,2,"ion-button",[["class","gray"]],null,[[null,"click"]],(function(n,e,t){var l=!0;return"click"===e&&(l=!1!==n.component.deleteAccount()&&l),l}),r.S,r.c)),l["\u0275did"](41,49152,null,0,c.k,[l.ChangeDetectorRef,l.ElementRef,l.NgZone],null,null),(n()(),l["\u0275ted"](-1,0,[" Delete my account "]))],(function(n,e){n(e,10,0,"ios"),n(e,12,0,"ios","arrow-back")}),(function(n,e){n(e,23,0,e.component.daysLeft)}))}var C=l["\u0275ccf"]("app-cancel-membership",p,(function(n){return l["\u0275vid"](0,[(n()(),l["\u0275eld"](0,0,null,null,1,"app-cancel-membership",[],null,null,null,v,b)),l["\u0275did"](1,114688,null,0,p,[c.Gb,m.b,g.a,c.Fb,f.a,s.a,h.m,d.a],null,null)],(function(n,e){n(e,1,0)}),null)}),{},{},[]),k=t("SVse"),P=t("s7LF"),S=function n(){_classCallCheck(this,n)};t.d(e,"CancelMembershipPageModuleNgFactory",(function(){return R}));var R=l["\u0275cmf"](o,[],(function(n){return l["\u0275mod"]([l["\u0275mpd"](512,l.ComponentFactoryResolver,l["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,C]],[3,l.ComponentFactoryResolver],l.NgModuleRef]),l["\u0275mpd"](4608,k.m,k.l,[l.LOCALE_ID,[2,k.x]]),l["\u0275mpd"](4608,P.q,P.q,[]),l["\u0275mpd"](4608,c.c,c.c,[l.NgZone,l.ApplicationRef]),l["\u0275mpd"](4608,c.Fb,c.Fb,[c.c,l.ComponentFactoryResolver,l.Injector]),l["\u0275mpd"](4608,c.Jb,c.Jb,[c.c,l.ComponentFactoryResolver,l.Injector]),l["\u0275mpd"](1073742336,k.b,k.b,[]),l["\u0275mpd"](1073742336,P.p,P.p,[]),l["\u0275mpd"](1073742336,P.f,P.f,[]),l["\u0275mpd"](1073742336,c.Bb,c.Bb,[]),l["\u0275mpd"](1073742336,h.q,h.q,[[2,h.v],[2,h.m]]),l["\u0275mpd"](1073742336,S,S,[]),l["\u0275mpd"](1073742336,o,o,[]),l["\u0275mpd"](1024,h.k,(function(){return[[{path:"",component:p}]]}),[])])}))}}]);