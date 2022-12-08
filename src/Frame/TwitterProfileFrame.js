import frame from "../assets/twit_profile.png"
import "./Position.css"

function TwitterProfileFrame(props) {
    const {sourceImg} = props;

    return(
        <div className="twit__profile">
            <div className="twit__profile__parent">
                <div className="twit__profile__child1">
                    <img src={frame} className="twit__profile__frame"/>
                </div>
                <div className="twit__profile__child2">
                    <img src={sourceImg} className="twit__profile__img"/>
                </div>
            </div>
        </div>
    );
}

export default TwitterProfileFrame;