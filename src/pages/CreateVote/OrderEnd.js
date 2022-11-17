import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import "./OrderStartEnd.css";
// 투표 생성 종료 페이지

function OrderEnd() {

    //페이지 이동 함수
    const navigate = useNavigate();

    const onSubmitClick = (event) => {
        //버튼 눌리면 방금 생성한 투표 아이디, 투표 생성 페이지로 보내주기
        console.log("버튼 클릭 되었음.")

        axios
        .get("api/voters/bool", { params:
            {
                id: sessionStorage.getItem("loginID"),
                Vid: 327
            }
        })
        .then((response) => {
            console.log("불리언: " + response.data)
            if(response.data == true){
                // 투표하기 페이지로
                navigate("/vote", {
                    state: {
                        id: event.currentTarget.value
                    }
                })
            }
            else {
                // 투표 결과 페이지로
                navigate("/vote_result", {
                    state: {
                        id: 327
                    }
                })
            }
            console.log('well done!')
        })
    }

    return(
        <div className="createvote">
            <div className="createvote__center">
                <div className="createvote__big__head">
                    투표가 생성되었습니다!
                </div>
                <div className="createvote__small__head">
                    투표를 확인해보시겠어요?
                </div>
                <div className="createvote__content">
                    <div className="createvote__button__container">
                            <button onClick={onSubmitClick} className="createvote__button">네</button>

                    </div>
                    <div className="createvote__button__container">
                        <Link to="/">
                            <button className="createvote__button">아니오</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderEnd;