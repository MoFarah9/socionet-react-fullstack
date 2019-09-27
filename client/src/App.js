import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
// Pages
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import UserPage from "./pages/User";

import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";
import { muiStyles, customStyles } from "./util/theme";
import "./App.css";

axios.defaults.baseURL =
  "https://us-central1-socionet-1.cloudfunctions.net/api";

axios.defaults.timeout = 100000;

const theme = createMuiTheme({ ...muiStyles, custom: customStyles });
// check authentication state
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/Login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <AuthRoute exact path="/Login" component={LoginPage} />
          <AuthRoute exact path="/Signup" component={SignupPage} />
          <Route exact path="/users/:handle" component={UserPage} />
          <Route
            exact
            path="/users/:handle/post/:postId"
            component={UserPage}
          />
        </Switch>
      </Router>
    </Provider>
  </ThemeProvider>
);

export default App;
