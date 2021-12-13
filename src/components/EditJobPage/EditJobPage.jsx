import { useState, useEffect } from 'react';
import axios from 'axios';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "./EditJobPage.css";
import { useParams, useHistory, Redirect } from "react-router-dom";
import * as Cookies from "js-cookie";
import { API_URL } from '../../constant';


export default function EditJobPage() {
    const content = {
        "entityMap":{},
        "blocks":[{"key":"637gr","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]
    };

    let params = useParams();
    let jobId = params.id;
    let username = Cookies.get("username");
    const history = useHistory();

    const [editorState, seteditorState] = useState(() => EditorState.createEmpty());
    const [jobData, setJobData] = useState({
        _id: '',
        iconUrl: '',
        username: '',
        title: '', 
        companyName: '',
        location: '',
        jobDescription: JSON.stringify(content),
        employerEmail: '',
        website: '' 
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (jobId) {
            axios.get(API_URL + '/jobsearch/searchJobs/JobDetail/' + jobId)
            .then(response => {
                setJobData(response.data.jobResponse);
                if (response.data.jobResponse.username !== username) {
                    history.push('/');
                }
            })
            .catch(error => console.log(error));
        }
    }, []);

    useEffect(() => {
        seteditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(jobData.jobDescription))));
    }, [jobData._id]);

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

    const onEditJob = () => {
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
                        axios.put(API_URL + '/jobsearch/searchJobs/JobDetail/' + jobId, 
                            {...jobData, iconUrl: response.data.url, username: username}
                        )
                        history.goBack();
                    }
                })
                .catch((error) => {console.log(error)});
        } else {
            axios.put(API_URL + '/jobsearch/searchJobs/JobDetail/' + jobId, 
                {...jobData, username: username}
                )
            .then(() => history.goBack())
            .catch(error => console.log(error));
        }
    }

    return (
        <div>
            {!username ? <Redirect to="/" />
            :
            <div className="ResultBackground">
                <div className="Container">
                    <div className="CreateJobPage">
                        <h1 className='CreateJobTitle'>Edit Job</h1>
                        <div className="control">
                            <input type="text" placeholder='Job Title:' value={jobData.title} onChange={onTitleChange} required/>
                        </div>
                        <div className="control">
                            <input type="text" placeholder='Company:' value={jobData.companyName} onChange={onCompanyChange}/>
                            <input type="text" placeholder='Location:' value={jobData.location} onChange={onLocationChange}/>
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
                            <input type="email" placeholder='Contact Email:' value={jobData.employerEmail} onChange={onEmailChange}/>
                            <input type="text" placeholder='Company Website:' value={jobData.website} onChange={onWebsiteChange}/>
                        </div>
                        <div className="buttonGroups">
                            <button className="btn btn-outline-light mt-5 mb-3" onClick={() => history.goBack()}>back</button>
                            <button className="btn btn-light py-2 mt-5 mb-3" onClick={onEditJob}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}