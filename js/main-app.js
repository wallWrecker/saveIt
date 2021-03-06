// Reset LocalStorage dev only
localStorage.clear();

// Initialize collections object.
// Get the collection form localstorage if none then it returns a new empty array.
let collectionObject = JSON.parse(localStorage.getItem("collection")) || [];

// This will be used for temporary data handler later.
const temporaryDataHandler = {
  title: "",
  type: "",
  url: "",
  description: "",
  date_posted: "",
};

// Initiate necessary forminputs ID for attaching eventlistener later.
const collectionOfFormInputId = [
  "subject-title",
  "subject-type",
  "subject-url",
  "subject-description",
];

// Loops all inputs and select elements,
// and apply some event listener.
collectionOfFormInputId.forEach(function (id) {
  const formInput = document.getElementById(id);

  switch (formInput.localName) {
    case "input":
      // Attatch event listener.
      formInput.addEventListener("blur", function () {
        if (validateTextboxValue(this)) {
          approvedInputField(this.id);
          /*using data attribute attatched to the 
            input fields or select field as a object property name. */
          const dataKey = this.dataset.key;
          temporaryDataHandler[dataKey] = this.value;
        } else {
          // This is to inform the user that he/she has selected the wrong item.
          deniedInputField(this.id);
        }
      });
      break;

    case "select":
      formInput.addEventListener("change", function () {
        // But first let's verify if the input is legit.
        if (validateSelectedType(this)) {
          approvedInputField(this.id, "I think it was nice choice.");
          // If there is no error then,
          // Add value to the temporaryDataHandler object varible.
          saveToDataHandler(this.dataset.key, this.value);
        } else {
          deniedInputField(this.id, "Please select other type.");
        }
      });
      break;

    case "textarea":
      let descriptionHandler = "";
      /*This element sit has to be a limit of how many characters
        that a user can enter and that limit is 150 characters.
        That's what the eventlistener below purpose. To monitor how many characters
        and to limit. */
      formInput.addEventListener("input", function (e) {
        // output character counts based on how many character are there in
        // document.getElementById("character-count").textContent = this.value.length;
        // // Save the current text from textarea to description handler variable.
        // descriptionHandler = this.value;
      });

      // Then after it lose focus to the textarea save it to the
      // temporarydatahandler object.
      formInput.addEventListener("blur", function () {
        if (validateTextboxValue(this)) {
          approvedInputField(this.id);
          saveToDataHandler(this.dataset.key, descriptionHandler);
        } else {
          deniedInputField(this.id);
        }
      });
      break;
  }
});

const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", function () {
  const baseGuideElement = document.querySelector('.greeting-container');
  if (isFormAlertExist()) { removeElementFromDOM(document.getElementById("form-alert")) }

  const { result, fields } = validateMultipleInputFields(collectionOfFormInputId);

  if (result == false) {
    fields.forEach(function (inputfield) {
      // deniedInputField(this.id)
      deniedInputField(inputfield.id);
    });
                                                                                                                              
    baseGuideElement.insertAdjacentElement('afterend', createFormAlert('danger', 'Please fill all the form.'));

  } else {
    // Applying date to the post.
    temporaryDataHandler["date_posted"] = getTodayDate();

    // Lastly before we save is to Assign post-id to diferentiate each posts.
    temporaryDataHandler["post_id"] = `P-00${collectionObject.length + 1}`;
    console.log(temporaryDataHandler.post_id);

    collectionObject.push(temporaryDataHandler);

    // Saves to local storage.
    // localStorage.setItem('collection', JSON.stringify(collectionObject));
    baseGuideElement.insertAdjacentElement('afterend', createFormAlert('success', 'HoOoray!'));
  }
});

