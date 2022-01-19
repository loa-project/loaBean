import React, { Component } from "react";
import { Route } from "react-router-dom";
import MainPage from "./page/Main";
import UserInfo from "./page/UserInfo1";
import CardSimul from "./page/CardSimul";

class Body extends Component {
    render() {
        return(
            <div className="body-box">
                <Route exact path="/" component={MainPage}/>
                <Route exact path="/userinfo/:userName" component={UserInfo}/>
                <Route exact path="/cardsimul" component={CardSimul}/>
            </div>
        );
    }
}

export default Body;