import MoodButtonPanel from '../components/mood_button_panel';
import DescriptionEntry from '../components/description_entry';
import './add_item.css'
import { useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom';

interface EndPageProps {
  mood: number;
  desc: string;
  date: Date;
}

const EndPage = ({ mood, desc, date }: EndPageProps) => {
  const y: number = date.getFullYear();
  const m: number = date.getMonth() + 1;
  const d: number = date.getDate();

  const hasSaved = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (hasSaved.current) return;

    const storedData = localStorage.getItem('items');
    const data = storedData ? JSON.parse(storedData) : {};

    if (!data[y]) data[y] = {};
    if (!data[y][m]) data[y][m] = {};
    if (!data[y][m][d]) data[y][m][d] = [];
  
    data[y][m][d].push({ mood: mood, desc: desc });
  
    localStorage.setItem('items', JSON.stringify(data, null, 2));

    hasSaved.current = true;

    navigate('/');
  }, [mood, desc, date, navigate, y, m, d]);

  return <div></div>
}

const AddItem = () => {
  const date = new Date();

  const [bg, setBg] = useState<string>("#000000");
  const [mood, setMood] = useState<number>(0);
  const [desc, setDesc] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.backgroundColor = bg;

    return () => {
      document.body.style.backgroundColor = "#000000";
    };
  }, [bg]);

  const SubPage =
    !mood ? <MoodButtonPanel setMood={setMood} setBg={setBg} />
    : desc === null ? <DescriptionEntry setDesc={setDesc} />
    : <EndPage mood={mood} desc={desc} date={date}/>

  return <div className="addItemContainer">
    <label className="addItemDateLabel">
      {`${String(date.getDate()).padStart(2, "0")}.` +
       `${String(date.getMonth() + 1).padStart(2, "0")}.` +
       `${String(date.getFullYear())}`}
    </label>
    {SubPage}
  </div>
};

export default AddItem;
