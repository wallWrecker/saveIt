// This will be used for temporary data handler later.
const temporaryDataHandler = {title: "", type: "", url: "", description: "", date_posted: ""};

// Initiate other essential elements from form inputs 
const characterCount = document.getElementById("character-count");

// Initiate necessary forminputs ID for attaching eventlistener later.
const collectionOfFormInputId = [
  "subject-title",
  "subject-type",
  'subject-url',
  'subject-description'
];

collectionOfFormInputId.forEach(function(id) {
  const formInput = document.getElementById(id);
  
  switch(formInput.localName) {
    case "input": 
      // Then it must be a textinput element.
      // we add blur eventlistener to this element.
      formInput.addEventListener('blur', function() {
        // But first let's verify if the input is legit.
        if(verifyFormTextbox(this)) {
          // Add value to the temporaryDataHandler varible.
          const dataKey = this.id;
          console.log(dataKey)
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
          const dataKey = this.dataset.key;
          // Add value to the temporaryDataHandler object varible.
          console.log(dataKey);
        } else {
          // Then send some notification next to the input element.
          const notificationElement = this.nextElementSibling;
          console.log(notificationElement.innerHTML);
        }
      })
      break;
    
    case "textarea":
      
      /*
        This element it has to be a limit of how many characters
        that a user can enter and that limit is 150 characters.
        That's what the eventlistener below purpose. To monitor how many characters
        and to limit.
      */
      formInput.addEventListener('change',function() {
        
      });

      formInput.addEventListener('blur', function() {
       
      });
  }
});

// Function to verify input & select elements value
function verifyFormTextbox(element) {
  if(element.value == 0 || element.value.length === 0 || element.value == "0") { return false;} return true;
}

function verifySelectElement(element) {
  if(selectElement.value == "0" || selectElement.value === 0) {return false;} return true;
}