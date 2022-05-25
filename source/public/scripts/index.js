// einfach roh für die funktionalität

function switchStyle(evnt) {
  const root = document.querySelector(':root');
  const styles = {
    'flat': {
      '--bg': '#212121',
      '--clr': '#CCC',
      '--clrBg': '#353535',
      '--clrComp': '#454545',
      '--clrCompLight': '#525252',
      '--clrLoud': '#FFF',
      '--clrAccent': '#F2565D',
      '--clrAccentDark': '#77383B'
    },
    'fancy': {
      '--bg': '#f1dca7',
      '--clr': '#222',
      '--clrBg': '#edd3c4',
      '--clrComp': '#e7bc91',
      '--clrCompLight': '#f5e4d3',
      '--clrLoud': '#0194fc',
      '--clrAccent': '#ff218e',
      '--clrAccentDark': '#fcd800'
    }
  }

  Object.entries(styles[evnt.target.value]).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });
}

function toggleCompleted(e) {
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

document.addEventListener("DOMContentLoaded", () => {
  // init
  switchStyle({target: {value: document.querySelector('#styling').value}})

  // listeners
  document.querySelector('#styling').addEventListener('change', switchStyle);
  document.querySelector('.add').addEventListener('click', () => {document.querySelector('#new-item').showModal()})
  document.querySelector('.completed-toggle').addEventListener('click', toggleCompleted);
});
