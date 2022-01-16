import axios from 'axios';
import React, { Component, useState } from 'react';
import { Button, Form } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { NavLink } from "react-router-dom";

axios.defaults.withCredentials = true;
const headers = { withCredentials: true };
class SearchForm extends Component {
    state = {
        search:"", search_cookie:""
    }
    onSearch = () => {
        this.setState({search_cookie: this.state.search, search: "" }, () => 
        {this.getUserList();});
      }
    
    onSearchChange = (event) => {
        this.setState({search: event.target.value});
    }
    getUserList = () => {
        window.location.href = "/userinfo/" + this.state.search_cookie;
        /*
        let params = {
            headers:headers,
            search:this.state.search_cookie
        }
        axios
        .post('api/getUserList', params)
        .then((res) => {
            this.props.history.push('/userinfo',res.deta.userInfo);
          //res.data.userInfo 데이터를 쓰면됨
          //이거는 검색 펑션이므로 이따 뒤에서 사용
        });
        */
    }
    render() {
        return(
            <Form>
            <Form.Control
            type="search"
            maxLength="50"
            placeholder="검색어 입력"
            onChange={this.onSearchChange}
            />
            <Button
            type="button"
            onClick={this.onSearch}
            >
              <b>글 검색</b>
            </Button>
        </Form>
        );
    }
}

class Nav extends Component{
    render() {
        const navStyle = {
            backgroundColor:'red'
        }
        return (
            <div style={navStyle}>
                안녕!
                <table>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td><SearchForm/></td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Nav;