import styles from "../data/styles.js";

export default class StyleSwitcher {
  static init() {
    this.switch('flat');
  }
  
  static switch(style) {
    Object.entries(styles[style]).forEach(([prop, value]) => {
      document.querySelector(':root').style.setProperty(prop, value);
    });
  }
}
