angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('Meetings', function ($http) {
        var apiRoot = 'http://api.meetup.com/2/',
            apiKey = '26707c51352322312176e2f42502d3c',
            groupId = 'milwaukeejs',
            meetings = [];


        //PRIVATE FUNCTIONS
        function callApi(api, params, callback) {
            return $http.jsonp(apiRoot + api, {
                params : params
            }).success(callback);
        }

        function findMeeting(id) {
            var len = meetings.length,
                meeting;

            for (var i=0; i<len; i++) {
                meeting = meetings[i];

                if (meeting.id === id) {
                    return meeting;
                }
            }

            //meeting does not exist
            return false;
        }


        //PUBLIC INTERFACE
        var me = {
            getUsers : function (eventId, callback) {
                return callApi(
                    'rsvps?',
                    {
                        sign     : true,
                        key      : apiKey,
                        event_id : eventId,
                        order    : 'event',
                        rsvp     : 'yes',
                        format   : 'json',
                        page     : 200,

                        callback : 'JSON_CALLBACK'
                    },
                    callback);
            },

            /**
             *
             * @param callback {Function}
             * @param bustCache {Boolean}
             * @returns {*}
             */
            getEvents : function (callback, bustCache) {
                if (meetings.length !== 0 && !bustCache) {

                    //mock the network request format to keep the controller logic consistent
                    return callback({
                        results : meetings
                    });
                }

                return callApi(
                    'events?',
                    {
                        sign          : true,
                        key           : apiKey,
                        group_urlname : groupId,
                        format        : 'json',
                        page          : 200,

                        callback : 'JSON_CALLBACK'
                    },
                    function(data) {
                        //set the local data for later use
                        meetings = data.results;

                        callback(data);
                    });
            },

            getMeeting : function(id, callback) {
                var meeting;

                if (meetings.length !== 0) {
                    meeting = findMeeting(id);

                    if (meeting) {
                        callback(meeting);
                    }
                }

                me.getEvents(function(data) {
                    meeting = findMeeting(id);
                    callback(meeting);
                }, true);
            }
        };

        return me;
    });