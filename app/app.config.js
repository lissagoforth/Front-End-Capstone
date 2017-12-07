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
        // .when("/", {
        //     templateUrl: "app/employees/partials/list.html",
        //     controller: "EmployeeListCtrl",
        //     resolve: { isAuth }
        // })
        // .when("/employees/list", {
        //     templateUrl: "app/employees/partials/list.html",
        //     controller: "EmployeeListCtrl",
        //     resolve: { isAuth }
        // })
        // .when('/employees/new', {
        //     templateUrl: 'app/employees/partials/create.html',
        //     controller: 'EmployeeCreateCtrl',
        //     resolve: { isAuth }
        // })
        // .when('/employees/detail/:employeeId', {
        //     templateUrl: 'app/employees/partials/detail.html',
        //     controller: 'EmployeeDetailCtrl',
        //     resolve: { isAuth }
        // })
        .when('/signIn', {
            templateUrl: 'app/auth/partials/signIn.html',
            controller: 'AuthCtrl'
        })
        .otherwise('/signIn')
})