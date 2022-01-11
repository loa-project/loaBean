import logo from './logo.svg';
import axios from "axios";
import {useEffect} from "react";
import './App.css';
import Nav from './component/Nav';
import Main from './component/Main';

function App(){
  const callApi = async () => {
    axios.get("/api").then((res)=>console.log(res.data.test));
  };
  useEffect(()=>{
    callApi();
  }, []);
  return <div>
    <Nav />
    <Main />
  </div>;
}

export default App;
