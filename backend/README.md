# Register

### Description

- Register a user

### Endpoint

`/api/v1/user/auth/register`

### Access

`Public`

### Parameters

- **name:** string, required

- **email:** email, required,
- **password:** string, required,
- **phoneNumber:** optional

### Method

`POST`

### ContentType

`application/JSON`

### Request Example

```json
{
  "name": "ramesh kunwar",
  "email": "ramesh@gmail.com",
  "password": "Ramesh@123",
  "phoneNumber": "98122211"
}
```

---

---

# Login

### Endpoint

`POST /api/v1/auth/login`

### Access

`Public`

### Parameters

- `email` (string, required): The email address associated with the user's account.
- `password` (string, required): The password for the user's account.

### Content Type

`applicatication/json`

### Request Example

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

---

# User Schema

```js
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    default: 0, // 0 for user, 1 for admin
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "active",
  },


```
