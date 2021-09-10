// Initialize collections object.
const collectionObject = JSON.parse(localStorage.getItem('collections')) || [];

// This will be used for temporary data handler later.
const temporaryDataHandler = {title: "", type: "", url: "", description: "", date_posted: ""};
// Initiate necessary forminputs ID for attaching eventlistener later.
const collectionOfFormInputId = [
  "subject-title",
  "subject-type",
  'subject-url',
  'subject-description'
];


// Loops through all form elements and them appropriate eventListeners.
collectionOfFormInputId.forEach(function(id) {
  const formInput = document.getElementById(id);
  
  switch(formInput.localName) {
    case "input": 
      // Then it must be a textinput element.
      // we add blur eventlistener to this element.
      formInput.addEventListener('blur', function() {
        // But first let's verify if the input is legit.
        if(verifyFormTextbox(this)) {
          // Get the data-key attribute as a basis key on temporary handler.
          const dataKey = this.dataset.key;
          // Add value to the temporaryDataHandler varible.
          temporaryDataHandler[dataKey] = this.value;
        } else {
          // Then send some notification next to the input element.
          const notificationElement = this.nextElementSibling;
          console.log(notificationElement.textContent);
        }
      });
    break;

    case "select":
      formInput.addEventListener('change', function() {
        // But first let's verify if the input is legit.
        if(verifyFormTextbox(this)) {
          // If there is no error then,
          // Add value to the temporaryDataHandler object varible.
          saveToDataHandler(this.dataset.key, this.value)
        } else {
          // Then send some notification next to the input element.
          const notificationElement = this.nextElementSibling;
          console.log(notificationElement.innerHTML);
        }
      })
      break;
    
    case "textarea":
      const maximumCharacterCount = 130; 
      let descriptionHandler = "";
     
      /*
        This element it has to be a limit of how many characters
        that a user can enter and that limit is 150 characters.
        That's what the eventlistener below purpose. To monitor how many characters
        and to limit.
      */
     
      formInput.addEventListener('input', function(e) {
        // Initiate other essential elements from form inputs 
        const characterCounterElement = document.getElementById("character-count");
        characterCounterElement.textContent = this.value.length;
        descriptionHandler = this.value;
      });

      // Then after it lose focus to the textarea save it to the
      // temporarydatahandler object.
      formInput.addEventListener('blur', function() {
        saveToDataHandler(this.dataset.key, descriptionHandler);
      });
  }
});

// Events for submit button
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function() {
  
})

// Tidbits functions
// Function to verify input & select elements value
function verifyFormTextbox(element) {
  if(element.value == 0 || element.value.length === 0 || element.value == "0") {return false;} return true;
}

function verifySelectElement(element) {
  if(selectElement.value == "0" || selectElement.value === 0) {return false;} return true;
}

// Function to save form input data. 
function saveToDataHandler(dataKey, data) {
  temporaryDataHandler[dataKey] = data;
}

function getTodayDate() {
  let currentDate = ""
  const d     = new Date();
  const day   = d.getDate(); 
  const month = d.getMonth(); 
  const year  = d.getFullYear(); 

  currentDate = `${month}-${day}-${year}`;
  return currentDate;
}
// Function to convert & save temporary data object to collections object.
function saveToLocalStorage(obj) {
  collectionObject.push(obj);
  // Convert temporaryDataHandler using stringify
  const convertedCollections = JSON.stringify(collectionObject);
  // Then save to localStorage.
  localStorage.setItem('collections', convertedCollections);
  return true;
}