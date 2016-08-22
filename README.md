# ng-frontier

[<img src="http://fourloopph.bitbucket.org/developers/images/devLogo.png" alt="4LOOP Logo" width="1300px" height="192px" />](http://fourloopph.bitbucket.org/developers/)

This service lets you integrate frontier analytics tracker in your AngularJS applications easily.

You can use basic functions, `$frontierAnalytics.trackEvent('video', 'play','django', 'django.mp4');`

Proudly brought to you by 4LOOP Developers

## Features

 - highly configurable
 - page tracking
 - event tracking
 - view / screen tracking
 - app tracking
 - device tracking
 - cross-domain support
 - hybrid mobile application support
 - analytics.js advanced debugging support

## Installation
You can install the module from a package manger of your choice directly from the command line

```sh
# Bower
bower install ng-frontier

# NPM (Coming soon)
npm i ng-frontier

# Nuget (Coming soon)
nuget install ng-frontier
```

Inject the Native Frontier JS
````html
<script src="http://fourloopph.bitbucket.org/developers/bin/analytics/v1/js/frontier.min.js"></script>
OR
<script src="https://cdn.rawgit.com/4LOOPph/frontier/master/dist/frontier.min.js"></script>
````

Then Add Or alternatively, grab the dist/ng-frontier.min.js and include it in your project

In your application, declare the ngFrontier module dependency.

```html
<script src="bower_components/ng-frontier/dist/ng-frontier.js"></script>
```
OR Via CDN

````html
<script src="http://fourloopph.bitbucket.org/developers/bin/analytics/v1/angular/ng-frontier.min.js"></script>
OR
<script src="https://cdn.rawgit.com/4LOOPph/ng-frontier/master/dist/ng-frontier.min.js"></script>
````

Don't forget to add frontier.min.js as this is the main SDK for Frontier Analytics
In your application, declare dependency injection like so.

```javascript
angular.module('myModule', ['ngFrontier']);
```

## Configure Service
```js
app.run(function ($frontierAnalytics) {
  // Add configuration code as desired - see below
});
```


### Set Frontier Accesscode (Required)
```js
    $frontierAnalytics.Initialize({
        accessCode: '012345678901234',
        trackerName: 'project-tessa',
        encoding: 'utf-8'
    });
```

### Enable Debug mode
```js
  // Calling this method will enable debugging mode for Universal Analytics. Supplying a truthy value for the
  // optional parameter will further enable trace debugging for Universal Analytics.

  // Insert this above the frontier initialization
  $frontierAnalytics.debugMode(true);

  $frontierAnalytics.Initialize({
      accessCode: '012345678901234',
      trackerName: 'sample-project',
      encoding: 'utf-8'
  });
```

If set to a truthy value then debugging mode is enabled with Frontier.
All trackers with `isEnableDebugging: true` will enable for debugging mode.

### Enable / Disable Page Tracking
```js
  // Insert this below the frontier initialization
  $frontierAnalytics.allowPageTracking(true);
```
If set to a truthy value then the page tracking is enable with Frontier Analytics.
All trackers with `IsEnableTrackPage: true` will enable for Page Tracking with Frontier.

### Enable / Disable Event Tracking
```js
  // Insert this below the frontier initialization
  $frontierAnalytics.allowEventTracking(true);
```
If set to a truthy value then the event tracking is enable with Frontier Analytics.
All trackers with `IsEnableTrackEvent: true` will enable for Event Tracking with Frontier.

### Enable / Disable View(Screen) Tracking
```js
  // Insert this below the frontier initialization
  $frontierAnalytics.allowViewTracking(true);
```
If set to a truthy value then the event tracking is enable with Frontier Analytics.
All trackers with `IsEnableTrackView: true` will enable for View/Screen Tracking with Frontier.

### Enable / Disable App Tracking
```js
  // Insert this below the frontier initialization
  $frontierAnalytics.allowAppTracking(true);
```
If set to a truthy value then the event tracking is enable with Frontier Analytics.
All trackers with `IsEnableTrackApp: true` will enable for App Tracking with Frontier.

### Enable / Disable Device Tracking
```js
  // Insert this below the frontier initialization
  $frontierAnalytics.allowDeviceTracking(true);
```
If set to a truthy value then the event tracking is enable with Frontier Analytics.
All trackers with `IsEnableTrackDevice: true` will enable for Device Tracking with Frontier.


### Set Page View Tracking
**Note:** In order to set route tracking behavior for ngRoute and ui.router module in your application. Please refer
to the official [angular ngRoute documentation](https://docs.angularjs.org/api/ngRoute) and [angular-ui-router documentation](http://angular-ui.github.io/ui-router/site)
on how to install and use this service.

Using Angular-UI-Router
```js
  // As an example, add the service to the run call:
  app.run(function($rootScope,$frontierAnalytics) {

        $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
            $frontierAnalytics.trackPage(toState.name, toState.url, toState.templateUrl);
        });
  });
```
Using Angular-ngRoute
```js
  // As an example, add the service to the run call:
  app.run(function($rootScope,$frontierAnalytics) {

        $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
            $frontierAnalytics.trackPage(toState.name, toState.url, toState.templateUrl);
        });
  });
```

### Declaring a Controller
```js
  // As an example, a simple controller to make calls from:
  app.controller('SampleController', function ($frontierAnalytics) {
    // Add calls as desired - see below
  });
```

### Set UserId
```js
  // Create a new pageview event
  app.controller('SampleController', function ($frontierAnalytics) {
      // Add calls as desired - see below
       $frontierAnalytics.setUserId('XXXXX');
  });
```

### Page Tracking
```js
  // Create a new pageview event
  app.controller('SampleController', function ($frontierAnalytics) {
      // Add calls as desired - see below
       $frontierAnalytics.trackPage('/video/detail/XXX');

       // Create a new pageview event with page title
       $frontierAnalytics.trackPage('/video/detail/XXX', 'Video XXX');

       // Create a new pageview event with page title, custom dimension, and custom metric
       // Universal Analytics only
       $frontierAnalytics.trackPage('/video/detail/XXX', 'Video XXX', { dimension15: 'My Custom Dimension', metric18: 8000 });
  });
```


### Event Tracking
```js
    app.controller('SampleController', function ($frontierAnalytics) {
          // Create a new tracking event
          $frontierAnalytics.trackEvent('video', 'play', 'django.mp4');

          // Create a new tracking event with a value
          $frontierAnalytics.trackEvent('video', 'play', 'django.mp4', 4);
    });
```

Alternatively, you can use a directive to avoid filling controllers with `$frontierAnalytics.trackEvent();` statements.

**Note:** the directive does not create an isolate scope.

```html
  <button type="button" fa-track-event="['video', 'play', 'django.mp4']"></button>

  <!-- OR -->

  <button type="button" fa-track-event="['video', 'play', 'django.mp4',4]"></button>
```

You can define the properties on your controller too, `$scope.event = ['video', 'play', 'django.mp4']` and reference them.

```html
  <button type="button" fa-track-event="event"></button>
```

## Licence

This project is licensed under the MIT license. See the LICENSE file for more info.
