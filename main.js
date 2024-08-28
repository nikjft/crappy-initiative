
const freeIconClasses = [
"fas fa-dragon",
"fas fa-hat-wizard", 
"fas fa-dice-d20",
"fas fa-skull-crossbones",
"fas fa-dungeon",
"fas fa-scroll",
//"fas fa-swords",
// "fas fa-sickle",
// "fas fa-octopus",
"fas fa-hand-fist",
//"fas fa-hammer-war",
//"fas fa-eye-evil",
"fas fa-dice-d20",
// "fas fa-bow-arrow",
//"fas fa-book-sparkles",
"fas fa-book-skull",
"fas fa-spider",
"fas fa-dragon",
"fas fa-ghost",
// "fas fa-bat",
// "fas fa-pegasus",
//"fas fa-person-dress-fairy",
//"fas fa-hydra",
//"fas fa-mandolin",
// "fas fa-mace",
//"fas fa-unicorn",
"fas fa-skull",
"fas fa-spaghetti-monster-flying",
"fas fa-shield",
"fas fa-user-ninja",
"fas fa-hand-holding-dollar"
// Add more icon classes as needed
];




//   range.selectNodeContents(element);
//   const selection = window.getSelection();
//   selection.removeAllRanges();
//   selection.addRange(range);
// }

// Function to validate number input and apply red text if invalid
 function validateNumber(numberDiv) {
     const invalidChars = /[^0-9]/gi
        if(invalidChars.test(numberDiv.value)) {
            numberDiv.value = numberDiv.value.replace(invalidChars,"");
            }
    
 }

// Add event listeners to new initiative entries
function setupEntryEvents(entry) {
  const nameDiv = entry.querySelector('.name');
  const numberDiv = entry.querySelector('.number');
  const iconDiv = entry.querySelector('.icon');


  nameDiv.addEventListener('focus', () => nameDiv.select());
  numberDiv.addEventListener('focus', () => numberDiv.select());
  //numberDiv.addEventListener('click', () => selectText(numberDiv));
 
 numberDiv.addEventListener('input', () => {
     validateNumber(numberDiv);
     saveEntriesToLocalStorage(); // Save on input change
   });
}

function addEntry(characterName = 'Name', icon = (freeIconClasses[Math.floor(Math.random() * freeIconClasses.length)]) , initiative = 0 ) {
    const newEntry = document.createElement('div');
newEntry.classList.add('initiative-entry');

// Get a random icon class from the array
//let randomIconClass = freeIconClasses[Math.floor(Math.random() * freeIconClasses.length)];

newEntry.innerHTML = `
<div class="icon"><i class="${icon}"></i></div> 
<input class="name" value="${characterName}">
<input class="number"  inputmode="decimal" type="tel" value="${initiative}">
<span class="close-button">x</span>
`;
initiativeList.prepend(newEntry); 

  // Add event listener to the close button of the new entry
  newEntry.querySelector('.close-button').addEventListener('click', () => {
    newEntry.remove();
    saveEntriesToLocalStorage(); // Save after removing an entry
  });

  setupEntryEvents(newEntry);
  saveEntriesToLocalStorage(); // Save after adding a new entry
}

function sortEntries() {
  const entries = Array.from(document.querySelectorAll('.initiative-entry'));

  entries.sort((a, b) => {
    const numA = parseInt(a.querySelector('.number').value, 10);
    const numB = parseInt(b.querySelector('.number').value, 10);
    return numB - numA; 
  });

  entries.forEach(entry => initiativeList.appendChild(entry));
  saveEntriesToLocalStorage(); // Save after sorting
}

function advanceInitiative() {
    console.log("adwance!");
    let topEntry = initiativeList.firstElementChild;
    console.log(topEntry);
    initiativeList.appendChild(topEntry);
    saveEntriesToLocalStorage(); // Save after moving the top entry
  }

// --- LocalStorage Functions ---

function saveEntriesToLocalStorage() {
  let entries = Array.from(document.querySelectorAll('.initiative-entry'));
  
  let entriesData = entries.map(entry => ({
    name: entry.querySelector('.name').value,
    initiative: entry.querySelector('.number').value,
    icon: entry.querySelector('.icon i').className // Save the icon class
  }));
  localStorage.setItem('initiativeEntries', JSON.stringify(entriesData));
}

function loadEntriesFromLocalStorage() {
  let entriesData = JSON.parse(localStorage.getItem('initiativeEntries')) || [
    { name: "Caramon", initiative: "12", icon: "fas fa-shield" },
    { name: "Laurana", initiative: "6", icon: "fas fa-scroll" },
    { name: "Takhisis", initiative: "26", icon: "fas fa-dragon"},
    { name: "Tasselhoff", initiative: "22", icon: "fas fa-hand-holding-dollar" },
    { name: "Raistlin", initiative: "11", icon: "fas fas fa-hat-wizard" }
  ]; // Default entries with icons



  for (let index = entriesData.length - 1; index >= 0; index--) {
    let entryData = entriesData[index];
    addEntry(entryData.name, entryData.icon, entryData.initiative);
  }
  
  function randomizeIcon(entry) {
    const iconDiv = entry.querySelector('.icon i');
    const randomIconClass = freeIconClasses[Math.floor(Math.random() * freeIconClasses.length)];
    iconDiv.className = randomIconClass;
    saveEntriesToLocalStorage(); // Save after changing the icon
  }
  
  
  

//   entriesData.forEach(entryData => {
//     addEntry(entryData.name, entryData.icon, entryData.initiative);
    // let newEntry = initiativeList.firstElementChild;
    // newEntry.querySelector('.name').textContent = entryData.name;
    // newEntry.querySelector('.number').textContent = entryData.initiative;
    // newEntry.querySelector('.icon i').className = entryData.icon; // Set the icon class
  // });
}

