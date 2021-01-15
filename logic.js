(function () {
  var library = {
    myLibrary: [],
    ini: function () {
      this.cacheDom();
      this.bindEvents();
      this.restore();
      this.render(this.myLibrary);
    },
    cacheDom: function () {
      // buttons
      this.saveBookBtn = document.querySelector("#save-book");
      // inputs
      this.title = document.querySelector("#title");
      this.author = document.querySelector("#author");
      this.numPages = document.querySelector("#number-of-pages");
      this.readCheckbox = document.querySelector("#read-book");
      // display
      this.displayDiv = document.querySelector("#display-book-cards");
    },
    bindEvents: function () {
      this.saveBookBtn.addEventListener("click", this.addToLibrary.bind(this));
      this.saveBookBtn.addEventListener("click", this.closeModal);
      this.displayDiv.addEventListener(
        "click",
        this.deleteFromLibrary.bind(this)
      );
      this.displayDiv.addEventListener(
        "click",
        this.toggleReadStatus.bind(this)
      );
    },
    render: function (libraryArray) {
      while (this.displayDiv.childElementCount > 0) {
        this.displayDiv.firstChild.remove();
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
                readBtn.classList.add("btn-success"),
                  (readBtn.innerText = "READ");
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
        this.displayDiv.appendChild(cardDiv);
      });
    },
    // creates book object and adds pushes it to myLibrary
    addToLibrary: function () {
      this.myLibrary.push({
        title: this.title.value,
        author: this.author.value,
        numPages: this.numPages.value,
        read: this.readCheckbox.checked,
      });
      this.storeLocal();
      this.render(this.myLibrary);
      // set input fields to default values
      this.title.value = "";
      this.author.value = "";
      this.numPages.value = "";
      this.readCheckbox.checked = false;
    },
    deleteFromLibrary: function (e) {
      if (e.target.classList.contains("delete")) {
        let target = e.target.parentNode.getAttribute("data-index");
        this.myLibrary.splice(target, 1);
        this.storeLocal();
        this.render(this.myLibrary);
      }
    },
    toggleReadStatus: function (e) {
      if (e.target.classList.contains("read")) {
        let bookObj = this.myLibrary[
          e.target.parentNode.getAttribute("data-index")
        ];
        if (bookObj.read == true) {
          bookObj.read = false;
        } else {
          bookObj.read = true;
        }
        this.storeLocal();
        this.render(this.myLibrary);
      }
    },
    // method closes modal when "save book" is clicked
    closeModal: function () {
      let myModalEl = document.querySelector("#add-book-modal");
      let modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
    },
    // local storage
    storeLocal: function () {
      localStorage.setItem("myLibrary", JSON.stringify(this.myLibrary));
    },
    restore: function () {
      if (!localStorage.getItem("myLibrary")) {
        this.render(this.myLibrary);
      } else {
        let libraryArrary = localStorage.getItem("myLibrary");
        this.myLibrary = JSON.parse(libraryArrary);
      }
    },
  };
  library.ini();
})();
