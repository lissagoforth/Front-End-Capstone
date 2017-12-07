angular.module("TaxiProApp").constant("FIREBASE_CONFIG", {
    apiKey: "AIzaSyBM6xyujUTMLBFHdx3snkm-r0KZE-wRuAQ",
    authDomain: "front-end-capstone-6732d.firebaseapp.com",
    databaseURL: "https://front-end-capstone-6732d.firebaseio.com",
    storageBucket: "front-end-capstone-6732d.appspot.com",
    messagingSenderId: "477212534154"
})

// angular.module("TaxiProApp").run(function (FIREBASE_CONFIG) {
//     firebase.initializeApp(FIREBASE_CONFIG)
// })

angular.module("TaxiProApp").config(function ($routeProvider) {
    /**
     * Configure all Angular application routes here
     */
    $routeProvider
        .when("/profiles/list", {
            templateUrl: "app/profiles/partials/list.html",
            controller: "listProfilesCtrl",
            resolve: { isAuth }
        })
        .when("/profiles/new", {
            templateUrl: "app/profiles/partials/create.html",
            controller: "createProfileCtrl",
            resolve: { isAuth }
        })
        .when('/profiles/detail/:profileId', {
            templateUrl: 'app/profiles/partials/detail.html',
            controller: 'profileDetailCtrl',
            resolve: { isAuth }
        })
        .when('/signIn', {
            templateUrl: 'app/auth/partials/signIn.html',
            controller: 'AuthCtrl'
        })
        .otherwise('/signIn')
})