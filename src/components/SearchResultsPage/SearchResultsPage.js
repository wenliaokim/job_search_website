import JobPage from "../JobPage/JobPage";
import "./SearchResultsPage.css";

const jobs = [
    {
        id: 1,
        name: "software engineer",
        title: "intern",
        company: "amazon",
        location: "Seattle WA"
    },
    {
        id: 2,
        name: "MBA",
        title: "title1",
        company: "google",
        location: "Mountain View CA"
    },
    {
        id: 3,
        name: "marketing",
        title: "title2",
        company: "meta",
        location: "Mountain View CA"
    },
    {
        id: 4,
        name: "marketing",
        title: "title2",
        company: "netflix",
        location: "Seattle WA"
    },
    {
        id: 5,
        name: "marketing",
        title: "title2",
        company: "linkedin",
        location: "Seattle WA"
    }
]



export default function SearchResultsPage() {
    return (
        <div className="ResultBackground">
            <h1 className="ResultTitle">Search result: </h1>
            <div className="JobList">
                <JobPage job={jobs[0]}/>
                <JobPage job={jobs[1]}/>
                <JobPage job={jobs[2]}/>
                <JobPage job={jobs[3]}/>
                <JobPage job={jobs[4]}/>
            </div>
        </div>

    )
}