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
        
        $scope.showVid = function () {
            $scope.vid = true
            $scope.welcome = false
            $scope.quizSet = false
            $scope.videos = videos[vidCounter]
        }
        
        $scope.hideVid = function () {
            $scope.vid = false
        }
        
        //set videocounter
        let vidCounter = 0
        $scope.videos = videos[vidCounter]
        
        $scope.counter = 0
        let quizQuestions = questions.filter((question) => {
            return question.videoID === $scope.videos.videoID
        })
        
        $scope.showQuestion = function () {
            $scope.quizSet = true
            $scope.questions = quizQuestions[$scope.counter]
            $scope.answers = answers.filter((answer) => {
                return answer.questionID === $scope.questions.questionID
            })
        }
        $scope.showMe = function (optionSelected) {
            currentAnswer = optionSelected;
            console.log(currentAnswer)
            // alert("isCorrect = ", optionSelected)
        }

        //trying something i found on the interwebz
        // $scope.$watch('optionSelected', function(optionSelected) {
        //  })

        // grade the selected answer
        let gradeAnswer = function (currentAnswer) {
            // debugger
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
        //progress to the next question or video (if applicable)
        $scope.nextQuestion = function () {
            // alert when no answer is chosen and next button is clicked
            // if (currentAnswer === null) {
            //     alert("Please select an answer before proceeding")
            // } else {
                //grade the users answer
                gradeAnswer(currentAnswer)
                // $scope.thatsRight = false
                // $scope.thatsWrong = false
                //increment counter, advance to next question and corresponding answers    
                $scope.counter++
                if ($scope.counter < quizQuestions.length) {
                    $scope.questions = quizQuestions[$scope.counter]
                    $scope.answers = answers.filter((answer) => {
                        return answer.questionID === $scope.questions.questionID
                    })
                } else {
                    vidCounter++
                    $scope.showVid()
                    $scope.counter = 0
                    quizQuestions = questions.filter((question) => {
                        return question.videoID === $scope.videos.videoID
                    })
                    $scope.questions = quizQuestions[$scope.counter]
                    $scope.answers = answers.filter((answer) => {
                        return answer.questionID === $scope.questions.questionID
                    })
                }
            // }
        }
    })