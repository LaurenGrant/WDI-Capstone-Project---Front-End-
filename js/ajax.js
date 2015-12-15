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

  listItems: function list(item, token, callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/items',
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


  editItem: function (item, token, callback) {
    this.ajax({
      method: 'PATCH',
      url: this.url + '/items/' + id,
      headers: {
        Authorization: 'Token token=' + token
      },
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({}),
      dataType: 'json'
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
    };
    e.preventDefault();
    api.login(credentials, cb);
  });

  // $('#logout').on('submit', function(e) {
  //   var token = $('.token').val();
  //    // user.token;
  //   var id = user.id;
  //   e.preventDefault();
  //   api.logout(id, token, callback);
  // });

/*---- Click Handlers for List/Create/Edit Items ---- */

// $('#list-items').on('submit', function(e) {
//     var token = $('.token').val();
//     e.preventDefault();
//     api.listEvents(item, token, callback);
//   });

$('#create-item').on('submit', function(e) {
  var item = {
    item: {
      title: $('#title').val(),
      zipcode: $('#zipcode').val(),
      image: $('#image').val(),
      description: $('#description').val()
    }
  };

  var token = $('.token').val();
  e.preventDefault();
  api.createEvent(item, token, createItemCB);
});

  // $('#edit-item').on('submit', function(e) {
  //   var itemData = {"item":
  //     {
  //     title: $('#title').val(),
  //     zipcode: $('#zipcode').val(),
  //     image: $('#image').val(),
  //     description: $('#description').val()
  //     }
  //   };

    // var token = $('.token').val();
    // e.preventDefault();

  //   $.ajax({
  //     method: 'PATCH',
  //     url: api.url + '/events/' + eventData.event.id,
  //     headers: {
  //       Authorization: 'Token token=' + token
  //     },
  //     contentType: 'application/json; charset=utf-8',
  //     data: JSON.stringify(eventData),
  //     dataType: 'json'
  //   })
  //   .done(function(){
  //     console.log('updated this event!');
  //   });
  //   //api.editEvent(event, token, editEventCB);
  // });
  // });

/*---- Callback Functions ---- */

  var createItemCB = function createItemCB(err, data) {
    if(err) {
      callback(err);
      return;
    }

    $('#itemId').val(data.item.id);
    callback(null, data);
  };

  // var listItemCB = function listItemCB(err, data) {
  //   if(err) {
  //     callback(err);
  //     return;
  //   }
  //   $('#itemId').val(data.item.id);
  //   callback(null, data);
  // };

  // var editEventCB = function editEventCB(err, data) {
  //   if(err) {
  //     callback(err);
  //     return;
  //   }

  //   $('#eventId').val(data.event.id);
  //   callback(null, data);
  // };
});
