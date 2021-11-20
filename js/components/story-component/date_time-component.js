const time_posted_component = function(time) {
  let time_container = document.createElement('p');
  let icon_span = document.createElement('span');
  let theTime = document.createTextNode(time);
  
  time_container.classList.add('text-muted', 'ms-1');
  
  icon_span.classList.add('bi', 'bi-clock', 'fs-6');
  
  time_container.appendChild(icon_span);
  time_container.appendChild(theTime);
  return time_container;
}

const date_posted_component = function (date) {
  let date_container = document.createElement('div');
  let icon_span = document.createElement('span');
  let theDate = document.createTextNode("Nov 29,2019");
  
  date_container.classList.add('text-muted', 'ms-1');
  
  icon_span.classList.add('bi', 'bi-calendar2-event','pe-1');
  
  date_container.appendChild(icon_span);
  date_container.appendChild(theDate);
  return date_container;
}

export const date_time_component = function({date, time}) {
  const date_time_container = document.createElement('div');
  component_container.classList.add("d-flex", "d-sm-column");
  component_container.appendChild(date_posted_component(date));
  component_container.appendChild(time_posted_component(time));
  return date_time_container;
}