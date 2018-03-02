'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function () {
  const addBookmark = function (item) {
    console.log('addBookmark ran');
    this.bookmarks.push(item);
  };

  const findById = function (id) {
    console.log(' findById ran');
    return this.bookmarks.find(item => item.id === id);
  };

  const findAndDelete = function (id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
    console.log('findAndDelete ran');
  };

  const toggleExpandedView = function (bookmarks) {
    this.bookmarks = bookmarks.expanded = true;
    console.log('ExpandedView ran');
  };

  const toggleAdding = function () {
    console.log('toggleAdding ran');
    this.adding = !this.adding;
  };

  const toggleIntro = function () {
    console.log('intro gone');
    this.added = !this.added;
  };



  return {
    bookmarks: [],
    expanded: false,
    adding: false,
    addBookmark,
    findById,
    findAndDelete,
    toggleExpandedView,
    toggleAdding,
    toggleIntro
  };

}());
