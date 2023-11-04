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

  //create list item
  const li = document.createElement("li");
  li.innerHTML = `${newItem} 
  <button class="remove-item btn-link text-red">
  <i class="fa-solid fa-xmark"></i>
</button>`;
  itemList.appendChild(li);
  checkUI();
  itemInput.value = "";
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
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
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

// event listener
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clear.addEventListener("click", clearItems);

checkUI();
