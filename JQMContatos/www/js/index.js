var app = {

    localStorage: window.localStorage,
    contactInfo: null,

    initialize: function() {
        this.initFastClick();
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        $(document).on('click', '#contactList li.contact_list_item', function(){
            var selectedID = $(this).attr('id');
            app.getContactByID(selectedID);
        });

        $(document).bind("pagechange", this.onPageChange);
    },

    initFastClick : function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    },

    onDeviceReady: function() {

      if (device.platform === 'iOS'){
         StatusBar.overlaysWebView(false);
      }

      app.getAllContacts();

    },

    getAllContacts: function(){

        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var fields = [navigator.contacts.fieldType.name];
        navigator.contacts.find(fields, this.onAllSuccess, this.onError, options);

    },

    alphabeticalSort: function(a, b) {
         if (a.name.formatted < b.name.formatted){
            return -1;
         }else if (a.name.formatted > b.name.formatted){
           return  1;
         }else{
           return 0;
         }
    },

    onAllSuccess: function(contacts){

        if (contacts.length){

          var length = 30; //limitado a 30 contatos
          if (contacts.length < 30){
              length = contacts.length;
          }

          contacts.sort(app.alphabeticalSort);

          var myContacts = [];
          for(var i=0; i<length; ++i){
              if(contacts[i].name){
                  var contact = {};
                  contact.id = contacts[i].id;
                  contact.name = contacts[i].name;
                  contact.phoneNumbers = contacts[i].phoneNumbers;
                  myContacts.push(contact);
              }
          }
          var appendList = '';
          var letter = myContacts[0].name.formatted[0];
          for(var i=0; i<length; ++i){
              var contact = myContacts[i];
              if(contacts[i].name){
                  if( letter !== contact.name.formatted[0] ) {
                     letter = contact.name.formatted[0];
                      appendList += '<li data-role="list-divider">' + letter + '</li>';

                  }
                  appendList += '<li class="contact_list_item" id="' + contact.id +
                    '"><a href="#contact-info">' + contact.name.formatted +
                    ' (' + contact.id + ')</a></li>';

                  app.localStorage.setItem(contact.id,JSON.stringify(contact));
              }
          }

          $('#contactList').append(appendList);

      } else {
          $('#contactList').append('<li><h3>Nenhum contato encontrado.</h3.></li>');
      }

      $('#contactList').listview("refresh");
    },

    onError: function(error) {
        alert('Ocorreu um erro: ' + error.code);
    },

    onPageChange: function(event, data) {
        var toPageId = data.toPage.attr("id");
        switch (toPageId) {
            case 'contact-info':
                app.clearValues();
                $('#contact_header h1').html(app.contactInfo.name.formatted);
                $('#givenName').val(app.contactInfo.name.givenName);
                $('#familyName').val(app.contactInfo.name.familyName);
                $('#phone').val(app.contactInfo.phoneNumbers[0].value);
            break;
        }
    },

    clearValues: function() {
        $('input[type=text]').each(function() {
            $('#' + this.id + '').val('');
        });
    },

    getContactByID: function(contactID) {
        app.contactInfo = JSON.parse(app.localStorage.getItem(contactID));
        $.mobile.changePage($('#contact-info'));
    }
};
