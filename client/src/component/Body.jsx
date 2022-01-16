import React, { Component } from "react";
import { Route } from "react-router-dom";
import MainPage from "./page/Main";
import UserInfo from "./page/UserInfo1";

class Body extends Component {
    render() {
        return(
            <div>
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/userinfo/:userName" component={UserInfo}/>
            </div>
        );
    }
}

export default Body;