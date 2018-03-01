/* global $ */
'use strict';
// eslint-disable-next-line no-unused-vars
const api = (function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/tom/bookmarks';

  const getBookmark = function (callback) {
    $.getJSON(BASE_URL, callback);
  };

  const createBookmark = function (data, callback) {
    $.ajax({
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: callback
    });
  };
  const updateBookmark = function (id, updateData, callback) {
    let stringUp = JSON.stringify(updateData);
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      dataType: 'json',
      data: stringUp,
      success: (response) => {
        console.log(response);
        callback(response);
      }
    });
  };

  const deleteBookmark = function (id, callback) {
    $.ajax({
      url: `${BASE_URL}/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      dataType: 'json',
      data: '',
      success: callback
    });
  };


  return {
    getBookmark,
    createBookmark,
    updateBookmark,
    deleteBookmark
  };

}());