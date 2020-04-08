/**
 * A module for the usi_extend
 *
 * @module app/usi_extend/server-control/index
 * @exports app/usi_extend/server-control/index
 */

window.angular && (function(angular) {
  'use strict';

  angular
      .module('app.usiExtend.serverControl', ['ngRoute', 'app.common.services'])
      // Route configuration
      .config([
        '$routeProvider',
        function($routeProvider) {
          $routeProvider
              /* .when('/overview/server', {
                'template':
                    require('./controllers/system-overview-controller.html'),
                'controller': 'systemOverviewController',
                authenticated: true
              })
              .when('/overview', {
                'template':
                    require('./controllers/system-overview-controller.html'),
                'controller': 'systemOverviewController',
                authenticated: true
              }) */
			  .when('/usi_extend/server-control/ssdarray', {
                'template':
                    require('../../usi_extend/server-control/controllers/ssdarray-controller.html'),
                'controller': 'ssdArrayController',
                authenticated: true
              });
        }
      ]);
})(window.angular);
