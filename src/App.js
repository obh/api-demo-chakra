import logo from './logo.svg';
import { Link, BrowserRouter, NavLink } from 'react-router-dom'
import { Grid, GridItem, Box } from "@chakra-ui/react"

import CNavBar from './components/Navbar'
import Main from './components/Main'
import Code from './components/Code'
import './App.css';


function App() {
  return (
    <div>
        <CNavBar/>
          <Link to="two">Two</Link>
           <Grid
              h="500px"
              templateColumns="repeat(6, 1fr)"
              gap={4}>
                <GridItem rowSpan={2} colSpan={3} >
                  <Main/>
                </GridItem>
                <GridItem rowSpan={2} colSpan={3} >
                  <Code/>
                </GridItem>
            </Grid>
      </div>
    );
}

export default App;
