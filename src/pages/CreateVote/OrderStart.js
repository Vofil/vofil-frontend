// 투표 생성 시작 페이지
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Link} from "react-router-dom";
import "./OrderStartEnd.css";

function OrderStart() {
    return(
        <div className="createvote">
            <div className="createvote__center">
                <div className="createvote__big__head">
                    투표 생성하기
                </div>
                <div className="createvote__small__head">
                    개인정보 보호를 위해 블러처리를 해주세요
                </div>
                <div className="createvote__button__container">
                    <Link to="/orderMid">
                        <button className="createvote__button">시작하기</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderStart;

