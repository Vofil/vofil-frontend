import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import "./Navbar.css"
import logo from '../assets/logo_small.jpg';

function Navbar() {
    const [sign, setSign] = useState(true)

    const onClick = () => {
        setSign((prev) => !prev)
    }

    /*
    return (
        <div>
            <div className="navbar">
                <button>
                    <AiOutlineMenu/>
                </button>
                <div>
                    <img src={logo}/>
                </div>

            </div>
        </div>
    );
    */


    return (
        <div>
            <ul className="navbar">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/edit_pictures"><button onClick={onClick}>사진편집</button></Link></li>
                <li><Link to="/create_vote"><button onClick={onClick}>투표생성</button></Link></li>
                <li><Link to="/vote"><button onClick={onClick}>투표하기</button></Link></li>
                <li><Link to="/mypage"><button onClick={onClick}>마이페이지</button></Link></li>
                <li><Link to="/sign_in"><button onClick={onClick}>로그인</button></Link></li>
                <li><Link to="/sign_up"><button onClick={onClick}>회원가입</button></Link></li>    
            </ul>
        </div>
    );

}

export default Navbar;

/*

{sign ? (
    <li><Link to="/sign_in"><button onClick={onClick}>로그인</button></Link></li>
    ) : (
    <li><Link to="/sign_up"><button onClick={onClick}>회원가입</button></Link></li>
)} 

*/