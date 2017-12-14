angular
    .module("TaxiProApp")
    .controller("profileDetailCtrl",
    function ($scope, $location, $routeParams, profileFactory, AuthFactory, questionFactory) {
        $scope.student = {}

        profileFactory.single($routeParams.studentId).then(student => {
            $scope.student = student
        })

        $scope.notes = []
        profileFactory.getNotes($routeParams.studentId).then(response => {

            for (let key in response.data) {
                let note = {
                    "note": response.data[key].note,
                    "author": response.data[key].authName
                }
                $scope.notes.push(note)

            }
        })

        $scope.addStudentNote = function () {
            const user = AuthFactory.getUser()
            const key = $routeParams.studentId
            AuthFactory.getUserName(user.uid)
                .then(response => {
                    let userName = ""
                    for (let key in response.data) {
                        userName = response.data[key].userName
                    }
                    const note = {
                        "note": $scope.student.notes,
                        "studentId": key,
                        "authName": userName
                    }
                    profileFactory.addNote(note).then(() => {
                        $scope.student.note = ""
                    }).then(() => {

                        profileFactory.getNotes($routeParams.studentId).then(response => {
                            $scope.notes = []
                            for (let key in response.data) {
                                let note = {
                                    "note": response.data[key].note,
                                    "author": response.data[key].authName
                                }
                                $scope.notes.push(note)
                            }
                        })

                    })
                })
        }


        $scope.startCourse =  function () {
            $location.url("/startCourse")
            questionFactory.getQuestions()
        }
    })