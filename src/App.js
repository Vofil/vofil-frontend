import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Main from './routes/Main';
import Login from './routes/Login';
import Register from './routes/Register';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditPicturesPage from './pages/EditPicturesPage';
import MyPage from "./pages/MyPage";
import MyInfoPage from "./pages/MyPageComponents/MyInfoPage"
import VoteListMPage from "./pages/MyPageComponents/VoteListMPage"
import VoteListPPage from "./pages/MyPageComponents/VoteListPPage"
import CreateVotePage from "./pages/CreateVotePage"

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
          <Route exact path="/edit_pictures" element={<EditPicturesPage/>} />
          <Route exact path="/sign_in" element={<LoginPage/>} />
          <Route exact path="/sign_up" element={<RegisterPage/>} />
          <Route exact path="/create_vote" element={<CreateVotePage/>} />
          <Route exact path="/mypage" element={<MyPage/>} />
          <Route exact path="/mypage/myinfo" element={<MyInfoPage/>} />
          <Route exact path="/mypage/votelistM" element={<VoteListMPage/>} />
          <Route exact path="/mypage/votelistP" element={<VoteListPPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;