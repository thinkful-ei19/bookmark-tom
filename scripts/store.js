'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function () {
  const addBookmark = function (item) {
    console.log('addBookmark ran');
    this.items.push(item);
  };

  const findById = function (id) {
    console.log(' findById ran');
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function (id) {
    console.log('findAndDelete ran');
    this.items = this.items.filter(item => item.id !== id);
  };

  const toggleExpandedView = function () {
    console.log('ExpandedView ran');
    this.expanded = !this.expanded;
  };

  const toggleAdding = function () {
    console.log('toggleAdding ran');
    this.adding = !this.adding;
  };



  return {
    items: [],
    expanded: false,
    adding: false,
    addBookmark,
    findById,
    findAndDelete,
    toggleExpandedView,
    toggleAdding
  };

}());
