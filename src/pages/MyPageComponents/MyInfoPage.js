import {React, useState, useEffect} from 'react';
import {FaBirthdayCake} from "react-icons/fa";
import {BsCoin, BsGenderAmbiguous, BsTrophy} from "react-icons/bs";
import {RiEmotionHappyLine} from "react-icons/ri";
import axios from 'axios';
import "../MainPage.css"

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
        <div className="main__page">
            <div className="myinfo_wrapper">
                <div className="vote_category__title">내 정보</div>
                <div className="my-info">
                    <div className="header">
                        <div className="profile-image"><RiEmotionHappyLine className="profile-icon"/></div>
                        <div className="nicname">{name}</div>
                        <div className="text-id">{user_id}</div>
                    </div>
                    <div className="detail-info">
                        <div className="detail-info-box">
                            <div className="icon-container"><BsTrophy className="icon"/></div>
                            {(title == null) ?
                                <div className="text-detail-info">아직 칭호가 없네요😅</div>
                                : <div className="text-detail-info">{title}</div>
                            }
                        </div>
                        <div className="detail-info-box">
                            <div className="icon-container"><BsCoin className="icon"/></div>
                            <div className="text-detail-info">{point}</div>
                        </div>
                        <div className="detail-info-box">
                            <div className="icon-container"><FaBirthdayCake className="icon"/></div>
                            <div className="text-detail-info">{birth}</div>
                        </div>
                        <div className="detail-info-box">
                            <div className="icon-container"><BsGenderAmbiguous className="icon"/></div>
                            <div className="text-detail-info">{gender}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyInfoPage;