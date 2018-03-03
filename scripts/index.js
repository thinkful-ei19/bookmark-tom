/* global $, eventhandle, api, store*/
'use strict';
// When DOM is ready:
// eslint-disable-next-line no-unused-vars
$(function () {
  eventhandle.render();
  eventhandle.bindEventListeners();
  api.getBookmark((bookmarks) => {
    bookmarks.forEach((item) => store.addBookmark(item));
    eventhandle.render();
  });
});
