angular.module("TaxiProApp")
    .controller("createProfileCtrl", function ($scope, $location, profileFactory) {

        $scope.addStudentProfile = function () {
            const student = {
                "firstName": $scope.student.firstName,
                "lastName": $scope.student.lastName,
                "address": $scope.student.address,
                "phone": $scope.student.phone
            }

            profileFactory.add(student)

        }

        $scope.displayAdminOpt = function () {
            $location.url("/")
        }

        $scope.startCourse = function () {
            $location.url("/startCourse")
        }
    })