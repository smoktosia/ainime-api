
# Ainime Api Docs

## Auth

* ### POST /api/auth/login

    **Request**
    cookie: { "JWT" }
    **Response**

* ### POST /api/auth/register

    **Request**
    body: { "username", "email", "password", "password2" }
    **Response**
    json: { "success": bool, "err": object }

* ### /api/auth/refresh
