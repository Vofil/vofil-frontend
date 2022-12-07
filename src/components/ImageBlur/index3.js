import { React, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";

function ImageBlur(props) {
    const {imageToCrop, onImageCropped} = props;
    const canvasRef = useRef(null);


    function getBlurredImage() {
        const blurredImage = allInOneCanvas();
        console.log("blurredImageURL: " + blurredImage)

        onImageCropped(blurredImage)
    }

    function allInOneCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = 700;
        canvas.height = 600;
        const ctx = canvas.getContext('2d')

        // 두 캔버스를 저장용 캔버스에 그린다 (먼저 그린쪽이 아래에 있는 레이어가 된다)
        ctx.drawImage(canvasRef.current.canvasContainer.childNodes[0], 0, 0);
        ctx.drawImage(canvasRef.current.canvasContainer.childNodes[1], 0, 0);

        return(canvas.toDataURL());
    }

    return(
        <div>
            <CanvasDraw
                ref={canvasRef}
                imgSrc={imageToCrop}
                canvasWidth={700}
                canvasHeight={600}
                brushColor="#FFFFFF"
            />
            <button onClick={getBlurredImage}>블러완료</button>
        </div>
    );
}

export default ImageBlur;