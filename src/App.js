import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Main from './routes/Main';
import Login from './routes/Login';
import Register from './routes/Register';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

//react-router-dom이 v6이 되면서 Switch -> Routes로 변경됨
//그리고 v6부터는 component가 아니라 element로 props 내보내야 함.
//https://lefthanddeveloper.tistory.com/16
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={MainPage} />
          <Route exact path="/sign_in" element={<LoginPage/>} />
          <Route exact path="/sign_up" element={<RegisterPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
