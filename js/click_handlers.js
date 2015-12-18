'use strict';

/*---- Click Handlers ---- */

$('#register-prompt').click(function() {
  $('.test-reg-form').show();
  $('.intro-text').hide();
});

$('.signin-link').click(function() {
  $('.dropdown-menu').show();
});

$('.dashboard-items').on('click', '#edit-button',function() {
  $('.create-form').hide();
  $('.edit-form').show();
  $('.add-item-here').hide();
  $('.edit-item-here').show();
});

// var map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'your.mapbox.project.id',
//     accessToken: 'your.mapbox.public.access.token'
// }).addTo(map);
