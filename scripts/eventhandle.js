/* global $, store , api*/
'use strict';
// eslint-disable-next-line no-unused-vars
const eventhandle = (function () {

// this function will genereate the bookmark html after a user  uses the add bookmark button
// tested

  function generateBookmarkElement(bookmarks) {
    return `
         <li class='js-bookmark-element' data-bookmark-id=${bookmarks.id}>
    <div class='not-extended'>
        <p><h1 class='bookmark-title'>${bookmarks.title}</h1>
        <span class='bookmark-rating'>${bookmarks.rating}</span></p>
        <div class="bookmark-controls">
              <button class="bookmark-expand">
                <span class="button-label">View Details</span>
              </button>
              <button class="bookmark-delete">
                <span class="button-label">Delete Bookmark</span>
              </button>
        </div>
    </div>
    <div class='hidden'>
      <p class='desc'>${bookmarks.desc}</p>
      <form action = ${ bookmarks.url }> 
      <input type="submit" value='Link to site' >
      </form >
    </div>
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
    // console.log(bookmarksString);
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
      const expanded = false;
      const data = {title, desc, url, rating, expanded};
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
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }


  // this listener will handle when a user clicks on a bookmark to see the detailed view


  function handleBookmarkDetailedView() {
    $('.bookmarks').on('click', '.bookmark-expand', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      const item = store.findById(id);
      store.toggleExpandedView(item);
      render();
    });
  }
  

  // this listerner will handle when a user clicks on the delete bookmark option

  function handleDeleteBookmark() {
    $('.bookmarks').on('click', '.bookmark-delete', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      console.log(id);
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
