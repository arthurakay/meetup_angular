angular.module('starter.controllers', [])

    .controller('MeetingsCtrl', function ($scope, Meetings) {
        Meetings.getEvents(function(data) {
            $scope.meetings = data.results;
        });
    })

    .controller('MeetingDetailCtrl', function ($scope, $stateParams, Meetings) {
        Meetings.getUsers($stateParams.id, function(data) {
             Meetings.getMeeting($stateParams.id, function(meeting) {
                 $scope.meeting = meeting;
            });

            $scope.people = data.results;
        });
    });