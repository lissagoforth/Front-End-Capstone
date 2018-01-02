angular.module("TaxiProApp")
    .controller("createProfileCtrl", function ($scope, $location, $routeParams, profileFactory, testFactory) {

        $scope.addStudentProfile = function () {
            const student = {
                "firstName": $scope.student.firstName,
                "lastName": $scope.student.lastName,
                "address": $scope.student.address,
                "phone": $scope.student.phone
            }

            profileFactory.add(student).then((response) => {
                profileFactory.setCurrentStudent(response.data.name)
            })

        }

        $scope.displayAdminOpt = function () {
            $location.url("/")
        }

        $scope.startCourse = function () {
            profileFactory.setCurrentStudent($routeParams.studentId)
            testFactory.getQuestions().then(() => {
                testFactory.getAnswers().then(() => {
                    testFactory.getVideos().then(() => {
                        $location.url("/startCourse")
                    })
                })
            })
        }
    })