import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    ourList: [],
    newItem: {
      name: '',
      quantity: '',
      unit: ''
    }
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
  addItem = (event) => {
    event.preventDefault();
    axios.post('/list', this.state.newItem) 
    .then( (response) => {
      console.log('Response:', response);
      this.getList()
    })
    .catch( (error)=> {
      alert('Something bad happened');
      console.log('Error', error)
    })
  }

  handleChange = (event, propertyName) => {
    console.log('Handling the change', event.target.value)
    this.setState({
      newItem: {
        ...this.state.newItem,
        [propertyName]: event.target.value
      }
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="banner-header">
          <h1>My Shopping List</h1>
        </header>
        <main>
          <h2>Add Item</h2>
          <div>
                <form onSubmit={this.addItem}>
                    <label>Item:</label>
                    <input type="text" value={this.state.newItem.name}
                      onChange={(event) => this.handleChange(event, 'name')} />
                    <label>Quantity:</label>
                    <input type="number" value={this.state.newItem.quantity}
                      onChange={(event) => this.handleChange(event, 'quantity')} />
                    <label>Unit:</label>
                    <input type="text" value={this.state.newItem.unit}
                       onChange={(event) => this.handleChange(event, 'unit')} />
                    <button type="submit">Save</button>
                </form>
            </div>
          <p>{JSON.stringify(this.state.ourList)}</p>
        </main>
        {/* Where Input will get exported to */}
      </div>
    );
  }
}

export default App;
