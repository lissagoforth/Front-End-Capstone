angular
.module("TaxiProApp")
.controller("profileDetailCtrl",
function ($scope, $location, $routeParams, profileFactory) {
    $scope.student = {}

    profileFactory.single($routeParams.studentId).then(student => {
        $scope.student = student
    })

    // $scope.startCourse = () =>
    //profileFactory.addNote(note,key).then() {
    //  $location.url("/profiles/detail/:studentId")
    //}



}
)