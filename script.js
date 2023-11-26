const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const ul = document.querySelectorAll("ul");
const clear = document.querySelector("#clear");
const filter = document.querySelector("#filter");
let isEditMode = false;
const formBtn = itemForm.querySelector("button");
const lgnBtn = document.querySelector("#lgnBtn");
const logoutButton = document.querySelector("#logoutButton");



// id github = parrsa


function login(e) {
  e.preventDefault();

  const user = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  const validUsers = {
    p: "p",
    y: "y",
    m: "m",
  };

  if (!(user in validUsers) || validUsers[user] !== password) {
    alert(
      "Invalid username or password. Please try again or create a new account."
    );
    user = "";
    password = "";
    return;
  }

  // Retrieve user-specific items from local storage
  const itemsFromStorage =
    JSON.parse(localStorage.getItem(`${user}-items`)) || [];

  // Display the items for the logged-in user
  itemsFromStorage.forEach((item) => addItemToDom(item));

  // Adjust UI - display the to-do list, hide the login form, etc.
  document.querySelector("#toDoList").style.display = "block";
  document.querySelector("#lgnForm").style.display = "none";
  checkUI();
}

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //validate input
  if (newItem === "") {
    alert("Please add a new item");
    return;
  }
  //check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert("Item already exists");
      return;
    }
  }

  // create item DOM element
  addItemToDom(newItem);

  //add item to local storage
  addItemToLocalStorage(newItem);

  checkUI();
  itemInput.value = "";
}

function addItemToDom(item) {
  //create list item
  const li = document.createElement("li");
  li.innerHTML = `${item} 
  <button class="remove-item btn-link text-red">
  <i class="fa-solid fa-xmark"></i>
</button>`;
  itemList.appendChild(li);
}

function addItemToLocalStorage(item) {
  const user = document.querySelector("#username").value;
  let itemsFromStorage =
    JSON.parse(localStorage.getItem(`${user}-items`)) || [];

  // Add the new item to the user's array
  itemsFromStorage.push(item);

  // Save the updated array back to local storage
  localStorage.setItem(`${user}-items`, JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
  const user = document.querySelector("#username").value;
  let itemsFromStorage =
    JSON.parse(localStorage.getItem(`${user}-items`)) || [];
  return itemsFromStorage;
}

function displayItems() {
  const user = document.querySelector("#username").value;
  const itemsFromStorage =
    JSON.parse(localStorage.getItem(`${user}-items`)) || [];

  // Clear the current items list on the UI
  const itemList = document.querySelector("#item-list");
  itemList.innerHTML = "";

  // Display the items retrieved from local storage for the user
  itemsFromStorage.forEach((item) => addItemToDom(item));

  checkUI();
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemFromStorage();
  if (itemsFromStorage.includes(item)) {
    return true;
  } else {
    return false;
  }
}

function setItemToEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i></i> Update Item';
  formBtn.style.background = "#228b22";
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm("Are you sure you want to remove?")) {
    const itemIndex = Array.from(itemList.children).indexOf(item);
    item.remove();

    removeItemFromStorage(itemIndex);

    checkUI();
  }
}

function removeItemFromStorage(itemIndex) {
  const user = document.querySelector("#username").value;
  let itemsFromStorage =
    JSON.parse(localStorage.getItem(`${user}-items`)) || [];
  itemsFromStorage.splice(itemIndex, 1);
  localStorage.setItem(`${user}-items`, JSON.stringify(itemsFromStorage));
}

function clearItems() {
  const user = document.querySelector("#username").value;

  if (confirm("Are you sure you want to remove?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }
  localStorage.removeItem(`${user}-items`);
  checkUI();
}

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkUI() {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clear.style.display = "none";
    filter.style.display = "none";
  } else {
    clear.style.display = "block";
    filter.style.display = "block";
  }
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> add item';
  formBtn.style.background = "#333";

  isEditMode = false;
}

function logout() {
  const user = document.querySelector("#username").value;

  // Clear the items list on the UI
  const itemList = document.querySelector("#item-list");
  itemList.innerHTML = ""; // This will clear all items from the list

  // Adjust UI - hide the to-do list, show the login form, etc.
  document.querySelector("#toDoList").style.display = "none";
  document.querySelector("#lgnForm").style.display = "block";

  // Clear the username input for the next login
  document.querySelector("#username").value = "";
  document.querySelector("#password").value = "";
}

//initialize app
// event listener
function init() {
  lgnBtn.addEventListener("click", login);
  itemForm.addEventListener("submit", addItem);
  itemList.addEventListener("click", onClickItem);
  clear.addEventListener("click", clearItems);
  filter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
  logoutButton.addEventListener("click", logout);
  checkUI();
}
init();