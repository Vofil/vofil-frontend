import {React, useState, useEffect} from 'react';
import axios from 'axios';

function MyInfoPage() {
    // 받아온 데이터 저장
    const [name, setName] = useState("");
    const [user_id, setID] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState(0);
    const [title, setTitle] = useState("");
    const [point, setPoint] = useState(0);

    const fetchUserDataLoad = () => {
        axios
        .get("api/mypage/user/information", { params:
            {
                user_id: sessionStorage.getItem("loginID")
            }
        })
        .then((response) => {
            setName(response.data.name)
            setID(response.data.id)
            setBirth(response.data.birth)
            if(response.data.gender == 3) {
                setGender("남자")
            }
            else{
                setGender("여자")
            }
            setTitle(response.data.title)
            setPoint(response.data.point)

            console.log('well done!')
        })
        .catch((error) => {
            console.log('An error occurred:', error.response);
        })
    }

    useEffect(() => {
        fetchUserDataLoad();
    }, []);

    return (
        <div>
            <h2>내 정보</h2>
            <ul>
                <li>닉네임: {name}</li>
                <li>아이디: {user_id}</li>
                <li>생일: {birth}</li>
                <li>성별: {gender}</li>
                <li>칭호: {title}</li>
                <li>포인트: {point}</li>
            </ul>
        </div>
    );
}

export default MyInfoPage;