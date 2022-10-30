import React, {useState} from 'react';
import "./LoginRegister.css";
import UserList from "../dummydata/UserList";

  // 생일 select box 
  const now = new Date();
  let years = [];
  for(let y= now.getFullYear(); y>=1930; y -=1){
    years.push(y);
  }

  let month = [];
  for(let m = 1; m <= 12; m+=1){
    month.push(m);
  }

  let days = [];
  for(let d=1; d<=31; d+=1) {
    days.push(d);
  }

function RegisterPage() {
  const [name, setName] = useState("")
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [birthdayY, setBirthdayY] = useState(0)
  const [birthdayM, setBirthdayM] = useState(0)
  const [birthdayD, setBirthdayD] = useState(0)
  const [sex, setSex] = useState("")

  //테스트 더미 데이터
  const [users, setUsers] = useState([
    {
        name: 'jisu',
        id: 'sjshappy110',
        password: '1105',
        birth_year: 2000,
        birth_month: 11,
        birth_day: 5,
        sex: 2
    },
    {
        name: 'dami',
        id: 'tlsekal0307',
        password: '0307',
        birth_year: 2005,
        birth_month: 3,
        birth_day: 7,
        sex: 2
    }
  ]);
  //여기까지 더미 데이터

  
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onIDHandler = (event) => {
    setID(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
      setConfirmPassword(event.currentTarget.value)
  }

  const onBirthdayYHandler = (event) => {
    setBirthdayY(event.currentTarget.value)
  }

  const onBirthdayMHandler = (event) => {
    setBirthdayM(event.currentTarget.value)
  }

  const onBirthdayDHandler = (event) => {
    setBirthdayD(event.currentTarget.value)
  }

  const onSexHandler = (event) => {
    setSex(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault()
    if(password !== confirmPassword) {
      return alert('비밀번호가 다릅니다.')
    }

    const user = {
      name: name,
      id: ID,
      password: password,
      birth_year: birthdayY,
      birth_month: birthdayM,
      birth_day: birthdayD,
      sex: sex,
    };
    setUsers([...users, user]);

  }

  return (
    <div className="loginregister">
      <form>
          <div><input name="name" type="text" placeholder="이름" value={name} onChange={onNameHandler} className="loginregister__input"/></div>
          <div><input name="ID" type="text" placeholder="아이디" value={ID} onChange={onIDHandler} className="loginregister__input"/></div>
          <div><input name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler} className="loginregister__input"/></div>
          <div><input name="confirmPassword" type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={onConfirmPasswordHandler} className="loginregister__input"/></div>
          <div>
            <select value={birthdayY} onChange={onBirthdayYHandler} className="loginregister__select">
              <option value="default" disabled>년</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select value={birthdayM} onChange={onBirthdayMHandler} className="loginregister__select">
              <option value="default" disabled>월</option>
              {month.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select value={birthdayD} onChange={onBirthdayDHandler} className="loginregister__select">
              <option value="default" disabled>일</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="loginregister__input">
            <label htmlFor="male" className="loginregister__input__radio">남성</label>
            <input name="sex" type="radio" value={1} onChange={onSexHandler} className="loginregister__input__radio"/>
            <label htmlFor="female" className="loginregister__input_radio">여성</label>
            <input name="sex" type="radio" value={2} onChange={onSexHandler} className="loginregister__input__radio"/>
          </div>
          <div><button type="submit" onSubmit={onSubmitHandler} className="loginregister__button">계정 생성하기</button></div>
      </form>
      <UserList users={users}/>
    </div>
  );
  
}
export default RegisterPage;

/*

console.log(name);
      console.log(ID);
      console.log(password);
      console.log(birthdayY);
      console.log(birthdayM);
      console.log(birthdayD);
      console.log(sex);
*/