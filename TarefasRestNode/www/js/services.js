angular.module('starter.services', ['ngResource'])

.factory('TarefasService', function($resource){

    var data = $resource('http://localhost:8000/api/tasks/:id',
      {id: '@id'},
      {
          update:{
            method:'PUT'
          }
    });

    return data;
});
