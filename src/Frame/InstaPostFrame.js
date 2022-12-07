import frame from "../assets/Instagram_Post_Frame.png"
import imageSource from "../assets/image1.jpg"
import "./Position.css"

function InstaPostFrame(sourceImg) {

    return(
        <div className="insta__parent">
            <img src={frame}/>
            <div className="insta__child">
                <img src={imageSource}/>
            </div>
        </div>
    );
}

export default InstaPostFrame;


//<img alt="image" src={require(`${sourceImg}`).default}/>



<div style="position: relative;">
            <img src={frame}/>
            <div style="position: absolute; top: 50px; left: 50px;">
                <img src={imageSource}/>
            </div>
        </div>