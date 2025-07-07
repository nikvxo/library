const myLibrary = []; 

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
    const id = crypto.randomUUID();
    const newBook = new Book(title, author, pages, read, id);
    myLibrary.push(newBook);
}

function displayBooks() {
    const container = document.getElementById('booksContainer');
    container.innerHTML = '';

    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            <button class="remove-btn" data-id="${book.id}">Remove</button>
        `;
        container.appendChild(bookDiv);
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const bookID = this.getAttribute('data-id');
            const index = myLibrary.findIndex(book => book.id === bookID)
            if (index !== -1) {
                myLibrary.splice(index, 1);
                displayBooks();
            }
        });
    });
}

document.getElementById('newBookBtn').addEventListener('click', () => {
    document.getElementById('newBookForm').style.display = 'block';
});

document.getElementById('newBookForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get values from form fields
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    // Add new book to library
    addBookToLibrary(title, author, pages, read);

    // Hide and reset the form
    document.getElementById('newBookForm').reset();
    document.getElementById('newBookForm').style.display = 'none';

    // Update the display
    displayBooks();
});

addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
displayBooks();