import { useState } from 'react';
import axios from 'axios';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./CreateJobPage.css";

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

export default function CreateJobPage() {
    const [jobData, setJobData] = useState({
        title: '', 
        companyName: '',
        location: '',
        jobDescription: JSON.stringify(content),
        employerEmail: '',
        website: '' 
    });
    const [editorState, seteditorState] = useState(() => EditorState.createEmpty());

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

    const onCreateJob = () => {
        console.log(jobData);
        let errorMessage = "";
        if (!jobData.title.trim()) errorMessage = "Invalid title input";
        else if (!jobData.companyName.trim()) errorMessage = "Invalid company input";
        else if (!jobData.location.trim()) errorMessage = "Invalid location input";
        else if (!JSON.parse(jobData.jobDescription).blocks[0].text) errorMessage = "Invalid location input";
        else if (!jobData.employerEmail.trim()) errorMessage = "Invalid email input";
        console.log(errorMessage);
        if (!errorMessage) {
            axios.post('/jobsearch/createJob', jobData)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        }
        // console.log(jobData.jobDescription);
    }

    return (
        <div className="ResultBackground">
            <div className="Container">
                <div className="CreateJobPage">
                        <h1 className='CreateJobTitle'>Create Job</h1>
                        <div className="control">
                            <input type="text" placeholder='Job Title:' onChange={onTitleChange}/>
                        </div>
                        <div className="control">
                            <input type="text" placeholder='Company:' onChange={onCompanyChange}/>
                            <input type="text" placeholder='Location:' onChange={onLocationChange}/>
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
                    {/* <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(jobData.jobDescription))}} /> */}
                </div>
            </div>
        </div>
    )
}