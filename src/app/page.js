"use client";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [color, setColor] = useState([[0, 0, 0, 1], [0, 0, 0, 0.8], [0, 0, 0, 0.6], [0, 0, 0, 0.4]]);
  const [hex, setHex] = useState(["#000000"]);
  const [multicolor, setMulticolor] = useState(false);
  const [isMulticolor, setIsMulticolor] = useState(false);

  function handleMulticolorChange() {
    setMulticolor(!multicolor);
  }

  function randomColor() {
    let tmp = [];
    tmp[0] = Math.floor(Math.random() * 256);
    tmp[1] = Math.floor(Math.random() * 256);
    tmp[2] = Math.floor(Math.random() * 256);
    return tmp;
  }

  function randomOpacity() {
    return Math.floor(Math.random() * 10)/10;
  }

  function randomColorList() {
    setIsMulticolor(multicolor);
  
    if (multicolor) {
      const randomizedColor = [
        [randomColor(), randomOpacity()],
        [randomColor(), randomOpacity()],
        [randomColor(), randomOpacity()],
        [randomColor(), randomOpacity()]
      ];
      setColor(randomizedColor);
      setHex(randomizedColor.map(([rgb]) => rgbToHex(rgb)));
    } else {
      const randomizedColor = randomColor();
      const hexValue = rgbToHex(randomizedColor);
      setColor([
        [randomizedColor, 1],
        [randomizedColor, 0.8],
        [randomizedColor, 0.6],
        [randomizedColor, 0.4]
      ]);
      setHex([hexValue]);
    }
  }

  function rgbToHex(c) {
    var out = '#';
    for (var i = 0; i < 3; ++i) {
      var n = typeof c[i] == 'number' ? c[i] : parseInt(c[i]);
      if (isNaN(n) || n < 0 || n > 255) {
        return false;
      }
      out += (n < 16 ? '0' : '') + n.toString(16);
    }
    return out
  }

  async function copyColor() {
    await navigator.clipboard.writeText(hex);

  }

  return (
    <div className={styles.page}>
      <div className={styles.palette}>
        <div style={{ backgroundColor: `rgba(${color[0]})` }}>{ isMulticolor && 
          <span>{hex[0]}</span>
          }</div>
        <div style={{ backgroundColor: `rgba(${color[1]})` }}>{ isMulticolor && 
          <span>{hex[1]}</span>
          }</div>
        <div style={{ backgroundColor: `rgba(${color[2]})` }}>{ isMulticolor && 
          <span>{hex[2]}</span>
          }</div>
        <div style={{ backgroundColor: `rgba(${color[3]})` }}>{ isMulticolor && 
          <span>{hex[3]}</span>
          }</div>
      </div>
      <div className={styles.control_container}>
        <div className={styles.func_container}>
          <div className={styles.checkbox_wrapper}>
            <input id="multicolor_checkbox" className={styles.substituted} type="checkbox"checked={multicolor} onChange={handleMulticolorChange} />
            <label htmlFor="multicolor_checkbox">Multicolor</label>
          </div>
        </div>
        <div className={styles.func_container}>
          { !isMulticolor &&
            <div className={styles.color_label} onClick={copyColor}>{hex}
              <span className={styles.color_label_tip}>Click to copy</span>
            </div>
          }
          <button className={styles.button} onClick={randomColorList}>Random</button>
        </div>
        <div className={styles.func_container}>
        </div>
      </div>
    </div>
  );
}
