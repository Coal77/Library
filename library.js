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
function addBookToLibrary(container, title, author, pages, read) {
    const book = new Book(title, author, pages, read)

    container.push(book)
    return book
}

const libraryHtml = document.getElementById("library")
function displayBooks(books) {
    for (const book of books) {
        const card = document.createElement("article");
        card.classList.add("book-card");
        card.dataset.id = book.id

        const title = document.createElement("p");
        title.textContent = book.title;
        title.classList.add("book-title");

        const author = document.createElement("p");
        author.textContent = book.author;
        author.classList.add("book-author");

        const pages = document.createElement("p");
        pages.textContent = book.pages;
        pages.classList.add("book-pages");

        const label = document.createElement("label");
        label.classList.add("book-read")
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = book.read;
        label.append(input, " Read");

        card.append(title, author, pages, label);
        libraryHtml.appendChild(card);
    }
}

addBookToLibrary(books, "The Hobbit", "Gattuso", 567, true)
displayBooks(books)



