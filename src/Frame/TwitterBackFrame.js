import frame from "../assets/twit_banner.png"
import "./Position.css"

function TwitterBackFrame(props) {
    const {sourceImg} = props;

    return(
        <div className="twit__back">
            <div className="twit__back__parent">
                <img src={sourceImg} className="twit__back__img"/>
                <div className="twit__back__child">
                    <img src={frame} className="twit__back__frame" />
                </div>
            </div>
        </div>
    );
}

export default TwitterBackFrame;