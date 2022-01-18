import axios from 'axios';
import React, { Component } from 'react';

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
                    <br/><br/><br/><br/><br/>
                    서버:{this.state.userInfo['server']}<br/>
                    이름: {this.props.match.params.userName}<br/>
                    원정대 레벨:{this.state.userInfo['ulevel']}<br/>
                    전투 레벨:{this.state.userInfo['flevel']}<br/>
                    아이템 레벨:{this.state.userInfo['itemlevel']}<br/>
                    pvp:{this.state.userInfo['pvp']}<br/>
                    칭호:{this.state.userInfo['degree']}<br/>
                    길드:{this.state.userInfo['guild']}<br/>
                    영지:{this.state.userInfo['wlevel']} {this.state.userInfo['wisdom_name']}<br/>
                </div>
            );
        }
        else if(this.state.searchState === "FALSE") {
            return(
                <div>
                    <br/><br/><br/><br/><br/>
                    그런사람 없습니다.
                </div>
            );
        }
        else {
            return(
                <div>
                    <br/><br/><br/><br/><br/>
                    검색중..
                </div>
            );
        }
    }
}

export default UserInfo1;