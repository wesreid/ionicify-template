'use strict';

var _applicationConfig = require('./config')
    , _applicationDependencies = [
        'ionic'
    ];
_applicationConfig.applicationModuleName = 'VideoSampleApp';
_applicationConfig.applicationModuleVendorDependencies = _applicationConfig.applicationModuleVendorDependencies.concat(_applicationDependencies);


(function() {
    angular.element(document).ready(function() {
            //Start by defining the main module and adding any pre-defined dependencies
            var appModule = angular.module(_applicationConfig.applicationModuleName, _applicationConfig.applicationModuleVendorDependencies);

            /* BOOM - load modules needed for application */
            require('./ng-modules-to-load');


            appModule
                .config([
                    '$locationProvider'
                    , '$urlRouterProvider'
                    , '$stateProvider'
                    , function ($locationProvider, $urlRouterProvider, $stateProvider) {
                        $locationProvider.hashPrefix('!');
                        $stateProvider
                            .state('tab', {
                                url: '/tab',
                                abstract: true,
                                templateUrl: 'templates/tabs.html'
                            });
                        $urlRouterProvider.otherwise('/home');
                    }]
            )
                .run(['$ionicPlatform', function ($ionicPlatform) {
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
                }]
            );

            //Then define the init function for starting up the application
            angular.element(document).ready(function () {
                //Fixing facebook bug with redirect
                if (window.location.hash === '#_=_') {
                    window.location.hash = '#!';
                }

                //Then init the app
                angular.bootstrap(document, [_applicationConfig.applicationModuleName]);
            });
        }
    );
})();