function content_title_component(title) {
  const h5 = document.createElement('h5');
  h5.classList.add('mt-0');
  h5.textContent = title;
  return h5;
}

function content_description_component(description) {
  const description_container = document.createElement('p');
  const myDescription = document.createTextNode(description);
  description_container.classList.add('text-muted');
  description_container.appendChild(myDescription);
  return description_container;
}

export function content_body_component({title, description}) {
  const content_body_container = document.createElement('div');
  content_body_container.append(content_title_component(title), content_description_component(description));
  return content_body_container;
}