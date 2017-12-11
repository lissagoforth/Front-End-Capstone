angular.module("TaxiProApp")
    .factory("AuthFactory", function ($http, $timeout, $location, $route) {
        let currentUserData = null

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                currentUserData = user

                // if ($location.url() !== "/getStarted") {
                //     $timeout(function () {
                //         $location.url("/getStarted")
                //     }, 100)
                // } else {
                $route.reload()
                // }

            } else {
                currentUserData = null
                console.log("User is not authenticated")
                $timeout(function () {
                    $location.url("/signIn")
                }, 100)
            }
        })

        return Object.create(null, {
            isAuthenticated: {
                value: () => {
                    const user = currentUserData
                    return user ? true : false
                }
            },
            getUser: {
                value: () => currentUserData
            },
            logout: {
                value: () => firebase.auth().signOut()
            },
            authenticate: {
                value: credentials =>
                firebase.auth()
                .signInWithEmailAndPassword(
                    credentials.email,
                    credentials.password
                )
            },
            addUser: {
                value: function (user, userName) { //add authorized user to firebase DB
                console.log(user)
                    return $http({
                        method: "POST",
                        url: "https://front-end-capstone-6732d.firebaseio.com/authUsers/.json",
                        data: {
                            "userEmail": user.email,
                            "userName": userName,
                            "firebaseId": user.uid
                        }
                    })
                }
            },
            getUserName: {
                value: function (userId) {
                    return $http({
                        method: "GET",
                        url: `https://front-end-capstone-6732d.firebaseio.com/authUsers/.json?orderBy="firebaseId"&equalTo"${userId}"`
                    })
                }
            },
            registerWithEmail: {
                value: user =>
                    firebase.auth()
                        .createUserWithEmailAndPassword(
                        user.email,
                        user.password
                        )
            }
        })
    })