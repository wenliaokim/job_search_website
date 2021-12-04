import { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import { convertToHTML } from 'draft-convert';
import {stateToHTML} from 'draft-js-export-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./CreateJobPage.css";

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};

export default function CreateJobPage() {
    const [jobData, setJobData] = useState({
        title: '', 
        company: '',
        location: '',
        description: '',
        email: '',
        website: '' 
    });
    const [editorState, seteditorState] = useState(() => EditorState.createEmpty());
    const [contentState, setContentState] = useState(convertFromRaw(content));

    const onTitleChange = (event) => {setJobData({...jobData, title: event.target.value})};
    const onCompanyChange = (event) => {setJobData({...jobData, company: event.target.value})};
    const onLocationChange = (event) => {setJobData({...jobData, location: event.target.value})};
    const onDescriptionChange = () => {setJobData({...jobData, description: JSON.stringify(convertToRaw(editorState.getCurrentContent()))})};
    const onEmailChange = (event) => {setJobData({...jobData, email: event.target.value})};
    const onWebsiteChange = (event) => {setJobData({...jobData, website: event.target.value})};


    let test;
    let a;
    let b;
    let c;
    const onCreateJob = () => {
        a = convertToRaw(editorState.getCurrentContent());
        b = JSON.stringify(a)
        c = JSON.parse(b);
        console.log(editorState.getCurrentContent())
        console.log(a);
        console.log(b);
        console.log(c);
        console.log(jobData);
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
                                    onContentStateChange={setContentState}
                                    onChange={() => onDescriptionChange()}
                                />
                            </div>
                        </div>
                        <div className="control">
                            <input type="text" placeholder='Contact Email:' onChange={onEmailChange}/>
                            <input type="text" placeholder='Company Website:'onChange={onWebsiteChange}/>
                        </div>
                    <button className="logininbutton" onClick={onCreateJob}>Submit</button>
                    <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(editorState.getCurrentContent()))}} />
                    {/* <div dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(jobData.description))}} /> */}
                </div>
            </div>
        </div>
    )
}