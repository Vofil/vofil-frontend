import frame from "../assets/Instagram_Profile_Frame.png"
import "./Position.css"

function InstaProfileFrame(props) {
    const {sourceImg} = props;

    return(
        <div className="insta__profile">
            <div className="insta__profile__parent">
                <div className="frame__border">
                    <img src={frame} className="insta__profile__frame"/>
                </div>
                <div className="insta__profile__child">
                    <img src={sourceImg} className="insta__profile__img"/>
                </div>
            </div>
        </div>
    );
}

export default InstaProfileFrame;