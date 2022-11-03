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
import Order1 from "./pages/CreateVote/Order1"
import Order2 from "./pages/CreateVote/Order2"
import Order3 from "./pages/CreateVote/Order3"
import Order4 from "./pages/CreateVote/Order4"
import Order5 from "./pages/CreateVote/Order5"
import Order6 from "./pages/CreateVote/Order6"
import Order7 from "./pages/CreateVote/Order7"
import OrderStart from "./pages/CreateVote/OrderStart"
import OrderEnd from "./pages/CreateVote/OrderEnd"

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
          <Route exact path="/create_vote/order1" element={<Order1/>} />
          <Route exact path="/create_vote/order2" element={<Order2/>} />
          <Route exact path="/create_vote/order3" element={<Order3/>} />
          <Route exact path="/create_vote/order4" element={<Order4/>} />
          <Route exact path="/create_vote/order5" element={<Order5/>} />
          <Route exact path="/create_vote/order6" element={<Order6/>} />
          <Route exact path="/create_vote/order7" element={<Order7/>} />
          <Route exact path="/create_vote/orderStart" element={<OrderStart/>} />
          <Route exact path="/create_vote/orderEnd" element={<OrderEnd/>} />

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