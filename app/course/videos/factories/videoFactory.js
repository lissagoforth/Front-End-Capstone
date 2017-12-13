angular
.module("TaxiProApp")
.factory("videoFactory", function ($http) {
    return Object.create(null, {
        "getVideo": {
            value: function () {
                return $http({
                    method: "GET",
                    url:""
                })
            }
        }
    })
})