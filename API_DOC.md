## Endpoints

List of Available Endpoints:

# Spots

<details>
  <summary>Endpoints</summary>

## 1. GET /spots _(Get all spots)_

  <details>
    <summary> 
      <code> Detail (Request & Response) </code> 
    </summary>

### Response

#### _200 - OK_

- Body

  ```json
  [
    {
      "id": INTEGER,
      "name": STRING,
      "isFull": BOOLEAN,
      "isActive": BOOLEAN,
      "isOpen": BOOLEAN,
      "isRestaurant": BOOLEAN,
      "isCafe": BOOLEAN,
      "isPark": BOOLEAN,
      "email": STRING,
      "lat": DOUBLE,
      "lng": DOUBLE,
      "createdAt": STRING,
      "updatedAt": STRING
    },
    ...
  ]
  ```

  </details>

## 2. POST /spots _(Add a spot)_

  <details>
    <summary> 
      <code> Detail (Request & Response) </code> 
    </summary>

### Request

- Body

  ```json
  {
    "name": STRING,
    "isRestaurant": BOOLEAN,
    "isCafe": BOOLEAN,
    "isPark": BOOLEAN,
    "email": STRING,
    "lat": DOUBLE,
    "lng": DOUBLE,
  }
  ```

### Response

#### _201 - CREATED_

- Body

  ```json
  {
    "createdSpot": {
      "id": INTEGER,
      "name": STRING,
      "isRestaurant": BOOLEAN,
      "isCafe": BOOLEAN,
      "isPark": BOOLEAN,
      "email": STRING,
      "lat": DOUBLE,
      "lng": DOUBLE,
      "updatedAt": STRING,
      "createdAt": STRING,
      "isFull": BOOLEAN,
      "isActive": BOOLEAN,
      "isOpen": BOOLEAN
    }
  }
  ```

  </details>

</details>

<br />
<br />

# Users

<details>
  <summary>Endpoints</summary>

## 1. DELETE /users _(Delete an user)_

  <details>
    <summary> 
      <code> Detail (Request & Response) </code> 
    </summary>

### Request

- Headers

  ```json
  {
    "access_token": STRING,
  }
  ```

### Response

#### _200 - OK_

- Body

  ```json
  {
    "message": "Your account has been deleted"
  }
  ```

  </details>

## 2. POST /users/github-signin _(Let an user signin with github account)_

  <details>
    <summary> 
      <code> Detail (Request & Response) </code> 
    </summary>

### Request

- Body

  ```json
  {
    "username": STRING,
    "email": STRING,
  }
  ```

### Response

#### _200 - OK_

- Body

  ```json
  {
    "access_token": STRING,
    "user": {
      "id": INTEGER,
      "username": STRING,
      "isActive": BOOLEAN,
      "email": STRING,
      "isOwner": BOOLEAN,
      "createdAt": STRING,
      "updatedAt": STRING
    }
  }
  ```

#### _201 - CREATED_

- Body

  ```json
   {
    "access_token": STRING,
    "user": {
      "id": INTEGER,
      "username": STRING,
      "isActive": BOOLEAN,
      "email": STRING,
      "isOwner": BOOLEAN,
      "createdAt": STRING,
      "updatedAt": STRING
    }
  }
  ```

  </details>

## 3. POST /users/location _(Get user location name)_

  <details>
    <summary> 
      <code> Detail (Request & Response) </code> 
    </summary>

### Request

- Body

  ```json
  {
    "lat": DOUBLE,
    "lng": DOUBLE
  }
  ```

### Response

#### _200 - OK_

- Body

  ```json
  {
    "STRING"
  }
  ```

  </details>

## 4. GET /users/profile _(Get respective user's info)_

  <details>
    <summary> 
      <code> Detail (Request & Response) </code> 
    </summary>

### Request

- Headers

  ```json
  {
    "access_token": STRING,
  }
  ```

### Response

#### _200 - OK_

- Body

  ```json
  {
    "id": INTEGER,
    "username": STRING,
    "isActive": BOOLEAN,
    "email": STRING,
    "isOwner": BOOLEAN,
    "createdAt": STRING,
    "updatedAt": STRING
  }
  ```

  </details>

## 5. PUT /users/profile/edit _(Edit user's info)_

  <details>
    <summary> 
      <code> Detail (Request & Response) </code> 
    </summary>

