import React from 'react'
import FileUpload from './FileUpload.jsx'

class FileUploader extends React.Component {
  constructor(props) {
    super(props)
    this.stete = {

    }
  }
  render() {
    const options = {
      baseUrl         : '/manage/product/upload.do',
      fileFieldName   : 'upload_file',
      dataType        : 'json',
      chooseAndUpload : true,
      uploadSuccess   : this.props.onSuccess ,
      uploadError     : this.props.onErr

    }
    return (
      <FileUpload options={options}>
        <button ref='chooseAndUpload' className='btn btn-xs btn-default' style={{marginTop: '15px'}}>请选择图片</button>
      </FileUpload>
    )
  }
}

export default FileUploader