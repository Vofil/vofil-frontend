import "./CreateVotePage.css";
import Order1 from "./CreateVote/Order1";
import Order2 from "./CreateVote/Order2";
import Order3 from "./CreateVote/Order3";
import Order4 from "./CreateVote/Order4";
import Order5 from "./CreateVote/Order5";
import Order6 from "./CreateVote/Order6";
import Order7 from "./CreateVote/Order7";
import OrderStart from "./CreateVote/OrderStart";
import OrderEnd from "./CreateVote/OrderEnd";
import { IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
// 투표에 대한 정보를 props로 받아와 여기서 투표를 생성해서 백으로 보내준다
// 이 위에 투표 생성 선택지가 띄워짐
function CreateVotePage() {

    return(
        <div className="createvote">
            <div className="createvote__rightleft">
                <button className="createvote__button">
                    <IoIosArrowBack/>
                </button>
            </div>
            <OrderEnd/>
            <div className="createvote__rightleft">
                <button className="createvote__button">
                    <IoIosArrowForward/>
                </button>
            </div>
        </div>
    );
/*
    return(
        <div className="createvote">
            <div className="createvote__rightleft">
                <button className="createvote__button">
                    <IoIosArrowBack/>
                </button>
            </div>
            <div className="createvote__center">
                <div className="createvote__head">
                    <h2>안녕하세요</h2>
                </div>
                <div className="createvote__content">
                    <h2>안녕하세요</h2>
                </div>
            </div>
            <div className="createvote__rightleft">
                <button className="createvote__button">
                    <IoIosArrowForward/>
                </button>
            </div>
        </div>
    );
*/
}

export default CreateVotePage;