import { React, useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import "../edit.css";

function ImageBlur(props) {
    const {imageToCrop, onImageCropped, ratioFrame} = props;
    const canvasRef = useRef(null);
    const [c, setC] = useState("white");
    const [w, setW] = useState(600);
    const [h, setH] = useState(500);

    useEffect(() => {
        if(ratioFrame == 1){
            setW(500)
            setH(500)
        }
        else if(ratioFrame == 2) {
            setW(250)
            setH(500)
        }
        else{
            setW(600)
            setH(200)
        }
    })

    const black1 = () => {
        setC("black")
    }

    const white1 = () => {
        setC("white")
    }

    const red1 = () => {
        setC("red")
    }

    const yellow1 = () => {
        setC("yellow")
    }

    const blue1 = () => {
        setC("blue")
    }

    const green1 = () => {
        setC("green")
    }


    function getBlurredImage() {
        const blurredImage = allInOneCanvas();
        console.log("blurredImageURL: " + blurredImage)

        onImageCropped(blurredImage)
    }

    function allInOneCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')

        // 두 캔버스를 저장용 캔버스에 그린다 (먼저 그린쪽이 아래에 있는 레이어가 된다)
        ctx.drawImage(canvasRef.current.canvasContainer.childNodes[0], 0, 0);
        ctx.drawImage(canvasRef.current.canvasContainer.childNodes[1], 0, 0);

        return(canvas.toDataURL());
    }

    return(
        <div className="edit_window">
            <div className="edit_window_crop">
                <CanvasDraw
                    ref={canvasRef}
                    imgSrc={imageToCrop}
                    canvasWidth={w}
                    canvasHeight={h}
                    brushColor={c}
                />
            </div>
            <div className="edit_detail">
                <div className="edit_title">색상 선택</div>
                <div className="color-palette">
                    <button onClick={black1} className="color-button1"/>
                    <button onClick={white1} className="color-button2"/>
                    <button onClick={red1} className="color-button3"/>
                    <button onClick={yellow1} className="color-button4"/>
                    <button onClick={blue1} className="color-button5"/>
                    <button onClick={green1} className="color-button6"/>
                </div>
                <button onClick={getBlurredImage} className="crop_button">완료</button>
            </div>
        </div>
    );
}

export default ImageBlur;