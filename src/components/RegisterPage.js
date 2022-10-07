import React, {useState} from 'react'
import "./LoginRegister.css"

function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [birthday, setBirthday] = useState("")
  const [sex, setSex] = useState("")

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  /*
  const onEmailHandler = (event) => {
      setEmail(event.currentTarget.value)
  }
  */
  const onIDHandler = (event) => {
    setID(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
      setConfirmPassword(event.currentTarget.value)
  }

  const onBirthdayHandler = (event) => {
    setBirthday(event.currentTarget.value)
  }

  /*
  const birthYearEl = document.querySelector('#birth-year')
    // option 목록 생성 여부 확인
    isYearOptionExisted = false;
    birthYearEl.addEventListener('focus', function () {
    // year 목록 생성되지 않았을 때 (최초 클릭 시)
    if(!isYearOptionExisted) {
      isYearOptionExisted = true
      for(var i = 1940; i <= 2022; i++) {
        // option element 생성
        const YearOption = document.createElement('option')
        YearOption.setAttribute('value', i)
        YearOption.innerText = i
        // birthYearEl의 자식 요소로 추가
        this.appendChild(YearOption);
      }
    }
  }); */

  const onSexHandler = (event) => {
    setSex(event.currentTarget.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if(password !== confirmPassword) {
      return alert('비밀번호와 비밀번호확인은 같아야 합니다.')
    }
  }

  return (
    <div class="loginregister">
      <form>
          <div><input name="name" type="text" placeholder="이름" value={name} onChange={onNameHandler} class="loginregister__input"/></div>
          <div><input name="ID" type="text" placeholder="아이디" value={ID} onChange={onIDHandler} class="loginregister__input"/></div>
          <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} class="loginregister__input"/></div>
          <div><input name="confirmPassword" type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={onConfirmPasswordHandler} class="loginregister__input"/></div>
          <div>
            <select class="loginregister__select">
              <option disabled selected>출생연도</option>
            </select>
            <select class="loginregister__select">
              <option disabled selected>월</option>
            </select>
            <select class="loginregister__select">
              <option disabled selected>일</option>
            </select>
          </div>
          <div class="loginregister__input">
            <label for="male" class="loginregister__input__radio">남성</label>
            <input name="sex" type="radio" value="남성" onChange={onSexHandler} class="loginregister__input__radio"/>
            <label for="female" class="loginregister__input_radio">여성</label>
            <input name="sex" type="radio" value="여성" onChange={onSexHandler} class="loginregister__input__radio"/>
          </div>
          <div><button type="submit" onSubmit={onSubmit} class="loginregister__button">계정 생성하기</button></div>
      </form>
    </div>
  );
}
export default RegisterPage;

//<div><input name="email" type="email" placeholder="이메일" value={email} onChange={onEmailHandler} class="loginregister__input"/></div>