import React, { Component } from 'react';
import axios from 'axios';

class InputForm extends Component {

    state = {
        newItem: {
            name: '',
            quantity: '',
            unit: ''
        } // creating objects with the information in the input boxed/ values of input boxes
    }

    // handleChange takes the event(which is what we typed) and the second parameter of property name and creates the newItem object
    // ------------------ our keystrokes on the input forms, takes place here
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



    // POST request
    addItem = (event) => { // need to pass event because it's a form and we are using event.preventDefault()
        event.preventDefault();
        axios.post('/list', this.state.newItem) // sends the this.state.newItem that was created in the handleChange function
            .then((response) => {
                console.log('Response:', response); // receive and OK that it was added to the DB
                this.props.getList(); // call getList again to update the DOM
            })
            .catch((error) => {
                alert('Something bad happened');
                console.log('Error', error)
            })
    }

    render() {
        return (
            <div>
                {/* handleChange on input is making it so each keystroke = value of the key */}
                {/* ======================================= */}
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
        ) // end return
    } // end render
} // end class

export default InputForm;
