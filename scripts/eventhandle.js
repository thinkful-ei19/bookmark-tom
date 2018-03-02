/* global $, store , api*/
'use strict';
// eslint-disable-next-line no-unused-vars
const eventhandle = (function () {

// this function will genereate the bookmark html after a user  uses the add bookmark button
// untested
  function generateBookmarkElement(bookmarks) {
    let bookmarkTitle = `<span>${bookmarks.title}</span>`;
    return `
      <li class="js-bookmark-element"${bookmarks.id}">
        ${bookmarkTitle}
      </li>`;
  }


  // this function maps through bookmarks and invokes the generateBookmarkElement function to create html for each entry in bookmarks
  // untested
  function generateBookmarkString(items) {
    const links = store.items.map((item) => generateBookmarkElement(item));
    console.log('generate string ran');
    return links.join('');
    
  }

  // render function 
  function render() {
    let items = store.items;
    if (store.adding) {
      $('.adding').show();
    } else {
      $('.adding').hide();
    }
    console.log('`render` ran');
    const bookmarksString = generateBookmarkString(items);
    console.log(bookmarksString);
    // insert that HTML into the DOM
    $('.bookmarks').html(bookmarksString);
  }


  function handleAddBookmark() {
    $('.bookmark-add').on('click', event => {
      store.toggleAdding();
      render();
    });
  }
    


  function handleNewBookmarkSubmit() {
    $('#js-add-bookmark-form').submit(function (event) {
      console.log('handleNewBookmark Submit ran');
      event.preventDefault();
      const newItemName = $('.title').val();
      const newItemDes = $('.description').val();
      const newItemUrl = $('.url').val();
      const newItemStars = $('.stars').val([1,2,3,4,5]);
      console.log(newItemName);
      const data = {newItemName, newItemDes, newItemUrl, newItemStars};
      console.log(data);
      api.createBookmark(data, (newItem) => {
        store.toggleAdding();
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
      const id = getBookmarkIdFromElement(event.currentTarget);
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
      const id = getBookmarkIdFromElement(event.currentTarget);
      api.deleteBookmark(id, () => {
        store.findAndDelete(id);
        render();
      });
    });
  }
 
  // this listener will handle when a user clicks on the edit bookmark option
  // uncomplete untested
  // function handleEditBookmarkSubmit() {
  //   api.updateBookmark(id, { name: title rate  }, () => {
  //     store.findAndUpdate(id, { name: itemName });
  //     render();
  //   });
  // }


  // this listener will check for when the user select the minimum star sort
  // complete *untested
  // function handleRatingToggle() {
  //   $('select').change(function () {
  //     store.toggleStars();
  //     render();
  //   });
  // }





  function bindEventListeners() {
    handleNewBookmarkSubmit();
    handleBookmarkDetailedView();
    handleDeleteBookmark();
    //handleRatingToggle();
    handleAddBookmark();
  }

  // This object contains the only exposed methods from this module:
  return {
    render,
    bindEventListeners,
  };
}());
