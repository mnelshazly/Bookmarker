var bookmarkNameInput = document.getElementById("bookmarkName");
var websiteLinkInput = document.getElementById("websiteLink");
var tableBody = document.getElementById("tableBody");

var bookmarkList;

if (localStorage.getItem("bookmarks") == null) {
    bookmarkList = [];
} else {
    bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmark (bookmarkList);
}

// Add bookmark to the localstorage
function addBookmark () {

    if (bookmarkNameInput.classList.contains("is-valid") && websiteLinkInput.classList.contains("is-valid")) {
        var bookmark = {
            bookmarkName : bookmarkNameInput.value,
            bookmarkLink : websiteLinkInput.value,
        }

        bookmarkList.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));

        bookmarkNameInput.classList.remove("is-valid");
        websiteLinkInput.classList.remove("is-valid");
        displayBookmark(bookmarkList);
        clear ();
    } else {
        alert("Invalid Input: \nSite Name must contain at least 3 characters and max 5 words. \nSite URL must be valid.");
    }

}

// Display the bookmark in the table
function displayBookmark (arr) {
    var bookmarkContainer = "";
    for (var i = 0; i < arr.length; i++) {
        bookmarkContainer += `<tr>
        <td scope="row">${i+1}</td>
        <td class="text-capitalize">${arr[i].bookmarkName}</td>
        <td><a href="${arr[i].bookmarkLink}" target="_blank" class="btn btn-visit"><i class="fa-solid fa-eye"></i> Visit</a></td>
        <td><a onclick="deleteBookmark(${i})" class="btn btn-delete"><i class="fa-solid fa-trash-can"></i> Delete</a></td>
      </tr>`;
    }

    tableBody.innerHTML = bookmarkContainer;
}

// Delete the bookmark after pressing the delete button
function deleteBookmark (deletedIndex) {
    bookmarkList.splice(deletedIndex, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
    displayBookmark(bookmarkList);
}

// Clear The inputs after adding
function clear () {
    bookmarkNameInput.value = null;
    websiteLinkInput.value = null;
}

// Validate the inputs
function validateInputs(element) {
    var regex = {
        bookmarkName : /^\w{3,}(\s+\w+){0,4}$/,
        websiteLink : /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    }

    if (regex[element.id].test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        // console.log(element.nextElementSibling)
        element.nextElementSibling.classList.replace("d-block", "d-none");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        // element.nextElementSibling.classList.replace("d-none", "d-block");
        element.nextElementSibling.classList.replace("d-none", "d-block");
        // console.log(element)
    }
}