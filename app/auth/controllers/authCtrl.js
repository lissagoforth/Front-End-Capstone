angular.module("TaxiProApp")
    .controller("AuthCtrl", function ($scope, $location, AuthFactory) {
        $scope.auth = {}

        $scope.logoutUser = function () {
            //log out user and redirect to signin page
            AuthFactory.logout()
            $location.url("/signIn")
        }

        $scope.logIn = function () {
            // authenticate user, log them in, direct them to the adminOptions page (create new or view profiles)
            AuthFactory.authenticate($scope.auth).then(function (didLogin) {
                $scope.login = {}
                addUser()
            })
        }

        $scope.newUser = function (registerNewUser) {
            let userPassword = $scope.auth.password
            //verify password has required string to be authenticated
            if (userPassword.match("taxipro")) {
                AuthFactory.registerWithEmail(registerNewUser).then(function (didRegister) {
                    $scope.logIn()
                })
            } else {
                //if password does meet requirements show alert message
                alert("Password rejected. Cannot be authorized")
            }
        }

        function addUser() {
            let user = AuthFactory.getUser()
            console.log("addUser function: ", user)
            //prompt for first and last name of user
            let userName = prompt("Please enter your name", "Example: John Doe")
            //add authorized user to firebase db
            AuthFactory.addUser(user, userName)

            $location.url("/")
        }
    })