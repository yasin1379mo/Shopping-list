const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const ul = document.querySelectorAll("ul");
const clear = document.querySelector("#clear");
const filter = document.querySelector("#filter");

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //validate input
  if (newItem === "") {
    alert("Please add a new item");
    return;
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
function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure you want to remove?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
}

function clearItems() {
  if (confirm("Are you sure you want to remove?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }
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
}

//initialize app
// event listener
function init() {
  itemForm.addEventListener("submit", addItem);
  itemList.addEventListener("click", removeItem);
  clear.addEventListener("click", clearItems);
  filter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
  checkUI();
}
init();
