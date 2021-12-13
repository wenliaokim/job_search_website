import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Homepage from './components/Homepage/Homepage';
import SignIn from "./components/SignIn/SignIn";
import Navibar from './components/Navibar/Navibar';
import Register from "./components/Register/Register";
import SearchResultsPage from "./components/SearchResultsPage/SearchResultsPage";
import JobDetailPage from "./components/JobDetailPage/JobDetailPage";
import CreateJobPage from "./components/CreateJobPage/CreateJobPage";
import EditJobPage from "./components/EditJobPage/EditJobPage";
import FavoritePage from "./components/FavoritePage/FavoritePage";
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Navibar />
                <Switch>
                    <Route exact path="/" component={() => <Homepage />} />
                    <Route exact path="/signin" component={() => <SignIn />} />
                    <Route exact path="/register" component={() => <Register />} />
                    <Route exact path="/search/:key" component={() => <SearchResultsPage />} />
                    <Route exact path="/jobDetail/:id" component={() => <JobDetailPage />} />
                    <Route exact path="/createjob" component={() => <CreateJobPage />} />
                    <Route exact path="/editjob/:id" component={() => <EditJobPage />} />
                    <Route exact path="/favoritesPage" component={() => <FavoritePage />} />
                    <Redirect to="/"/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
