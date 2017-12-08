angular.module("TaxiProApp")
    .controller("AuthCtrl", function ($scope, $location, AuthFactory) {
        $scope.auth = {}

        $scope.logoutUser = function () {
            AuthFactory.logout()
            $location.url("/signIn")
        }

        $scope.logIn = function () {
            AuthFactory.authenticate($scope.auth).then(function (didLogin) {
                $scope.login = {}
                $location.url("/")
            })
        }

        $scope.newUser = function (registerNewUser) {
            let userPassword = $scope.auth.password
            if (userPassword.match("taxipro")) {
                AuthFactory.registerWithEmail(registerNewUser).then(function (didRegister) {
                    $scope.logIn(registerNewUser)
                })
            } else {
                alert("Password rejected. Cannot be authorized")
            }
            $location.url("/")
        }

        $scope.addUser = function (user) {
            AuthFactory.addUser(user)
            
        }
    })