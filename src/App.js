import logo from './logo.svg';
import { Link, BrowserRouter, NavLink } from 'react-router-dom'
import { Grid, GridItem, Box } from "@chakra-ui/react"

import CNavBar from './components/Navbar'
import Main from './components/Main'
import Code from './components/Code'
import Footer from './components/Footer'
import './App.css';


function App() {
  return (
    <div>
        <CNavBar/>
          {/* <Link to="two">Two</Link> */}
          {/* //<Grid>
              // h="800px" pt={8}
              // templateColumns="repeat(6, 1fr)"
              // gap={4} bg="#fafafa" >
              //   <GridItem rowSpan={2} colSpan={3} >
              //     <Box ml="4" mr="2"> */}
                    <Main />
            {/* //       </Box>
            //     </GridItem>
            //     <GridItem rowSpan={2} colSpan={3} >
            //       <Box ml="2" mr="4">
            //         <Code/>
            //       </Box>
            //     </GridItem>
            // </Grid> */}
            <Footer/>
      </div>
    );
}

export default App;
