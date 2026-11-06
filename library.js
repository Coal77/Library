const books = [];

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function() {
    this.read = !this.read
}

function addBookToLibrary(container, title, author, pages, read) {
    const book = new Book(title, author, pages, read)

    container.push(book)
    return book
}

const libraryHtml = document.getElementById("library")
function displayBooks(books) {
    libraryHtml.replaceChildren() //* Empty the old cards and renders the new cards in the array

    for (const book of books) {
        const card = document.createElement("article");
        card.classList.add("book-card");
        card.dataset.id = book.id;

        const removeCardBtn = document.createElement("button");
        removeCardBtn.type = "button";
        removeCardBtn.innerHTML = "&times";
        removeCardBtn.classList.add("card-remove")
        removeCardBtn.addEventListener("click", () => {
            index = books.findIndex(b => b.id === book.id);
            //* Remove the book from the array
            if (index !== -1) {
                books.splice(index, 1);
            }
            //* Remove it on the UI too
            card.remove()
        })

        const title = document.createElement("p");
        title.textContent = book.title;
        title.classList.add("book-title");

        const author = document.createElement("p");
        author.textContent = book.author;
        author.classList.add("book-author");

        const pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;
        pages.classList.add("book-pages");

        const label = document.createElement("label");
        label.classList.add("book-read")
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = book.read;
        label.append(input, " Read");

        const readBtn = document.createElement("button");
        readBtn.type = "button";
        readBtn.classList.add("book-toggle");
        readBtn.textContent = book.read ? "Mark as unread" : "Mark as read";

        readBtn.addEventListener("click", () => {
            book.toggleRead();
            input.checked = book.read;
            readBtn.textContent = book.read ? "Mark as unread" : "Mark as read";
        });

        card.append(title, author, pages, label, readBtn, removeCardBtn);
        libraryHtml.appendChild(card);
    }
}

const showDialog = document.getElementById("new-book-btn");
const dialog = document.getElementById("book-dialog");
showDialog.addEventListener("click", () => {
    dialog.showModal();
});

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const formSubmit = document.getElementById("confirm-btn");
const form = document.getElementById("book-form");

formSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    dialog.close();
    addBookToLibrary(books, titleInput.value, authorInput.value, Number(pagesInput.value), readInput.checked);
    displayBooks(books)
    form.reset()
});

//* Default display
addBookToLibrary(books, "The Hobbit", "Gattuso", 567, true)
displayBooks(books)



