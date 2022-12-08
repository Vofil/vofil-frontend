import frame from "../assets/Instagram_Post_Frame.png"
import "./Position.css"

function InstaPostFrame(props) {
    const {sourceImg} = props;

    return(
        <div className="insta__post">
            <div className="insta__post__parent">
                <img src={frame}/>
                <div className="insta__post__child">
                    <img src={sourceImg} className="insta__post__img"/>
                </div>
            </div>
        </div>
    );
}

export default InstaPostFrame;