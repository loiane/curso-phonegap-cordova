angular.module('starter.controllers', ['ionic'])

.controller('MyCtrl', function($scope, TarefasService) {

  $scope.data = {
    showDelete: false
  };

  $scope.items = TarefasService.all();

  $scope.add = function() {
      var task = prompt('Entre com a tarefa');
      if (task){
        $scope.items.push({id: TarefasService.obterProxId(), nome: task});
        TarefasService.salvar($scope.items);
      }
  };

  $scope.edit = function(item) {
    var task = prompt('Entre com a tarefa');
    if (task){
      //$scope.items.push({id: task});
      for (var i=0; i<$scope.items.length; i++){
        if (item.id === $scope.items[i].id){
            item.nome = task;
            break;
        }
      }
      TarefasService.salvar($scope.items);
    }
  };

  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
    TarefasService.salvar($scope.items);
  };

  $scope.onItemDelete = function(item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
    TarefasService.salvar($scope.items);
  };

});
