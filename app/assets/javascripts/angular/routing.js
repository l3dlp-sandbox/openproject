//-- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2014 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

angular.module('openproject')

.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('work-packages', {
      url: '{projectPath:.*}/work_packages?query_id',
      abstract: true,
      templateUrl: "/templates/work_packages.html",
      controller: 'WorkPackagesController'
    })
    .state('work-packages.list', {
      url: "",
      controller: 'WorkPackagesListController',
      templateUrl: "/templates/work_packages.list.html"
    })
    .state('work-packages.list.details', {
      url: "/{workPackageId:[0-9]+}",
      templateUrl: "/templates/work_packages.list.details.html",
      controller: 'WorkPackageDetailsController'
    });
}])

.run([
  '$location',
  '$rootElement',
  '$browser',
  '$rootScope',
  function($location, $rootElement, $browser, $rootScope) {
    // Our application is still a hybrid one, meaning most routes are still
    // handled by Rails. As such, we disable the default link-hijacking that
    // Angular's HTML5-mode turns on.
    $rootElement.off('click');
    $rootElement.on('click', 'a[data-ui-route]', function(event) {
      if (event.ctrlKey || event.metaKey || event.which == 2) return;

      // NOTE: making use of event delegation, thus jQuery-only.
      var elm          = jQuery(event.target);
      var absHref      = elm.prop('href');
      var rewrittenUrl = $location.$$rewrite(absHref);

      if (absHref && !elm.attr('target') &&
        rewrittenUrl &&
        !event.isDefaultPrevented()) {

        event.preventDefault();
        if (rewrittenUrl != $browser.url()) {
          // update location manually
          $location.$$parse(rewrittenUrl);
          $rootScope.$apply();
          // hack to work around FF6 bug 684208 when scenario runner clicks on links
          window.angular['ff-684208-preventDefault'] = true;
        }
      }
    });
  }
]);
