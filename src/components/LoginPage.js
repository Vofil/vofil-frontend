import React, {useState} from 'react';
import "./LoginRegister.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    }

    //백엔드 연결 아직 안 함. 일단 가입 눌러도 변화 없게.
    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div class="loginregister">
          <form>
              <div><input name="email" type="email" placeholder="이메일" value={email} onChange={onEmailHandler} class="loginregister__input"/></div>
              <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} class="loginregister__input"/></div>
              <div><button type="submit" onSubmit={onSubmit} class="loginregister__button">로그인</button></div>
          </form>
        </div>
    );
}

export default LoginPage;