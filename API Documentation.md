**Title**
----
  E-Commerce App

* **URL**

  /products

* **Method:**

  `POST`

* **Data Params**

        ```
        {
            "name" : "Kopikap",
            "image_url" : "https://jumbo.co.id/wp-content/uploads/2020/07/8.jpeg",
            "price" : "5000",
            "stock" : 5
        }
        ```

* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
        {
            "name" : "Kopikap",
            "image_url" : "https://jumbo.co.id/wp-content/uploads/2020/07/8.jpeg",
            "price" : "5000",
            "stock" : 5
        }
        ```
 
* **Error Response:**

   * **Code:** 500 INTERNAL SERVER ERROR <br />

    OR

   * **Code:** 400 BAD REQUEST <br />


<hr>


* **URL**

  /products

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    [
        {
            "name" : "Teh Semesta",
            "image_url" : "https://jumbo.co.id/wp-content/uploads/2020/07/8.jpeg",
            "price" : "10000",
            "stock" : 5
        },
        {
            "name" : "Kopikap",
            "image_url" : "https://jumbo.co.id/wp-content/uploads/2020/07/8.jpeg",
            "price" : "5000",
            "stock" : 5
        }
    ]
    ```

* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal Server Error" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`


<hr>


* **URL**

  /products/:id

* **Method:**

  `PUT`
  
* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```

* **Data Params**
    ```
        {
            "name" : "Kopikap",
            "image_url" : "https://jumbo.co.id/wp-content/uploads/2020/07/8.jpeg",
            "price" : "5000",
            "stock" : 5
        }
     ```

* **Success Response:**
  
  * **Code:** 200 <br />
 
* **Error Response:**


  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "Internal Server Error" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`


<hr>

* **URL**

  /products/:id

* **Method:**

  `DELETE`
  
* **Headers Params**

  ```
        {
            "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW1hMTIzNDUiLCJpYXQiOjE2MDQwMjkyMDZ9.        
            p8G8p1cMURN5-U1YpRNbTAxdWTG071tTC_DxZf0ceZQ",
        }
  ```


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message : 'product deleted' }`
 
* **Error Response:**


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Authentication failed" }`

<hr>

* **URL**

  /register

* **Method:**

  `POST`


* **Data Params**

  ```
    {
      "email": "mansur@yahoo.ac",
      "password": "alhamdulilah",
      "role": "admin"
    }
  ```


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```
    {
      "email": "mansur@yahoo.ac",
      "password": "alhamdulilah",
      "role": "admin"
    }
  ```
 
* **Error Response:**


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error" }`

<hr>

* **URL**

  /login

* **Method:**

  `POST`

* **Data Params**

    ```
    {
      "email": "mansur@yahoo.ac",
      "password": "alhamdulilah",
      "role": "admin"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJyYW1hQHlhaG9vLmNvbSIsImlhdCI6MTYwNDIxNDg5OX0.882lz20jN4ZZNydcgnsqLxglv1xB1yfEH0QW9h2L4aM"
    }
    ```
 
* **Error Response:**


  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "error" }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not Found" }`

