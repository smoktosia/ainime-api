
# Ainime Api Docs

## Auth

* ### POST /api/v1/auth/register

    **Request**
    Header:
        Content-Type: application/json
    body: {
        "username", "email", "password", "password2"
    }
    **Response**
    json: { "success": bool, "err": object }

* ### POST /api/v1/auth/login

    **Request**
    Header:
        Content-Type: application/json
        Access-Control-Allow-Credentials: true

    body: {
        "username", "password"
    }
    **Response**
    json: { "success": bool }
    set-cookie: jwt

* ### /api/v1/auth

    **Request**
    Header:
        Access-Control-Allow-Credentials: true
    **Response**
    json: { "auth": bool }
