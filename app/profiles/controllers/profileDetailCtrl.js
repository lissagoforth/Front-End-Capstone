angular
    .module("TaxiProApp")
    .controller("profileDetailCtrl",
    function ($scope, $location, $routeParams, profileFactory, AuthFactory, testFactory) {
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
            if ($scope.student.notes === undefined) {
                alert("Note field blank. Please add a note before saving.")
            } else {
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
        }


        $scope.courseResults = []
        profileFactory.getCourseResults($routeParams.studentId).then(response => {
            for (let key in response.data) {
                let courseResult = {
                    "numberCorrect": response.data[key].numberCorrect,
                    "dateTaken": response.data[key].date,
                    "admin": response.data[key].admin
                }
                $scope.courseResults.push(courseResult)
            }
        })


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