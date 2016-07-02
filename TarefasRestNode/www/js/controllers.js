angular.module('starter.controllers', ['ionic'])

.controller('MyCtrl', function($scope, TarefasService) {

  $scope.data = {
    showDelete: false
  };

  $scope.lerTarefas = function(){
      $scope.items = TarefasService.query();
  }

  $scope.lerTarefas();

  $scope.add = function() {
      var task = prompt('Entre com a tarefa');
      if (task){
        TarefasService.save({name: task}, function(){
          alert('tarefa criada');
          $scope.lerTarefas();
        });
      }
  };

  $scope.edit = function(item) {
    var task = prompt('Entre com a tarefa');
    if (task){
      TarefasService.update({id: item._id}, {name: task}, function(){
        alert('tarefa atualizada');
        $scope.lerTarefas();
      });
    }
  };

  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
    //TarefasService.salvar($scope.items);
  };

  $scope.onItemDelete = function(item) {
    TarefasService.delete({id: item._id}, function(){
      alert('tarefa removida');
      $scope.lerTarefas();
    });
  };

});
