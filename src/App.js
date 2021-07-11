import CNavBar from './components/Navbar'
import Main from './components/Main'
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
