angular.module("TaxiProApp")
    .controller("adminOptionsCtrl", function ($scope, $location) {
        $scope.createNew = function() {
            // redirect to the Create New Profile Form
            $location.url("/profiles/new")
        }
        
        $scope.viewProfiles = function() {
            // redirect to the list of all profiles
            $location.url("/profiles/list")

        }
    })