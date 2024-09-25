const myLibrary = [];

const bookArea = document.querySelector(".bookarea");
const bookList = document.querySelector(".booklist");

const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector(".addbookbutton");
const submitButton = document.querySelector(".submitbutton");
const cancelButton = document.querySelector(".cancelbutton");

addBookButton.addEventListener("click", () => dialog.showModal());
submitButton.addEventListener("click", createBook);
cancelButton.addEventListener("click", () => dialog.close());

//Book object

function Book(title, author, published, pages, genre, read) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.pages = pages;
    this.genre = genre;
    this.read = read;
    const id = null;
}

function DeleteBook(buttonID) {
    const allBooks = document.querySelectorAll(".book");
    for (item of allBooks) {
        if (Number(item.getAttribute("data-id")) === buttonID) {
            item.remove();
            myLibrary.splice(buttonID, 1);
        }
    }
}

Book.prototype.toggleRead = function (buttonID, bookReadButton) {
    if (this.id === buttonID) {
        if (this.read === "Read") {
            this.read = "Not Read";
            bookReadButton.textContent = "Not Read";
            bookReadButton.style.backgroundColor = "rgb(216, 60, 60)";
        }
        else {
            this.read = "Read";
            bookReadButton.textContent = "Read";
            bookReadButton.style.backgroundColor = "rgb(56, 109, 255)";
        }
    }
}

//Called when creating new book in modal

function createBook(e) {
    const form = document.querySelector("form");
    const title = form.elements.title.value;
    const author = form.elements.author.value;
    const published = form.elements.published.value;
    const pages = form.elements.pages.value;
    const genre = form.elements.genre.value;
    const read = form.elements.read.value;
    e.preventDefault();
    addBookToLibrary(title, author, published, pages, genre, read);
}

//Adds book to array and calls function to update page visually

function addBookToLibrary(title, author, published, pages, genre, read) {
    const newBook = new Book(title, author, published, pages, genre, read)
    myLibrary.push(newBook);
    newBook.id = myLibrary.length - 1;
    displayBooks();
}

//Loops through all books on page, removes everything, creates DOM elements for all books in array

function displayBooks() {
    let oldBooks = document.querySelectorAll(".book");
    for (const book of oldBooks) { book.remove(); };

    for (const book of myLibrary) {
        const bookItem = bookList.appendChild(document.createElement("div"));
        bookItem.classList.add("book");
        bookItem.setAttribute("data-id", book.id);

        const title = bookItem.appendChild(document.createElement("div"));
        title.classList.add("title");
        const bookTitle = title.appendChild(document.createElement("div"));
        bookTitle.classList.add("booktitle");
        bookTitle.innerText = book.title;
        const deletebutton = title.appendChild(document.createElement("button"));
        deletebutton.setAttribute("type", "button")
        deletebutton.classList.add("removebookbutton")
        deletebutton.textContent = "X";
        const bookAuthor = bookItem.appendChild(document.createElement("div"));
        bookAuthor.classList.add("bookauthor", "bookinfocell");
        bookAuthor.textContent = `Author:  ${book.author}`;
        const bookPublished = bookItem.appendChild(document.createElement("div"));
        bookPublished.classList.add("bookpublished", "bookinfocell");
        bookPublished.textContent = `Published:  ${book.published}`;
        const bookPages = bookItem.appendChild(document.createElement("div"));
        bookPages.classList.add("bookpages", "bookinfocell");
        bookPages.textContent = `Pages:  ${book.pages}`;
        const bookGenre = bookItem.appendChild(document.createElement("div"));
        bookGenre.classList.add("bookgenre", "bookinfocell");
        bookGenre.textContent = `Genre:  ${book.genre}`;
        const bookRead = bookItem.appendChild(document.createElement("div"));
        bookRead.classList.add("bookread", "bookinfocell");
        const bookReadButton = bookRead.appendChild(document.createElement("button"));
        bookReadButton.setAttribute("type", "button")
        bookReadButton.classList.add("readbutton");
        bookReadButton.textContent = book.read;

        //Sets initial color of read button

        if (book.read === "Read") {
            bookReadButton.style.backgroundColor = "rgb(56, 109, 255)";
        }
        else if (book.read === "Not read") {
            bookReadButton.style.backgroundColor = "rgb(216, 60, 60)";
        }

        //Assigns the button a unique ID, so that it can find a matching book ID
        deletebutton.setAttribute("data-id", book.id);
        const buttonID = Number(deletebutton.getAttribute("data-id"));

        //Sets functionality of read button
        bookReadButton.addEventListener("click", function () { book.toggleRead(buttonID, bookReadButton) });

        //Sets functionality of delete book button
        deletebutton.addEventListener("click", function () { DeleteBook(buttonID) });

    };

}
