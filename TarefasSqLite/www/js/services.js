angular.module('starter.services', [])

.factory('TarefasService', function($q){

    var db;

    function createDB(){

      try {
        //db = openDatabase('tarefasDB', '1.0', 'db app ionic', 2 * 1024 * 1024);

        db = window.sqlitePlugin.openDatabase({name: 'tarefasDB.db', location: 'default'}, function(db) {
          db.transaction(function(tx) {
            db.transaction(function (tx) {
              tx.executeSql('CREATE TABLE IF NOT EXISTS tarefas (task_id INTEGER PRIMARY KEY ASC, task_name varchar(200))');
            });
          }, function(err) {
            alert('Open database ERROR: ' + JSON.stringify(err));
          });
        });
      }catch (err){
        alert('Erro: ' + erro);
      }
      console.log('Banco de dados criado/aberto');
    }

    function read(){
      return promessaQuery('SELECT * from tarefas',
        callBackSucesso, callBackErro);
    }

    function create(nome){
      return promessaQuery('INSERT INTO tarefas(task_name) VALUES ("' + nome +'")',
        callBackSucesso, callBackErro);
    }

    function update(nome, id){
      return promessaQuery('UPDATE tarefas SET task_name = "' + nome +'" WHERE task_id = ' + id,
        callBackSucesso, callBackErro);
    }

    function deleteTarefa(id){
      return promessaQuery('DELETE FROM tarefas WHERE task_id = ' + id,
        callBackSucesso, callBackErro);
    }

    function promessaQuery(query, sucessCallback, errorCallback){
        var deferido = $q.defer();
        db.transaction(function (tx) {
          tx.executeSql(query, [], sucessCallback(deferido),
            errorCallback(deferido));
        });
        return deferido.promise;
    }

    function callBackSucesso(deferido){
        return function (tx, results){
          var len = results.rows.length, i;
          var resultados = [];
          for (i = 0; i < len; i++) {
              var tarefa = {
                  id : results.rows.item(i).task_id,
                  nome: results.rows.item(i).task_name
              }
              resultados.push(tarefa);
            console.log(results.rows.item(i).task_name);
          }
          deferido.resolve(resultados);
        };
    }

    function callBackErro(deferido){
        return function (tx, results){
            var resultados = [];
            deferido.resolve(resultados);
        }
    }

    return {
      createDB: function(){
        return createDB();
      },
      read: function(){
        return read();
      },
      update: function(nome, id){
        return update(nome, id);
      },
      create: function(nome){
        return create(nome);
      },
      deleteTarefa: function(id){
        return deleteTarefa(id);
      }
    }
});
