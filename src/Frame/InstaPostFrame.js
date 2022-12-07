import frame from "../assets/Instagram_Post_Frame.png"

function InstaPostFrame(sourceImg) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 2000;
    const ctx = canvas.getContext('2d')

    var img1 = new Image();
    var img2 = new Image();
    img1.src = frame
    img2.src = sourceImg

    ctx.drawImage(img1, 0, 0);
    ctx.drawImage(img2, 0, 0);

    return(
        <img alt="image" src={frame}/>
    );
}

export default InstaPostFrame;