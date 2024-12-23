import './App.css';
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import AddItem from './pages/add_item';

const Homepage = () => <h1>Placeholder</h1>;

export default () => {
  const location = useLocation();

  return <>
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>     
    </div>
  </>;
};
