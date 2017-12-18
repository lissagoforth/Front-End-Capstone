angular
.module("TaxiProApp")
.factory("testFactory", function ($http) {
    return Object.create(null, {
        "VideosCache": {
            value: null,
            writable: true
        },
        "QuestionsCache": {
            value: null,
            writable: true
        },
        "AnswersCache": {
            value: null,
            writable: true
        },
        "getQuestions": {
            value: function () {
                return $http({
                    method: "GET",
                    url: `https://front-end-capstone-6732d.firebaseio.com/Questions/.json`
                }).then(response => {
                    const data = response.data

                    this.QuestionsCache = Object.keys(data).map(key => {
                        data[key].questionID = key
                        return data[key]
                    })
                    return this.QuestionsCache
                })
            }
        },
        "getAnswers": {
            value: function () {
                return $http({
                    method: "GET",
                    url: `https://front-end-capstone-6732d.firebaseio.com/Answers/.json`
                }).then(response => {
                    const data = response.data

                    this.AnswersCache = Object.keys(data).map(key => {
                        data[key].answerID = key
                        return data[key]
                    })
                    return this.AnswersCache
                })
            }
        },
        "getVideos": {
            value: function () {
                return $http({
                    method: "GET",
                    url: `https://front-end-capstone-6732d.firebaseio.com/Videos/.json`
                }).then(response => {
                    const data = response.data

                    this.VideosCache = Object.keys(data).map(key => {
                        data[key].videoID = key
                        return data[key]
                    })
                    return this.VideosCache
                })
            }
        },
        
    })
})