import {React, useState, useEffect} from 'react';
import axios from 'axios';

function MyInfoPage() {
    // 받아온 데이터 저장
    const [name, setName] = useState("");
    const [user_id, setID] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState(0);
    const [title, setTitle] = useState("");

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
            setGender(response.data.gender)
            setTitle(response.data.title)

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
                <li>{name}</li>
                <li>{user_id}</li>
                <li>{birth}</li>
                <li>{gender}</li>
                <li>{title}</li>
            </ul>
        </div>
    );
}

export default MyInfoPage;