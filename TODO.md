- DATABASE
    -[] create database - `fs-react-shopping`
    -[] make table
        [] id
        [] name - varchar (80)
        [] quantity - decimal nums
        [] unit - varchar (20)
        [] purchased - boolean DEFAULT false
-SERVER
    -[] create GET route
        -[] items display by name ORDER BY NAME and PURCHASED
    -[] createe POST route
    -[] PUT route
    -[] DELETE route
        -[] conditional to determine which delete button is clicked

-CLIENT
    -[] form to add new items
        [] item name
        [] quantity
        [] units
    -[] RESET button to clear purchased items
    -[] CLEAR button to remove all items from the list
    -[] ComponentDidMount
    -[] GET route
    -[] POST route
    -[] PUT route
    -[] DELETE route 
        -[] one route to remove single item
        -[] one route to remove the whole list

    -[] DISPLAY
        -[] quantity and unit displayed together
        -[] item name
        -[] buttons
            -[] remove 
            -[] mark as purchased
                -[] toggle button - item should show that it is purchased
    