// AUTHENTICATED USER
export const user = 'Micheal Lance Kester Li'

// AUTHENTICATED USER RECENT ORDERS
export const userrecorderstbhead = ['NO.', 'DATE', 'OPTIONS', 'AMOUNT', 'STATUS']
export const userrecorderstbdata = [
    [<>234567</>, <>2025-02-24 <br /> 02:27:25</>, <>TAKE OUT</>, <>₱559.00</>, 'PENDING'],
    [<>181818</>, <>2025-02-22 <br /> 02:27:25</>, <>TAKE OUT</>, <>₱358.00</>, 'PAID'],
    [<>176923</>, <>2025-01-08 <br /> 03:33:03</>, <>DINE-IN</>, <>₱1,258.00</>, 'PAID']
]

// VARIABLES
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const roleoptions = ['SERVICE', 'CASHIER', 'COOK']
export const scheduleoptions = [<>WEEKDAYS <br/> 09:00-05:00</>]

// SERVICE ORDER LIST
export const orderstbhead = ['NO.', 'DATE', 'NAME', 'OPTIONS', 'AMOUNT', 'STATUS']
export const orderstbdata = [
    [<>25569</>, <>2025-02-24 <br /> 02:27:25</>, <>Micheal Lance Kester Li</>, <>TAKE-OUT</>, <>₱2,475.00</>, <>PREPARING</>],
    [<>12403</>, <>2025-02-24 <br /> 02:27:25</>, <>Dylan Clive Espino</>, <>DINE-IN</>, <>₱581.00</>, <>DONE</>],
    [<>26891</>, <>2025-02-24 <br /> 02:27:25</>, <>Mark Anthony Amper</>, <>TAKE-OUT</>, <>₱888.00</>, <>PREPARING</>],
]
export const preorderstbdata = [
    [<>25569</>, <>2025-02-24 <br /> 02:27:25</>, <>Micheal Lance Kester Li</>, <>TAKE-OUT</>, <>₱2,475.00</>, <>PRE-ORDER</>],
    [<>12403</>, <>2025-02-24 <br /> 02:27:25</>, <>Dylan Clive Espino</>, <>DINE-IN</>, <>₱581.00</>, <>PRE-ORDER</>],
    [<>26891</>, <>2025-02-24 <br /> 02:27:25</>, <>Mark Anthony Amper</>, <>TAKE-OUT</>, <>₱888.00</>, <>PRE-ORDER</>],
]

// MENU LIST
export const menulistdatahead = ['MENU NO.', 'NAME', 'CATEGORY', 'AMOUNT']
export const menulistdata = [
    [<>36548</>, <>Burger</>, <>MEAL</>, 559.00.toFixed(2)],
    [<>18585</>, <>Espresso</>, <>MEAL</>, 358.00.toFixed(2)],
    [<>69696</>, <>Carbonara</>, <>BEVERANGE</>, 1258.00.toFixed(2)],
]

// INVENTORY LIST
export const intbhead = ['SKU NO.', 'NAME', 'CATEGORY', 'STOCK', 'UNIT COST', 'STOCK VALUE', 'STATUS', 'UPDATE']
export const intbdata = [
    [<>VEG-1989</>, <>Tomato</>, <>Vegetable</>, 99, <>₱25.00</>, <>₱2,475.00</>, 'AVAILABLE', <>2025-02-24 <br /> 02:27:25</>],
    [<>OIL-1580</>, <>Olive Oil</>, <>Oil</>, 6, <>₱89.00</>, <>₱534.00</>, 'LOW STOCK', <>2025-02-24 <br /> 02:27:25</>],
    [<>MEA-0008</>, <>Salmon</>, <>Meat</>, 24, <>₱58.00</>, <>₱1,392.00</>, 'AVAILABLE', <>2025-02-24 <br /> 02:27:25</>],
    [<>SWE-0008</>, <>Sugar</>, <>Sweetener</>, 0, <>₱5.50</>, <>₱0.00</>, 'UNVAILABLE', <>2025-02-24 <br /> 02:27:25</>],
]

// CUSTOMERS LIST
export const custbhead = ['NO.', 'NAME', 'EMAIL', 'LOYALTY', 'BALANCE']
export const custbdata = [
    [<>36548</>, <>Micheal Lance Kester Li</>, <>kesterli1998 @gmail.com</>, <>SILVER</>, <>₱2,475.00</>],
    [<>18585</>, <>Dylan Clive Espino</>, <>dylanyak @gmail.com</>, <>SILVER</>, <>₱0.00</>],
    [<>69696</>, <>Mark Anthony Amper</>, <>marklagingabsent @gmail.com</>, <>SILVER</>, <>₱0.00</>],
    [<>36548</>, <>Mark Anthony Amper</>, <>marklagingabsent @gmail.com</>, <>SILVER</>, <>₱0.00</>],
]

// EMPLOYEES LIST
export const emptbhead = ['NO.', 'NAME', 'EMAIL', 'ROLE', 'SCHEDULE', 'LOGGED']
export const emptbdata = [
    [<>36548</>, <>Micheal Lance Kester Li</>, <>kesterli1998 @gmail.com</>, roleoptions[0], scheduleoptions[0], <>2025-02-24 <br/> 02:27:25</>],
    [<>18585</>, <>Dylan Clive Espino</>, <>dylanyak @gmail.com</>, <>CASHIER</>, scheduleoptions[0], <>2025-02-24 <br/> 02:27:25</>],
    [<>69696</>, <>Mark Anthony Amper</>, <>marklagingabsent @gmail.com</>, <>SERVICE</>, scheduleoptions[0], <>2025-02-24 <br/> 02:27:25</>],
    [<>69698</>, <>Mark Anthony Amper</>, <>marklagingabsent @gmail.com</>, <>SERVICE</>, scheduleoptions[0], <>2025-02-24 <br/> 02:27:25</>],
]

// RECENT ORDERS
export const recorderstbhead = ['NO.', 'DATE', 'CASHIER NAME', 'OPTIONS', 'AMOUNT']
export const recorderstbdata = [
    [<>25569</>, <>2025-02-24 <br /> 02:27:25</>, <>Micheal Lance Kester Li</>, <>TAKE-OUT</>, <>₱559.00</>],
    [<>12403</>, <>2025-02-22 <br /> 02:27:25</>, <>Eryck Del Fonso</>, <>DINE-IN</>, <>₱358.00</>],
    [<>26891</>, <>2025-02-22 <br /> 02:27:25</>, <>Michael Angelo Lim</>, <>TAKE-OUT</>, <>₱358.00</>],
    [<>12403</>, <>2025-02-22 <br /> 02:27:25</>, <>Eryck Del Fonso</>, <>TAKE-OUT</>, <>₱358.00</>],
    [<>12403</>, <>2025-01-08 <br /> 03:33:03</>, <>Eryck Del Fonso</>, <>TAKE-OUT</>, <>₱1,258.00</>]
]

// BREAKDOWN PER MONTH
export const revpermonthhead = ['MONTHS', 'TOTAL REVENUE', 'TOTAL ITEMS SOLD', 'MARKUP PERCENTAGE']
export const revpermonthdata = [
    [months[0], <>₱550.00</>, 22, <>83%</>],
    [months[1], <>₱1,157.00</>, 13, <>82%</>],
    [months[2], <>₱10,730.00</>, 185, <>156%</>],
    [months[3], <>₱126.50</>, 23, <>45%</>],
]