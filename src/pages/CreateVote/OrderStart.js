// 투표 생성 시작 페이지

function OrderStart() {
    return(
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
    );
}

export default OrderStart;