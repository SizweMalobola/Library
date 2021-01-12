let myLibrary = [];
// buttons
let addBookBtn = document.querySelector("#new-book");
let saveBookBtn = document.querySelector("#save-book");
// inputs
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let numPages = document.querySelector("#number-of-pages");
let readCheckbox = document.querySelector("#read-book");
// display
let displayDiv = document.querySelector("#display-book-cards");

class Book {
  constructor(title, author, num, read) {
    this.title = title;
    this.author = author;
    this.num = num;
    this.read = read;
  }
  addToLibrary() {
    myLibrary.push(this);
  }
}

function display(libraryArray) {
  while (displayDiv.childElementCount > 0) {
    displayDiv.firstChild.remove();
  }
  libraryArray.forEach((obj) => {
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "d-flex", "flex-column");
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    let cardAuthor = document.createElement("h5");
    cardAuthor.classList.add("card-text");
    let cardNum = document.createElement("h6");
    cardNum.classList.add("card-text", "text-muted");
    let readBtn = document.createElement("button");
    readBtn.classList.add("btn", "btn-danger", "self-align-center");
    readBtn.innerText = "READ";
    for (let key in obj) {
      console.log(key);
      console.log(obj[key]);
      if (key == "title") {
        cardTitle.innerText = obj[key];
        cardBody.appendChild(cardTitle);
      } else if (key == "author") {
        cardAuthor.innerText = obj[key];
        cardBody.appendChild(cardAuthor);
      } else if (key == "num") {
        cardNum.innerText = obj[key];
        cardBody.appendChild(cardNum);
      }
    }
    cardBody.appendChild(readBtn);
    let cardDiv = document.createElement("div");
    cardDiv.classList.add(
      "card",
      "text-center",
      "col-sm-6",
      "col-md-4",
      "col-lg-3"
    );
    cardDiv.appendChild(cardBody);
    displayDiv.appendChild(cardDiv);
  });
}

saveBookBtn.addEventListener("click", (e) => {
  // take values,make object and add to Array;
  myLibrary.push(
    new Book(title.value, author.value, numPages.value, readCheckbox.checked)
  );
  //display
  display(myLibrary);
  // close modal
  let myModalEl = document.querySelector("#add-book-modal");
  let modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();
  // clear input fields on form modal
  title.value = "";
  author.value = "";
  numPages.value = "";
  readCheckbox.checked = false;
});

// //  function adds book objects to myLibrary array
// function addBookToLibrary(title, author) {
//   myLibrary.push(new Book(title, author));
//   displayBooks();
// }
// // function displays each book object inside HTML.
// let body = document.querySelector("body");
// let table = document.querySelector("table");

// function displayBooks() {
//   // loop clears elements from previous iteration of the function
//   while (table.childElementCount > 1) {
//     table.lastChild.remove();
//   }

//   myLibrary.forEach(function (obj, index) {
//     let row = document.createElement("tr");
//     for (let y in obj) {
//       let tdata = document.createElement("td");
//       tdata.textContent = obj[y];
//       row.appendChild(tdata);
//     }
//     let delBtn = document.createElement("button");
//     delBtn.innerText = "delete";
//     delBtn.classList.add("delete");
//     delBtn.setAttribute("data-library-index", index);
//     row.appendChild(delBtn);
//     table.appendChild(row);
//   });
// }

// let newBook = document.querySelector("#new-book");
// let form = document.querySelector("form");
// // newBook button toggles visibility of form element

// newBook.addEventListener("click", function (e) {
//   form.classList.toggle("visible");
// });

// let bookTitle = document.querySelector("#title");
// let bookAuthor = document.querySelector("#author");
// let submitButton = document.querySelector("#submit");
// // eventlistener adds newly submitted book object to table

// submitButton.addEventListener("click", function (e) {
//   if (bookTitle.value != "" && bookAuthor.value != "") {
//     addBookToLibrary(bookTitle.value, bookAuthor.value);
//     // displayBooks();
//     // add eventlisteners to delete buttons
//     // deleteBtn = document.querySelectorAll(".delete");
//     addDelEvent();
//   }
// });

// function addDelEvent() {
//   // let deleteBtn = document.querySelectorAll(".delete");
//   let table = document.querySelector("table");
//   table.addEventListener("click", function (e) {
//     if (e.target.classList.contains("delete")) {
//       let target = e.target.getAttribute("data-library-index");
//       console.log(target);
//       removeEl(myLibrary, target);
//       // displayBooks();
//     }
//   });
// }

// // function removes elements from array
// function removeEl(arr, target) {
//   if (target == 0) {
//     arr.shift();
//   } else if (target == arr.length - 1) {
//     arr.pop();
//   } else {
//     arr.splice(target, 1);
//   }
// }
