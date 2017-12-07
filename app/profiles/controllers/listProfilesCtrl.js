angular.module("TaxiProApp")
.controller("listProfilesCtrl", function ($scope, $location, profileFactory) {
    $scope.profiles = []
    
    $scope.viewProfiles = function() {
        profileFactory.list().then(data => {
            $scope.profiles = data
        })

        $location.url("/profiles/list")
    }
})
