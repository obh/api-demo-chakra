import logo from './logo.svg';
import { Link, BrowserRouter, NavLink } from 'react-router-dom'
import { Grid, GridItem, Box } from "@chakra-ui/react"

import CNavBar from './components/Navbar'
import Main from './components/Main'
import Code from './pages/code/CreateOrderAPI'
import Footer from './components/Footer'
import './App.css';


function App() {
  const divStyle = {
    backgroundColor: '#fafafa',
}
  return (
    <div style={divStyle}>
        <CNavBar/>
            <Main />
            <Footer/>
      </div>
    );
}

export default App;
