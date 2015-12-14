'use strict';

/*---- Click Handlers ---- */

$('#test').click(function() {
  $('#hero').hide();
  $('#loan-items-examples').hide();
  $('#user-dashboard').show();
  $('#map').show();
  $('.logout-link').show();
  $('#register-prompt').hide();
  $('#signin-prompt').hide();
});

$('.logout-link').click(function() {
  $('#hero').show();
  $('#loan-items-examples').show();
  $('#user-dashboard').hide();
  $('#map').hide();
  $('#register-prompt').show();
  $('#signin-prompt').show();
  $('.logout-link').hide();
  $('.logout-link').hide();
});

$('#register-prompt').click(function() {
  $('.test-reg-form').show();
  $('.intro-text').hide();
});
