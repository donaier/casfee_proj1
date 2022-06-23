const styles = {
  "flat": {
    "--bg": "#212121",
    "--clr": "#CCC",
    "--clrBg": "#353535",
    "--clrComp": "#454545",
    "--clrCompLight": "#525252",
    "--clrLoud": "#FFF",
    "--clrAccent": "#F2565D",
    "--clrAccentDark": "#77383B"
  },
  "fancy": {
    "--bg": "#f1dca7",
    "--clr": "#222",
    "--clrBg": "#edd3c4",
    "--clrComp": "#e7bc91",
    "--clrCompLight": "#f5e4d3",
    "--clrLoud": "#0194fc",
    "--clrAccent": "#ff218e",
    "--clrAccentDark": "#fcd800"
  }
}

export default class StyleSwitcher {
  static init() {
    this.switch('flat');
    document.querySelector('#styling').addEventListener('change', (e) => StyleSwitcher.switch(e.target.value));
  }

  static switch(style) {
    Object.entries(styles[style]).forEach(([prop, value]) => {
      document.querySelector(':root').style.setProperty(prop, value);
    });
  }
}
