import { posted_type_component } from "./posted-type-component.js";
import { content_body_component } from "./content_body_component.js";
import { date_time_component } from "./date_time-component.js"


function visit_button(url) {
  const div = document.createElement('div')
  const anchor = document.createElement('a');
  const span = document.createElement('span');
  
  anchor.setAttribute('href', url);
  anchor.classList.add('btn', 'btn-primary');
  span.classList.add('bi', 'bi-arrow-right','px-1')
  
  anchor.append(document.createTextNode('Read story1'), span);
  return anchor;
}

// What date that the story component get?
export function story_component(dataObj) {
  const {id, url, title, type, date, time, description} = dataObj;
  const story_component_container = document.createElement('div');
  
  const element_classes = ['col-10', 'col-md-5', 'col-lg-4', 'col-xl-4', 'rounded-2', 'shadow-sm', 'bg-light', 'p-3', 'm-1', 'h-auto'];
  story_component_container.classList.add(...element_classes);
  
  const childElements = [posted_type_component(type),date_time_component({date: date,time: time}),content_body_component({title: title, description: description})];

  story_component_container.append(...childElements, visit_button(url));
  // story_component_container.appendChild(content_body_component(type))

  return story_component_container;
}