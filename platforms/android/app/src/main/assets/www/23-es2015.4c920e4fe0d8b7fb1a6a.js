(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{vPpa:function(n,e,l){"use strict";l.r(e);var t=l("8Y7J");class o{}var i=l("pMnS"),c=l("oBZk"),u=l("ZZ/e"),a=l("xehS"),r=l("nBjy");class s{constructor(n,e,l,t){this.activatedRoute=n,this.router=e,this.ionService=l,this.authAPI=t,this.imgsrc="/assets/imgs/checkmark.png",this.initData()}ngOnInit(){}initData(){this.activatedRoute.queryParams.subscribe(n=>{console.log(n),this.navparams=n,n.id?(this.ionService.showLoading(),this.afterVerified="showdiv",this.beforeVerified="hidediv",this.authAPI.validateEmail(n.id,n.code).subscribe(n=>{this.ionService.closeLoading(),this.message=1===n.RESPONSECODE?"Your email is verified successfully <br/> Please click on Login to proceed further":"Your email verification is unsuccessful"},n=>{console.log(n),this.ionService.closeLoading()},()=>console.log(""))):(this.beforeVerified="showdiv",this.afterVerified="hidediv",n.userID&&(this.userID=parseInt(n.userID,10),this.token=n.token))})}login(){this.router.navigate(["login"])}resendVerificationEmail(){this.ionService.showLoading(),this.authAPI.resendEmail(this.userID).subscribe(n=>{this.ionService.closeLoading(),this.ionService.presentToast(1===n.RESPONSECODE?"Resent verification email successfully":"Something might be wrong with server api")},n=>{this.ionService.closeLoading(),this.ionService.presentToast("Failed due to server api problem. Sorry")})}}var d=l("iInd"),g=t["\u0275crt"]({encapsulation:0,styles:[[".showdiv[_ngcontent-%COMP%]{display:block;text-align:center}.hidediv[_ngcontent-%COMP%]{display:none}ion-content[_ngcontent-%COMP%]   div.content[_ngcontent-%COMP%]{width:100%}ion-content[_ngcontent-%COMP%]   div.content[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{background-image:url(login_header.8905e106ef689c9313c0.png)!important;background-size:100% 100%;background-repeat:no-repeat!important;width:100%;min-height:30vh;display:flex;align-content:center!important;align-items:center}ion-content[_ngcontent-%COMP%]   div.content[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:77%;padding-bottom:2%;padding-right:2%;display:block;margin:auto}ion-content[_ngcontent-%COMP%]   div.content[_ngcontent-%COMP%]   .verify-content[_ngcontent-%COMP%]{background-image:url(login_footer.b7ad487681981e97d954.png)!important;background-size:contain;background-repeat:no-repeat!important;background-position-y:bottom;display:flex;flex-direction:column;justify-content:flex-start;min-height:70vh;padding-left:5%;padding-right:5%;padding-bottom:15px}ion-content[_ngcontent-%COMP%]   div.content[_ngcontent-%COMP%]   .verify-content[_ngcontent-%COMP%]   .pageName[_ngcontent-%COMP%]{margin-top:15px;display:block;text-align:center;font-size:24px;padding-left:5%}ion-content[_ngcontent-%COMP%]   div.content[_ngcontent-%COMP%]   .verify-content[_ngcontent-%COMP%]   .header[_ngcontent-%COMP%]{padding-top:20px;display:block;text-align:center;font-size:20px}ion-content[_ngcontent-%COMP%]   div.content[_ngcontent-%COMP%]   .verify-content[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%]{padding-top:20px;display:block;text-align:center;font-size:16px}ion-content[_ngcontent-%COMP%]   div.content[_ngcontent-%COMP%]   .verify-content[_ngcontent-%COMP%]   ion-button.submit[_ngcontent-%COMP%]{width:84%;height:53px;font-size:20px;margin:20px auto 30px;display:block;--border-radius:30px;text-transform:none}ion-content[_ngcontent-%COMP%]   div.content[_ngcontent-%COMP%]   .verify-content[_ngcontent-%COMP%]   ion-label.resend[_ngcontent-%COMP%]{text-align:center;font-size:16px}"]],data:{}});function p(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,28,"ion-content",[],null,null,null,c.bb,c.l)),t["\u0275did"](1,49152,null,0,u.w,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275eld"](2,0,null,0,26,"div",[["class","content"]],null,null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,1,"div",[["class","logo"],["id","logo"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,0,"img",[["alt",""],["src","assets/imgs/sub_logo.svg"]],null,null,null,null,null)),(n()(),t["\u0275eld"](5,0,null,null,23,"div",[["class","verify-content"]],null,null,null,null,null)),(n()(),t["\u0275eld"](6,0,null,null,2,"ion-label",[["class","pageName"]],null,null,null,c.mb,c.w)),t["\u0275did"](7,49152,null,0,u.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275ted"](-1,0,["Verify Your Email"])),(n()(),t["\u0275eld"](9,0,null,null,7,"div",[],[[8,"className",0]],null,null,null,null)),(n()(),t["\u0275eld"](10,0,null,null,6,"ion-label",[["class","description"]],null,null,null,c.mb,c.w)),t["\u0275did"](11,49152,null,0,u.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275ted"](-1,0,["We have sent an email to verify your "])),(n()(),t["\u0275eld"](13,0,null,0,0,"br",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,0,[" email address to complete the signup "])),(n()(),t["\u0275eld"](15,0,null,0,0,"br",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,0,["process "])),(n()(),t["\u0275eld"](17,0,null,null,3,"div",[],[[8,"className",0]],null,null,null,null)),(n()(),t["\u0275eld"](18,0,null,null,2,"ion-label",[["class","description"]],null,null,null,c.mb,c.w)),t["\u0275did"](19,49152,null,0,u.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275ted"](20,0,["",""])),(n()(),t["\u0275eld"](21,0,null,null,2,"ion-button",[["class","red submit"]],null,[[null,"click"]],(function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.login()&&t),t}),c.S,c.c)),t["\u0275did"](22,49152,null,0,u.m,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275ted"](-1,0,["Log In"])),(n()(),t["\u0275eld"](24,0,null,null,4,"ion-label",[["class","resend"]],[[8,"className",0]],null,null,c.mb,c.w)),t["\u0275did"](25,49152,null,0,u.P,[t.ChangeDetectorRef,t.ElementRef,t.NgZone],null,null),(n()(),t["\u0275ted"](-1,0,['Didn"t you receive email? '])),(n()(),t["\u0275eld"](27,0,null,0,1,"b",[],null,[[null,"click"]],(function(n,e,l){var t=!0;return"click"===e&&(t=!1!==n.component.resendVerificationEmail()&&t),t}),null,null)),(n()(),t["\u0275ted"](-1,null,["Resend"]))],null,(function(n,e){var l=e.component;n(e,9,0,l.beforeVerified),n(e,17,0,l.afterVerified),n(e,20,0,l.message),n(e,24,0,l.beforeVerified)}))}function m(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-verifyemail",[],null,null,null,p,g)),t["\u0275did"](1,114688,null,0,s,[d.a,d.m,a.a,r.a],null,null)],(function(n,e){n(e,1,0)}),null)}var f=t["\u0275ccf"]("app-verifyemail",s,m,{},{},[]),v=l("SVse"),h=l("s7LF");class b{}l.d(e,"VerifyemailPageModuleNgFactory",(function(){return C}));var C=t["\u0275cmf"](o,[],(function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,f]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,v.m,v.l,[t.LOCALE_ID,[2,v.x]]),t["\u0275mpd"](4608,h.q,h.q,[]),t["\u0275mpd"](4608,u.c,u.c,[t.NgZone,t.ApplicationRef]),t["\u0275mpd"](4608,u.Kb,u.Kb,[u.c,t.ComponentFactoryResolver,t.Injector]),t["\u0275mpd"](4608,u.Ob,u.Ob,[u.c,t.ComponentFactoryResolver,t.Injector]),t["\u0275mpd"](1073742336,v.b,v.b,[]),t["\u0275mpd"](1073742336,h.p,h.p,[]),t["\u0275mpd"](1073742336,h.f,h.f,[]),t["\u0275mpd"](1073742336,u.Gb,u.Gb,[]),t["\u0275mpd"](1073742336,d.q,d.q,[[2,d.v],[2,d.m]]),t["\u0275mpd"](1073742336,b,b,[]),t["\u0275mpd"](1073742336,o,o,[]),t["\u0275mpd"](1024,d.k,(function(){return[[{path:"",component:s}]]}),[])])}))}}]);