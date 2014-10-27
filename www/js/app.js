angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        var meetings = {
            url         : '/meetings',
            templateUrl : 'templates/meetings.html',
            controller  : 'MeetingsCtrl'
        };

        var meetingDetails = {
            url         : '/meetings/:id',
            templateUrl : 'templates/meeting-detail.html',
            controller  : 'MeetingDetailCtrl'
        };

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('meetings', meetings)
            .state('meetings-details', meetingDetails);

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/meetings');
    });