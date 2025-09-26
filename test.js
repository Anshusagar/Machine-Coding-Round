let obj = {
    "Contact": [
        {
            "id": 1,
            "firstName": "Anshu",
            "lastName": "Sagar",
            "email": "anshu@example.com",
            "phone": "1234567890",
            "createdAt": "2023-10-01T10:00:00Z"
        },
        {
            "id": 2,
            "firstName": "Ritu",
            "lastName": "Sagar",
            "email": "ritu@example.com",
            "phone": "1234590",
            "createdAt": "2025-10-01T10:00:00Z"
        },
        {
            "id": 3,
            "firstName": "Himanshu",
            "lastName": "Sagar",
            "email": "himanshu@example.com",
            "phone": "1234567890",
            "createdAt": "2023-10-01T10:00:00Z"
        },
        {
            "id": 4,
            "name": "Contact NaN",
            "email": "contactNaN@example.com",
            "phone": "123456789NaN",
            "createdAt": "2025-09-25T07:15:46.686Z"
        },
        {
            "id": 5,
            "name": "Contact 5",
            "email": "contact5@example.com",
            "phone": "1234567895",
            "createdAt": "2025-09-25T07:17:10.683Z"
        }
    ]
}

obj.Contact.sort((a,b) => b['id'] - a['id'])
console.log(obj)