angular.module('starter.controllers', ['ionic'])

.controller('MyCtrl', function($scope) {

  $scope.data = {
    showDelete: false
  };

  $scope.add = function() {
      var task = prompt('Entre com a tarefa');
      if (task){
        $scope.items.push({id: $scope.idGerado++, nome: task});
      }
  };

  $scope.edit = function(item) {
    var task = prompt('Entre com a tarefa');
    if (task){
      //$scope.items.push({id: task});
      for (var i=0; i<$scope.items.length; i++){
        if (item.id === $scope.items[i].id){
            item.nome = task;
        }
      }
    }
  };

  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };

  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

  $scope.idGerado = 1;

  $scope.items = [
    { id: 0, nome: 'aaaaaaaaa' }
  ];

});
