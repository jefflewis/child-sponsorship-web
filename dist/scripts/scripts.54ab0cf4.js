"use strict";angular.module("childSponsorshipWebApp",["ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","ui.router","ui.gravatar"]).config(["$stateProvider","$urlRouterProvider","$httpProvider",function(a,b,c){c.defaults.useXDomain=!0,delete c.defaults.headers.common["X-Requested-With"],a.state("home",{url:"/",templateUrl:"views/splash.html",controller:"SplashController"}).state("login",{url:"/login",templateUrl:"views/login.html",controller:"LoginController"}).state("signup",{url:"/signup",templateUrl:"views/signup.html",controller:"SignupController"}).state("children",{url:"/children",templateUrl:"views/child/index.html",controller:"ChildrenListController",resolve:{childrenResource:"Child",children:["childrenResource",function(a){return a.query()}]}}).state("viewChild",{url:"/children/:id/view",templateUrl:"views/child/view.html",controller:"ChildrenViewController"}).state("newChild",{url:"/children/new",tempalteUrl:"views/child/new.html",controller:"ChildrenCreateController"}).state("editChild",{url:"/children/:id/edit",templateUrl:"views/child/edit.html",controller:"ChildrenEditController"}).state("sponsorChild",{url:"/sponsor",templateUrl:"views/child/sponsor.html",controller:"ChildrenSponsorContoller"}).state("users",{url:"/users",templateUrl:"views/user/index.html",controller:"UsersListController",resolve:{usersResource:"User",users:["usersResource",function(a){return a.query()}]}}).state("viewUser",{url:"/users/:id/view",templateUrl:"views/user/view.html",controller:"UsersViewController"}).state("newUser",{url:"/users/new",tempalteUrl:"views/user/new.html",controller:"UsersCreateController"}).state("editUser",{url:"/users/:id/edit",templateUrl:"views/user/edit.html",controller:"UsersEditController"}).state("userChildren",{url:"/users/:id/children/view",templateUrl:"views/user/children.html",controller:"UsersChildrenController"})}]).run(["$state",function(a){a.go("home")}]),angular.module("childSponsorshipWebApp").directive("input-equals",function(){return{restrict:"A",require:"?ngModel",link:function(a,b,c,d){if(d){a.$watch(c.ngModel,function(){e()}),c.$observe("equals",function(a){e()});var e=function(){var a=d.$viewValue,b=c.equals;d.$setValidity("equals",!a||!b||a===b)}}}}}),angular.module("childSponsorshipWebApp").factory("authService",["$rootScope","$location","$q","apiService",function(a,b,c,d){var e,f=function(b,c,f){d.post(b,{email:c,password:f}).success(function(b,c,f,g){localStorage.setItem("api-token",b.token),d.get("/user").success(function(b,c,d,f){e=b,localStorage.setItem("email",e.email),localStorage.setItem("access",e.access),a.$broadcast("login.success")})}).error(function(b,c){alert("error: "+c),a.$broadcast("login.failed",error)})},g=function(){return void 0===accessRequired||null==accessRequired||0==accessRequired?!0:void 0!==localStorage.getItem("access")&&localStorage.getItem("access")>=accessRequired},h=function(){d.get("/logout"),localStorage.removeItem("email"),localStorage.removeItem("name"),localStorage.removeItem("access"),localStorage.removeItem("api-token"),a.$broadcast("logout.success")},i=function(a,b){f("/login",a,b)},j=function(b,c){f("/signup",b,c).then(function(){a.$broadcast("login.success")},function(b){a.$broadcast("login.failed",b)})},k=function(){return localStorage.getItem("email")},l=function(){return!!k()},m=function(){return localStorage.getItem("access")>5?!0:!1},n=function(){return l()?!0:c.reject("Not Authorized")},o=function(){return void 0==e&&d.get("/user").success(function(b,c,d,f){e=b,a.$broadcast("user.success")}),e};return{routeIsAccessible:g,login:i,signup:j,email:k,isLoggedIn:l,isAdmin:m,logout:h,isAuthorized:n,currentUser:o}}]),angular.module("childSponsorshipWebApp").factory("apiService",["$http",function(a){var b="child-sponsorship-web.herokuapp.com"===window.location.host?config.production.api.url:config.development.api.url,c={token:function(){return localStorage.getItem("api-token")}};return c.get=function(d,e){return a.get(b+d+"?token="+c.token(),e)},c["delete"]=function(d,e){return a["delete"](b+d+"?token="+c.token(),e)},c.post=function(d,e,f){var g={};for(var h in e)g[h]=e[h];return g.token=c.token(),a.post(b+d,g,f)},c}]),angular.module("childSponsorshipWebApp").factory("User",["$resource",function(a){var b="child-sponsorship-web.herokuapp.com"===window.location.host?config.production.api.url:config.development.api.url;return a(b+"/users/:id",{id:"@id",token:localStorage.getItem("api-token")},{update:{method:"POST"}})}]),angular.module("childSponsorshipWebApp").factory("Child",["$resource",function(a){var b="child-sponsorship-web.herokuapp.com"===window.location.host?config.production.api.url:config.development.api.url;return a(b+"/children/:id",{id:"@id",token:localStorage.getItem("api-token")},{update:{method:"POST"}})}]),angular.module("childSponsorshipWebApp").service("popupService",["$window",function(a){this.showPopup=function(b){return a.confirm(b)}}]),angular.module("childSponsorshipWebApp").controller("AdminCtrl",["$scope","authService","apiService",function(a,b,c){a.email=b.email(),c.get("/data-only-admins-can-see").success(function(b,c){a.data=b.data})}]),angular.module("childSponsorshipWebApp").controller("LogoutCtrl",["$scope","$location","authService",function(a,b,c){c.logout(),b.path("/").replace()}]),angular.module("childSponsorshipWebApp").controller("HomeCtrl",["$scope","authService","apiService",function(a,b,c){a.email=b.email(),c.get("/data-only-users-can-see").success(function(b,c){a.data=b.data})}]),angular.module("childSponsorshipWebApp").controller("LoginController",["$scope","$state","$rootElement","authService",function(a,b,c,d){a.authenticate=function(){d.login(a.email,a.password)},window.setTimeout(function(){c.find("input").checkAndTriggerAutoFillEvent()},200),a.$root.$on("login.success",function(){b.go("home")}),a.toastPosition={bottom:!0,top:!1,left:!1,right:!1},a.getToastPosition=function(){return Object.keys(a.toastPosition).filter(function(b){return a.toastPosition[b]}).join(" ")},a.showSimpleToast=function(){$mdToast.show($mdToast.simple().content("").position(a.getToastPosition()).hideDelay(0))}}]),angular.module("childSponsorshipWebApp").controller("SignupCtrl",["$scope","$rootElement","authService",function(a,b,c){a.submit=function(b,d,e){if(a.submitted=!0,d==e)c.signup(a.email,a.password);else{var f="";a.form.email.$invalid&&(f+="Invalid email address"),d!=e&&(f+=""==f?f:", ",f+="Passwords do not match"),a.error={message:f}}},a.$root.$on("signup.success",function(b,c){a.$apply(function(){$location.path("/login")})}),a.$root.$on("signup.failed",function(b,c){a.$apply(function(){a.error=c})}),window.setTimeout(function(){b.find("input").checkAndTriggerAutoFillEvent()},200)}]),angular.module("childSponsorshipWebApp").controller("SplashController",["$scope","apiService","authService",function(a,b,c){a.$on("login.success",function(){a.isLoggedIn=c.isLoggedIn(),a.user=c.currentUser()}),a.$on("user.success",function(){a.isLoggedIn=c.isLoggedIn(),a.user=c.currentUser()})}]),angular.module("childSponsorshipWebApp").controller("UsersListController",["$scope","$state","popupService","$window","User",function(a,b,c,d,e){a.users=e.query(),a.deleteUser=function(a){c.showPopup("Really delete this?")&&a.$delete(function(){$rootScope.$broadcast("user.deleted"),b.go("users")})}}]).controller("UsersViewController",["$scope","$stateParams","User",function(a,b,c){a.user=c.get({id:b.id})}]).controller("UsersCreateController",["$scope","$state","$stateParams","User",function(a,b,c,d){a.user=new d,a.addUser=function(){a.user.$save(function(){$rootScope.$broadcast("user.created"),b.go("users")})}}]).controller("UsersEditController",["$scope","$state","$stateParams","User",function(a,b,c,d){a.updateUser=function(){a.user.$save(function(){$rootScope.$broadcast("user.updated"),b.go("users")})},a.loadUser=function(){a.user=d.get({id:c.id})},a.loadUser()}]).controller("UsersChildrenController",["$scope","$state","$stateParams","User",function(a,b,c,d){a.user=d.get({id:c.id})}]),angular.module("childSponsorshipWebApp").controller("ChildrenListController",["$scope","$state","popupService","$window","Child",function(a,b,c,d,e){a.children=e.query(),a.deleteChild=function(a){c.showPopup("Really delete this?")&&a.$delete(function(){d.location.href=""})}}]).controller("ChildrenViewController",["$scope","$stateParams","Child",function(a,b,c){a.child=c.get({id:b.id})}]).controller("ChildrenCreateController",["$scope","$state","$stateParams","Child",function(a,b,c,d){a.child=new d,a.addChild=function(){a.child.$save(function(){b.go("children")})}}]).controller("ChildrenEditController",["$scope","$state","$stateParams","Child",function(a,b,c,d){a.updateChild=function(){a.child.$save(function(){b.go("children")})},a.loadChild=function(){a.child=d.get({id:c.id})},a.loadChild()}]).controller("ChildrenSponsorContoller",["$scope","$state","$stateParams","Child","apiService",function(a,b,c,d,e){e.get("/children/available").success(function(b,c,d,e){a.available=b}).error(function(a,b){alert("error: "+b),$rootScope.$broadcast("children.available.failed",error)})}]);var config=config||{};config.development={app:"child-sponsorship-web-development",api:{url:"http://localhost:5000/api/v1"}},config.production={app:"child-sponsorship-web",api:{url:"http://child-sponsorship-api.herokuapp.com/api/v1"}},function(a){function b(){var a,b;for(a=0;a<this.length;a++)b=this[a],c(b)||(d(b),i(b))}function c(a){"$$currentValue"in a||(a.$$currentValue=a.getAttribute("value"));var b=a.value,c=a.$$currentValue;return b||c?b===c:!0}function d(a){a.$$currentValue=a.value}function e(b){var c=a.jQuery||a.angular.element,d=c.prototype,e=d.val;d.val=function(a){var c=e.apply(this,arguments);return arguments.length>0&&h(this,function(c){b(c,a)}),c}}function f(a,b){function c(a){var c=a.target;b(c)}k.addEventListener(a,c,!0)}function g(a){for(;a;){if("FORM"===a.nodeName)return j(a);a=a.parentNode}return j()}function h(a,b){if(a.forEach)return a.forEach(b);var c;for(c=0;c<a.length;c++)b(a[c])}function i(b){var c=a.document,d=c.createEvent("HTMLEvents");d.initEvent("change",!0,!0),b.dispatchEvent(d)}var j=a.jQuery||a.angular.element,k=a.document.documentElement,l=j(k);f("change",d),e(d),j.prototype.checkAndTriggerAutoFillEvent=b,f("blur",function(b){a.setTimeout(function(){g(b).find("input").checkAndTriggerAutoFillEvent()},20)}),a.document.addEventListener("DOMContentLoaded",function(){h(document.getElementsByTagName("input"),d),a.setTimeout(function(){l.find("input").checkAndTriggerAutoFillEvent()},200)},!1)}(window),angular.module("childSponsorshipWebApp").directive("navbar",function(){return{templateUrl:"/views/templates/navbar.html",restrict:"E",link:function(a,b,c){},controller:["$scope","$state","authService",function(a,b,c){a.$on("$viewContentLoaded",function(){a.isLoggedIn=c.isLoggedIn(),a.isAdmin=c.isAdmin(),a.user=c.currentUser()}),a.$on("user.success",function(){a.isLoggedIn=c.isLoggedIn(),a.isAdmin=c.isAdmin(),a.user=c.currentUser()}),a.$on("login.success",function(){a.isLoggedIn=c.isLoggedIn(),a.isAdmin=c.isAdmin(),a.user=c.currentUser()}),a.$on("logout.success",function(){a.isLoggedIn=c.isLoggedIn(),a.isAdmin=c.isAdmin(),a.user=c.currentUser(),b.go("home")}),a.logout=function(){c.logout()},a.children=function(){b.go("children")},a.sponsor=function(){b.go("sponsorChild")},a.home=function(){b.go("home")},a.users=function(){b.go("users")},a.userChildren=function(){b.go("userChildren")}}]}});