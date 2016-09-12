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

                        return $window.Frontier.Initialize(accounts);
                    }
                },

                debugMode: function(isEnable) {
                    return $window.Frontier.enableAppDebugging(isEnable);
                },

                allowPageTracking : function(isEnable){
                    return $window.Frontier.enableTrackPage(isEnable);
                },

                allowEventTracking: function(isEnable){
                    return $window.Frontier.enableTrackEvent(isEnable);
                },

                allowViewTracking: function(isEnable){
                    return $window.Frontier.enableTrackView(isEnable);
                },

                allowAppTracking: function(isEnable){
                    return $window.Frontier.enableTrackApp(isEnable);
                },

                allowDeviceTracking: function(isEnable){
                    return $window.Frontier.enableTrackDevice(isEnable);
                },

                setUserId: function(userId) {
                    return $window.Frontier.setUserId(userId);
                },

                trackView: function(screenName) {
                    return $window.Frontier.screenTrack({
                        screenName: screenName
                    });
                },

                trackEvent: function(category, action, label, value) {
                    return $window.Frontier.eventTrack({
                        eventCategory: category,
                        eventAction: action,
                        eventLabel: label,
                        eventValue: value
                    });
                },

                trackPage: function(title, location, page) {
                    return $window.Frontier.pageTrack({
                        title: title,
                        location: location,
                        page: page
                    });
                },

                trackApp: function(appName, appID, appVersion, appInstallerID) {
                    return $window.Frontier.appTrack({
                        appName: appName,
                        appID: appID,
                        appVersion: appVersion,
                        appInstallerID: appInstallerID
                    });
                },

                trackDevice: function(deviceID, deviceName, deviceBrand, deviceModel, osName, osVersion, screenResolution, serviceProvider) {
                    return $window.Frontier.deviceTrack({
                        deviceID: deviceID,
                        deviceName: deviceName,
                        deviceBrand: deviceBrand,
                        deviceModel: deviceModel,
                        osName: osName,
                        osVersion: osVersion,
                        screenResolution: screenResolution,
                        serviceProvider: serviceProvider
                    });
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
        }]);

 })();
//# sourceMappingURL=ng-frontier.js.map
