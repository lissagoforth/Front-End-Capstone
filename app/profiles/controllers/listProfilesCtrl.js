angular.module("TaxiProApp")
    .controller("listProfilesCtrl", function ($scope, $location, profileFactory, $timeout) {

        $scope.profiles = []

        profileFactory.list().then(data => {
            console.log(data)
            $timeout()
            
            $scope.profiles = data
        })

        $location.url("/profiles/list")
    })

