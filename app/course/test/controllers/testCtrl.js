angular
    .module("TaxiProApp")
    .controller("testCtrl",
    function ($scope, testFactory, profileFactory) {
        // get all videos, questions and answers from testFactory
        videos = testFactory.VideosCache
        questions = testFactory.QuestionsCache
        answers = testFactory.AnswersCache
        currentStudentKey = profileFactory.getCurrentStudent()
        currentStudent = profileFactory.single(currentStudentKey).then((student) => {
            $scope.student = student
        })

        $scope.optionSelected = null


        //visibility controls
        $scope.welcome = true
        $scope.vid = false
        $scope.quizSet = false
        $scope.thatsWrong = false
        $scope.thatsRight = false
        $scope.beginTest = false
        $scope.testSet = false
        $scope.allDone = false
        
        $scope.showVid = function () {
            $scope.vid = true
            $scope.welcome = false
            $scope.quizSet = false
            $scope.videos = videos[vidCounter]
        }
        
        $scope.hideVid = function () {
            $scope.vid = false
        }

        $scope.showTest = function () {
            $scope.beginTest = false
            $scope.testSet = true
        }
        
        //set videocounter
        let vidCounter = 0
        $scope.videos = videos[vidCounter]
        
        $scope.counter = 0
        let quizQuestions = questions.filter((question) => {
            return question.videoID === $scope.videos.videoID
        })
        
        let firstTestQuestions = questions.filter((question) => {
            // debugger
            return  (question.videoID === "Video1") ||  (question.videoID === "Video2") || (question.videoID === "Video3") || (question.videoID === "Video4") ||  (question.videoID === "Video5")
        })

        let secondTestQuestions = questions.filter((question) => {
            // debugger
            return  (question.videoID === "Video6") ||  (question.videoID === "Video7") || (question.videoID === "Video8") || (question.videoID === "Video9")
        })
    
        $scope.showQuestion = function () {
            $scope.quizSet = true
            $scope.questions = quizQuestions[$scope.counter]
            $scope.answers = answers.filter((answer) => {
                return answer.questionID === $scope.questions.questionID
            })
        }

        // grade the selected answer
        $scope.gradeAnswer = function (optionSelected) {
            currentAnswer = optionSelected;
            console.log(currentAnswer)
            if (currentAnswer === true) {
                console.log("isCorrect = true: ", currentAnswer)
                $scope.thatsRight = true
                $scope.thatsWrong = false
            } else if (currentAnswer === false) {
                console.log("isCorrect = false: ", currentAnswer)
                $scope.thatsWrong = true
                $scope.thatsRight = false
            }
        }

        //after videoIDs 1-5 give test 1
//test 1: grab all questions with matching videoIDs 1-5 and corresponding answers
$scope.runTestOne = function () {
    $scope.counter = 0
    //set up test material.
    $scope.questions = firstTestQuestions[$scope.counter]
    $scope.answers = answers.filter((answer) => {
        return answer.questionID === $scope.questions.questionID
    })
    
    // store questions, correctAnswer, userAnswer into arrays

     //increment counter, advance to next question and corresponding answers    
     $scope.counter++
     if ($scope.counter < firstTestQuestions.length) {
         $scope.questions = firstTestQuestions[$scope.counter]
         $scope.answers = answers.filter((answer) => {
             return answer.questionID === $scope.questions.questionID
         })
        } else if ($scope.counter === firstTestQuestions.length) {
        //if it's the last question of test, start next section of videos/Q's/A's
            vidCounter++
            $scope.showVid()
            $scope.counter = 0
            //grab new questions with mathching videoIDs
            quizQuestions = questions.filter((question) => {
                return question.videoID === $scope.videos.videoID
            })
            $scope.questions = quizQuestions[$scope.counter]
            $scope.answers = answers.filter((answer) => {
                return answer.questionID === $scope.questions.questionID
            })
        }
}


        //progress to the next question or video (if applicable)
        $scope.nextQuestion = function () {
            // alert when no answer is chosen and next button is clicked
            if (currentAnswer === null) {
                //alert if there is no answer selected
                alert("Please select an answer before proceeding")
            } else if (currentAnswer === true) {
                //if the answer is correct proceed ahead
                $scope.thatsRight = false
                $scope.thatsWrong = false
                //increment counter, advance to next question and corresponding answers    
                $scope.counter++
                if ($scope.counter < quizQuestions.length) {
                    $scope.questions = quizQuestions[$scope.counter]
                    $scope.answers = answers.filter((answer) => {
                        return answer.questionID === $scope.questions.questionID
                    })
                } else {
                    //once all questions with matching videoIDs have been answered, proceed to next video
                    vidCounter++
                    $scope.showVid()
                    $scope.counter = 0
                    //grab new questions with mathching videoIDs
                    quizQuestions = questions.filter((question) => {
                        return question.videoID === $scope.videos.videoID
                    })
                    $scope.questions = quizQuestions[$scope.counter]
                    $scope.answers = answers.filter((answer) => {
                        return answer.questionID === $scope.questions.questionID
                    })
                    if (vidCounter === 4 || vidCounter === 8) {
                        $scope.showVid()
                        $scope.counter = 0
                        //grab new questions with mathching videoIDs
                        quizQuestions = questions.filter((question) => {
                            return question.videoID === $scope.videos.videoID
                        })
                        $scope.questions = quizQuestions[$scope.counter]
                        $scope.answers = answers.filter((answer) => {
                            return answer.questionID === $scope.questions.questionID
                        })
                        if($scope.counter === quizQuestions.length) {
                            $scope.vid = false
                            $scope.quizSet = false
                            $scope.beginTest = true
                            $scope.runTestOne()
                        }
                    }
                }
            }
        }
    })


//after videoIDs 6-9 give test 2
//test 2: grab all questions with matching videoIDs 6-9 and corresponding answers
// store questions, correctAnswer, userAnswer into arrays

//push all info into Course object 
// {
//     CourseID: ;
//     StudentID: ;
//     AdminID: ;
//     Date: Date.now();
//     QuestionID: ;
//     AnswerIDs: [] ;
//     correctAnswerID: ;
//     studentAnswerID: ;
// }
    //display allDone div


















