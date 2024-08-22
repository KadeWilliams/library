const cardContainer = document.querySelector("#cards-container");
let myLibrary = [new Book("The Way of Kings", "Brandon Sanderson", 1000, true), new Book("Mad Ship", "Robin Hobb", 700, true)];
buildLibraryComponent();


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.toggleRead = function() {
        if (this.read == true)
            this.read = false;
        else 
            this.read = true;
    }
}

function buildLibraryComponent() {
    cardContainer.innerHTML = "";
    let i = 0;
    for (book of myLibrary) {
        let card = document.createElement("div")
        card.classList.add("card");

        let cardHeader = document.createElement("div");
        cardHeader.innerHTML = `<h5>${book.title}</h5>`;
        card.appendChild(cardHeader);

        let cardBody = document.createElement("div");
        cardBody.innerHTML= `<p>${book.author}</p><p>${book.pages}</p>${book.read === true ? "Read" : "To Read"}<p></p>`;
        

        card.appendChild(cardBody);
        
        let cardFooter = document.createElement("div");
        let deleteBookBtn = document.createElement("button");

        deleteBookBtn.classList.add("deleteBook");
        deleteBookBtn.setAttribute("data-id", i);
        deleteBookBtn.innerHTML = "Delete";

        deleteBookBtn.addEventListener("click", function () {
            deleteBookFromLibrary(parseInt(this.dataset.id));
        })

        let toggleBtn = document.createElement("button");

        toggleBtn.classList.add("toggle");
        toggleBtn.setAttribute("data-id", i);
        toggleBtn.innerHTML = "Toggle Status";

        toggleBtn.addEventListener("click", function() {
            toggleReadStatus(parseInt(this.dataset.id))
        })

        cardFooter.appendChild(deleteBookBtn);
        cardFooter.appendChild(toggleBtn);

        card.appendChild(cardFooter);

        cardContainer.appendChild(card);
        i++;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    buildLibraryComponent();
}

function deleteBookFromLibrary(index) {
    myLibrary = myLibrary.filter((_, i) => {
        return i !== index;
    })
    buildLibraryComponent();
}

function toggleReadStatus(index) {
    myLibrary[index].toggleRead();
    buildLibraryComponent();
}

const addBookButton = document.querySelector("#add-book-btn");
addBookButton.addEventListener("click", function () {
    const title = document.querySelector("#title").value; 
    const author = document.querySelector("#author").value; 
    const pages = document.querySelector("#pages").value; 
    const read = document.querySelector("#read").checked; 

    addBookToLibrary(new Book(title, author, pages, read));
});
