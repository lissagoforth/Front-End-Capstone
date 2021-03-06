angular
    .module("TaxiProApp")
    .factory("profileFactory", function ($http) {
        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
            "studentCache": {
                value: null,
                writable: true
            },
            "list": {
                value: function () {
                    return $http({
                        method: "GET",
                        url: "https://front-end-capstone-6732d.firebaseio.com/Profiles/.json"
                    }).then(response => {
                        const data = response.data

                        this.cache = Object.keys(data).map(key => {
                            data[key].id = key
                            // console.log(data[key])
                            return data[key]
                        })

                        return this.cache
                    })
                }
            },
            "single": {
                value: function (key) {
                    return $http({
                        method: "GET",
                        url: `https://front-end-capstone-6732d.firebaseio.com/Profiles/${key}.json`
                    }).then(response => {
                        // console.log(response.data)
                        return response.data
                    })
                }
            },
            "add": {
                value: function (student) {
                    return $http({
                        method: "POST",
                        url: "https://front-end-capstone-6732d.firebaseio.com/Profiles/.json",
                        data: student
                    })
                }
            },
            "getNotes": {
                value: function (studentId) {
                    return $http({
                        method: "GET", 
                        url: `https://front-end-capstone-6732d.firebaseio.com/Notes/.json?orderBy="studentId"&equalTo="${studentId}"`
                    })
                }
            },
            "find": {
                value: function (searchString) {
                    const result = this.cache.find(student => {
                        return student.firstName.includes(searchString) ||
                            student.lastName.includes(searchString)
                    })
                    console.log(result)
                    return result
                }
            },
            "addNote": {
                value: function (note) {
                    return $http({
                        method: "POST",
                        url: `https://front-end-capstone-6732d.firebaseio.com/Notes/.json`,
                        data: note
                    })
                }
            },
            // "remove": {
            //     value: function (key) {
            //         return $http({
            //             method: "DELETE",
            //             url: `https://front-end-capstone-6732d.firebaseio.com/Students/${key}/.json`,
            //         })
            //     }
            // },
            "setCurrentStudent": {
                value: function (key) {
                    this.student = key
                }
            },
            "getCurrentStudent": {
                value: function () {
                    return this.student
                }
            },
            "addCourseResult": {
                value: function (course) {
                    return $http({
                        method: "POST",
                          url: `https://front-end-capstone-6732d.firebaseio.com/Course/.json`,
                        data: course
                    })
                }
            },
            "getCourseResults": {
                value: function (studentID) {
                    return $http({
                        method: "GET",
                        url: `https://front-end-capstone-6732d.firebaseio.com/Course/.json?orderBy="studentID"&equalTo="${studentID}"`,
                    })
                }
            }
        })
    })