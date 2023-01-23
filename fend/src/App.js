import {Route, Routes} from "react-router-dom";
import './App.css';
import UserDetail from "./comps/UserDetail";
import Users from './comps/Users';

function App() {
  return (
    <div className="App">
         <Routes>
            <Route path="/" element={<Users/>}/>
            <Route path="/:id" element={<UserDetail/>}/>

        </Routes> 
    </div>
  );
}

export default App;
