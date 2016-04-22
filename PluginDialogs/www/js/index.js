/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    alert: function(){

        function alertDismissed() {
            alert('Usuário clicou no botão OK');
        }

        navigator.notification.alert(
            'Registro salvo com sucesso!',  // message
            alertDismissed,         // callback
            'Sucesso!',            // title
            'OK'                  // buttonName
        );
    },

    confirm: function(){

        function onConfirm(buttonIndex) {
            alert('Usuário clicou no botão ' + buttonIndex);
        }

        navigator.notification.confirm(
            'Erro ao salvar registro. Deseja tentar novamente?', // message
             onConfirm,            // callback to invoke with index of button pressed
            'Erro!',           // title
            ['Sim','Não']     // buttonLabels
        );
    },

    prompt: function(){

        function onPrompt(results) {
            alert('Usuário clicou no botão ' + 
                results.buttonIndex + 
                " e digitou " + results.input1);
        }

        navigator.notification.prompt(
            'Informe seu nome',  // message
            onPrompt,                  // callback to invoke
            'Registro',            // title
            ['Ok','Cancelar'],             // buttonLabels
            'seu nome'                 // defaultText
        );
    },

    beep: function(){
        navigator.notification.beep(3);
    }
};
