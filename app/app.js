angular.module("TaxiProApp", ["ngRoute", "ngEmbed", "ngMaterial"])

const isAuth = AuthFactory => new Promise((resolve, reject) => {
    if (AuthFactory.isAuthenticated()) {
        // console.log("User is authenticated, resolve route promise")
        resolve()
    } else {
        // console.log("User is not authenticated, reject route promise")
        reject()
    }
})

angular.module("TaxiProApp").config(function ($routeProvider) {
    /**
     * Configure all Angular application routes here
     */
    $routeProvider
        .when("/", {
            templateUrl: "app/admin_options/partials/adminOptions.html",
            controller: "adminOptionsCtrl",
            resolve: { isAuth }
        })
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
        .when('/profiles/detail/:studentId', {
            templateUrl: 'app/profiles/partials/detail.html',
            controller: 'profileDetailCtrl',
            resolve: { isAuth }
        })
        .when('/signIn', {
            templateUrl: 'app/auth/partials/signIn.html',
            controller: 'AuthCtrl'
        })
        .when('/startCourse', {
            templateUrl: 'app/course/test/partials/test.html',
            controller: 'testCtrl'
        })
        .otherwise('/signIn')
})

angular.module("TaxiProApp").run(function (FIREBASE_CONFIG) {
    firebase.initializeApp(FIREBASE_CONFIG)
})