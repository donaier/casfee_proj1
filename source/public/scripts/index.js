console.log("Hello World");

// einfach roh für die funktionalität

document.addEventListener("DOMContentLoaded", () => {

  switchStyle({target: {value: document.querySelector('#styling').value}})
  document.querySelector('#styling').onchange = switchStyle;
});


function switchStyle(evnt) {
  const root = document.querySelector(':root');
  let styles = {
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
      '--clrBg': '#8b5e34',
      '--clrComp': '#e7bc91',
      '--clrCompLight': '#f5e4d3',
      '--clrLoud': '#0194fc',
      '--clrAccent': '#ff218e',
      '--clrAccentDark': '#fcd800'
    }
  }

  for (const i in styles[evnt.target.value]) {
    root.style.setProperty(i, styles[evnt.target.value][i]);
  }
}
