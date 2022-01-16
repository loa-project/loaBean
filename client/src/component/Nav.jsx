import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import './css/nav.css';
import logoImg from '../img/component/Main/testLogo.png';

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
    }
    render() {
        const searchStyle = {
            marginTop:"10px",
            height:"40px"
        }
        const buttonStyle = {
            marginLeft:"5px",
            marginRight:"20px",
            height:"40px"
        }
        return(
            <Form>
            <Form.Control
            type="search"
            maxLength="50"
            placeholder="검색어 입력"
            onChange={this.onSearchChange}
            style={searchStyle}
            />
            <Button
            type="button"
            onClick={this.onSearch}
            style={buttonStyle}
            >
              <b>검색</b>
            </Button>
        </Form>
        );
    }
}

class Nav extends Component{
    render() {
        return (
            <ul id="test-nav">
               <li>
                   <a href="/" className="logo"><img src={logoImg} style={{width:"200px", height:"58px"}}/></a></li>
               <li><a href="">이것은 그냥</a></li>
               <li>
                   <a className="test-menu" href="">테스트용도</a>
                    <ul className="test-sub">
                        <li><a href="">로하는</a></li>
                        <li><a href="">겁니다</a></li>
                    </ul>
               </li>
               <li><a href="">오규석</a></li>
               <li className="search"><SearchForm/></li>
               <div id="tesst"></div>
           </ul>
        );
    }
}

export default Nav;