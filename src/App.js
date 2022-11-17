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
import OrderMid from "./pages/CreateVote/OrderMid"
import OrderMid2 from "./pages/CreateVote/OrderMid2"
import OrderStart from "./pages/CreateVote/OrderStart"
import OrderEnd from "./pages/CreateVote/OrderEnd"
import VotePage from "./pages/VotePage"
import VoteResult from "./pages/Vote/VoteResult"

//react-router-dom이 v6이 되면서 Switch -> Routes로 변경됨
//그리고 v6부터는 component가 아니라 element로 props 내보내야 함.
//https://lefthanddeveloper.tistory.com/16

/*
    <Vote 페이지에 관하여>
    - 투표 생성해서 투표 만들게 되면 exact path는 String 형태로 /vote/투표인덱스 로 작성
*/
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<MainPage/>} />
          <Route exact path="/edit_pictures" element={<EditPicturesPage/>} />
          <Route exact path="/sign_in" element={<LoginPage/>} />
          <Route exact path="/sign_up" element={<RegisterPage/>} />

          <Route exact path="/create_vote" element={<CreateVotePage/>} />
          <Route exact path="/orderMid" element={<OrderMid/>} />
          <Route exact path="/orderMid2" element={<OrderMid2/>} />
          <Route exact path="/orderStart" element={<OrderStart/>} />
          <Route exact path="/orderEnd" element={<OrderEnd/>} />

          <Route exact path="/vote" element={<VotePage/>} />
          <Route exact path="/vote_result" element={<VoteResult/>} />

          <Route exact path="/mypage" element={<MyPage/>} />
          <Route exact path="/myinfo" element={<MyInfoPage/>} />
          <Route exact path="/votelistM" element={<VoteListMPage/>} />
          <Route exact path="/votelistP" element={<VoteListPPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;