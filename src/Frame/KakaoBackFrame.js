import frame from "../assets/kakao_background_frame.png"
import "./Position.css"

function KakaoBackFrame(props) {
    const {sourceImg} = props;

    return(
        <div className="kakao__back">
            <div className="kakao__back__parent">
                <img src={sourceImg} className="kakao__back__img"/>
                <div className="kakao__back__child">
                    <img src={frame} className="kakao__back__frame" />
                </div>
            </div>
        </div>
    );
}

export default KakaoBackFrame;