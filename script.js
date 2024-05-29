// DOM elements
const userInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const result = document.getElementById("result");

// event listener
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    bookData();
  })

// API fetch

const key = "AIzaSyBYR7NvGx9iFmlp2i28kVLJQGgo-reD564"
const bookData = async () => {
    try {
        const bookInput = userInput.value.toLowerCase();
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookInput}&key=${key}`);
        const data = await response.json();

        console.log(data.items);
        dataDisplay(data.items);
    } catch (err) {
        resetFunc();
        alert("Book not found. :( ");
    }
}

// display fetched data

const dataDisplay = (books) => {
    let displayBook = books.map(book => {
        console.log(book.volumeInfo);
        if (book.volumeInfo !== undefined) {
            return `
            <article class="book-card-container">
                <h1>${book.volumeInfo.title}</h1>
                <h2>By: ${book.volumeInfo.authors}</h2>
                <img src="${book.volumeInfo.imageLinks.thumbnail}" />
                <div class="secondary-desc"> 
                    <p>Page Count: ${book.volumeInfo.pageCount}</p>
                    <p>Publisher: ${book.volumeInfo.publisher}</p>
                </div>
            </article>`
        }
    });
    displayBook = displayBook.join("");
    result.innerHTML = displayBook;
}

// const dataDisplay = (data) => {
//     result.innerHTML = 
//     `<div class="book-card-container">
//         <h1>${data.items[0].volumeInfo.title}</h1>
//         <h2>By: ${data.items[0].volumeInfo.authors[0]}</h2>
//         <img src="${data.items[0].volumeInfo.imageLinks.thumbnail}" />
//         <div class="secondary-desc">
            
//             <p>Page Count: ${data.items[0].volumeInfo.pageCount}</p>
//             <p>Publisher: ${data.items[0].volumeInfo.publisher}</p>
//         </div>
//     </div>`
// }

// <p>${data.items[0].volumeInfo.description}</p>

// reset the display of the returned book(s)

const resetFunc = () => {
    result.innerHTML = ``;
}