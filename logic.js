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
    this.num = num + " pages";
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
  libraryArray.forEach((obj, index) => {
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "d-flex", "flex-column");
    cardBody.setAttribute("data-index", index);
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "display-5");
    let cardAuthor = document.createElement("h5");
    cardAuthor.classList.add("card-text");
    let cardNum = document.createElement("h6");
    cardNum.classList.add("card-text", "text-muted");
    let readBtn = document.createElement("button");
    readBtn.classList.add("btn", "read");
    let deleteBtn = document.createElement("btn");
    deleteBtn.classList.add("btn", "btn-danger", "delete");
    deleteBtn.innerText = "Delete";
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
      } else if (key == "read") {
        switch (obj[key]) {
          case true:
            readBtn.classList.add("btn-success"), (readBtn.innerText = "READ");
            break;
          case false:
            readBtn.classList.add("btn-danger"),
              (readBtn.innerText = "NOT READ");
            break;
        }
      }
    }
    cardBody.appendChild(readBtn);
    cardBody.appendChild(deleteBtn);
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
// removes object by targeting where the object is stored in the arrary
function removeObj(arr, target) {
  if (target == 0) {
    arr.shift();
  } else if (target == arr.length - 1) {
    arr.pop();
  } else {
    arr.splice(target, 1);
  }
}

saveBookBtn.addEventListener("click", (e) => {
  // take values,make object and add to Array;
  myLibrary.push(
    new Book(title.value, author.value, numPages.value, readCheckbox.checked)
  );
  //store myLibrary in localStorage
  storeLocal();
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

displayDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let target = e.target.parentNode.getAttribute("data-index");
    removeObj(myLibrary, target);
    storeLocal();
    display(myLibrary);
  } else if (e.target.classList.contains("read")) {
    let obj = myLibrary[e.target.parentNode.getAttribute("data-index")];
    if (e.target.innerText == "READ") {
      obj.read = false;
    } else {
      obj.read = true;
    }
    storeLocal();
    display(myLibrary);
  }
});

function storeLocal() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function retrieveLocal() {
  if (!localStorage.getItem("myLibrary")) {
    display(myLibrary);
  } else {
    let libraryArrary = localStorage.getItem("myLibrary");
    myLibrary = JSON.parse(libraryArrary);
    display(myLibrary);
  }
}

retrieveLocal();
