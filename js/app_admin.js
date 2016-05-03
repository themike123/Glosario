/* Controlador para secretario */
var app = angular.module('admin', [])
/*
.filter('custom', function() {
  return function(input, search) {
    if (!input) return input;
    if (!search) return input;
    var expected = ('' + search).toLowerCase();
    var result = {};
    angular.forEach(input, function(value, key) {
      var actual = ('' + value).toLowerCase();
      if (actual.indexOf(expected) !== -1) {
        result[key] = value;
      }
    });
    return result;
  }
});*/

var url_server = 'http://192.168.43.200:8080/';
//var url_server = 'http://192.168.1.102:8080/';
//var url_server = 'http://159.203.128.165:8080/';
app.controller('glosarioController', function($scope, $http){
  var todo = JSON.parse(localStorage.getItem("definiciones"));

  $scope.definiciones={};
  $scope.definiciones =todo;

  /* Llamamos a la función para obtener la lista de usuario al cargar la pantalla */
  getDefiniciones();
  /* Método para obtener la lista de usuario */

  if ($scope.definiciones.length == 0) {
    $("#avisos").empty();
    $("#avisos").append('<div class="card-panel"><span class="blue-text text-darken-2">No hay Términos</span></div>');
  }

  function getDefiniciones() {
      $http.get(url_server+'definicion/listar').success(function(response){
          if(response.type) {
              $scope.definiciones = response.data;
              console.log("Difiniciones:"+JSON.stringify($scope.definiciones));
              if($scope.definiciones.length == 0){
                $("#avisos").empty();
                $("#avisos").append('<div class="card-panel"><span class="blue-text text-darken-2">No hay Términos</span></div>');
              }
              console.log("aver:"+localStorage.getItem("definicioneseeee"));
              if(typeof(Storage) !== "undefined"){
                if (localStorage.getItem("definiciones")!=null) {
                  localStorage.removeItem("definiciones");
                  localStorage.clear();
                }
                localStorage.setItem("definiciones", JSON.stringify(response.data));
              }else{
                console.log("No se pudo guardar la información en memoria");
              }
          }
      })
  }

});
