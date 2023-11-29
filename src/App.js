import { useState } from "react";
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';

import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';



function App() {
  const [alert,setAlert]=useState(null);

  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },2000);
  }
  return (
    <>
      <NoteState>
      <Navbar/>
      <Alert alert={alert}/>
      <div className='container'>
        <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
            <Route exact path="/about" element={<About/>}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>


        </Routes>
      </div>
      </NoteState>
    </>
  );
}

export default App;




// git remote add origin https://github.com/Sojalagrawal/backend-react.git
// git branch -M main   
// git push -u origin main