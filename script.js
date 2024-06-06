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
                <div class="card text-bg-dark mb-1 book-card-container">
                        <div class="card-body">
                            <img class="card-img-top img-fluid"  src="${book.volumeInfo.imageLinks?.thumbnail}" title="Book Cover Art" alt="No Cover Art, sorry :(" />     
                            <h2 class="card-title">${book.volumeInfo.title}</h2>
                            <h2 class="card-subtitle">By: ${book.volumeInfo.authors !== undefined ? book.volumeInfo.authors[0] : "Anonymous"}</h2>
                            <p class="card-text">Page Count: ${book.volumeInfo.pageCount === undefined ? "Unspecified"
                                                                 : book.volumeInfo.pageCount === 0 ? "Unspecified" : book.volumeInfo.pageCount}</p>
                            <p class="card-text">Publisher: ${book.volumeInfo.publisher !== undefined ? book.volumeInfo.publisher : "No publisher specified"}, ${book.volumeInfo.publishedDate !== undefined ? book.volumeInfo.publishedDate : "No publishing date given."}</p>
                        </div>

                        <button 
                            type="button" 
                            class="btn btn-primary" 
                            data-bs-toggle="modal" 
                            data-bs-target="#${book.id}">
                        Learn More
                        </button>

                    <div class="modal fade" id="${book.id}" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable">
                            <div class="modal-content text-bg-dark">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5">${book.volumeInfo.title}, ${book.volumeInfo.authors}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="background-color: white;"></button>
                                </div>
                                <div class="modal-body">
                                    <p>${book.volumeInfo.description !== undefined ? book.volumeInfo.description : "No description currently available for this title."}</p>
                                    <p></p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <a href="${book.volumeInfo.infoLink}" target="_blank"><button type="button" class="btn btn-primary">Buy Book</button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
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