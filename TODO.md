- DATABASE
    -[x] create database - `fs-react-shopping`
    -[x] make table
        [x] id
        [x] name - varchar (80)
        [x] quantity - decimal nums
        [x] unit - varchar (20)
        [x] purchased - boolean DEFAULT false
-SERVER
    -[x] create GET route
        -[x] items display by name ORDER BY NAME and PURCHASED
    -[x] create POST route
    -[x] PUT route
    -[] DELETE route
        -[] conditional to determine which delete button is clicked

-CLIENT
    -[x] form to add new items
        [x] item name
        [x] quantity
        [x] units
    -[] RESET button to clear purchased items
    -[] CLEAR button to remove all items from the list
    -[x] ComponentDidMount
    -[x] GET route
    -[x] POST route
    -[x] PUT route
    -[] DELETE route 
        -[] one route to remove single item
        -[] one route to remove the whole list

    -[x] DISPLAY
        -[x] quantity and unit displayed together
        -[x] item name
        -[x] buttons
            -[x] remove 
            -[x] mark as purchased
                -[x] toggle button - item should show that it is purchased
    