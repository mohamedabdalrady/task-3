
let bookmarks = [];


const bookmarkNameInput = document.getElementById('bookmarkName');
const bookmarkURLInput = document.getElementById('bookmarkURL');
const addBtn = document.getElementById('addBtn');
const bookmarkList = document.getElementById('bookmarkList');
const errorElement = document.getElementById('error');


addBtn.addEventListener('click', addBookmark);


bookmarkNameInput.addEventListener('input', () => validateInput(bookmarkNameInput, isValidName(bookmarkNameInput.value.trim())));
bookmarkURLInput.addEventListener('input', () => validateInput(bookmarkURLInput, isValidURL(bookmarkURLInput.value.trim())));


function addBookmark() {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkURLInput.value.trim();

 
  if (!name || !url) {
    showError('Both fields are required!');
    return;
  }
  if (!isValidURL(url)) {
    showError('Invalid URL! Please ensure it contains a valid domain (e.g., example.com).');
    return;
  }
  if (!isValidName(name)) {
    showError('Name must be at least 3 characters long and cannot contain special characters!');
    return;
  }
  if (bookmarks.some(bookmark => bookmark.name.toLowerCase() === name.toLowerCase())) {
    showError('Bookmark name must be unique!');
    return;
  }


  bookmarks.push({ name, url });
  updateBookmarkList();

  bookmarkNameInput.value = '';
  bookmarkURLInput.value = '';
  hideError();
  validateInput(bookmarkNameInput, true);
  validateInput(bookmarkURLInput, true);
}


function updateBookmarkList() {
  bookmarkList.innerHTML = bookmarks.map((bookmark, index) => {
    const isValid = isValidURL(bookmark.url);
    return `
      <tr>
        <td>${index + 1}</td>
        <td>
          ${bookmark.name}
          <span class="text-success">${isValid ? '<i class="fa-solid fa-check-circle"></i>' : ''}</span>
        </td>
        <td>
          <button class="btn btn-success btn-sm" onclick="visitBookmark('${bookmark.url}')"><i class="fa-solid fa-arrow-right"></i> Visit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteBookmark(${index})"><i class="fa-solid fa-trash"></i> Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}


function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  updateBookmarkList();
}


function visitBookmark(url) {
  window.open(url, '_blank');
}


function isValidURL(url) {
  
  const regex = /^(https?:\/\/)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/;
  return regex.test(url);
}


function isValidName(name) {
  const regex = /^[a-zA-Z0-9\s]{3,}$/;  
  return regex.test(name);
}


function showError(message) {
  errorElement.textContent = message;
  errorElement.classList.remove('d-none');
}


function hideError() {
  errorElement.classList.add('d-none');
}


function validateInput(input, isValid) {
  if (isValid) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
  } else {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
  }
}
