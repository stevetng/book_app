const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleRead = function() {
    this.isRead = !this.isRead;
};

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const libraryContainer = document.getElementById('library-container');
    if (!libraryContainer) {
        const container = document.createElement('div');
        container.id = 'library-container';
        document.body.appendChild(container);
    }
    
    libraryContainer.innerHTML = '';
    
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index);
        
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>By: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.isRead ? 'Read' : 'Not Read'}</p>
            <button onclick="removeBook(${index})">Remove</button>
            <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
        `;
        
        libraryContainer.appendChild(bookCard);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleReadStatus(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

// Form submission handling
document.getElementById('new-book-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const isRead = document.getElementById('isRead').checked;
    
    addBookToLibrary(title, author, pages, isRead);
    
    // Reset form and close dialog
    this.reset();
    document.getElementById('new-book-dialog').close();
});

// Add some sample books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('1984', 'George Orwell', 328, true);