import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Homepage from './components/Homepage/Homepage';
import SignIn from "./components/SignIn/SignIn";
import Navibar from './components/Navibar/Navibar';
import './App.css';
import Register from "./components/Register/Register";

function App() {
    return (
        <div className="App">
            <Router>
                <Navibar />
                <Switch>
                    <Route exact path="/" component={() => <Homepage />} />
                    <Route exact path="/signin" component={() => <SignIn />} />
                    <Route exact path="/register" component={() => <Register />} />
                    <Redirect to="/"/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
