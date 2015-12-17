'use strict';

var user = {
  id: null,
  token: null
};


var api = {

  url: 'http://localhost:3000',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxhr: jqxhr, status: status, error: error});
    });
  },

/*---- AJAX ---- */

  register: function register(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/register',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  login: function login(credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      dataType: 'json'
    }, callback);
  },

  logout: function logout(id, token, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/logout/' + id,
      headers: {
        Authorization:'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  listItems: function list(token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/items',
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  listOneItem: function list(itemId, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/items/' + itemId,
      headers: {
        Authorization: 'Token token=' + token
      },
      dataType: 'json'
    }, callback);
  },

  createItem: function create(item, token, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/items/',
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(item),
      dataType: 'json',
    }, callback);
  },


  editItem: function (itemId, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/items/' + itemId,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json'
    }, callback);
  },

  deleteItem: function(itemId, token, callback) {
    this.ajax({
      method: 'DELETE',
      url: this.url + '/items/' + itemId,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      xhrFields: {
        withCredentials: true
      }
    }, callback);
  },

};

// $(document).ready(...
$(function() {
  var form2object = function(form) {
    var data = {};
    $(form).children().each(function(index, element) {
      var type = $(this).attr('type');
      if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
        data[$(this).attr('name')] = $(this).val();
      }
    });
    return data;
  };

  var wrap = function wrap(root, formData) {
    var wrapper = {};
    wrapper[root] = formData;
    return wrapper;
  };

  var callback = function callback(error, data) {
    if (error) {
      console.error(error);
      $('#result').val('status: ' + error.status + ', error: ' +error.error);
      return;
    }
    $('#result').val(JSON.stringify(data, null, 4));
  };


/*---- Click Handlers for Register/Login/Logout ---- */


  $('#register').on('submit', function(e) {
    e.preventDefault();
    var credentials = wrap('credentials', {
      email : e.target.email.value,
      password : e.target.password.value,
      password_confirmation : e.target.password_confirmation.value
    });
    api.register(credentials, callback);
    console.log(credentials);
  });

  $('#login-form').on('submit', function(e) {
    var credentials = wrap('credentials', form2object(this));
    var cb = function cb(error, data) {
      if (error) {
        callback(error);
        return;
      }
      callback(null, data);
      user.id = data.user.id; // stores value of user.id
      user.token = data.user.token; // stores value of user.token
      console.log(user);
      $('.token').val(data.user.token);

    var token = user.token;
    api.listItems(token, listItemCB);
    };

    $('#login-form').click(function() {
      $('#hero').hide();
      $('#loan-items-examples').hide();
      $('#user-dashboard').show();
      $('#map').show();
      $('.logout-link').show();
      $('#register-prompt').hide();
      $('#signin-prompt').hide();
    });
    e.preventDefault();
    api.login(credentials, cb);
  });

  $('.logout-link').on('click', function(e) {
    e.preventDefault();
    var token = user.token;
    var id = user.id;
    api.logout(id, token, callback);
  });

  $('.dashboard-items').on('click', '#delete-button', function(e) {
     e.preventDefault();
     var itemId = $(e.target).data('itemid');
     api.deleteItem(itemId, user.token, function (err, data){
      if (err){
        console.error(err);
      } else {
        console.log("DELTETED");

         }
      });
    });

/*---- Click Handlers for List/Create/Edit/Dele Items ---- */

$('#create-item').on('submit', function(e){
    e.preventDefault();
    var token = user.token;

    var reader = new FileReader();
    // var newItem = form2object(this);

    reader.onload = function(event){

      $.ajax({
        url: 'http://localhost:3000/items',
        method: 'POST',
        data: { item: {
          title: $('#title').val(),
          zipcode: $('#zipcode').val(),
          description: $('#description').val(),
          phone_number: $('#phone-number').val(),
          item_image: event.target.result

         }
        }, headers: {
          Authorization: 'Token token=' + token
        }

      }).done(function(response){

      }).fail(function(response){
        console.error('Whoops!');
      })
    };

    var $fileInput = $('#item_image');
    console.log(item_image);
    reader.readAsDataURL($fileInput[0].files[0]);
    // api.createItem(item, token, createItemCB);

  });


  $('.dashboard-items').on('click', '#edit-button', function(e) {
    var itemId = $(e.target).data('itemid');
    api.listOneItem(itemId, user.token, listOneItemCB);
    console.log('You hit edit');
    });

    // e.preventDefault();
    // var token = user.token;



    var reader = new FileReader();
    // var newItem = form2object(this);

    reader.onload = function(event){

      $.ajax({
        url: 'http://localhost:3000/items',
        method: 'PATCH',
        data: { item: {
          title: $('#title').val(),
          zipcode: $('#zipcode').val(),
          description: $('#description').val(),
          phone_number: $('#phone-number').val(),
          item_image: event.target.result

         }
        }, headers: {
          Authorization: 'Token token=' + token
        }

      }).done(function(response){

      }).fail(function(response){
        console.error('Whoops!');
      });
    };
    var $fileInput = $('#item_image');
    console.log(item_image);
    reader.readAsDataURL($fileInput[0].files[0]);
    // api.editItem(item, token, editItemCB);

  });

/*---- Callback Functions ---- */

  var createItemCB = function createItemCB(err, data) {
    if(err) {
      callback(err);
      return;
    }

    $('#itemId').val(data.item.id);
    callback(null, data);
  };

  var listItemCB = function listItemCB(err, data) {
    if(err) {
      callback(err);
      return;
    }
    console.log(data);

    var userItemsTemplate = Handlebars.compile($("#userItemsDashboard").html());
    var newHTML= userItemsTemplate(data);
    $('#put-items-here').html(newHTML);
    };


  var listOneItemCB = function listOneItemCB(err, data) {
    debugger;
    if(err) {
      callback(err);
      return;
    }
    console.log(data);

    $('form').loadJSON(data);

    };


  // var editItemCB = function editItemCB(err, data) {
  //   if(err) {
  //     callback(err);
  //     return;
  //   }
  //   console.log(data);

  //   var editItemsTemplate = Handlebars.compile($("#userItemsDashboard").html());
  //   var newHTML= editItemsTemplate(data);
  //   $('#edit-item').html(newHTML);
  //   };

  //   $('#itemId').val(data.item.id);
  //   callback(null, data);


  // var editItemCB = function editItemCB(err, data) {
  //   if(err) {
  //     callback(err);
  //     return;
  //   }

  //   $('#itemId').val(data.item.id);
  //   callback(null, data);
  // };


// DO NOT ERASE
// });
