var app = angular.module("myModule",[]);
app.controller("myController",function($http,$scope,$log){

                      $http.get("https://dash-api.com/api/v3/allData.php")
                      .then(function (response) {
                      console.log('get',response)
                      $scope.url = response.data.stations[2].stream_url;
                     
                       })
                      .catch(function (data) {
                      throw "error 1";
                   });
                   $http.get("http://ice55.securenetsystems.net/DASH36.m3u")
                      .then(function (response) {
                      console.log('get',response.data);
                     
                        var playlist = M3U.parse(response.data);
                      
                       })
                      .catch(function (data) {
                      throw "error 1";
                   });
                
                     
                   


 });
   