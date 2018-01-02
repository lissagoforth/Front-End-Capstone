angular
    .module("TaxiProApp")
    .controller("testCtrl",
    function ($scope, $location, testFactory, profileFactory, AuthFactory) {
        // get all videos, questions and answers from testFactory
        videos = testFactory.VideosCache
        questions = testFactory.QuestionsCache
        answers = testFactory.AnswersCache
        currentStudentKey = profileFactory.getCurrentStudent()
        $scope.currentStudentKey = currentStudentKey
        currentStudent = profileFactory.single(currentStudentKey).then((student) => {
            $scope.student = student
        })
        // user = authFactory.getUser
      
        $scope.optionSelected = null

        //visibility controls
        $scope.welcome = true
        $scope.vid = false
        $scope.quizSet = false
        $scope.thatsWrong = false
        $scope.thatsRight = false
        $scope.advance = false
        $scope.directToTest = false
        $scope.nextVideo = false
        $scope.startTest = false
        $scope.beginTest = false
        $scope.testSet = false
        $scope.testOneNext = false
        $scope.testTwoNext = false
        $scope.testOne = false
        $scope.testTwo = false
        $scope.finishedTestOne = false
        $scope.allDone = false

        $scope.showVid = function () {
            $scope.videos = videos[$scope.vidCounter]
            $scope.vid = true
            $scope.thatsWrong = false
            $scope.thatsRight = false
            $scope.welcome = false
            $scope.quizSet = false
            $scope.testSet = false
            $scope.nextVideo = false
            $scope.finishedTestOne = false
        }

        $scope.testLink = function (currentStudentKey) {
            $location.url("/profiles/detail/" + $scope.currentStudentKey)
        }

        $scope.hideVid = function () {
            $scope.vid = false
        }

        $scope.initTest = function () {
            $scope.thatsRight = false
            $scope.beginTest = true
            $scope.quizSet = false
        }

        $scope.showTest = function () {
            $scope.counter = 0
            $scope.questions = firstTestQuestions[$scope.counter]
            $scope.answers = answers.filter((answer) => {
                return answer.questionID === $scope.questions.questionID
            })
            $scope.beginTest = false
            $scope.testSet = true
            $scope.testOneNext = true
        }
        
        $scope.showTestTwo = function () {
            $scope.counter = 0
            $scope.questions = secondTestQuestions[$scope.counter]
            // console.log($scope.questions)
            $scope.answers = answers.filter((answer) => {
                return answer.questionID === $scope.questions.questionID
            })
            $scope.beginTest = false
            $scope.testOneNext = false
            $scope.testSet = true
            $scope.testTwoNext = true
        }

        $scope.grabOption = function (optionSelected) {
            $scope.optionSelected = optionSelected
        }

        let questionIDs = []
        let testAnswers = []
        let studentAnswers = []
        let numberCorrect = 0

        $scope.storeStudentAnswer = function (questionID, answers, studentAnswer) {
            // console.log($scope.optionSelected)
            questionIDs.push($scope.questions.questionID)
            testAnswers.push($scope.answers)
            studentAnswers.push($scope.optionSelected)
            if ($scope.optionSelected === true) {
                numberCorrect++
            }
        }

        //set videocounter
        $scope.vidCounter = 0
        $scope.videos = videos[$scope.vidCounter]

        $scope.counter = 0
        let quizQuestions = questions.filter((question) => {
            return question.videoID === $scope.videos.videoID
        })

        let firstTestQuestions = questions.filter((question) => {
            return (question.videoID === "Video1") || (question.videoID === "Video2") || (question.videoID === "Video3") || (question.videoID === "Video4") || (question.videoID === "Video5")
        })

        let secondTestQuestions = questions.filter((question) => {
            return (question.videoID === "Video6") || (question.videoID === "Video7") || (question.videoID === "Video8") || (question.videoID === "Video9")
        })

        $scope.showQuestion = function (videoID) {
            $scope.directToTest = false
            $scope.advance = true
            $scope.videos = videos[$scope.vidCounter]
            quizQuestions = questions.filter((question) => {
                return question.videoID === $scope.videos.videoID
            })
            // console.log(quizQuestions)
            $scope.quizSet = true
            $scope.counter = 0
            $scope.questions = quizQuestions[$scope.counter]
            $scope.answers = answers.filter((answer) => {
                return answer.questionID === $scope.questions.questionID
            })
        }

        // grade the selected answer
        $scope.gradeAnswer = function (optionSelected) {
            currentAnswer = optionSelected;
            // console.log(currentAnswer)
            if (currentAnswer === true) {
                // console.log("isCorrect = true: ", currentAnswer)
                $scope.thatsRight = true
                $scope.thatsWrong = false
                // $scope.advance = true
            } else if (currentAnswer === false) {
                // console.log("isCorrect = false: ", currentAnswer)
                $scope.thatsWrong = true
                $scope.thatsRight = false
            }
        }

        $scope.nextQuizQuestion = function () {
            $scope.thatsRight = false
            $scope.thatsWrong = false
            $scope.counter++
            if (($scope.counter === quizQuestions.length) && ($scope.vidCounter === 4)) {
                console.log("last question and last video of section")
                $scope.testOne = true
                $scope.advance = false
                $scope.directToTest = true
            } else if (($scope.counter === quizQuestions.length) && ($scope.vidCounter === 8)) {
                console.log("last question and last video of section")
                $scope.testOne = false
                $scope.testTwo = true
                $scope.advance = false
                $scope.directToTest = true
            } else if ($scope.counter < quizQuestions.length) {
                $scope.questions = quizQuestions[$scope.counter]
                $scope.answers = answers.filter((answer) => {
                    return answer.questionID === $scope.questions.questionID
                })
                // } else if ((($scope.counter - 1) === quizQuestions.length) && (vidCounter === 4 || vidCounter === 8)) {
                //     $scope.vid = false
                //     $scope.quizSet = false
                //     $scope.startTest = true
            } else {
                $scope.vidCounter++
                $scope.quizSet = false
                $scope.nextVideo = true
            }
        }

        //after videoIDs 1-5 give test 1
        //test 1: grab all questions with matching videoIDs 1-5 and corresponding answers
        $scope.nextTestQuestion = function () {
            //increment counter, advance to next question and corresponding answers 
            $scope.counter++
            $scope.optionSelected = null
            if ($scope.counter < firstTestQuestions.length) {
                $scope.questions = firstTestQuestions[$scope.counter]
                $scope.answers = answers.filter((answer) => {
                    return answer.questionID === $scope.questions.questionID
                })
            } else if ($scope.counter === firstTestQuestions.length) {
                //if it's the last question of test, start next section of videos/Q's/A's
                $scope.vidCounter++
                $scope.testSet = false
                $scope.finishedTestOne = true
                // console.log(questionIDs, testAnswers, studentAnswers)
                console.log("test1 number correct: ", numberCorrect, " out of 30")
            }
        }
        //after videoIDs 6-9 give test 2
        //test 2: grab all questions with matching videoIDs 6-9 and corresponding answers
        // store questions, correctAnswer, userAnswer into arrays
        $scope.anotherTestQuestion = function () {
            //increment counter, advance to next question and corresponding answers 
            $scope.counter++
            $scope.optionSelected = null
            if ($scope.counter < secondTestQuestions.length) {
                $scope.questions = secondTestQuestions[$scope.counter]
                $scope.answers = answers.filter((answer) => {
                    return answer.questionID === $scope.questions.questionID
                })
            } else if ($scope.counter === secondTestQuestions.length) {
                //if it's the last question of test, display completion message
                $scope.allDone = true
                $scope.testSet = false
                // console.log(questionIDs, testAnswers, studentAnswers)
                console.log("test2 number correct: ", numberCorrect, " out of 60")
            }
        }

        //push all info into Course object 
        $scope.saveCourse = function () {
            
            const user = AuthFactory.getUser()
            const course = {
                "studentID": currentStudentKey,
                "adminID": user.uid,
                "date": Date.toString(),
                "questionIDs": [questionIDs],
                "answerIDs": [testAnswers],
                // "correctAnswerID": [], 
                "studentAnswerIDs": [studentAnswers],
                "numberCorrect": numberCorrect
            }
            // console.log(course) 
            profileFactory.addCourseResult(course)
            $location.url("/")
        }

        $scope.viewStudentProfile = function (currentStudentKey) {
            $location.url("/profiles/detail/" + $scope.currentStudentKey)
        }
    })

        // //progress to the next question or video (if applicable)
        // $scope.nextQuestion = function () {
        //     // alert when no answer is chosen and next button is clicked
        //     if (currentAnswer === null) {
        //         //alert if there is no answer selected
        //         alert("Please select an answer before proceeding")
        //     } else if (currentAnswer === true) {
        //         //if the answer is correct proceed ahead
        //         $scope.thatsRight = false
        //         $scope.thatsWrong = false
        //         //increment counter, advance to next question and corresponding answers    
        //         $scope.counter++
        //         if ($scope.counter < quizQuestions.length) {
        //             $scope.questions = quizQuestions[$scope.counter]
        //             $scope.answers = answers.filter((answer) => {
        //                 return answer.questionID === $scope.questions.questionID
        //             })
        //         } else {
        //             //once all questions with matching videoIDs have been answered, proceed to next video
        //             $scope.vidCounter++
        //             $scope.showVid()
        //             $scope.counter = 0
        //             //grab new questions with mathching videoIDs
        //             quizQuestions = questions.filter((question) => {
        //                 return question.videoID === $scope.videos.videoID
        //             })
        //             $scope.questions = quizQuestions[$scope.counter]
        //             $scope.answers = answers.filter((answer) => {
        //                 return answer.questionID === $scope.questions.questionID
        //             })
        //             if ($scope.vidCounter == 4 || $scope.vidCounter == 8) {
        //                 $scope.showVid()
        //                 $scope.counter = 0
        //                 //grab new questions with mathching videoIDs
        //                 quizQuestions = questions.filter((question) => {
        //                     return question.videoID === $scope.videos.videoID
        //                 })
        //                 $scope.questions = quizQuestions[$scope.counter]
        //                 $scope.answers = answers.filter((answer) => {
        //                     return answer.questionID === $scope.questions.questionID
        //                 })
        //                 if ($scope.counter === quizQuestions.length) {
        //                     $scope.vid = false
        //                     $scope.quizSet = false
        //                     $scope.beginTest = true
        //                     $scope.runTestOne()
        //                 }
        //             }
        //         }
        //     }
        // }























