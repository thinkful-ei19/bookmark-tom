/* global $, store , api*/
'use strict';
// eslint-disable-next-line no-unused-vars
const eventhandle = (function () {

// this function will genereate the bookmark html after a user  uses the add bookmark button
// tested

  function generateBookmarkElement(bookmarks) {
    let bookmarkTitle = `<span>${bookmarks.title}</span>`;
    let bookmarkStars = `<span>${bookmarks.rating}</span>`;
    let bookmarkDes = `<p>${bookmarks.desc}</p>`;
    let link = `<span href='${bookmarks.url}'></span>`;
    return `
      <li class="js-bookmark-element"${bookmarks.id}">
        ${bookmarkTitle}
        ${bookmarkStars}
        ${bookmarkDes}
        ${link}
      </li>`;
  }


  // this function maps through bookmarks and invokes the generateBookmarkElement function to create html for each entry in bookmarks
  // tested
  
  function generateBookmarkString(items) {
    const links = store.bookmarks.map((item) => generateBookmarkElement(item));
    console.log('generate string ran');
    return links.join('');
    
  }

  // render function 
  
  function render() {
    let items = store.bookmarks;
    if (store.adding) {
      $('.adding').show();
    } else {
      $('.adding').hide();
    }
    if (store.added) {
      $('#first-bookmark').hide();
    }
    console.log('`render` ran');
    const bookmarksString = generateBookmarkString(items);
    console.log(bookmarksString);
    // insert that HTML into the DOM
    $('.bookmarks').html(bookmarksString);
  }


// tested

  function handleAddBookmark() {
    $('.bookmark-add').on('click', event => {
      store.toggleAdding();
      render();
    });
  }

// tested

  function handleNewBookmarkSubmit() {
    $('#js-add-bookmark-form').submit(function (event) {
      console.log('handleNewBookmark Submit ran');
      event.preventDefault();
      const title = $('.title').val();
      const desc = $('.description').val();
      const url = $('.url').val();
      const rating = $('.stars').val();
      const data = {title, desc, url, rating};
      console.log(data);
      api.createBookmark(data, (newItem) => {
        store.toggleAdding();
        store.addBookmark(newItem);
        store.toggleIntro();
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
