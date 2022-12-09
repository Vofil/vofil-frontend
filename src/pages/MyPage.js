import React, {useState} from 'react';
import {Link} from "react-router-dom";
import MyInfoPage from "./MyPageComponents/MyInfoPage";
import VoteListMPage from "./MyPageComponents/VoteListMPage";
import VoteListPPage from "./MyPageComponents/VoteListPPage";
import "./MainPage.css";

function MyPage() {
    const [sign, setSign] = useState(1)

    const onClick1 = () => {
        setSign(1)
    }

    const onClick2 = () => {
        setSign(2)
    }

    const onClick3 = () => {
        setSign(3)
    }

    return (
        <div className="all-page">
            <div className="nav-mypage">
                <div className="menu-mypage-title">메뉴</div>
                <button onClick={onClick1} className="menu-mypage">내 정보</button>
                <button onClick={onClick2} className="menu-mypage">내가 만든 투표</button>
                <button onClick={onClick3} className="menu-mypage">내가 참여한 투표</button>
            </div>
            <div className="window">
                { sign == 1 && <MyInfoPage/>}
                { sign == 2 && <VoteListMPage/>}
                { sign == 3 && <VoteListPPage/>}
            </div>
        </div>
    );
}

export default MyPage;