// Global variables
const appForm = document.getElementById('toDoApp');
const ol = document.getElementById('toDoOl');
const addToDo = document.getElementById('insertToDo');
const modal = document.getElementById('myModal');
const closeBtn = document.getElementsByClassName("close")[0];
let answer = document.getElementById('quest');

addToDo.focus();
// If local storage have items, asign parse to lsArray. If not, asign empty array to lsArray
let lsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

// Save lsArray as 'items' in local storage and asign it to showItems variable
localStorage.setItem('items', JSON.stringify(lsArray));
const showItems = JSON.parse(localStorage.getItem('items'));

// CreateList function
const CreateList = (text) => {
  const li = document.createElement('li');
  li.textContent = text;
  ol.appendChild(li);

  for(let i = 0; i < ol.childElementCount; i++) {
    ol.children[i].addEventListener('click', displayMsg);
  }
};

// Event listener for form
appForm.addEventListener('submit', function(event) {
  event.preventDefault();
  if(addToDo.value === '') {
    alert('Please enter some text.');
    return;
  }else {
    lsArray.push(addToDo.value);
  }
  localStorage.setItem('items', JSON.stringify(lsArray));
  CreateList(addToDo.value);
  addToDo.value = '';
});

// Use CreateList function to create all showItems elements
const ShowFromLs = () => {
  for(let i = 0; i < showItems.length; i++) {
    CreateList(showItems[i]);
  }
};

ShowFromLs();

// Show modal and enable delete todo event
function displayMsg() {
  let word = this;
  let str = this.textContent;
  console.log(word);
  console.log(str);
  let itemPos = lsArray.indexOf(str);
  modal.style.display = 'block';
  let findItem = lsArray.indexOf(word);

  // Delete todos
  answer.onclick = function() {
    if(!(findItem > -1)) {
      ol.removeChild(ol.childNodes[itemPos]);
      lsArray.splice(itemPos, 1);
      localStorage.setItem('items', JSON.stringify(lsArray));
      localStorage.getItem('items', JSON.stringify(lsArray));
      modal.style.display = 'none';
    }
  }
};

// Close modal on close btn
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Close modal if clicked anywhere outside of modal
window.addEventListener('click', function(event) {
  if(event.target == modal) {
    modal.style.display = 'none';
  }
});