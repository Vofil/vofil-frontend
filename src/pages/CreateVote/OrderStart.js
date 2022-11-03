// 투표 생성 시작 페이지
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Link} from "react-router-dom";

function OrderStart() {
    return(
        <div className="createvote">
            <div className="createvote__rightleft">
                <button className="createvote__button">
                    <IoIosArrowBack/>
                </button>
            </div>
            <div className="createvote__center">
                <div className="createvote__head">
                    투표 생성하기
                </div>
                <div className="createvote__head">
                    개인정보 보호를 위해 블러처리를 해주세요
                </div>
                <div className="createvote__content">
                    <input className="createvote__input"/>
                </div>
            </div>
            <div className="createvote__rightleft">
                <Link to="/create_vote/order1">
                    <button className="createvote__button">
                        <IoIosArrowForward/>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default OrderStart;

