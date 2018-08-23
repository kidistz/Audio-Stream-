var app = angular.module("myModule",[]);
app.controller("myController",function($http,$scope,$log){

     

                      $http.get("https://dash-api.com/api/v3/allData.php")
                      .then(function (response) {
                      console.log('get',response)
                      $scope.stations = response.data.stations.slice(0, 5);
                        for (let station of $scope.stations) {
                            $http.get(station.stream_url)
                      .then(function (response) {
                      console.log('get',response.data);
                     
                        var playlist = M3U.parse(response.data);
                        // for (let music of playlist) {
                        //     var audio = new Audio();
                        //     audio.src = music.file;
                        //     music.audio = audio;
                        // }
                        // console.log(playlist);
                        station.playlist = playlist;
                       })
                      .catch(function (data) {
                      throw "error 1";
                   });
                        }
                     
                       })
                      .catch(function (data) {
                      throw "error 1";
                   });
                   
                
                   $scope.start = () => {
                       console.log($scope.stations);
                   }
                //    $scope.parse=function () {
                //     var playlist = M3U.parse(response.data);
                //     var audio = new Audio();
                //     next(audio, playlist, 0);
                //   };

                // $scope.next = function(audio, playlist, i) {
                //     if (i < playlist.length) {
                //       audio.src = playlist[i++].file;
                //       audio.onended = next.bind(null, audio, playlist, i);
                //       audio.play();
                //     }
                //   };
                 



                     
                   


 });
   