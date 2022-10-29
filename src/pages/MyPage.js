import React, {useState} from 'react';
import {Link} from "react-router-dom";

function MyPage() {
    const [sign, setSign] = useState(true)

    const onClick = () => {
        setSign((prev) => !prev)
    }

    return (
        <div>
            <h2>마이페이지</h2>
            <ul>
                <li><Link to="/mypage/myinfo"><button onClick={onClick}>나의 정보</button></Link></li> 
                <li><Link to="/mypage/votelistM"><button onClick={onClick}>내가 만든 투표</button></Link></li>
                <li><Link to="/mypage/votelistP"><button onClick={onClick}>내가 참여한 투표</button></Link></li>    
            </ul>
        </div>
    );
}

export default MyPage;