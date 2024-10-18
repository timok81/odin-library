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

class Book {
  constructor(title, author, published, pages, genre, read) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.pages = pages;
    this.genre = genre;
    this.read = read;
  }
}

Book.prototype.deleteThisBook = function (bookID) {
  myLibrary.splice(bookID, 1);
  displayBooks();
};

Book.prototype.toggleRead = function (bookReadButton) {
  if (this.read === "Read") {
    this.read = "Not Read";
    bookReadButton.textContent = "Not Read";
    bookReadButton.style.backgroundColor = "rgb(216, 60, 60)";
  } else {
    this.read = "Read";
    bookReadButton.textContent = "Read";
    bookReadButton.style.backgroundColor = "rgb(56, 109, 255)";
  }
};

submitButton.addEventListener("click", createBook);

//Called when creating new book in modal
function createBook(e) {
  const form = document.querySelector("form");
  const titleInput = document.querySelector("#title");
  const title = titleInput.value;
  const authorInput = document.querySelector("#author");
  const author = authorInput.value;
  const published = form.elements.published.value;
  const pages = form.elements.pages.value;
  const genre = form.elements.genre.value;
  const read = form.elements.read.value;
  const errorField = document.querySelector("#errorfield");

  if (titleInput.validity.valueMissing) {
    e.preventDefault();
    errorField.className = "errorfieldactive"
    errorField.textContent = "Title must contain 1-20 letters";
  } 
  else if (authorInput.validity.valueMissing) {
    e.preventDefault();
    errorField.className = "errorfieldactive"
    errorField.textContent = "Author field must contain 1-25 letters";
  }
  else {
    e.preventDefault();
    errorField.className = "errorfield"
    errorField.textContent = "";
    addBookToLibrary(title, author, published, pages, genre, read);
  }
}

//Adds book to array and calls function to update page visually
function addBookToLibrary(title, author, published, pages, genre, read) {
  const newBook = new Book(title, author, published, pages, genre, read);
  myLibrary.push(newBook);
  displayBooks();
}

//Loops through all books on page, removes everything, creates DOM elements for all books in array
function displayBooks() {
  let oldBooks = document.querySelectorAll(".book");
  for (const book of oldBooks) {
    book.remove();
  }

  for (let i = 0; i < myLibrary.length; i++) {
    const bookItem = bookList.appendChild(document.createElement("div"));
    bookItem.classList.add("book");

    const title = bookItem.appendChild(document.createElement("div"));
    title.classList.add("title");
    const bookTitle = title.appendChild(document.createElement("div"));
    bookTitle.classList.add("booktitle");
    bookTitle.innerText = myLibrary[i].title;
    const deletebutton = title.appendChild(document.createElement("button"));
    deletebutton.setAttribute("type", "button");
    deletebutton.classList.add("removebookbutton");
    deletebutton.textContent = "X";
    const bookAuthor = bookItem.appendChild(document.createElement("div"));
    bookAuthor.classList.add("bookauthor", "bookinfocell");
    bookAuthor.textContent = `Author:  ${myLibrary[i].author}`;
    const bookPublished = bookItem.appendChild(document.createElement("div"));
    bookPublished.classList.add("bookpublished", "bookinfocell");
    bookPublished.textContent = `Published:  ${myLibrary[i].published}`;
    const bookPages = bookItem.appendChild(document.createElement("div"));
    bookPages.classList.add("bookpages", "bookinfocell");
    bookPages.textContent = `Pages:  ${myLibrary[i].pages}`;
    const bookGenre = bookItem.appendChild(document.createElement("div"));
    bookGenre.classList.add("bookgenre", "bookinfocell");
    bookGenre.textContent = `Genre:  ${myLibrary[i].genre}`;
    const bookRead = bookItem.appendChild(document.createElement("div"));
    bookRead.classList.add("bookread", "bookinfocell");
    const bookReadButton = bookRead.appendChild(
      document.createElement("button")
    );
    bookReadButton.setAttribute("type", "button");
    bookReadButton.classList.add("readbutton");
    bookReadButton.textContent = myLibrary[i].read;

    //Sets initial color of read button
    if (myLibrary[i].read === "Read") {
      bookReadButton.style.backgroundColor = "rgb(56, 109, 255)";
    } else if (myLibrary[i].read === "Not read") {
      bookReadButton.style.backgroundColor = "rgb(216, 60, 60)";
    }

    //Sets functionality of read button
    bookReadButton.addEventListener("click", function () {
      myLibrary[i].toggleRead(bookReadButton);
    });

    //Sets functionality of delete book button
    deletebutton.addEventListener("click", function () {
      myLibrary[i].deleteThisBook(i);
    });
  }
}
