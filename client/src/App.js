import {HashRouter} from 'react-router-dom';
import axios from "axios";
import {useEffect} from "react";
import './App.css';
import Nav from './component/Nav';
import Body from './component/Body';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

function App(){
  const callApi = async () => {
    axios.get("/api").then((res)=>console.log(res.data.test));
  };
  useEffect(()=>{
    callApi();
  }, []);
  return <BrowserRouter>
    <Nav test=""/>
    <Body />
  </BrowserRouter>;
}

export default App;
