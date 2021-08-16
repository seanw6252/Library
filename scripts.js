let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    return this.read ? `${this.title} by ${this.author}, ${this.pages} pages, read` : `${this.title} by ${this.author}, ${this.pages} pages, not read yet`
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary() {

}

function removeBookFromLibrary() {

}

function updateReadStatus(bookElement, book) {
    bookRead = bookElement.querySelector('.book-read');
    if (book.read) {
        bookRead.classList.remove("book-read-false");
        bookRead.classList.add("book-read-true");
        bookRead.textContent = "Read";
    } else {
        bookRead.classList.remove("book-read-true");
        bookRead.classList.add("book-read-false");
        bookRead.textContent = "Unread";
    }
}

function createBookElement(book, bookIndex) {
    const bookElement = document.createElement('div');
    bookElement.classList.add("book");
    bookElement.dataset.index = bookIndex;
    
    const bookTitle = document.createElement('h2');
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;
    bookElement.appendChild(bookTitle);

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = `by ${book.author}`;
    bookElement.appendChild(bookAuthor);

    const bookPages = document.createElement('p');
    bookPages.classList.add("book-pages");
    bookPages.textContent = `${book.pages} pages`;
    bookElement.appendChild(bookPages);

    const bookRead = document.createElement('button');
    bookRead.classList.add("book-read");
    bookRead.type = "button";
    if (book.read) {
        bookRead.textContent = "Read";
        bookRead.classList.add("book-read-true");
    } else {
        bookRead.textContent = "Unread";
        bookRead.classList.add("book-read-false");
    }
    bookRead.addEventListener('click', (e) => {
        bookIndex = e.target.parentElement.dataset.index;
        myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
        updateReadStatus(e.target.parentElement, myLibrary[bookIndex]);
    });
    bookElement.appendChild(bookRead);

    const deleteBook = document.createElement('button');
    deleteBook.classList.add("delete-book");
    deleteBook.type = "button";
    deleteBook.textContent = "Delete Book";
    deleteBook.addEventListener("click", (e) => {
        bookIndex = e.target.parentElement.dataset.index;
        const bookContainer = document.querySelector(".book-container");
        bookContainer.removeChild(e.target.parentElement);
        myLibrary.splice(bookIndex, 1);
        document.querySelectorAll(".book").forEach((book) => {
            if (book.dataset.index > bookIndex) {
                book.dataset.index--;
            }
        });
    });
    bookElement.appendChild(deleteBook);
   
    
    //Temporary for now. Change to return value later
    const bookContainer = document.querySelector(".book-container");
    bookContainer.appendChild(bookElement);
}

function toggleFormVisibility() {
    const addBookForm = document.querySelector(".form-container");
    if (addBookForm.style.display === "flex") {
        addBookForm.style.display = "none";
    } else {
        addBookForm.style.display = "flex";
    }
}

const addBookButton = document.querySelector(".add-book");
addBookButton.addEventListener('click', toggleFormVisibility);

const closeFormButton = document.getElementById("close-button");
closeFormButton.addEventListener('click', toggleFormVisibility);

let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
let book2 = new Book("Harry Potter", "J.K. Rowling", 299, false);
myLibrary.push(book1);
myLibrary.push(book2);
createBookElement(book1, 0);
createBookElement(book2, 1);