### Request

- Headers

  ```json
  {
    "access_token": STRING,
  }
  ```

- Body

  ```json
  {
    "username": STRING,
  }
  ```

- files

  ```json
  {
    "image": {
      "name": STRING,
      "data": BUFFER,
      "size": INTEGER,
      "encoding": STRING,
      "tempFilePath": STRING,
      "truncated": BOOLEAN,
      "mimetype": STRING,
      "md5": STRING,
      "mv": FUNCTION
    }
  }
  ```

### Response

#### _200 - OK_

- Body

  ```json
  {
    "message": "Successfully updated"
  }
  ```

  </details>

## 6. GET /users/history _(Get user's history)_

  <details>
    <summary> 
      <code> Detail (Request & Response) </code> 
    </summary>

### Request

- Headers

  ```json
  {
    "access_token": STRING,
  }
  ```

### Response

#### _200 - OK_

- Body

  ```json
  [
    {
      "id": INTEGER,
      "value": INTEGER,
      "hasUserPaid": BOOLEAN,
      "isSentToSpot": BOOLEAN,
      "UserId": INTEGER,
      "SpotId": INTEGER,
      "createdAt": STRING,
      "updatedAt": STRING,
      "Spot": {
        "id": INTEGER,
        "name": STRING,
        "isFull": BOOLEAN,
        "isActive": BOOLEAN,
        "isOpen": BOOLEAN,
        "isRestaurant": BOOLEAN,
        "isCafe": BOOLEAN,
        "isPark": BOOLEAN,
        "email": STRING,
        "lat": DOUBLE,
        "lng": DOUBLE,
        "createdAt": STRING,
        "updatedAt": STRING
      }
    }
  ]
  ```

  </details>

</details>

<br />
<br />

# Weather

<details>
  <summary>Endpoints</summary>

## 1. POST /weather _(Get local weather)_

  <details>
    <summary> 
      <code> Detail (Request & Response) </code> 
    </summary>

### Request

- Body

  ```json
  {
    "lat": DOUBLE,
    "lng": DOUBLE,
  }
  ```

### Response

#### _200 - OK_

- Body

  ```json
  STRING
  ```

  </details>

</details>

<br />
<br />

# Payment

<details>
  <summary>Endpoints</summary>

## 1. POST /midtrans-token/:spotId _(Get Midtrans token)_

  <details>
    <summary> 
      <code> Detail (Request & Response) </code> 
    </summary>

### Request

- Headers

  ```json
  {
    "access_token": STRING,
  }
  ```

- Body

  ```json
  {
    "gross_amount": INTEGER,
  }
  ```

### Response

#### _201 - CREATED_

- Body

  ```json
  {
    "token": STRING,
    "transactionDetail": {
      "value": INTEGER,
      "hasUserPaid": true,
      "isSentToSpot": false,
      "UserId": INTEGER,
      "SpotId": INTEGER
    }
  }
  ```

#### _400 - BAD REQUEST_

- Body

  ```json
  {
    "errors": "invalid Price"
  }
  ```

  </details>

## 2. POST /postbook _(Add a booking)_

  <details>
    <summary> 
      <code> Detail (Request & Response) </code> 
    </summary>

### Request

- Headers

  ```json
  {
    "access_token": STRING,
  }
  ```

- Body

  ```json
  {
    "transactionDetail": {
      "value": INTEGER,
      "hasUserPaid": true,
      "isSentToSpot": false,
      "UserId": INTEGER,
      "SpotId": INTEGER
    }
  }
  ```

### Response

#### _201 - CREATED_

- Body

  ```json
  {
    "id": INTEGER,
    "value": INTEGER,
    "hasUserPaid": true,
    "isSentToSpot": false,
    "UserId": INTEGER,
    "SpotId": INTEGER,
    "updatedAt": STRING,
    "createdAt": STRING
  }
  ```

  </details>

</details>

<br />
<br />

# Global Error

## Response

_401 - Unauthenticated_

- Body

  ```json
  {
    "statusCode": 401,
    "errors": "Invalid token, please re-login"
  }
  ```

_500 - INTERNAL SERVER ERROR_

- Body
  ```json
  {
    "statusCode": 500,
    "errors": "Internal server error"
  }
  ```
