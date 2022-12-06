//import { useRef, useEffect } from 'react';
//
//
//const INITIAL_AREA = {
//  x: 0,
//  y: 0,
//  width: 0,
//  height: 0,
//};
//
//function ImageBlur(props) {
//    const {source, onImageCropped} = props;
//
//    //레이어 만들기
//    const blurLayer = useRef(null);
//    const imageLayer = useRef(null);
//    const dragLayer = useRef(null);
//
//    //블러 모드인가?
//    const [isBlurMode, setIsBlurMode] = useState(false);
//
//    //편집할 이미지 소스
//    const [imageSource, setImageSource] = useState(null);
//
//    //블러 구역, 블러 구역 모음
//    const [blurryArea, setBlurArea] = useState(INITIAL_AREA);
//    const [blurryAreas, setBlurryAreas] = useState([]);
//
//    //hook 생성
//    useEffect(drawImageLayer, [imageSource, rotationAngle, blurryAreas]);
//    useEffect(drawBlurLayer, [imageSource, rotationAngle]);
//    useEffect(drawDragLayer, [imageSource, rotationAngle]);
//    useEffect(drawDragArea, [blurryArea]);
//
//    //hook 함수
//    function drawImageLayer() {
//        if (!imageLayer) return;
//        const ctx = imageLayer.current.getContext("2d");
//        const image = new Image();
//        image.src = imageSource
//
//        image.onload = function() {
//            ctx.drawImage(image, 0,0);
//        }
//    }
//
//
//    return (
//        <canvas ref={blurLayer}/>
//        <canvas ref={imageLayer}/>
//        <canvas ref={dragLayer}/>
//    );
//}
//
//export default ImageBlur;