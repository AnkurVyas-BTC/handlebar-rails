Books = {};
Books.Listing = {
  ListingFunctions: {
    fetchBooks: function () {
      $.get('/books', function (data) {
        booksListHtml = HandlebarsTemplates['book_list']({
          books: data
        });
        $('#book-list').html(booksListHtml);
      });
    },
    newBookButtonClickEvent: function () {
      $(document).on('click', '#new-book', function () {
        addBookHtml = HandlebarsTemplates['new_book']();
        $('#book-list').html(addBookHtml);
      });
    },
    listButtonClickEvent: function () {
      $(document).on('click', '#list-books', function () {
        Books.Listing.ListingFunctions.fetchBooks();
      });
    },
    submitBookClickEvent: function () {
      $(document).on('click', '#submit-book', function (e) {
        e.preventDefault();
        currentForm = $('form');
        $.ajax({
          url: currentForm.attr('action'),
          type: currentForm.attr('method'),
          data: currentForm.serialize(),
          success: function (data) {
            Books.Listing.ListingFunctions.fetchBooks();
          }
        });
      });
    },
    editBookClickEvent: function () {
      $(document).on('click', '.edit-book', function () {
        bookId = $(this).attr('data-book-id');
        $.get('/books/' + bookId, function (data) {
          editBookHtml = HandlebarsTemplates['edit_book'](data);
          $('#book-list').html(editBookHtml);
        })
      });
    },
    deleteBookClickEvent: function () {
      $(document).on('click', '.delete-book', function () {
        bookId = $(this).attr('data-book-id');
        $.ajax({
          method: 'DELETE',
          url: '/books/' + bookId,
          success: function (data) {
            Books.Listing.ListingFunctions.fetchBooks();
          }
        });
      });
    },
    documentOnReady: function () {
      this.fetchBooks();
      this.newBookButtonClickEvent();
      this.listButtonClickEvent();
      this.submitBookClickEvent();
      this.editBookClickEvent();
      this.deleteBookClickEvent();
    }
  }
}

$(document).ready(function () {
  Books.Listing.ListingFunctions.documentOnReady();
});