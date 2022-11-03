import "../CreateVotePage.css";

function Order1() {
    return(
        <div className="createvote__center">
            <div className="createvote__head">
                1. 투표 제목을 입력해주세요
            </div>
            <div className="createvote__content">
                <input className="createvote__input"/>
            </div>
        </div>
    );
}

export default Order1;