import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './mood_button_panel.css'

const MoodButtonPanel = () => {
  const colors: string[] = [
    "#00ff00",
    "#b2ff00",
    "#ffff00",
    "#ff8000",
    "#ff0000"
  ];

  const bgcolors: string[] = [ // TODO make this shit work, then this component is done
    "#003300",
    "#203300",
    "#333300",
    "#332000",
    "#330000"
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
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (i: number) => {
    if (active) {
      setSelected(i);
      setActive(0);
      
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('mood', String(i));
  
      setTimeout(() => navigate(`?${searchParams.toString()}`), 200);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setActive(1), 10);
    return () => clearTimeout(timer);
  }, []);

  return <div 
    className={`moodButtonPanelContainer useFade${
      active === 1 ? " in" : active === 0 ? " out" : ""
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
        onClick={() => handleClick(i)}
        style={{ backgroundColor: colors[i] }}
      > {button} </button>)}
    </div>
  </div>;
};

export default MoodButtonPanel;
