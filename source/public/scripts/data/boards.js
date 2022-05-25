export function getBoards() {
  return {
    "boards": [
      "werk",
      "hsr/ost",
      "velo",
      "prvt"
    ],
    "default": "hsr/ost"
  }
}

export function toggleCompleted(e) {
  const toggle = e.target;

  if (toggle.dataset.completed === 'show') {
    toggle.dataset.completed = 'hide';
    document.querySelector('main').classList.replace('completed-visible', 'completed-hidden');
  } else {
    toggle.dataset.completed = 'show';
    document.querySelector('main').classList.replace('completed-hidden', 'completed-visible');
  }

  toggle.innerHTML = toggle.dataset.completed;
}
