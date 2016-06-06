angular.module('starter.services', [])

.factory('TarefasService', function(){

    var chave = 'tarefasIonic';

    function getTarefas(){
        var tarefas = window.localStorage[chave];
        if (tarefas) {
            return angular.fromJson(tarefas);
        }
        return [];
    }

    function salvar(tarefas){
        window.localStorage[chave] = angular.toJson(tarefas);
    }

    function obterProxId(){
        var idTarefa = window.localStorage['idTarefaIonic'];
        if (idTarefa){
            idTarefa++;
        } else {
            idTarefa = 1;
        }
        window.localStorage['idTarefaIonic'] = idTarefa;
        return idTarefa;
    }

    return {
      all: function(){
        return getTarefas();
      },
      salvar: function(tarefas){
        return salvar(tarefas);
      },
      obterProxId: function(){
        return obterProxId();
      }
    }
});
