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
            // debugger
            if ($scope.student.notes === undefined) {
                alert("Note field blank. Please add a note before saving.")
            } else {
                const user = AuthFactory.getUser()
                console.log(user)
                const key = $routeParams.studentId
                AuthFactory.getUserName(user.uid)
                .then(response => {
                    // console.log(response)
                    let userName = ""
                    for (let userKey in response.data) {
                        // console.log(userKey)
                        let fbID = response.data[userKey].firebaseId
                        // console.log(obj)
                        if (fbID === user.uid) {
                            userName = response.data[userKey].userName
                        }
                    }
                    // console.log(userName)
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
                            for (let studentKey in response.data) {
                                let note = {
                                    "note": response.data[studentKey].note,
                                    "author": response.data[studentKey].authName
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
            console.log(response)
            const user = AuthFactory.getUser()
            let userName = ""
            for (let key in response.data) {
                let fbID = response.data[key].firebaseId
                if (fbID === user.uid) {
                    userName = response.data[key].userName
                }
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