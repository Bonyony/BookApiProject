// DOM elements
const userInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const clearBtn = document.getElementById("clear-button");
const result = document.getElementById("result");

// event listeners
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    bookData();
  })

clearBtn.addEventListener("click", e => {
    e.preventDefault();
    resetFunc();
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
        console.log(err)
    }
}

// display fetched data

const dataDisplay = (books) => {
    let displayBook = books.map(book => {
        
        console.log(book.volumeInfo);

        if (book.volumeInfo !== undefined) {
            return `
            <div class="col-3">
            <div class="card text-bg-dark mb-1 book-card-container" style="width: 17rem;">
                <img class="card-img-top" style="max-height: 400px; max-width: 400px;" src="${book.volumeInfo.imageLinks?.thumbnail}" title="Book Cover Art" alt="No Cover, sorry :(" />
                    <div class="card-body">     
                        <h1 class="card-title">${book.volumeInfo.title}</h1>
                        <h2 class="card-subtitle">By: ${book.volumeInfo.authors}</h2>
                        <p class="card-text">Page Count: ${book.volumeInfo.pageCount}</p>
                        <p class="card-text">Publisher: ${book.volumeInfo.publisher}</p>
                    </div>
            </div>
            </div>`
        }
    });
    displayBook = displayBook.join("");
    result.innerHTML = displayBook;
}

// reset the display of the returned book(s)

const resetFunc = () => {
    result.innerHTML = ``;
    userInput.value = "";
}