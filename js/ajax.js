'use strict';

var user = {
  id: null,
  token: null
};

var api = {

  url: 'https://localhost:3000',

  ajax: function(config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxhr: jqxhr, status: status, error: error});
    });
  },

 };

/*---- AJAX ---- */
