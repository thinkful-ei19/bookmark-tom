/* global $ */
'use strict';
// eslint-disable-next-line no-unused-vars
const api = (function () {

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/tom/bookmarks';

  const getBookmark = function (callback) {
    $.getJSON(BASE_URL, callback);
  };

  const createBookmark = function (data, callback) {
    const bookmark = {
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: callback
    };
  };
// editBookmark in the future


  return {
    getBookmark,
    createBookmark
  };

}());