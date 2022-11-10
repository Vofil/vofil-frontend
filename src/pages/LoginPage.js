import React, {useState} from 'react';
import "./LoginRegister.css";
import axios from 'axios';

function LoginPage() {
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

    //백엔드 연결 아직 안 함. 일단 가입 눌러도 변화 없게.
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios
        .get("/api/users/" + ID, {
            id: ID,
            password: password,
        })
        /*axios({
            method: "get",
            url: "/api/users/" + ID,
            data: {
              name: name,
              id: ID,
              password: password,
              birth_year: ,
              birth_month: birthdayM,
              birth_day: birthdayD,
              gender: gender,
              point: 0,
              keyword: null,
              title: null,
            },
        })*/
        .then((response) => {
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