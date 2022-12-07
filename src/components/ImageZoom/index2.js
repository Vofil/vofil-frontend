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
                resize: this.state.resize + 1
            });
            //setResize(resize+0.2)
        }
    }

    minus = () => {
        if(this.state.resize >0.3){
            this.setState({
                resize: this.state.resize - 1
            });
            //setResize(resize-0.2)
        }
    }


    render() {
        const {imageToZoom, onImageZoomed} = this.props;
        return(
            <div>
                <AvatarEditor
                    ref={this.setEditorRef}
                    image={imageToZoom}
                    width={250}
                    height={250}
                    scale={this.state.resize}
                    border={0}
                />
                <button onClick={this.plus}>+</button>
                <button onClick={this.minus}>-</button>
                <button onClick={this.getBlurredImage}>확대축소</button>
            </div>
        );
    }


}

export default ImageZoom;