angular
    .module("TaxiProApp")
    .factory("profileFactory", function ($http) {
        return Object.create(null, {
            "cache": {
                value: null,
                writable: true
            },
            "list": {
                value: function () {
                    return $http({
                        method: "GET",
                        url: "https://front-end-capstone-6732d.firebaseio.com/.json"
                    }).then(response => {
                        const data = response.data

                        this.cache = Object.keys(data).map(key => {
                            data[key].id = key
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
                        url: `https://front-end-capstone-6732d.firebaseio.com/${key}.json`
                    }).then(response => {
                        return response.data
                    })
                }
            },
            "add": {
                value: function (student) {
                    return $http({
                        method: "POST",
                        url: "https://front-end-capstone-6732d.firebaseio.com/profiles/.json",
                        data: {
                            "firstName": student.firstName,
                            "lastName": student.lastName,
                            "address": student.address,
                            "phone": student.phone,
                            "notes": student.notes
                        }
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
            "remove": {
                value: function (key) {
                    return $http({
                        method: "DELETE",
                        url: `https://front-end-capstone-6732d.firebaseio.com/profiles/${key}/.json`,
                    })
                }
            }
        })
    })