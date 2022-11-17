import React, {useState} from 'react';
import "./LoginRegister.css";
import axios from 'axios';

function LoginPage() {
    //세션 스토리지 생성
    let sessionStorage = window.sessionStorage;

    const [email, setEmail] = useState("");
    const [ID, setID] = useState("");
    const [password, setPassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    }

    const onIDHandler = (e) => {
        setID(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    }

    //백에 로그인 요청
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
        .get("/api/users/", {params:
            {
                id: ID,
                password: password
            }},
            {withCredentials: true}
        )
        .then((response) => {
            console.log("토큰을 내놔라")
            console.log(response.data)

            if(response.data){
                sessionStorage.setItem('loginID', ID)
            }

            //const {accessToken} = response.data

            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            //axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            console.log('well done!')
            return alert('환영합니다.')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        });
    }

    return (
        <div className="loginregister">
          <form>
              <div><input name="ID" type="text" placeholder="아이디" value={ID} onChange={onIDHandler} className="loginregister__input"/></div>
              <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} className="loginregister__input"/></div>
              <div><button type="submit" onClick={onSubmitHandler} className="loginregister__button">로그인</button></div>
          </form>
        </div>
    );
}

export default LoginPage;

// <div><input name="email" type="email" placeholder="이메일" value={email} onChange={onEmailHandler} class="loginregister__input"/></div>