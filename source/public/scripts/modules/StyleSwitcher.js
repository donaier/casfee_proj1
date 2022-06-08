import styles from "../data/styles.js";

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
