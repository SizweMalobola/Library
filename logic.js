let myLibrary = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

//  function adds book objects to myLibrary array
function addBookToLibrary(title, author) {
  myLibrary.push(new Book(title, author));
}
// function displays each book object inside HTML.
let body = document.querySelector("body");
let table = document.querySelector("table");

function displayBooks() {
  // loop clears elements from previous iteration of the function
  while (table.childElementCount > 1) {
    table.lastChild.remove();
  }

  myLibrary.forEach(function (obj, index) {
    let row = document.createElement("tr");
    for (let y in obj) {
      let tdata = document.createElement("td");
      tdata.textContent = obj[y];
      row.appendChild(tdata);
    }
    let delBtn = document.createElement("button");
    delBtn.innerText = "delete";
    delBtn.classList.add("delete");
    delBtn.setAttribute("data-library-index", index);
    row.appendChild(delBtn);
    table.appendChild(row);
  });
}

let newBook = document.querySelector("#new-book");
let form = document.querySelector("form");
// newBook button toggles visibility of form element

newBook.addEventListener("click", function (e) {
  form.classList.toggle("visible");
});

let bookTitle = document.querySelector("#title");
let bookAuthor = document.querySelector("#author");
let submitButton = document.querySelector("#submit");
// eventlistener adds newly submitted book object to table

submitButton.addEventListener("click", function (e) {
  if (bookTitle.value != "" && bookAuthor.value != "") {
    addBookToLibrary(bookTitle.value, bookAuthor.value);
    displayBooks();
    // add eventlisteners to delete buttons
    // deleteBtn = document.querySelectorAll(".delete");
    addDelEvent();
  }
});

function addDelEvent() {
  // let deleteBtn = document.querySelectorAll(".delete");
  let table = document.querySelector("table");
  table.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
      let target = e.target.getAttribute("data-library-index");
      console.log(target);
      removeEl(myLibrary, target);
      displayBooks();
    }
  });
}

// function removes elements from array
function removeEl(arr, target) {
  if (target == 0) {
    arr.shift();
  } else if (target == arr.length - 1) {
    arr.pop();
  } else {
    arr.splice(target, 1);
  }
}
