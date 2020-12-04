import React, { Component } from 'react'; // calling in react component
import axios from 'axios'; // calling in axios
import './App.css'; // importing in css

class App extends Component {

  state = {
    ourList: [], // array of our objects
    newItem: {
      name: '',
      quantity: '',
      unit: ''
    } // creating objects with the information in the input boxed/ values of input boxes
  }

  componentDidMount() { // this is similar to onReady - refreshes DOM, 
    this.getList(); // wanna call GET route here always
  } // end componentDidMount

  getList = () => { 
    axios.get('/list') // requesting information from the DB
    .then((response) => { 
      console.log('in Get...', response.data) 
      this.setState({
        ourList: response.data // putting our information into the array
      }) // end setState
    }) // end then response
    .catch((error) => {
      alert('Something bad happened...');
      console.log('error', error);
    }) // end catch
  } // end getList function

  // POST request
  addItem = (event) => { // need to pass event because it's a form and we are using event.preventDefault()
    event.preventDefault();
    axios.post('/list', this.state.newItem) // sends the this.state.newItem that was created in the handleChange function
    .then( (response) => {
      console.log('Response:', response); // receive and OK that it was added to the DB
      this.getList() // call getList again to update the DOM
    })
    .catch( (error)=> {
      alert('Something bad happened');
      console.log('Error', error)
    })
  }

  // handleChange takes the event(which what we typed) and the second parameter of property name and creates the newItem object
  handleChange = (event, propertyName) => { // takes in the value from the input box
    console.log('Handling the change', event.target.value)
    this.setState({
      newItem: {
        ...this.state.newItem,
        [propertyName]: event.target.value // property name is: 'name" OR 'quantity' OR 'units' and the event.target.value is the 
                                           // inputbox value
      }
    })
  }

  updatePurchase = (event, id) => { // notes that the event was pressed 'onClick' and the id is passed in

    axios.put(`/list/${id}`) // the id is sent as the params to the server-side
    .then( (response) => {
      console.log('Response:', response); // we get an OK back from the DB that it was updated
      this.getList() // call getList again to update the DOM
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
            {/* handleChange on input is making it so each keystroke = value of the key */}
                <form onSubmit={this.addItem}>
                    <label>Item:</label> 
                    <input type="text" value={this.state.newItem.name}
                    // event = what we are typing into the input box
                    // each time you type something, it calls handleChange
                    // handleChange takes the event(which what we typed) and the second parameter of property name
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
            {/* the .map loops through the array and displays it to the DOM */}
              { this.state.ourList.map(item => ( 
                 <div className="item" key={item.id} id={item.id}>
                   <h2>{item.name}</h2>
                   <p>{item.quantity} {item.unit}</p>
                   {/* Pass in event and make into a function calling update purchase
                   and pass event and item.id 
                   Between the <p> </p> is the conditional - it says:
                   if item.purchased id true then-(?) return 'Purchased' else-(:) return a button that includes the updatePurchase
                   function */}
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
