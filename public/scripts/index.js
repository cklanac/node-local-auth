/* global $ store api */
'use strict';

$(document).ready(function () {
  const store = {};

  $('.js-signup-from').on('submit', event => {
    event.preventDefault();

    const signupForm = $(event.currentTarget);
    const newUser = {
      fullname: signupForm.find('.js-fullname-entry').val(),
      username: signupForm.find('.js-username-entry').val(),
      password: signupForm.find('.js-password-entry').val()
    };

    api.post('/api/users', newUser)
      .then(response => {
        signupForm[0].reset();
        $('.js-message').text(`Thank you, ${response.fullname || response.username} for signing up!`);
      })
      .catch(err => {
        $('.js-message').text(err.responseJSON.message);
      });
  });

  $('.js-login-form').on('submit', event => {
    event.preventDefault();

    const loginForm = $(event.currentTarget);
    const loginInfo = {
      username: loginForm.find('.js-username-entry').val(),
      password: loginForm.find('.js-password-entry').val()
    };

    api.post('/api/login', loginInfo)
      .then(response => {
        store.username = loginInfo.username;
        store.password = loginInfo.password;
        loginForm[0].reset();
        $('.js-message').text(`Welcome back, ${response.fullname || response.username}!`);
      })
      .catch(err => {
        $('.js-message').text(err.responseJSON.message);
      });
  });

  $('#js-get-secret-with-unpw').on('click', event => {
    event.preventDefault();

    const loginInfo = {
      username: store.username,
      password: store.password
    };

    api.post('/api/protected', loginInfo)
      .then(response => {
        $('.js-message').text(response.data);
      })
      .catch(err => {
        $('.js-message').text(err.responseJSON.message);
      });
  });
  $('#js-get-secret-wout-unpw').on('click', event => {
    event.preventDefault();
    
    api.post('/api/protected')
      .then(response => {
        $('.js-message').text(response);
      })
      .catch(err => {
        $('.js-message').text(err.responseJSON.message);
      });
  });

});
