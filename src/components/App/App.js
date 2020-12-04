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

  updatePurchase = (event, id) => {

    axios.put(`/list/${id}`)
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
              { this.state.ourList.map(item => (
                 <div className="item" key={item.id} id={item.id}>
                   <h2>{item.name}</h2>
                   <p>{item.quantity} {item.unit}</p>
                   {/* Pass in event and make into a function calling update purchase
                   and pass event and item.id */}
                    <p>{item.purchased ? `Purchased` : <button onClick={(event) => this.updatePurchase(event, item.id)}>Need to Purchase</button>}</p>
                      &nbsp;
                   <button>Remove</button>
                 </div>
              ))
            }
        </main>
      </div>
    );
  }
}

export default App;
