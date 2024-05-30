const body = document.querySelector(`body`);
const addBookBtn = document.querySelector(`.add-book`);
const cards = document.querySelector(`.cards`);
const modal = document.querySelector(`.modal`);
const title = document.querySelector(`#title`);
const author = document.querySelector(`#author`);
const pages = document.querySelector(`#pages`);
const checkBox = document.querySelector(`#checkbox`);
const submitBtn = document.querySelector(`#submit`);

const readBtn = document.querySelector(`.read-btn`);
let myLibrary = [];

// book object

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

// Toggle Read/Unread Status

Book.prototype.status = function(){this.read ? this.read = false : this.read = true};

// Function to add new books

function addBook(){
  let bookTitle = title.value;
  let bookAuthor = author.value;
  let bookPages = pages.value;
  let bookRead = checkBox.checked;
  myLibrary.push(new Book(bookTitle, bookAuthor, bookPages, bookRead));
  displayBook()
};

// Function to display the Books on page

function displayBook(){
  cards.innerHTML = ``;
  myLibrary.forEach((book, index)=>{
    const card = document.createElement(`div`);
    card.classList.add(`card`);
    cards.appendChild(card);
    card.innerHTML = `
    <p>Title - ${book.title}</p>
    <p>Author - ${book.author}</p>
    <p>Number of Pages - ${book.pages}</p>
    <div class="card-buttons">
    <button class =${book.read ? 'card-green' :`card-red`} onclick=changeStatus(${index})>${book.read ?'Unread' :`Read`}</button>
    <button class ="remove-btn" onclick=removeBook(${index})>Remove</button>
    </div>`;
  });
};

// Function to remove book

function removeBook(index){
  myLibrary.splice(index, 1);
  displayBook();
}

// Function to toggle read/unread status

function changeStatus(index){
  myLibrary[index].status();
  displayBook();
}

// Modal dialogue pop for adding books

addBookBtn.addEventListener(`click`, ()=>{
  modal.showModal();
});

// submit button events

submitBtn.addEventListener(`click`,()=>{
  event.preventDefault();
  addBook();
  modal.close();
  title.value = ``;
  author.value = ``;
  pages.value = ``;
  checkBox.checked = ``;
});