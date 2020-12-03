import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    ourList: []
  }

  componentDidMount() {
    this.getList();
  } // end componentDidMount

  getList = () => {
    axios.get('/list')
    .then((response) => { 
      console.log('in Get...', response.data)
      this.setState({
        ourList: response.data
      }) // end setState
    }) // end then response
    .catch((error) => {
      alert('Something bad happened...');
      console.log('error', error);
    }) // end catch
  } // end getList function

  // POST request
  addItem = () => {
    let newItem = {
      name: '',
      quantity: '',
      unit: '',
    }   
    axios.post('/list', newItem) 
    .then( (response) => {
      console.log('Response:', response);
      this.getList()
    })
    .catch( (error)=> {
      alert('Something bad happened');
      console.log('Error', error)
    })
  }




  render() {
    return (
      <div className="App">
        <header className="banner-header">
          <h1>My Shopping List</h1>
        </header>
        <main>
          <p>Under Construction...</p>
          <p>{JSON.stringify(this.state.ourList)}</p>
        </main>
      </div>
    );
  }
}

export default App;
