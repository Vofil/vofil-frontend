import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

function ImageZoom(props) {
    const {imageToZoom, onImageZoomed} = props;

    async function zoomImage(zoom) {

    }
    /*
        <옵션 설명>
        - initialScale: 첫 화면 렌더링시, 확대 디폴트 값
        - minScale: 최소 축소
        - maxScale: 최대 확대
    */
    return(
        <TransformWrapper initialScale={1} minScale={1} maxScale={10} >
            <TransformComponent >
                <figure>
                    <img src={imageToZoom}/>
                </figure>
            </TransformComponent>
        </TransformWrapper>
    );
}

export default ImageZoom;