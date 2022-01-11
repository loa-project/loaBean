import React, { Component } from 'react';
import logoImg from '../img/component/Main/testLogo.png';

class Main extends Component{
    render() {
        return (
            <div>
                <img src={logoImg} />
            </div>
        );
    }
}

export default Main;