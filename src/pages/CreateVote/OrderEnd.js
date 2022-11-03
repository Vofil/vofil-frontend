import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {Link} from "react-router-dom";
import "./CreateVotePage.css";
// 투표 생성 종료 페이지

function OrderEnd() {
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
                    <Link to="/vote">
                        <button className="createvote__button">네</button>
                    </Link>
                    <Link to="/">
                        <button className="createvote__button">아니오</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default OrderEnd;