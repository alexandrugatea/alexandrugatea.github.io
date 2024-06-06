const form = document.getElementById("addBookForm");
const formContent = document.querySelector(".form-content");
const formTrigger = document.getElementById("addNewBook");

const renderedBooksContainer = document.getElementById("renderedBooks");
const clearAll = document.getElementById("emptyLibrary");

formTrigger.addEventListener("click", openNewBookModal);
clearAll.addEventListener("click", emptyLibrary);

function openNewBookModal() {
	formTrigger.classList.toggle("opened");

	if (!form.classList.contains("opened")) {
		form.classList.add("opened");

		setTimeout(() => {
			formContent.classList.add("opened");
		}, 250);
	} else {
		form.reset();
		formContent.classList.remove("opened");

		setTimeout(() => {
			form.classList.remove("opened");
		}, 250);
	}
}

const defaultBooks = [
	{
		title: "Don Quixote",
		author: "Miguel de Cervantes",
		pages: "1000",
		read: false,
	},
	{
		title: "A Tale of Two Cities",
		author: "Charles Dickens",
		pages: "544",
		read: false,
	},
	{
		title: "The Lord of the Rings",
		author: "J.R.R. Tolkien",
		pages: "1216",
		read: true,
	},
	{
		title: "The Little Prince",
		author: "Antoine de Saint-Exupéry",
		pages: "96",
		read: false,
	},
	{
		title: "Harry Potter and the Philosopher's Stone",
		author: "J.K. Rowling",
		pages: "223",
		read: true,
	},
	{
		title: "The Hobbit",
		author: "J.R.R. Tolkien",
		pages: "310",
		read: true,
	},
	{
		title: "And Then There Were None",
		author: "Agatha Christie",
		pages: "272",
		read: false,
	},
	{
		title: "Alice's Adventures in Wonderland",
		author: "Lewis Carroll",
		pages: "200",
		read: false,
	},
	{
		title: "The Dream of the Red Chamber",
		author: "Cao Xueqin",
		pages: "1791",
		read: false,
	},
	{
		title: "The Lion, the Witch and the Wardrobe",
		author: "C.S. Lewis",
		pages: "208",
		read: false,
	},
];

let books;

if (localStorage.getItem("books")) {
	books = JSON.parse(localStorage.getItem("books"));
} else {
	books = defaultBooks;
	localStorage.setItem("books", JSON.stringify(books));
}

renderBooks();

function renderBooks(books) {
	books = JSON.parse(localStorage.getItem("books"));
	renderedBooksContainer.innerHTML = "";

	books.forEach((book, index) => {
		const renderedBook = createBookElement(book, index);
		renderedBooksContainer.appendChild(renderedBook);
	});

	updateInfo();
}

function createBookElement(book, index) {
	const bookInnerContainer = document.createElement("div");
	bookInnerContainer.classList.add("book-inner");

	const bookContainer = document.createElement("div");
	bookContainer.classList.add("book");

	const bookTitle = document.createElement("h3");
	bookTitle.classList.add("book-title");
	bookTitle.innerText = book.title;

	const bookAuthor = document.createElement("p");
	bookAuthor.classList.add("book-author");
	bookAuthor.innerText = book.author;

	const bookPages = document.createElement("p");
	bookPages.classList.add("book-pages");
	bookPages.innerText = `${book.pages} pages`;

	const bookRead = document.createElement("p");
	bookRead.classList.add("book-read");
	bookRead.classList.add(book.read ? "read" : "notread");
	bookRead.innerText = book.read ? "Read" : "Not Read";

	bookInnerContainer.setAttribute("data-index", index + 1);

	const bookButtonsContainer = document.createElement("div");
	bookButtonsContainer.classList.add("book-buttons");

	const deleteButton = document.createElement("button");
	const deleteIcon = document.createElement("span");
	deleteButton.classList.add("book-delete", "book-button");
	deleteIcon.classList.add("material-symbols-outlined");
	deleteButton.innerText = "Remove";
	deleteIcon.innerText = "delete";
	deleteButton.appendChild(deleteIcon);

	deleteButton.addEventListener("click", function () {
		removeBook(index);
	});

	const readButton = document.createElement("button");
	const readIcon = document.createElement("span");
	readButton.classList.add("book-read-status", "book-button");
	readIcon.classList.add("material-symbols-outlined");
	readButton.innerText = "Read";
	readIcon.innerText = "book_5";
	readButton.appendChild(readIcon);

	readButton.addEventListener("click", function () {
		markAsRead(index);
	});

	bookButtonsContainer.appendChild(readButton);
	bookButtonsContainer.appendChild(deleteButton);

	bookInnerContainer.appendChild(bookTitle);
	bookInnerContainer.appendChild(bookAuthor);
	bookInnerContainer.appendChild(bookPages);
	bookInnerContainer.appendChild(bookRead);
	bookInnerContainer.appendChild(bookButtonsContainer);

	bookContainer.appendChild(bookInnerContainer);

	return bookContainer;
}

function removeBook(index) {
	books = JSON.parse(localStorage.getItem("books"));
	books.splice(index, 1);
	localStorage.setItem("books", JSON.stringify(books));
	renderBooks();
}

function markAsRead(index) {
	books = JSON.parse(localStorage.getItem("books"));
	books[index].read = !books[index].read;
	localStorage.setItem("books", JSON.stringify(books));
	renderBooks();
}

form.addEventListener("submit", function (e) {
	e.preventDefault();

	const bookTitle = document.getElementById("bookTitle").value;
	const bookAuthor = document.getElementById("bookAuthor").value;
	const bookPages = document.getElementById("bookPages").value;
	const bookRead = document.getElementById("bookRead").checked;

	const newBook = {
		title: bookTitle,
		author: bookAuthor,
		pages: bookPages,
		read: bookRead,
	};

	books = JSON.parse(localStorage.getItem("books")) || [];
	books.unshift(newBook);

	localStorage.setItem("books", JSON.stringify(books));

	form.reset();

	renderBooks();
});

function updateInfo() {
	const books = JSON.parse(localStorage.getItem("books"));

	const totalBooks = document.getElementById("totalBooks");
	const totalReadBooks = document.getElementById("totalReadBooks");
	const totalUnreadBooks = document.getElementById("totalUnreadBooks");
	const totalReadPages = document.getElementById("totalReadPages");

	// Make calculations
	const booksCount = books.length;
	const readBooks = books.filter((book) => book.read).length;
	const unreadBooks = booksCount - readBooks;

	const readPages = books
		.filter((book) => book.read)
		.reduce((acc, book) => {
			return acc + parseInt(book.pages);
		}, 0);

	// Update HTML elements

	totalBooks.innerText = booksCount;
	totalReadBooks.innerText = readBooks;
	totalUnreadBooks.innerText = unreadBooks;
	totalReadPages.innerText = readPages;
}

function emptyLibrary() {
	books = [];
	localStorage.setItem("books", JSON.stringify(defaultBooks));
	renderBooks();
}
