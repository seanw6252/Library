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