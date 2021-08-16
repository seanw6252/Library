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
   
    return bookElement;
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

const addBookForm = document.getElementById("add-form");
addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    myLibrary.push(new Book(title, author, pages, read));
    const bookIndex = myLibrary.length - 1;

    const bookContainer = document.querySelector(".book-container");
    bookContainer.appendChild(createBookElement(myLibrary[bookIndex], bookIndex));

    form.reset();
    toggleFormVisibility();
});

let book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
let book2 = new Book("Harry Potter", "J.K. Rowling", 299, false);
myLibrary.push(book1);
myLibrary.push(book2);

const bookContainer = document.querySelector(".book-container"); 
for (let i = 0; i < myLibrary.length; i++) {
    bookContainer.appendChild(createBookElement(myLibrary[i], i));
}
