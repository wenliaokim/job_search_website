import { useState } from 'react';
import { useHistory, Redirect } from "react-router-dom";
import axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import * as Cookies from "js-cookie";
import { API_URL } from '../../constant';
import "./CreateJobPage.css";

const content = {
    "entityMap":{},
    "blocks":[{"key":"637gr","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]
};
const noImageUrl = "https://res.cloudinary.com/dn5oslw1q/image/upload/v1639337656/2048px-No_image_available.svg_w9kbj7.png";

export default function CreateJobPage() {
    const [jobData, setJobData] = useState({
        iconUrl: '',
        username: '',
        title: '', 
        companyName: '',
        location: '',
        jobDescription: JSON.stringify(content),
        employerEmail: '',
        website: '' 
    });

    const history = useHistory();
    let username = Cookies.get("username");

    const [editorState, seteditorState] = useState(() => EditorState.createEmpty());
    const [selectedFile, setSelectedFile] = useState(null);

    const onTitleChange = (event) => {setJobData({...jobData, title: event.target.value})};
    const onCompanyChange = (event) => {setJobData({...jobData, companyName: event.target.value})};
    const onLocationChange = (event) => {setJobData({...jobData, location: event.target.value})};
    const onDescriptionChange = () => {
        setJobData(
            {...jobData, 
                jobDescription: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
            })
    };
    const onEmailChange = (event) => {setJobData({...jobData, employerEmail: event.target.value})};
    const onWebsiteChange = (event) => {setJobData({...jobData, website: event.target.value})};
    const onSelectFile = (event) => {setSelectedFile(event.target.files[0])}

    const onCreateJob = () => {
        let errorMessage = "";
        if (!jobData.title.trim()) errorMessage = "Invalid title input";
        else if (!jobData.companyName.trim()) errorMessage = "Invalid company input";
        else if (!jobData.location.trim()) errorMessage = "Invalid location input";
        else if (!JSON.parse(jobData.jobDescription).blocks[0].text) errorMessage = "Invalid job description input";
        else if (!jobData.employerEmail.trim()) errorMessage = "Invalid email input";

        if (errorMessage) {
            window.alert(errorMessage);
            return;
        }

        if(selectedFile) {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("upload_preset", "sqzhymmy");

            axios.post("https://api.cloudinary.com/v1_1/dn5oslw1q/image/upload", formData)
                .then((response) => {
                    if (!errorMessage) {
                        axios.post(API_URL + '/jobsearch/createJob', {...jobData, iconUrl: response.data.url, username: username})
                        .then((response) => history.push('/jobDetail/' + response.data._id))
                    }
                })
                .catch((error) => {console.log(error)});
        } else {
            axios.post(API_URL + '/jobsearch/createJob', {...jobData, iconUrl: noImageUrl, username: username})
            .then((response) => history.push('/jobDetail/' + response.data._id))
            .catch(error => console.log(error));
        }
    }

    return (
        <div>
            { !username ? <Redirect to="/" /> 
            :
            <div className="ResultBackground">
                <div className="Container">
                    <div className="CreateJobPage">
                        <h1 className='CreateJobTitle'>Create Job</h1>
                        <div className="control">
                            <input type="text" placeholder='Job Title:' onChange={onTitleChange} />
                        </div>
                        <div className="control">
                            <input type="text" placeholder='Company:' onChange={onCompanyChange}/>
                            <input type="text" placeholder='Location:' onChange={onLocationChange}/>
                        </div>
                        <div className="fileInput">
                            <p>Upload Company Icon: </p >
                            <input type="file" onChange={onSelectFile}/>
                        </div>
                        <div className="control control-2">
                            <div className="description">Description:</div>
                            <div className="Editor">
                                <Editor
                                    editorState={editorState}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={seteditorState}
                                    onChange={() => onDescriptionChange()}
                                />
                            </div>
                        </div>
                        <div className="control">
                            <input type="email" placeholder='Contact Email:' onChange={onEmailChange}/>
                            <input type="text" placeholder='Company Website:'onChange={onWebsiteChange}/>
                        </div>
                        <button className="logininbutton" onClick={onCreateJob}>Submit</button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}