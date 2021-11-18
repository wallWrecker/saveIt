const time_posted_component = function(time) {
  let time_container = document.createElement('p');
  let icon_span = document.createElement('span');
  let theTime = document.createTextNode(time);
  
  time_container.classList.add('text-muted', 'ms-1');
  
  icon_span.classList.add('bi', 'bi-calendar2-event');
  icon_span.classList('text-muted', 'ms-1');
  
  time_container.appendChild(icon_span);
  time_container.appendChild(theTime);
  return time_container;
}

const date_posted_component = function () {
  
}

const date_time_component = function() {
  
}