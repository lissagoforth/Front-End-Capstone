angular.module("TaxiProApp")
    .controller("adminOptionsCtrl", function ($scope, $location) {
        $scope.createNew = function() {
            $location.url("/profiles/new")
        }
        
        $scope.viewProfiles = function() {
            $location.url("/profiles/list")

        }
    })