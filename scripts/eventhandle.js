/* global $, store , api*/
'use strict';
// eslint-disable-next-line no-unused-vars
const eventhandle = (function () {

  // this function will generate the bookmark html after a user  uses the add bookmark button
  // tested

  function generateBookmarkElement(bookmarks) {
    if (bookmarks.expanded) {
      return `
         <li class='js-bookmark-element' data-bookmark-id=${bookmarks.id}>
    <div class='not-extended'>
        <p><h1 class='bookmark-title'>${bookmarks.title}</h1>
        <span class='bookmark-rating'>${bookmarks.rating}`  `Star Rating</span></p>
        <div class="bookmark-controls">
              <button class="bookmark-expand">
                <span class="button-label">View Details</span>
              </button>
              <button class="bookmark-delete">
                <span class="button-label">Delete Bookmark</span>
              </button>
        </div>
    </div>
    <div class='expanded hidden'>
      <p class='desc'>${bookmarks.desc}</p>
       <a href="${bookmarks.url}" target="_blank">
          <img src='bookmark-tom/icons8-link-50.png'></img>
          </a>
    </div>
</li>`;
    } else {
      return `
         <li class='js-bookmark-element' data-bookmark-id=${bookmarks.id}>
    <div class='not-extended'>
        <p><h1 class='bookmark-title'>${bookmarks.title}</h1>
        <span class='bookmark-rating'>${bookmarks.rating}Star Rating</span></p>
            </div>
    <div class='expanded'>
      <p class='desc'>${bookmarks.desc}</p>
      <a href="${bookmarks.url}"target="_blank"> 
      <img src="styles/link.png"> </img>
       </a>
    </div>
        <div class="bookmark-controls">
              <button class="bookmark-expand">
                <span class="button-label">View Details</span>
              </button>
              <button class="bookmark-delete">
                <span class="button-label">Delete Bookmark</span>
              </button>
        </div>
    </li>`;
    }    
  }

  // this function maps through bookmarks and invokes the generateBookmarkElement function to create html for each entry in bookmarks
  // tested
  // eslint-disable-next-line no-unused-vars
  function generateBookmarkString(items) {
    const links = items.map((item) => generateBookmarkElement(item));
    console.log('generate string ran');
    return links.join('');

  }

  // render function 

  function render() {
    let items = store.bookmarks.filter(obj => obj.rating >= store.minRating);
    
    // .filter(item => {
    //   return item.rating >= store.minRating;
    // });
    // if (items.rateing)
    console.log(items);
    if (store.adding) {
      $('.adding').show() && $('.nav').hide();
    } else {
      $('.adding').hide() && $('.nav').show();
    }
    if (store.added) {
      $('.introPlaceholder').hide();
    } else {
      $('.introPlaceholder').show();
    }
    const bookmarksString = generateBookmarkString(items);
    $('.bookmarks').html(bookmarksString);
  }

  // tested

  function handleIntro() {
    if ($('.bookmarks ul li').length >= 1) {
      store.toggleIntro();
      console.log('intro gone');
      render();
    }
  }



  // tested

  function handleAddBookmark() {
    // eslint-disable-next-line no-unused-vars
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
      const data = { title, desc, url, rating, expanded };
      console.log(data);
      api.createBookmark(data, (newItem) => {
        store.toggleAdding();
        store.addBookmark(newItem);
        render();
      });
    });
  }

  //tested

  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }


  // this listener will handle when a user clicks on a bookmark to see the detailed view


  function handleBookmarkDetailedView() {
    $('.bookmarks').on('click', '.bookmark-expand', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      store.toggleExpandedView(id);
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


  function handleStars() {
    $('.stars').on('change', function () {
      const stars = $('.stars').val();
      console.log(stars);
      console.log(typeof stars);
      store.ratingToggle(stars);
      render();
    });
  }

  const handleCancel = function () {
    $('.cancel').click(function () {
      store.toggleAdding();
      render();
    });
  };



  function bindEventListeners() {
    handleIntro();
    handleNewBookmarkSubmit();
    handleBookmarkDetailedView();
    handleDeleteBookmark();
    handleStars();
    handleAddBookmark();
    handleCancel();
  }

  // This object contains the only exposed methods from this module:
  return {
    render,
    bindEventListeners,
  };
}());
