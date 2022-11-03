// 투표 생성 종료 페이지

function OrderEnd() {
    return(
        <div className="createvote__center">
            <div className="createvote__head">
                투표가 생성되었습니다
            </div>
            <div className="createvote__head">
                내가 만든 투표를 확인해보시겠어요?
            </div>
            <div className="createvote__content">
                <input className="createvote__input"/>
            </div>
        </div>
    );
}

export default OrderEnd;