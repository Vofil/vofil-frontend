import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import "./Navbar.css"
import logo from '../assets/logo_small.jpg';

function Navbar() {
    const [sign, setSign] = useState(true)
    const [menuState, setMenuState] = useState(false)

    //네비게이트 생성
    const navigate = useNavigate()

    const onClick = () => {
        setSign((prev) => !prev)
    }

    const isClickMenu = () => {
        setMenuState(!menuState)
    }

    const onClickCreateVote = () => {
        navigate("/create_vote")
        isClickMenu()
    }

    const onClickEditPic = () => {
        navigate("/edit_pictures")
        isClickMenu()
    }

    return (
        <div>
            <div className="navbar">
                <div className="menu__container">
                    <button onClick={isClickMenu} className="menu__button">
                        <AiOutlineMenu className="menu__icon"/>
                    </button>
                </div>
                <div className="log__container">
                    <Link to="/">
                        <img src={logo} className="logo__img"/>
                    </Link>
                </div>
                <div className="navbar__right__container">
                    <Link to="/sign_in">
                        <button onClick={onClick} className="sign_in_up_button">로그인</button>
                    </Link>
                    <Link to="/sign_up">
                        <button onClick={onClick} className="sign_in_up_button">회원가입</button>
                    </Link>
                </div>
            </div>
            {menuState == true &&
                <div>
                    <div className="navbar__bottom">
                        <button onClick={onClickCreateVote}>투표 생성하기</button>
                    </div>
                    <div className="navbar__bottom">
                        <button onClick={onClickEditPic}>사진 편집하기</button>
                    </div>
                </div>
            }
        </div>
    );


//    return (
//        <div>
//            <ul className="navbar">
//                <li><Link to="/">Home</Link></li>
//                <li><Link to="/edit_pictures"><button onClick={onClick}>사진편집</button></Link></li>
//                <li><Link to="/create_vote"><button onClick={onClick}>투표생성</button></Link></li>
//                <li><Link to="/vote"><button onClick={onClick}>투표하기</button></Link></li>
//                <li><Link to="/mypage"><button onClick={onClick}>마이페이지</button></Link></li>
//                <li><Link to="/sign_in"><button onClick={onClick}>로그인</button></Link></li>
//                <li><Link to="/sign_up"><button onClick={onClick}>회원가입</button></Link></li>
//            </ul>
//        </div>
//    );

}

export default Navbar;