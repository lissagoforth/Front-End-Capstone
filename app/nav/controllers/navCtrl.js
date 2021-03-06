angular.module("TaxiProApp").controller("NavCtrl",
function ($scope, $location, AuthFactory) {
    /*
    Just a pass-through method to the AuthFactory method of the
    same name.
    */
    $scope.isAuthenticated = () => AuthFactory.isAuthenticated();

    /*
    Unauthenticate the client.
    */
    $scope.logout = () => AuthFactory.logout();

}
)