/* global $, eventhandle, api, store*/
'use strict';
// When DOM is ready:
// eslint-disable-next-line no-unused-vars
$(function () {
  api.getBookmark((bookmarks) => {
    bookmarks.forEach((item) => store.addBookmark(item));
    eventhandle.render();
  });

  eventhandle.bindEventListeners();
  eventhandle.render();
});
