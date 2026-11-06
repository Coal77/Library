# Library

A small book library app built with vanilla HTML, CSS, and JavaScript. Each book is shown on its own card with its title, author, page count, and read status. The main goal of the project was to practice JavaScript constructors and prototypes.

## Features

- Add a book through a form (title, author, pages, read status)
- Each book is displayed on its own card
- Toggle a book's read status
- Remove a book from the library
- Responsive card grid, with light and dark mode support

## Getting started

No build step or dependencies are needed.

1. Clone or download the repository.
2. Open `index.html` in your browser.

## Project structure

```
library/
├── index.html   # page structure and the "Add book" dialog form
├── style.css    # layout and card styling
└── script.js    # Book constructor, library array, and DOM rendering
```

## How it works

### The `Book` constructor

Books are created with a constructor function and the `new` operator. Each book gets a unique id from `crypto.randomUUID()`, so books can be found reliably even after others are removed or the array is rearranged.

```javascript
function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}
```

### Prototype method

`toggleRead` lives on `Book.prototype`, so all books share a single copy of the function instead of each owning its own.

```javascript
Book.prototype.toggleRead = function () {
    this.read = !this.read;
};
```

### Main functions

- `addBookToLibrary(container, title, author, pages, read)` creates a `Book` and stores it in the given array.
- `displayBooks(books)` clears the library container and builds one card per book.

Every card has a Remove button and a read-status button. Both update the `books` array and the page together, so the data and the display stay in sync.

## Concepts practiced

- Constructor functions, `this`, and `new` (including `new.target`)
- Prototypes and shared methods
- Unique ids with `crypto.randomUUID()`
- DOM creation with `createElement`, `append`, `replaceChildren`, and `dataset`
- Event listeners and closures
- Array methods: `findIndex` and `splice`
- The `<dialog>` element and built-in form validation
- CSS Grid, custom properties, and `:has()`

## Possible next steps

- Save the library to `localStorage` so books persist between visits
- Convert the constructor to an ES6 `class`
- Add sorting and filtering (by title, author, or read status)
- Switch the card buttons to event delegation on the container