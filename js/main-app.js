// Initialize collections object.
// Get the collection form localstorage if none then it returns a new empty array.
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

// Expirementals 
const interchanging = setInterval(function() {
  removeErrorsWarnings('subject-title');
  const num = Math.floor(Math.random() * Math.floor(100))
  console.log(num)
  if(num % 2 === 0) {
    setWarningInputField('subject-title');
  } else {
    setErrorInputfield('subject-title')
  }
},1000)


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
          saveToDataHandler(this.dataset.key, this.value);
        } else {
          // Then send some notification next to the input element.
          const notificationElement = this.nextElementSibling;
          console.log(notificationElement.innerHTML);
        }
      })
      break;
    
    case "textarea":
      let descriptionHandler = "";
     
      /*
        This element it has to be a limit of how many characters
        that a user can enter and that limit is 150 characters.
        That's what the eventlistener below purpose. To monitor how many characters
        and to limit.
      */
     
      formInput.addEventListener('input', function(e) {
        // Initiate other essential elements from form inputs.
        document.getElementById("character-count").textContent  = this.value.length;;
        // Save the current text from textarea to description handler variable.
        descriptionHandler = this.value;
      });

      // Then after it lose focus to the textarea save it to the
      // temporarydatahandler object.
      formInput.addEventListener('blur', function() {
        saveToDataHandler(this.dataset.key, descriptionHandler);
      });
  }
});

// Events for submit button..
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function() {
  clearInterval(interchanging); removeErrorsWarnings('subject-title');
  // Before that we need to check if all the properties of the temporary object 
  // is present.
  for(let property in temporaryDataHandler) {
    const tH = temporaryDataHandler; // tH shorthand for temporaryDataHandler.
    // Check if the current property has a value
    if(tH[property] == "") {
      const inputFieldElement = document.getElementById('subject-' + property) || undefined;
      // Produce an alert to the input field related to property.
      console.log(inputFieldElement);
    }
  }
  // If the input fields are passed
  console.log(saveToLocalStorage(temporaryDataHandler));
  console.log(temporaryDataHandler);
  
  removeErrorsWarnings('subject-title')
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
  let currentDate = "";
  const d     = new Date();
  const day   = d.getDate(); 
  const month = d.getMonth(); 
  const year  = d.getFullYear(); 

  currentDate = `${month}/${day}/${year}`;
  return currentDate;
}

// Function to convert & save temporary data object to collections object.
function saveToLocalStorage(temporaryHandler) {
  collectionObject.push(temporaryHandler);
  // Convert temporaryDataHandler using stringify
  const convertedCollections = JSON.stringify(collectionObject);
  // Then save to localStorage.
  // localStorage.setItem('collections', convertedCollections);
  return convertedCollections;
}

// Functions to create & remove input forms alert.
function setErrorInputfield(id, message) {
  const color = 'rgba(255, 38, 38, 0.7)';
  const inputfield = document.getElementById(id);
  const inputFieldMessage = inputfield.nextElementSibling;

  inputfield.classList.add("error-border");
  
  inputFieldMessage.innerText = message || "Hey! I think you need to fill this up!";
  inputFieldMessage.style.color = "rgb(255, 38, 38)"
}

function setWarningInputField(id, message) {
  const inputfield = document.getElementById(id);
  const inputFieldMessage = inputfield.nextElementSibling;
  
  inputfield.classList.add("warning-border");
  
  inputFieldMessage.innerText = message || "Hey! I think you need to fill this up!";
  inputFieldMessage.style.color = "rgb(252, 84, 4)";
}

function removeErrorsWarnings(id) {
  const inputField = document.getElementById(id); 
  
  if(inputField.classList.contains('warning-border') || inputField.classList.contains('error-border')) {
    // removes both classnames even if they are 
    inputField.classList.remove('warning-border', 'error-border');
    const inputFieldMessage = inputField.nextElementSibling;
    const markupName = inputField.localName; 
    
    // For the assigning the of message
    if(markupName == 'input' || markupName == 'textarea') {
      inputFieldMessage.textContent = "Please fill the input field.";
    } else if(markupName == 'select') {
      inputFieldMessage.textContent = "Please select type of your subject ";
    }

    // Assign default color on field message
    inputFieldMessage.style.color = "#6c757d";
  } else {
    console.log("Nothing has removed");
  }
}

// Functions to custom some element
function changeFontColor(element, colorOfChoice) {
  return element.style.color = `${colorOfChoice}`;
}