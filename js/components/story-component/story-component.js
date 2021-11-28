import { posted_type_component } from "./posted-type-component.js";
import { content_body_component } from "./content_body_component.js";
import { date_time_component } from "./date_time-component.js"

// What date that the story component get?
export function story_component(dataObj) {
  const {id, url, title, type, date, time, description} = dataObj;
  const story_component_container = document.createElement('div');
  
  const element_classes = ['col-sm-5', 'col-md-5', 'col-lg-4', 'col-xl-3', 'rounded-2', 'shadow-sm', 'bg-white', 'p-3', 'm-1', 'h-auto'];
  story_component_container.classList.add(element_classes);
  
  const childElements = [
    posted_type_component(type),
    content_body_component({title: title, description: description}),
    date_time_component({date: date,time: time})
  ];

  story_component_container.append([childElements]);
}