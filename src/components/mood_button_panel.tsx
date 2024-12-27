import { useEffect, useState } from "react";
import './mood_button_panel.css'

interface Props {
  setMood: React.Dispatch<React.SetStateAction<number>>;
  setBg: React.Dispatch<React.SetStateAction<string>>;
}

const MoodButtonPanel = ({ setMood, setBg }: Props) => {
  const colors: string[] = [
    "#00ff00",
    "#b2ff00",
    "#ffff00",
    "#ff8000",
    "#ff0000"
  ];

  const bgcolors: string[] = [
    "#002200",
    "#182200",
    "#222200",
    "#221800",
    "#220000"
  ];

  const buttons: string[] = [
    "UwU",
    "^-^",
    "°-°",
    "°n°",
    "QwQ"
  ]

  const [selected, setSelected] = useState(-1);
  const [active, setActive] = useState(-1);

  const handleClick = (i: number, bg: string) => {
    if (active) {
      setSelected(i);
      setActive(0);
      setBg(bg);
      
      setTimeout(() => setMood(5 - i), 200);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => setActive(1), 10);
    return () => clearTimeout(timeout);
  }, []);

  return <div 
    className={`moodButtonPanelContainer useFade${
      active === 1 ? " in" : !active ? " out" : ""
    }`}
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    <div style={{ display: 'flex' }} className="moodButtonPanelLabelDiv">
      <label className="moodButtonPanelLabel">
        Pick your mood:
      </label>
    </div>
    <div style={{ display: 'flex' }}>
      {buttons.map((button, i) => <button
        key={i}
        className={`moodButton${
          selected === i ? " selected" : ""
        }${
          active === 1 ? " active" : ""
        }`}
        onClick={() => handleClick(i, bgcolors[i])}
        style={{ backgroundColor: colors[i] }}
      > {button} </button>)}
    </div>
  </div>;
};

export default MoodButtonPanel;
