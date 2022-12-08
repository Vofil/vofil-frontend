import {React, useRef, useState, Component} from 'react';
//import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";
import AvatarEditor from 'react-avatar-editor';

class ImageZoom extends Component {

    //const canvasRef = useRef(null);
    setEditorRef = (editor) => (this.editor = editor)
    //const [resize, setResize] = useState(1);

    state={
        resize: 1
    }

    getBlurredImage = () => {
        //const blurredImage = this.editor.getImage().toDataURL();
        if (this.editor){
            console.log("ediotor: "+ this.editor.getImage().toDataURL())
            const canvas = this.editor.getImage().toDataURL();
            let imageURL;
            fetch(canvas)
              .then(res => res.blob())
              .then(blob => (imageURL = window.URL.createObjectURL(blob)));
            console.log("blurredImageURL: " + canvas)
            this.props.onImageZoomed(canvas)
        }
    }

    plus = () => {
        if(this.state.resize < 3){
            this.setState({
                resize: this.state.resize + 0.2
            });
            //setResize(resize+0.2)
        }
    }

    minus = () => {
        if(this.state.resize >0.3){
            this.setState({
                resize: this.state.resize - 0.2
            });
            //setResize(resize-0.2)
        }
    }


    render() {
        const {imageToZoom, onImageZoomed, ratioFrame} = this.props;
        var w = 600;
        var h = 500;
        if(ratioFrame == 1){
            w = 500;
            h = 500;
        }
        else if(ratioFrame == 2){
            w = 250;
            h = 500;
        }
        else{
            w = 600;
            h = 200;
        }
        return(
            <div className="edit_window">
                <div className="edit_window_crop">
                    <AvatarEditor
                        ref={this.setEditorRef}
                        image={imageToZoom}
                        width={w}
                        height={h}
                        scale={this.state.resize}
                        border={0}
                    />
                </div>
                <div className="edit_detail">
                    <div className="edit_title">확대 축소</div>
                    <div className="zoom-box">
                        <button onClick={this.plus} className="plus-minus-button">+</button>
                        <button onClick={this.minus} className="plus-minus-button">-</button>
                    </div>
                    <button onClick={this.getBlurredImage} className="crop_button">완료</button>
                </div>
            </div>
        );
    }


}

export default ImageZoom;