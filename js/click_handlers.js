'use strict';

/*---- Click Handlers ---- */

// $('#sign-in').click(function() {
//   $('#hero').hide();
//   $('#loan-items-examples').hide();
//   $('#user-dashboard').show();
//   $('#map').show();
//   $('.logout-link').show();
//   $('#register-prompt').hide();
//   $('#signin-prompt').hide();
// });

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

// main.js
$(document).ready(function(){

  $('#paperclip-form').on('click', function(e){
    e.preventDefault();
    // creates a new instance of the FileReader object prototype
    var reader = new FileReader();

    //setting a function to be executed every time the reader successfully completes a read operation
    reader.onload = function(event){
      // once the data url has been loaded, make the ajax request with the result set as the value to key 'poster'
      $.ajax({
        url: 'http://localhost:3000/features',
        method: 'POST',
        data: { features: {
          featuredImage: event.target.result
        } }
      }).done(function(response){

      }).fail(function(response){
        console.error('Whoops!');
      })
    };

    // read the first file of the file input
    $fileInput = $('#featuredImage');
    reader.readAsDataURL($fileInput[0].files[0]);

  });
});
