import { useLocation } from 'react-router-dom';
import MoodButtonPanel from '../components/mood_button_panel';

const Placeholder = () => <h1>Placeholder</h1>;

const AddItem = () => {
  const location = useLocation();
  const qParams = new URLSearchParams(location.search);
  const date = new Date();

  const SubPage =
    !qParams.get("mood") ? MoodButtonPanel
    : Placeholder;

  return <div className="addItemContainer">
    <label className="addItemDateLabel">
      {`${String(date.getDate()).padStart(2, "0")}/` +
       `${String(date.getMonth() + 1).padStart(2, "0")}/` +
       `${String(date.getFullYear())}`}
    </label>
    <SubPage />
  </div>
};

export default AddItem;
