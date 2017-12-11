angular
    .module("TaxiProApp")
    .controller("profileDetailCtrl",
    function ($scope, $location, $routeParams, profileFactory, AuthFactory) {
        $scope.student = {}

        profileFactory.single($routeParams.studentId).then(student => {
            $scope.student = student

            $scope.addStudentNote = function () {
                const user = AuthFactory.getUser()
                const key = $routeParams.studentId
                const note = {
                    "note": $scope.student.notes,
                    "studentId": key,
                    "authId": user.uid
                }
                profileFactory.addNote(note).then(() => {
                    $scope.student.note = ""
                }).then(() => {

                    $location.url("/profiles/detail/:studentId")
                })
            }
        })

        // $scope.startCourse = () =>
    })