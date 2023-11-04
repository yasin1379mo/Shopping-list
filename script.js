const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const ul = document.querySelectorAll("ul");

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
}

// event listener
itemForm.addEventListener("submit", addItem);
