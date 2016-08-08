/*!
 * ngFrontier
 * v1.0.0
 * @link https://bitbucket.org/fourloopph/4loop-sdks * Copyright 2016 4LOOP. http://4loop.ph/
 * See LICENSE in this repository for license information
 */

(function(){

 'use strict'

    angular.module('ngFrontier', [])
        .factory('$frontierAnalytics', ['$q', '$window', function($q, $window) {

            return {
                Initialize: function(params) {
                    if (angular.isUndefined(params) || params === false) {
                        console.info('Unable to initialize ngFrontier. Invalid parameter values!');
                        return;
                    } else if (angular.isObject(params)) {

                        var accounts = {
                            accessCode: params.accessCode,
                            trackerName: params.trackerName,
                            encoding: params.encoding,
                            userId: params.userId
                        };

                        $window.Frontier.Initialize(accounts);
                    }
                },

                debugMode: function(isEnable) {
                    $window.Frontier.enableAppDebugging(isEnable);
                },

                allowPageTracking : function(isEnable){
                    $window.Frontier.enableTrackPage(isEnable);
                },

                allowEventTracking: function(isEnable){
                  $window.Frontier.enableTrackEvent(isEnable);
                },

                allowViewTracking: function(isEnable){
                    $window.Frontier.enableTrackView(isEnable);
                },

                allowAppTracking: function(isEnable){
                    $window.Frontier.enableTrackApp(isEnable);
                },

                allowDeviceTracking: function(isEnable){
                    $window.Frontier.enableTrackDevice(isEnable);
                },

                setUserId: function(userId) {
                    var d = $q.defer();

                    $window.Frontier.setUserId({
                        userId: userId
                    }, function(response) {
                        d.resolve(response);
                    }, function(error) {
                        d.reject(error);
                    });

                    return d.promise;
                },

                trackView: function(screenName) {
                    var d = $q.defer();

                    $window.Frontier.screenTrack({
                        screenName: screenName
                    }, function(response) {
                        d.resolve(response);
                    }, function(error) {
                        d.reject(error);
                    });

                    return d.promise;
                },

                trackEvent: function(category, action, label, value) {
                    var d = $q.defer();

                    $window.Frontier.eventTrack({
                        eventCategory: category,
                        eventAction: action,
                        eventLabel: label,
                        eventValue: value
                    },function(response) {
                        d.resolve(response);
                    }, function(error) {
                        d.reject(error);
                    });

                    return d.promise;
                },

                trackPage: function(title, location, page) {
                    var d = $q.defer();

                    $window.Frontier.pageTrack({
                        title: title,
                        location: location,
                        page: page
                    }, function(response) {
                        d.resolve(response);
                    }, function(error) {
                        d.reject(error);
                    });

                    return d.promise;
                },

                trackApp: function(appName, appID, appVersion, appInstallerID) {
                    var d = $q.defer();

                    $window.Frontier.appTrack({
                        appName: appName,
                        appID: appID,
                        appVersion: appVersion,
                        appInstallerID: appInstallerID
                    }, function(response) {
                        d.resolve(response);
                    }, function(error) {
                        d.reject(error);
                    });

                    return d.promise;
                },

                trackDevice: function(deviceID, deviceName, deviceBrand, deviceModel, osName, osVersion, screenResolution, serviceProvider) {
                    var d = $q.defer();

                    $window.Frontier.deviceTrack({
                        deviceID: deviceID,
                        deviceName: deviceName,
                        deviceBrand: deviceBrand,
                        deviceModel: deviceModel,
                        osName: osName,
                        osVersion: osVersion,
                        screenResolution: screenResolution,
                        serviceProvider: serviceProvider
                    }, function(response) {
                        d.resolve(response);
                    }, function(error) {
                        d.reject(error);
                    });

                    return d.promise;
                }
            };
        }])

        .directive('faTrackEvent', ['$frontierAnalytics','$parse', function($frontierAnalytics,$parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var options = $parse(attrs.faTrackEvent);
                    element.bind('click', function() {
                        if (attrs.faTrackEventIf) {
                            if (!scope.$eval(attrs.faTrackEventIf)) {
                                return; // Cancel this event if we don't pass the fa-track-event-if condition
                            }
                        }
                        if (options.length > 1) {
                            $frontierAnalytics.trackEvent.apply($frontierAnalytics, options(scope));
                        }
                    });
                }
            }
        }])
        .directive('faTrackPage', ['$frontierAnalytics','$parse', function($frontierAnalytics,$parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var options = $parse(attrs.faTrackPage);
                    element.bind('click', function() {

                        if (attrs.faTrackPageIf) {
                            if (!scope.$eval(attrs.faTrackPageIf)) {
                                return; // Cancel this event if we don't pass the fa-track-page-if condition
                            }
                        }
                        if (options.length > 1) {
                            $frontierAnalytics.trackPage.apply($frontierAnalytics, options(scope));
                        }
                    });
                }
            }
        }])
        .directive('faTrackView', ['$frontierAnalytics','$parse', function($frontierAnalytics,$parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var options = $parse(attrs.faTrackView);
                    element.bind('click', function() {

                        if (attrs.faTrackViewIf) {
                            if (!scope.$eval(attrs.faTrackViewIf)) {
                                return; // Cancel this event if we don't pass the fa-track-view-if condition
                            }
                        }
                        if (options.length > 1) {
                            $frontierAnalytics.trackView.apply($frontierAnalytics, options(scope));
                        }
                    });
                }
            }
        }])
        .directive('faTrackApp', ['$frontierAnalytics', function($frontierAnalytics) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var options = $parse(attrs.faTrackApp);
                    element.bind('click', function() {

                        if (attrs.faTrackAppIf) {
                            if (!scope.$eval(attrs.faTrackAppIf)) {
                                return; // Cancel this event if we don't pass the fa-track-app-if condition
                            }
                        }
                        if (options.length > 1) {
                            $frontierAnalytics.trackApp.apply($frontierAnalytics, options(scope));
                        }
                    });
                }
            }
        }])
        .directive('faTrackDevice', ['$frontierAnalytics','$parse', function($frontierAnalytics,$parse) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    var options = $parse(attrs.faTrackDevice);
                    element.bind('click', function() {

                        if (attrs.faTrackDeviceIf) {
                            if (!scope.$eval(attrs.faTrackDeviceIf)) {
                                return; // Cancel this event if we don't pass the fa-track-device-if condition
                            }
                        }
                        if (options.length > 1) {
                            $frontierAnalytics.trackDevice.apply($frontierAnalytics, options(scope));
                        }
                    });
                }
            }
        }]);

 })();
//# sourceMappingURL=ng-frontier.js.map
