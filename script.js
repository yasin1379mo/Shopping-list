const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const ul = document.querySelectorAll("ul");
const clear = document.querySelector("#clear");
const filter = document.querySelector("#filter");
let isEditMode = false;
const formBtn = itemForm.querySelector("button");

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
  let itemsFromStorage = getItemFromStorage(item);
  //add new item
  itemsFromStorage.push(item);
  //convert to JSON and store in local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemFromStorage(item) {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
}

function displayItems() {
  const itemsFromStorage = getItemFromStorage();
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
  let itemsFromStorage = getItemFromStorage();
  itemsFromStorage.splice(itemIndex, 1);

  // Update local storage with the updated array
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  if (confirm("Are you sure you want to remove?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }
  localStorage.removeItem("items");
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

//initialize app
// event listener
function init() {
  itemForm.addEventListener("submit", addItem);
  itemList.addEventListener("click", onClickItem);
  clear.addEventListener("click", clearItems);
  filter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
  checkUI();
}
init();
