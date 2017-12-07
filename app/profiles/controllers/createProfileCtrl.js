angular.module("TaxiProApp")
    .controller("createProfileCtrl", function ($scope, $location, profileFactory) {

        $scope.addStudentProfile = function () {
            const student = {
                "firstName": $scope.student.firstName,
                "lastName": $scope.student.lastName,
                "address": $scope.student.address,
                "phone": $scope.student.phone,
                "notes": $scope.student.notes
            }

            profileFactory.add(student).then(() => {
                $location.url("/")
            })
        }

        $scope.displayAdminOpt = function () {
            $location.url("/")
        }

        $scope.startCourse = function () {
            $location.url("/startCourse")
        }
    })