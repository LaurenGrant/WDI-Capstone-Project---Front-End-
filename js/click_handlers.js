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

// $(document).ready(function(){

//   $('#create-item').on('submit', function(e){
//     e.preventDefault();
//     var token = user.token;

//     var reader = new FileReader();
//     var newItem = form2object(this);

//     reader.onload = function(event){
//       newItem.item_image = event.target.result;

//       $.ajax({
//         url: 'http://localhost:3000/items',
//         method: 'POST',
//         data: { item: newItem
//       }, headers: {
//           Authorization: 'Token token=' + token
//         }

//       }).done(function(response){

//       }).fail(function(response){
//         console.error('Whoops!');
//       })
//     };

//     $fileInput = $('#item_image');
//     reader.readAsDataURL($fileInput[0].files[0]);

//   });
// });
