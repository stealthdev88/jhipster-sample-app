'use strict';

/* Controllers */

jhipsterApp.controller('MainController', ['$scope',
    function ($scope) {
    }]);

jhipsterApp.controller('AdminController', ['$scope',
    function ($scope) {
    }]);

jhipsterApp.controller('LanguageController', ['$scope', '$translate',
    function ($scope, $translate) {
        $scope.changeLanguage = function (languageKey) {
            $translate.uses(languageKey);
        };
    }]);

jhipsterApp.controller('MenuController', ['$scope',
    function ($scope) {
    }]);

jhipsterApp.controller('LoginController', ['$scope', '$location', 'AuthenticationSharedService',
    function ($scope, $location, AuthenticationSharedService) {
        $scope.rememberMe = true;
        $scope.login = function () {
            AuthenticationSharedService.login({
                username: $scope.username,
                password: $scope.password,
                rememberMe: $scope.rememberMe,
                success: function () {
                    $location.path('');
                }
            })
        }
    }]);

jhipsterApp.controller('LogoutController', ['$location', 'AuthenticationSharedService',
    function ($location, AuthenticationSharedService) {
        AuthenticationSharedService.logout({
            success: function () {
                $location.path('');
            }
        });
    }]);

jhipsterApp.controller('SettingsController', ['$scope', 'resolvedAccount', 'Account',
    function ($scope, resolvedAccount, Account) {
        $scope.success = null;
        $scope.error = null;
        $scope.settingsAccount = resolvedAccount;

        $scope.save = function () {
            Account.save($scope.settingsAccount,
                function (value, responseHeaders) {
                    $scope.error = null;
                    $scope.success = 'OK';
                    $scope.settingsAccount = Account.get();
                },
                function (httpResponse) {
                    $scope.success = null;
                    $scope.error = "ERROR";
                });
        };
    }]);

jhipsterApp.controller('PasswordController', ['$scope', 'Password',
    function ($scope, Password) {
        $scope.success = null;
        $scope.error = null;
        $scope.doNotMatch = null;
        $scope.changePassword = function () {
            if ($scope.password != $scope.confirmPassword) {
                $scope.doNotMatch = "ERROR";
            } else {
                $scope.doNotMatch = null;
                Password.save($scope.password,
                    function (value, responseHeaders) {
                        $scope.error = null;
                        $scope.success = 'OK';
                    },
                    function (httpResponse) {
                        $scope.success = null;
                        $scope.error = "ERROR";
                    });
            }
        };
    }]);

jhipsterApp.controller('SessionsController', ['$scope', 'resolvedSessions', 'Sessions',
    function ($scope, resolvedSessions, Sessions) {
        $scope.success = null;
        $scope.error = null;
        $scope.sessions = resolvedSessions;
        $scope.invalidate = function (series) {
            Sessions.delete({series: encodeURIComponent(series)},
                function (value, responseHeaders) {
                    $scope.error = null;
                    $scope.success = "OK";
                    $scope.sessions = Sessions.get();
                },
                function (httpResponse) {
                    $scope.success = null;
                    $scope.error = "ERROR";
                });
        };
    }]);

jhipsterApp.controller('TrackerController', ['$scope',
    function ($scope) {
        // This controller uses the Atmosphere framework to keep a Websocket connection opened, and receive
        // user activities in real-time.

        $scope.activities = [];
        $scope.trackerSocket = atmosphere;
        $scope.trackerSubSocket;
        $scope.trackerTransport = 'websocket';

        $scope.trackerRequest = { url: '/websocket/tracker',
            contentType : "application/json",
            transport : $scope.trackerTransport ,
            trackMessageLength : true,
            reconnectInterval : 5000,
            enableXDR: true,
            timeout : 60000 };

        $scope.trackerRequest.onOpen = function(response) {
            $scope.trackerTransport = response.transport;
            $scope.trackerRequest.uuid = response.request.uuid;
        };

        $scope.trackerRequest.onMessage = function (response) {
            var message = response.responseBody;
            var activity = atmosphere.util.parseJSON(message);
            var existingActivity = false;
            for (var index = 0; index < $scope.activities.length; index++) {
                if($scope.activities[index].sessionId == activity.sessionId) {
                    existingActivity = true;
                    if (activity.page == "logout") {
                        $scope.activities.splice(index, 1);
                    } else {
                        $scope.activities[index] = activity;
                    }
                }
            }
            if (!existingActivity) {
                $scope.activities.push(activity);
            }
            $scope.$apply();
        };

        $scope.trackerSubSocket = $scope.trackerSocket.subscribe($scope.trackerRequest);
    }]);

jhipsterApp.controller('MetricsController', ['$scope', 'resolvedMetrics',
    function ($scope, resolvedMetrics) {
        $scope.metrics = resolvedMetrics;
    }]);

jhipsterApp.controller('LogsController', ['$scope', 'resolvedLogs', 'LogsService',
    function ($scope, resolvedLogs, LogsService) {
        $scope.loggers = resolvedLogs;

        $scope.changeLevel = function (name, level) {
            LogsService.changeLevel({name: name, level: level}, function () {
                $scope.loggers = LogsService.findAll();
            });
        }
    }]);
