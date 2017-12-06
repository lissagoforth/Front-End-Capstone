angular.module("TaxiProApp", ["ngRoute"])

const isAuth = AuthFactory => new Promise((resolve, reject) => {
    if (AuthFactory.isAuthenticated()) {
        console.log("User is authenticated, resolve route promise")
        resolve()
    } else {
        console.log("User is not authenticated, reject route promise")
        reject()
    }
})

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