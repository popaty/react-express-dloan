import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DynamicHeader from './Header.js';

class Home extends Component {
  render() {

    return (
      <div className="App">
        <DynamicHeader />
        <h1>Project MyCredits</h1>
        {/* Link to List.js */}   
        <Link to={'./list'}>
          <button variant="raised">
            My List
                    </button>
        </Link>&emsp;
                {/* <Link to={'./olaComponent'}>
        <button variant="raised">
          Open Loan Account
        </button>
      </Link>&emsp;
      <Link to={'./ilaComponent'}>
        <button variant="raised">
          Inquiry Loan Account
        </button>
      </Link>&emsp;
      <Link to={'./ciaComponent'}>
        <button variant="raised">
        Calculate Installment Amount
        </button>
      </Link>&emsp;
      <Link to={'./dbmComponent'}>
        <button variant="raised">
        Disbursement
        </button>
      </Link>&emsp; */}
      </div>
    );
  }
}

export default Home;
