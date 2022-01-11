import React, { Component } from 'react';
class Nav extends Component{
    render() {
        const navStyle = {
            backgroundColor:'red'
        }
        return (
            <div style={navStyle}>
                안녕!
            </div>
        );
    }
}

export default Nav;