/* global  */
'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function () {
  const addBookmark = function (item) {
    this.items.push(item);
  };

  const findById = function (id) {
    return this.items.find(item => item.id === id);
  };

  const findAndUpdate = function (id, newData) {
    let foundItem = this.findById(id);
    console.log(foundItem);
    let mergedItem = Object.assign(foundItem, newData);
  };


  const findAndDelete = function (id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const toggleCheckedFilter = function () {
    this.expanded = !this.expanded;
  };

  const toggleAdding = function () {
    this.adding = !this.adding;
  };



  return {
    items: [],
    expanded: false,
    adding: false,
    addBookmark,
    findById,
    findAndDelete,
    toggleCheckedFilter,
    findAndUpdate,
    toggleAdding
  };

}());
