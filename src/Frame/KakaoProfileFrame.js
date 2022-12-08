import frame from "../assets/kakao_profile_frame.png"
import "./Position.css"

function KakaoProfileFrame(props) {
    const {sourceImg} = props;

    return(
        <div className="kakao__profile">
            <div className="kakao__profile__parent">
                    <img src={frame} className="kakao__profile__frame"/>
                <div className="kakao__profile__child">
                    <img src={sourceImg} className="kakao__profile__img"/>
                </div>
            </div>
        </div>
    );
}

export default KakaoProfileFrame;

