import React, { Component } from 'react'; // calling in react component
import axios from 'axios'; // calling in axios, this lets us use axios requests
import './App.css'; // importing in css
import InputForm from '../InputForm/InputForm';
import ShoppingList from '../ShoppingList/ShoppingList';

class App extends Component {

  state = {
    ourList: [], // array of our objects
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



  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="banner-header">
          <h1>My Shopping List</h1>
        </header>
        <main>
          <h2>Add Item</h2>
          <InputForm
          getList={this.getList}/>
           <ShoppingList
           ourList={this.state.ourList}
           updatePurchase={this.updatePurchase}
           getList={this.getList}/>
        </main>
      </div>
    );
  }
}

export default App;



