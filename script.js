// DOM elements
const userInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const searchResult = document.getElementById("result");

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

        console.log(data);
        dataDisplay(data);
    } catch (err) {
        resetFunc();
        alert("Book not found!?");
    }
}

// display fetched data

const dataDisplay = (data) => {

}

// reset the display of the returned book(s)

const resetFunc = () => {

}