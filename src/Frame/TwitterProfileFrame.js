import frame from "../assets/twit_profile.png"
import "./Position.css"

function TwitterProfileFrame(props) {
    const {sourceImg} = props;

    return(
        <div className="twit__profile">
            <div className="twit__profile__parent">
                <img src={frame} className="twit__profile__frame"/>
                <div className="twit__profile__child">
                    <img src={sourceImg} className="twit__profile__img"/>
                </div>
            </div>
        </div>
    );
}

export default TwitterProfileFrame;