# Expense Tracker Backend

This is the backend repository for the Expense Tracker application. It provides the necessary APIs for managing expenses and categories.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/Expense-Tracker-Backend.git
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm start
    ```

## Endpoints

1.  [  /api/login  ] ____________ { POST }

        Request-Body : {
            "email" : "dummy@gmail.com",
            "password" : "12345678",
        }

        Success Response : {
            "message" : "Login Successful",
            "token" : "x.y.z"
        }
        
        Error Response : {"message" : "Error Message"}

2.  [  /api/register  ] ____________ { POST }

        Request-Body : {
            "name" : "Dummy",
            "email" : "dummy@gmail.com",
            "password" : "12345678",
        }

        Success Response : {
            "message" : "Login Successful",
            "token" : "x.y.z"
        }
        
        Error Response : {"message" : "Error Message"}

<br/>

#### Note: To use any '/user/' Api, you must pass token in header with every request.
#### Example : [ headers.Authorization = "Bearer ${accessToken}" ]

<br/>

3.  [  /api/expense  ] ____________ { GET }

        Success Response :
        {
            "username": "Dummy99",
            "data_count": 1,
            "data": [
                {
                    "_id": "6617c14fca774b9f6fde5132",
                    "title": "This is a title",
                    "amount": 100,
                    "date" : "29-02-2024",
                    "category" : "Bill",
                    "createdAt": "2024-04-11T10:54:07.014Z",
                    "updatedAt": "2024-04-11T10:54:07.014Z",
                    "__v": 0
                }
            ]
        } 

        Error Response : {"message" : "Error Message"}

4.  [  /api/expense  ] ____________ { POST }

        Request-Body : {
            "title" : "This is a title",
            "amount" : 231,
            "date" : "29-02-2024",
            "category" : "Food"
        }

        Success Response : 
        {
            "message": "Expense added successfully",
            "data": {
                "title": "This is a title 3 ",
                "content": "This is a content.... 2",
                "_id": "6619229666eafd5b83ba528e",
                "date" : "29-02-2024",
                "createdAt": "2024-04-12T12:01:26.144Z",
                "updatedAt": "2024-04-12T12:01:26.144Z",
                "__v": 0
            }
        }
        
        Error Response : {"message" : "Error Message"}

4.  [  /api/expense  ] ____________ { PUT }

        Request-Body : {
            "_id" : "6619229666eafd5b83ba528e",
            "title" : "This is a new title",
            "date" : "29-02-2024",
            "category" : "This is a new category",
            "amount" : 330
        }
        
        Success Response : {"message": "Expense updated successfully"}
        
        Error Response : {"message" : "Error Message"}

5.  [  /api/expense?id='ExpenseId'  ] ____________ { DELETE }
        
        Success Response : {"message": "Expense Deleted successfully"}
        
        Error Response : {"message" : "Error Message"} 
