'use strict';
/* global store, api*/
// eslint-disable-next-line no-unused-vars
const bookmarks = (function () {

// this function will genereate the bookmark html after a user  uses the add bookmark button
// untested
  function generateBookmarkElement(item) {
    let bookmarkTitle = `<span class="bookmark bookmark__checked">${bookmarks.title}</span>`;
    return `
      <li class="js-bookmark-element" data-item-id="${bookmarks.id}">
        ${bookmarkTitle}
      </li>`;
  }


  // this function maps through bookmarks and invokes the generateBookmarkElement function to create html for each entry in bookmarks
  // untested
  function generateBookmarkString(bookmarks) {
    const links = bookmarks.map((item) => generateBookmarkElement(item));
    return links.join('');
  }

  // render function 
  // needs works
  function render() {
    let items = store.items;
    console.log(items);
    // render the shopping list in the DOM
    console.log('`render` ran');
    const bookmarksString = generateBookmarkString(items);

    // insert that HTML into the DOM
    $('.bookmarks').html(bookmarksString);
  }


  function handleNewBookmarkSubmit() {
    $('#add-button').submit(function (event) {
      event.preventDefault();
      const newItemName = $('.bookmark-add').val();
      $('.bookmark-add').val('');
      api.createBookmark(newItemName, (newItem) => {
        store.addItem(newItem);
        render();
      });
    });
  }

  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-item-element')
      .data('item-id');
  }


  // this listener will handle when a user clicks on a bookmark to see the detailed view


  function handleBookmarkDetailedView() {
    $('.bookmarks').on('click', '.js-bookmark-element', event => {
      const id = getItemIdFromElement(event.currentTarget);
      const item = store.findById(id);
      api.updateBookmark(id, { checked: !item.checked }, () => {
        store.findAndUpdate(id, { checked: !item.checked });
        render();
      });
    });
  }

  // this listerner will handle when a user clicks on the delete bookmark option

  function handleDeleteBookmark() {
    $('.bookmarks').on('click', '.bookmark-delete', event => {
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteBookmark(id, () => {
        store.findAndDelete(id);
        render();
      });
    });
  }
 
  // this listener will handle when a user clicks on the edit bookmark option
  // uncomplete untested
  function handleEditBookmarkSubmit() {
    api.updateBookmark(id, { name: itemName }, () => {
      store.findAndUpdate(id, { name: itemName });
      render();
    });
  }


  // this listener will check for when the user select the minimum star sort
  // complete *untested
  function handleRatingToggle() {
    $('select').change(function () {
      store.toggleStars();
      render();
    });
  }


  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleBookmarkDetailedView();
    handleDeleteBookmark();
    handleEditBookmarkSubmit();
    handleRatingToggle();
  }

  // This object contains the only exposed methods from this module:
  return {
    render,
    bindEventListeners,
  };
}());
