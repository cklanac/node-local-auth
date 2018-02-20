/* global $ */
'use strict';

const api = (function () {
  const post = function(path, obj) {
    return $.ajax({
      type: 'POST',
      url: path,
      contentType: 'application/json',
      dataType: 'json',
      processData: false,
      data: JSON.stringify(obj)
    });
  };

  return {
    post
  };
}());