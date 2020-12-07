import React, { Component } from 'react';
import axios from 'axios';

class ShoppingList extends Component {

    updatePurchase = (event, id) => { // notes that the event was pressed 'onClick' and the id is passed in
        axios.put(`/list/${id}`) // the id is sent as the params to the server-side
            .then((response) => {
                console.log('Response:', response); // we get an OK back from the DB that it was updated
                this.props.getList() // call getList again to update the DOM
            })
            .catch((error) => {
                alert('Something bad happened');
                console.log('Error', error)
            })
    }

    render() {
        return (
            // the map loops through the array and displays it to the DOM
            this.props.ourList.map(item => (
                <div className="item" key={item.id} id={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.quantity} {item.unit}</p>
                    {/* Pass in event and make into a function calling update purchase
                   and pass event and item.id 
                   Between the <p> </p> is the conditional - it says:
                   if item.purchased id true then-(?) return 'Purchased' else-(:) return a button that includes the updatePurchase
                   function */}
                    <p>{
                        item.purchased
                            ? `Purchased`
                            : <button onClick={(event) => this.updatePurchase(event, item.id)}>
                                Need to Purchase
                              </button>
                    }
                    </p>
                    <button>Remove</button>
                </div>
            )) // end map
        ) // end returns
    } // end render
} // end class


export default ShoppingList;
