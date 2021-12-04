import { IoBusinessSharp } from "react-icons/io5";
import { GoLocation } from "react-icons/go";
import { AiOutlineMail, AiOutlineGlobal } from "react-icons/ai";
import { BsCalendar2Date } from "react-icons/bs";
import "./JobDetailPage.css";

export default function JobDetailPage() {

    const job = {
        id: 1,
        name: "software engineer",
        title: "intern",
        company: "amazon",
        location: "Seattle WA",
        description: `Minimum qualifications:
        Currently enrolled in a PhD degree in Computer Science or a related technical field.
        Experience (classroom/work) in Natural Language Understanding, Neural Networks, Computer Vision, Machine Learning, Deep Learning, Algorithmic Foundations of Optimization, Data Science, Data Mining and/or Machine Intelligence/Artificial Intelligence.
        Experience with one or more general purpose programming languages: Java, C++ or Python.
        Experience with research communities and/or efforts, including having published papers (being listed as author) at conferences (e.g. NeurIPS, ICML, ACL, CVPR etc).
        Preferred qualifications:
        
        Available to work full-time for a minimum of 13 weeks.
        Returning to your degree after completing the internship.
        Relevant work experience, including internships, full time industry experience or as a researcher in a lab.
        Ability to design and execute on research agendas.`,
        contact: "aa@gmail.com",
        website: "www.amazon.com",
        postdate: "2021-11-11"
    }

    return (
        <div className="JobDetail">
            <div class="card">
                <div class="card-header">job detail</div>
                <div class="card-body">
                    <h4 class="card-title">{job.name}</h4>
                    <div class="CompanyAndLocation">
                        <span class="card-title"><IoBusinessSharp /> <b>{job.company}</b></span>
                        <span class="card-title"><GoLocation /> {job.location}</span>
                    </div>
                    <div class="card-title postdate"><BsCalendar2Date /> post date: {job.postdate}</div>
                    <div class="card-text">{job.description}</div>
                    <div class="Employer">
                        <span><b>Employeer Info:</b></span>
                        <span class="card-title"><AiOutlineMail /> {job.contact}</span>
                        {job.website ? <span class="card-title"><AiOutlineGlobal /> {job.website}</span> :<></>}
                    </div>
                </div>
            </div>
        </div>
    )
}
