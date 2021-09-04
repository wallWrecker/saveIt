const collectionOfFormInputId = [
  "subject-title",
  "subject-type",
  'subject-url',
  'subject-description'
];

const characterCount = document.getElementById("character-count");
const temporaryDataHandler = {title: "", type: "", url: "", description: "", date_posted: ""};

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
          // Add value to the temporaryDataHandler varible.
          const dataKey = this.id;
          console.log(dataKey);
        } else {
          // Then send some notification next to the input element.
          const notificationElement = this.nextElementSibling;
          console.log(notificationElement.innerHTML);
        }
      })
      break;
  }
});

// Function to verify input & select elements value
function verifyFormTextbox(element) {
  let result = true;
  if(element.value == 0 || element.value.length === 0 || element.value == "0") {
    result = false;
    return result;
  }
  return result;
}

// function verifySelectElement(element) {
//   if(this.value )
// }