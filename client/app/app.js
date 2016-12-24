(function() {
    "use strict";

    function config($stateProvider, $locationProvider) {

        function alreadyLoggedIn($state, sessionService) {
            sessionService.getCurrentUser().then(function(response) {
                if(response) {
                    $state.go("dashboard");
                }
            });
        }

        function notLoggedIn($state, sessionService) {
            sessionService.getCurrentUser().then(function(response) {
                if(!response) {
                    $state.go("login");
                }
            });
        }
        
        alreadyLoggedIn.$inject = ["$state", "sessionService"];
        notLoggedIn.$inject = ["$state", "sessionService"];

        var loginState = {
            name: "login",
            url: "/login",
            templateUrl: "/features/login/login.html",
            resolve: {
                $title: function() {return "Login";},
                alreadyLoggedIn: alreadyLoggedIn
            }
        };

        var dashboardState = {
            name: "dashboard",
            url: "/",
            templateUrl: "/features/dashboard/dashboard.html",
            controller: "DashboardController",
            controllerAs: "dashboardCtrl",
            resolve: {
                $title: function() {return "Dashboard";},
                notLoggedIn: notLoggedIn
            }
        };

        var contactsIndexState = {
            name: "contacts",
            url: "/contacts",
            templateUrl: "/features/contact/contact.index.html",
            controller: "ContactController",
            controllerAs: "contactCtrl",
            resolve: {
                $title: function() {return "Contacts";},
                notLoggedIn: notLoggedIn
            }
        };

        var contactsNewState = {
            name: "contacts-new",
            url: "/contacts/new",
            templateUrl: "/features/contact/contact.update.html",
            controller: "ContactController",
            controllerAs: "contactCtrl",
            resolve: {
                $title: function() {return "New Contact";},
                notLoggedIn: notLoggedIn
            }
        };

        var contactsEditState = {
            name: "contacts-edit",
            url: "/contacts/:id",
            templateUrl: "/features/contact/contact.update.html",
            controller: "ContactController",
            controllerAs: "contactCtrl",
            resolve: {
                $title: function() {return "Edit Contact";},
                notLoggedIn: notLoggedIn
            }
        };

        var unauthorizedState = {
            name: "unauthorized",
            url: "/401",
            templateUrl: "/features/error/401.html",
            resolve: {
                $title: function() {return "401 - Unauthorized";}
            }
        };

        var notFoundState = {
            name: "notFound",
            url: "*path",
            templateUrl: "/features/error/404.html",
            resolve: {
                $title: function() {return "404 - Not Found";}
            }
        };

        $locationProvider.html5Mode(true);

        $stateProvider.state(loginState);
        $stateProvider.state(dashboardState);
        $stateProvider.state(contactsIndexState);
        $stateProvider.state(contactsNewState);
        $stateProvider.state(contactsEditState);
        $stateProvider.state(unauthorizedState);
        $stateProvider.state(notFoundState);
    }
    
    config.$inject = ["$stateProvider", "$locationProvider"];
    
    angular
        .module("app", [
            "ngAnimate",
            "ui.router",
            "ui.router.title",
            "wgl.directives.error",
            "wgl.services.session",
            "wgl.services.error",
            "wgl.services.contact",
            "wgl.controllers.error",
            "wgl.controllers.nav",
            "wgl.controllers.dashboard",
            "wgl.controllers.contact"
        ])
        .config(config);
})();