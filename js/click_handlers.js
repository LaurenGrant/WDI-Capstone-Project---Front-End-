'use strict';

/*---- Click Handlers ---- */

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

$('.signin-link').click(function() {
  $('.dropdown-menu').show();
});

$('#edit-button').click(function() {
  $('.create-form').hide();
  $('.edit-form').show();
  $('.add-item-here').hide();
  $('.edit-item-here').show();
});

