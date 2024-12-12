"use client";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [color, setColor] = useState([0, 0, 0]);
  const [hex, setHex] = useState("#000000");
  function randomColor() {
    let tmp = [];
    tmp[0] = Math.floor(Math.random() * 256);
    tmp[1] = Math.floor(Math.random() * 256);
    tmp[2] = Math.floor(Math.random() * 256);
    setColor(tmp);
    setHex(rgbToHex(tmp));
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
        <div style={{ backgroundColor: `rgba(${color}, 1)` }}></div>
        <div style={{ backgroundColor: `rgba(${color}, 0.8)` }}></div>
        <div style={{ backgroundColor: `rgba(${color}, 0.6)` }}></div>
        <div style={{ backgroundColor: `rgba(${color}, 0.4)` }}></div>
      </div>
      <div className={styles.button_container}>
        <div className={styles.color_label} onClick={copyColor}>{hex}
          <span className={styles.color_label_tip}>Click to copy</span>
        </div>
        <button className={styles.button} onClick={randomColor}>Random</button>
      </div>
    </div>
  );
}
