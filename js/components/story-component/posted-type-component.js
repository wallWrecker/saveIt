export function posted_type_component(type) {
  const pill = document.createElement('p');
  pill.classList.add("badge", "rounded-pill", "bg-primary");
  pill.textContent = type;
  
  const div = document.getElementById('div');
  div.classList.add("py-1");
  div.appendChild(pill);
  
  return div;
}