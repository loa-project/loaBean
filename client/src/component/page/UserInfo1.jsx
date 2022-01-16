import axios from 'axios';
import React, { Component, useState } from 'react';

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

class UserInfo1 extends Component {
    state = {
        search_cookie:"",
        userInfo:[],
        searchState: ""
    }
    getUserList = () => {
        let userName = this.props.match.params.userName;
        let params = {
            headers:headers,
            search:userName
        }
        axios
        .post('/api/getUserList', params)
        .then((res) => {
            if(res.data.userInfo['flevel']) this.setState({searchState:"TRUE"});
            else this.setState({searchState:"FALSE"});
            this.setState({userInfo: res.data.userInfo, search_cookie: this.props.match.params.userName});
        });
    }
    componentDidMount() {
        this.getUserList();
    }
    render() {
        if(this.state.searchState === "TRUE") {
            return(
                <div>
                    {this.props.match.params.userName}
                    {this.state.userInfo['ulevel']}
                </div>
            );
        }
        else if(this.state.searchState === "FALSE") {
            return(
                <div>
                    그런사람 없습니다.
                </div>
            );
        }
        else {
            return(
                <div>
                    검색중..
                </div>
            );
        }
    }
}

export default UserInfo1;