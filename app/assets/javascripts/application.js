// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require turbolinks
//= require bootstrap
//= require angular
//= require jquery
//= require bootstrap-sprockets
//= require_tree .

var nytimesApp = angular.module('nytimesApp', [])

nytimesApp.controller('SearchController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
    $scope.count = 1;
    $scope.spinnerHidden = true;
    $scope.nytimesForm = {};
    $scope.nytimesForm.search_results = 0;
    $scope.getResult = function() {
        $scope.spinnerHidden = false;
        query = $scope.nytimesForm.seach_input;
        url = 'http://developer.nytimes.com/proxy/https/api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5ab701a8afca46d8a9ec1ad163a1482e'

        if (query) {
            url += '&q=' + query
        }

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            debugger;
            $scope.nytimesForm.search_results = response.data.response.docs;
            $scope.spinnerHidden = true;
        }, function errorCallback(response) {
            $scope.spinnerHidden = true;
        });
    };

    $scope.sendMeEmail = function() {
        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/v1/send_results',
            data: {
                email: $scope.nytimesForm.user_email,
                data: $scope.nytimesForm.search_results
            }
        }).then(function successCallback(response) {
            console.log('successful')
        }, function errorCallback(response) {
            console.log('bad request')
        });
    };

    $('#search_input').keydown(function () { $scope.spinnerHidden = false; });
    $('#search_input').keyup($.debounce(1000, false, $scope.getResult ));

    // $('#search_input').keyup($.debounce(1000, false, function() { console.log('qwe') }));
}]);
