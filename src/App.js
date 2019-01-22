import React, {Component} from 'react';
//import axios from 'axios';
import {EditorState,convertToRaw} from "draft-js";
import {Editor} from "react-draft-wysiwyg"

import draftToHtml from 'draftjs-to-html';

/*function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
		const xhr = new XMLHttpRequest();
      xhr.open('POST', '/upload');
      xhr.setRequestHeader('content-type', 'multipart/form-data');
      const reader = new FileReader(); // eslint-disable-line no-undef
      reader.onload = e => resolve({ data: { link: e.target.result } });
      reader.onerror = e => reject(e);
      reader.readAsDataURL(file);
    });
}*/


function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
       const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID 8d26ccd12712fca");
      const data = new FormData(); // eslint-disable-line no-undef
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      })
    }
    
  );
}



class EditorContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange: Function = (editorState) => {
    // console.log(editorState)
    this.setState({
      editorState,
    });
  };

  render(){
    const { editorState } = this.state;
    return <div className='editor'>
      <Editor
        editorState={editorState}
        onEditorStateChange={this.onEditorStateChange}    
        toolbar={{
    inline: { inDropdown: true },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: true },
	image: {
          uploadCallback: uploadImageCallBack,
          previewImage: true,
        },
  }}
      />
	   <div>{draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}</div>
    </div>
  }
}

export default EditorContainer;





