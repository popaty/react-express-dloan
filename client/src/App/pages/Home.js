import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Navbar,NavbarBrand,Nav} from 'reactstrap';
// import logo from './image/tn.png';
class Home extends Component {
  render() {
    return (
    <div className="App">
       <Navbar color="light" light expand="md">
       {/* <img src={logo} alt="TN" width="100" height="100" /> */}
        <NavbarBrand href="/" >TN</NavbarBrand> 
          <Nav className="ml-auto" navbar>
          </Nav>
      </Navbar>
      <br />
      <h1>Project Home</h1>
      <br />
      {/* Link to List.js */}
      <Link to={'./list'}>
        <button variant="raised">
            My List
        </button>
      </Link>&emsp;
      <Link to={'./olaComponent'}>
        <button variant="raised">
          Open Loan Account
        </button>
      </Link>&emsp;
      <Link to={'./ilaComponent'}>
        <button variant="raised">
          Inquiry Loan Account
        </button>
      </Link>
    </div>
    );
  }
}
export default Home;