// ### FUNCTIONS ####
// Tidbits functions
function validateMultipleInputFields(inputIdArray) {
  const response = [];
  const collectionOfInputFieldsWithIssue = [];

  inputIdArray.forEach(function (id) {
    const formElement = document.getElementById(id);
    const inputLocalName = formElement.localName;
    if (inputLocalName == "input" || inputLocalName == "textarea") {
      if (validateTextboxValue(formElement) == true) {
        response.push(true);
      } else {
        response.push(false);
        collectionOfInputFieldsWithIssue.push(formElement);
      }
    } else if (inputLocalName == "select") {
      if (validateSelectedType(formElement) == true) {
        response.push(true);
      } else {
        response.push(false);
        collectionOfInputFieldsWithIssue.push(formElement);
      }
    }
  });

  return {
    result: response.every(r => r == true),
    fields: collectionOfInputFieldsWithIssue,
  };
}

// Function to verify individual input & select elements.

// validateTextboxValue to now validateTextboxValue
function validateTextboxValue(textbox) {
  return textbox.value == "" ? false : true;
}

// verifySelectElement to validateSelectedType
function validateSelectedType(element) {
  return element.value == "0" ? false : true;
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

  return `${month}-${day}-${year}`;
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

// Functions to invoke and or revoke input forms notifications.
function deniedInputField(id, customMessage) {
  const inputfield = document.getElementById(id);
  
  inputfield.classList.remove(
    "warning-border",
    "error-border",
    "success-border"
  );

  const inputFieldMessage = inputfield.nextElementSibling;
  inputfield.classList.add("error-border");

  inputFieldMessage.innerText = customMessage || "Hey! I think you need to fill this up!";
  inputFieldMessage.style.color = "rgb(255, 38, 38)";
  console.log(inputfield);
}

function approvedInputField(id, message) {
  const inputfield = document.getElementById(id);
  inputfield.classList.remove(
    "warning-border",
    "error-border",
    "success-border"
  );
  const inputFieldMessage = inputfield.nextElementSibling;
  inputfield.classList.add("success-border");
  inputFieldMessage.innerText = message || "This was ok.";
  inputFieldMessage.style.color = "rgb(41, 187, 137)";
}

function removeErrorsWarnings(id) {
  const inputField = document.getElementById(id);

  if (inputField.classList.contains("warning-border") || inputField.classList.contains("error-border")) {
    // removes both classnames even if they are
    inputField.classList.remove(
      "warning-border",
      "error-border",
      "success-border"
    );

    const inputFieldMessage = inputField.nextElementSibling;
    const markupName = inputField.localName;

    // For the assigning the of message
    if (markupName == "input" || markupName == "textarea") {
      inputFieldMessage.textContent = "Please fill the input field.";
    } else if (markupName == "select") {
      inputFieldMessage.textContent = "Please select type of your subject.";
    }

    // Assign default color on field message
    inputFieldMessage.style.color = "#6c757d";
  } else {
    console.log("Nothing has removed.");
  }
}
// Function for creating and applying form alert.

function createFormAlert(severity, message) {
  const type = {
    'info'    : "alert-info",
    'primary' : "alert-primary",
    'danger'  : "alert-danger",
    'success' : "alert-success"
  }

  const alertDiv = document.createElement('div');
  const para = document.createElement("P");
  para.textContent = message; // message is required.
  // Apply necessary classes to functions and look like a alert components
  alertDiv.setAttribute('id', 'form-alert');
  alertDiv.classList.add('col-9', 'alert', type[severity]);
  alertDiv.textContent = message || "This is a test message for alert.";
  return alertDiv;
}

function isFormAlertExist() {
  return document.getElementById('form-alert') != null ? true : false;
}

// Functions to custom some element
function changeFontColor(element, colorOfChoice) {
  return (element.style.color = `${colorOfChoice}`);
}

function removeElementFromDOM(domElement) {
  domElement.remove();  
}

const collectionResultContainer = document.querySelector('#collection-results');

import {story_component}  from "./components/story-component/story-component.js";
//{id, url, title, type, date, time, description}
const sampleData = {
  id: 1,
  url: '#',
  title: "Custom Vue v-model modifiers",
  type: 'article',
  date: "Nov 1, 2021",
  time: '1:30 pm',
  description: 'No description.'  
}

collectionResultContainer.append(story_component(sampleData))
console.log(story_component(sampleData))
