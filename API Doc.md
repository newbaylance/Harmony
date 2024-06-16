API DOCUMENTATION

```js

Endpoints :
List of available endpoints:

POST /google-sign-in
POST /register
POST /login
GET /user/male/:id
GET /user/female/:id
POST /generate
GET /test
GET /user/male
GET /user/female
POST /user/male/:id
POST /user/female/:id
PUT /user/male/:id
PUT /user/female/:id
POST /harmony
DELETE /harmony
GET /harmonyMale/:id
GET /harmonyFemale/:id


1. POST /google-sign-in
    Request: "Google Account"
    

    Response (201 - created)
    {
        "access_token": "string",
    }

    Response (200 - found)
    {
        "access_token": "string",
    }

2. POST /register
    Request:
     - body:
    {
        "email": "string",
        "password": "string",
        "gender": "string"
    }
     
    Response (200 - Ok)
    {
        "id": "integer",
        "email": "string",
        "gender": "string"
    }

    Response (400 - Bad request)
    {
        "message": "Must be filled!"
    }


3. POST /login
    Request:
     - body:
    {
        "email": "string",
        "password": "string"
    }
     
    Response (200 - Ok)
    {
        "access_token": "string",
        "id": "integer",
        "gender": "string",
        "MaleId": "integer",
        "FemaleId": "integer"
    }

    Response (400 - Email password empty)
    {
        "message": "Email and Password is required"
    }
    Response (401 - Unauthorized)
    {
        "message": "Email not found or password not matched"
    }


4. GET /user/male/:id
    Request:
     - headers:
        {
            "access_token": "string"
        }

     - params:
        {
            "id": "integer (required)"
        }

    Response (200 - Ok)
    {
        "id": 1,
        "name": "Budi Santoso",
        "datebirth": "1985-07-12T00:00:00.000Z",
        "height": 175,
        "weight": 70,
        "imageUrl": "https://images.prestigeonline.com/wp-content/uploads/sites/4/2021/08/02152423/Iqbaal-Ramadhan_1-819x1024.jpg",
        "job": "Insinyur",
        "style": "anxious",
        "UserId": 1,
        "createdAt": "2024-06-13T15:36:46.840Z",
        "updatedAt": "2024-06-13T15:36:46.840Z"
    }

    Response (404 - Error not found)
    {
        "message": "Error not found"
    }


5. GET /user/female/:id
    Request:
     - headers:
        {
            "access_token": "string"
        }

     - params:
        {
            "id": "integer (required)"
        }

    Response (200 - Ok)
    {
        "id": 1,
        "name": "Siti Aminah",
        "datebirth": "1990-05-24T00:00:00.000Z",
        "height": 160,
        "weight": 55,
        "imageUrl": "https://awsimages.detik.net.id/community/media/visual/2024/01/25/han-so-hee-3_34.png?w=700&q=90",
        "job": "influencer",
        "style": "anxious",
        "UserId": 2,
        "createdAt": "2024-06-13T15:36:46.849Z",
        "updatedAt": "2024-06-16T04:06:41.424Z"
    }

    Response (404 - Error not found)
    {
        "message": "Error not found"
    }


6. POST /generate
    Request:
     - headers:
        {
            "access_token": "string"
        }

     - body:
        {
            "style": "string"
        }

    Response (200 - Ok)
    {
        "gaya": "Secure",
        "analisa": "Orang yang memiliki gaya penjalinan secure cenderung memiliki kepercayaan diri yang tinggi dan mandiri. Mereka mampu menjalin hubungan yang sehat dan stabil karena memiliki keseimbangan antara kebutuhan akan kedekatan dan ruang pribadi.",
        "kelebihan": "Kelebihan dari gaya penjalinan secure adalah mampu membangun hubungan yang sehat dan langgeng. Mereka juga cenderung bisa mengatasi konflik dengan baik karena mampu berkomunikasi secara terbuka dan jujur.",
        "kekurangan": "Namun, kelemahan dari gaya penjalinan secure adalah kadang-kadang mereka terlalu independen sehingga sulit untuk mengekspresikan kebutuhan emosionalnya. Mereka juga cenderung kurang memperhatikan perasaan orang lain dan terlalu fokus pada diri sendiri."
    }

7. GET /test
    Request:
     - headers:
        {
            "access_token": "string"
        }

    Response (200 - Ok)
    {
        "style": "string",
    }


8. GET /user/male
    Request:
     - headers:
        {
            "access_token": "string"
        }

    Response (200 - Ok)
    [
        {
            "id": 3,
            "name": "Rudi Hartono",
            "datebirth": "1988-08-19T00:00:00.000Z",
            "height": 170,
            "weight": 75,
            "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-CyCfmmCiQSVSTDYYtyYkaAErZsjrJ0lJLQ&s",
            "job": "Pengusaha",
            "style": "avoidance",
            "UserId": 5,
            "createdAt": "2024-06-13T15:36:46.840Z",
            "updatedAt": "2024-06-13T15:36:46.840Z"
        }
        ...,
    ]


9. GET /user/female
    Request:
     - headers:
        {
            "access_token": "string"
        }

    Response (200 - Ok)
    [
        {
            "id": 2,
            "name": "Dewi Lestari",
            "datebirth": "1995-11-02T00:00:00.000Z",
            "height": 165,
            "weight": 60,
            "imageUrl": "https://cdn1-production-images-kly.akamaized.net/hy4ehd5VIGfMTpKMUa6cn54ZgOw=/469x625/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4354268/original/017982500_1678459179-WhatsApp_Image_2023-03-09_at_21.31.34.jpeg",
            "job": "Penulis",
            "style": "anxious",
            "UserId": 4,
            "createdAt": "2024-06-13T15:36:46.849Z",
            "updatedAt": "2024-06-13T15:36:46.849Z"
        }
        ...,
    ]


10. POST /user/male/:id
    Request:
     - headers:
        {
            "access_token": "string"
        }

     - params:
        {
            "id": "integer (required)"
        }

     - body:
        {
            "name": "string",
            "datebirth": "date",
            "height": "integer",
            "weight": "integer",
            "imageUrl": "string",
            "job": "string",
            "style": "string"
        }

    Response (201 - Ok)
    {
        "Profile has been updated"
    }

    Response (400 - Bad request)
    {
        "message": "Must be filled!"
    }


11. POST /user/female/:id
    Request:
     - headers:
        {
            "access_token": "string"
        }

     - params:
        {
            "id": "integer (required)"
        }

     - body:
        {
            "name": "string",
            "datebirth": "date",
            "height": "integer",
            "weight": "integer",
            "imageUrl": "string",
            "job": "string",
            "style": "string"
        }

    Response (201 - Ok)
    {
        "Profile has been updated"
    }

    Response (400 - Bad request)
    {
        "message": "Must be filled!"
    }


12. PUT /user/male/:id
    Request:
     - headers:
        {
            "access_token": "string"
        }

     - params:
        {
            "id": "integer (required)"
        }

     - body:
        {
            "name": "string",
            "datebirth": "date",
            "height": "integer",
            "weight": "integer",
            "imageUrl": "string",
            "job": "string",
            "style": "string"
        }

    Response (201 - Ok)
    {
        "Profile has been updated"
    }

    Response (400 - Bad request)
    {
        "message": "Must be filled!"
    }

    Response (404 - Error not found)
    {
        "message": "Error not found"
    }


13. PUT /user/female/:id
    Request:
     - headers:
        {
            "access_token": "string"
        }

     - params:
        {
            "id": "integer (required)"
        }

     - body:
        {
            "name": "string",
            "datebirth": "date",
            "height": "integer",
            "weight": "integer",
            "imageUrl": "string",
            "job": "string",
            "style": "string"
        }

    Response (201 - Ok)
    {
        "Profile has been updated"
    }

    Response (400 - Bad request)
    {
        "message": "Must be filled!"
    }

    Response (404 - Error not found)
    {
        "message": "Error not found"
    }


14. POST /harmony
    Request:
     - headers:
        {
            "access_token": "string"
        }

     - body:
        {
            "FemaleId": "integer",
            "MaleId": "integer"
        }

    Response (201 - Ok)
    {
        "id": 40,
        "FemaleId": 2,
        "MaleId": 5,
        "updatedAt": "2024-06-16T04:18:36.822Z",
        "createdAt": "2024-06-16T04:18:36.822Z"
    }



15. DELETE /harmony
    Request:
     - headers:
        {
            "access_token": "string"
        }

     - body:
        {
            "FemaleId": "integer",
            "MaleId": "integer"
        }

    Response (200 - Ok)
    {
        "Harmony has been deleted"
    }


16. GET /harmonyMale/:id
    Request:
     - headers:
        {
            "access_token": "string"
        }

     - params:
        {
            "id": "integer (required)"
        }
        
    Response (200 - Ok)
    [
        {
            "id": 40,
            "FemaleId": 2,
            "MaleId": 5,
            "createdAt": "2024-06-16T04:18:36.822Z",
            "updatedAt": "2024-06-16T04:18:36.822Z",
            "Female": {
                "id": 2,
                "name": "Dewi Lestari",
                "datebirth": "1995-11-02T00:00:00.000Z",
                "height": 165,
                "weight": 60,
                "imageUrl": "https://cdn1-production-images-kly.akamaized.net/hy4ehd5VIGfMTpKMUa6cn54ZgOw=/469x625/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4354268/original/017982500_1678459179-WhatsApp_Image_2023-03-09_at_21.31.34.jpeg",
                "job": "Penulis",
                "style": "anxious",
                "UserId": 4,
                "createdAt": "2024-06-13T15:36:46.849Z",
                "updatedAt": "2024-06-13T15:36:46.849Z"
                }
        }
    ]

    Response (404 - Error not found)
    {
        "message": "Error not found"
    }
     


17. GET /harmonyFemale/:id
    Request:
     - headers:
        {
            "access_token": "string"
        }

     - params:
        {
            "id": "integer (required)"
        }
        
    Response (200 - Ok)
    [
        {
            "id": 40,
            "FemaleId": 2,
            "MaleId": 5,
            "createdAt": "2024-06-16T04:18:36.822Z",
            "updatedAt": "2024-06-16T04:18:36.822Z",
            "Male": {
                "id": 5,
                "name": "Rizal Fahmi",
                "datebirth": "1984-09-05T00:00:00.000Z",
                "height": 178,
                "weight": 72,
                "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-CyCfmmCiQSVSTDYYtyYkaAErZsjrJ0lJLQ&s",
                "job": "Arsitek",
                "style": "secure",
                "UserId": 9,
                "createdAt": "2024-06-13T15:36:46.840Z",
                "updatedAt": "2024-06-13T15:36:46.840Z"
            }
        }
    ]

    Response (404 - Error not found)
    {
        "message": "Error not found"
    }


------------------------------------------------------------------------------
Global Error
    Response (403 - Forbidden)
        {
        "message": "You have no access"
        }
    Response (500 - Internal Server Error)
        {
        "message": "Internal server error"
        }


```