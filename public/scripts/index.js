/* global $ store */
'use strict';

$(document).ready(function () {
  const store = {};

  $('.js-signup-from').on('submit', event => {
    event.preventDefault();

    const signupForm = $(event.currentTarget);
    const newUser = {
      firstname: signupForm.find('.js-firstname-entry').val(),
      lastname: signupForm.find('.js-lastname-entry').val(),
      username: signupForm.find('.js-username-entry').val(),
      password: signupForm.find('.js-password-entry').val()
    };

    $.ajax({
      type: 'POST',
      url: '/api/users',
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify(newUser)
    })
      .then(response => {
        signupForm[0].reset();
        console.info(`Thank you, ${response.firstname || response.username} for signing up!`);
      })
      .catch(err => {
        console.error(err.responseJSON.message);
      });
  });

  $('.js-login-form').on('submit', event => {
    event.preventDefault();

    const loginForm = $(event.currentTarget);
    const loginUNPW = {
      username: loginForm.find('.js-username-entry').val(),
      password: loginForm.find('.js-password-entry').val()
    };

    $.ajax({
      type: 'POST',
      url: '/api/login',
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify(loginUNPW)
    })
      .then(response => {
        store.username = loginUNPW.username;
        store.password = loginUNPW.password;
        loginForm[0].reset();
        console.info(`Welcome back, ${response.firstname || response.username}!`);
      })
      .catch(err => {
        console.error(err.responseJSON.message);
      });
  });

});
