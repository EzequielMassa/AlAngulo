# AlAngulo
alangulo api endpoints 

﻿

Booking
Reservas de canchas

﻿

GET
https://alangulobknd.onrender.com/bookings
https://alangulobknd.onrender.com/api/bookings
Obtener todas las reservas de canchas

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjE2MmRiMjFmY2I3YzAzMzg4MzU1ZSIsIm5hbWUiOiJlemUiLCJsYXN0bmFtZSI6InRlbGFwdXNvIiwiZW1haWwiOiJlZWYzM2RmQHB1ZG8uY29tIiwicGhvbmUiOiIxMTMzMzM0MzU2Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEzNDY0MDI3LCJleHAiOjE3MTM1NTA0Mjd9.kZdzQ7pyWWLKaxf1nOUQDOetwsXVJ8w_PsDkNPL6gMA
POST
https://alangulobknd.onrender.com/api/booking
https://alangulobknd.onrender.com/api/booking
Crear una reserva de cancha

﻿

Request Headers
x-acces-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGFjZmI4ZTU3NGVjZjVhN2I4NzY1YSIsIm5hbWUiOiJlemUiLCJsYXN0bmFtZSI6InRlbGFwdXNvIiwiZW1haWwiOiJlZWYzM2RmQHB1ZG8uY29tIiwicGhvbmUiOiIxMTMzMzM0MzU2Iiwicm9sZXMiOlsiNjYwOGIyZTEzMThhZjVkOTFjNGM1ZmQ5Il0sImlhdCI6MTcxMTk4NDU2OCwiZXhwIjoxNzEyMDcwOTY4fQ.cis8oHyhXYU3EOWflpRA2f6Zx7fc7KJfW83LvrMZLKY
Body
raw (json)
json
{
    "user": "6625dea8823413b4bfd46c3a",
    "soccerField" : "6625b457c9e7d7bfeb1c1d99",
    "time": "15:00",
    "date": "2024-04-23"
}
GET
https://alangulobknd.onrender.com/api/bookings/date/2024-03-25
https://alangulobknd.onrender.com/api/bookings/date/2024-03-31
Obtener todas las reservas de canchas por fecha

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDhiYjFjMTRjOWVlNjc2ZjE2YTFjYyIsIm5hbWUiOiJlemUiLCJsYXN0bmFtZSI6InRlbGFwdXNvIiwiZW1haWwiOiJlemRlQHB1ZG8uY29tIiwicGhvbmUiOiIxMTMzMzM0NDU1Iiwicm9sZXMiOlsiNjYwOGIyZTEzMThhZjVkOTFjNGM1ZmQ5Il0sImlhdCI6MTcxMTg0ODIyMCwiZXhwIjoxNzExOTM0NjIwfQ.jg8UVtVclJI3m530HyBWxYMUDoffc8mmEEi5-g7tILQ
GET
https://alangulobknd.onrender.com/api/booking/6601f282076e23c77c7d446c
https://alangulobknd.onrender.com/api/booking/6608bc5114c9ee676f16a1e6
Obtener una reserva de cancha por su id

﻿

GET
https://alangulobknd.onrender.com/api/bookings/available_hours?soccerfield=6601ee7de1bb4f4dbb9a8900&date=2024-03-25
https://alangulobknd.onrender.com/api/bookings/available_hours?soccerfield=6608b2e1318af5d91c4c5ff3&date=2024-03-31
Obtener los horarios disponibles de una cancha por su id y fecha

﻿

Query Params
soccerfield
6608b2e1318af5d91c4c5ff3
date
2024-03-31
DELETE
https://alangulobknd.onrender.com/api/booking/delete/660608a9271415ed5c12917b
https://alangulobknd.onrender.com/api/booking/delete/6608bc5114c9ee676f16a1e6
Borrar una reserva de cancha por su id

﻿

SoccerField
Canchas

﻿

GET
https://alangulobknd.onrender.com/api/soccerfields
https://alangulobknd.onrender.com/api/soccerfields
Obtener todas las canchas

﻿

GET
https://alangulobknd.onrender.com/api/soccerfield/id
https://alangulobknd.onrender.com/api/soccerfield/6608b2e1318af5d91c4c5ff3
Obtener una cancha por su id

﻿

POST
https://alangulobknd.onrender.com/api/soccerfield
https://alangulobknd.onrender.com/api/soccerfield
Crear una cancha

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDhiYjFjMTRjOWVlNjc2ZjE2YTFjYyIsIm5hbWUiOiJlemUiLCJsYXN0bmFtZSI6InRlbGFwdXNvIiwicGhvbmUiOiIxMTMzMzM0NDU1Iiwicm9sZXMiOlt7Im5hbWUiOiJhZG1pbiJ9XSwiaWF0IjoxNzExODQ5OTY1LCJleHAiOjE3MTE5MzYzNjV9.MZTPisqtMtJ3P2TZYfjOzAcO6My4VeTpwMCmxXTnmyk
Body
raw (json)
json
{
    "name": "cancha nueva",
    "description": "descripcion de cancha nueva",
    "size":5,
    "grass":"natural",
    "price":200000
}
GET
https://alangulobknd.onrender.com/api/soccerfields/query?q
https://alangulobknd.onrender.com/api/soccerfields/query?grass=natural&size=11
Obtener todas las canchas por pasto / tamaño

﻿

Query Params
grass
natural
size
11
PUT
https://alangulobknd.onrender.com/api/soccerfield/update/id
https://alangulobknd.onrender.com/api/soccerfield/update/6608b2e1318af5d91c4c5ff3
Modificar una cancha

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDhiYjFjMTRjOWVlNjc2ZjE2YTFjYyIsIm5hbWUiOiJlemUiLCJsYXN0bmFtZSI6InRlbGFwdXNvIiwicGhvbmUiOiIxMTMzMzM0NDU1Iiwicm9sZXMiOlt7Im5hbWUiOiJhZG1pbiJ9XSwiaWF0IjoxNzExODQ5OTY1LCJleHAiOjE3MTE5MzYzNjV9.MZTPisqtMtJ3P2TZYfjOzAcO6My4VeTpwMCmxXTnmyk
Body
raw (json)
json
{
    "name":"nom"
}
DELETE
https://alangulobknd.onrender.com/api/soccerfield/delete/id
https://alangulobknd.onrender.com/api/soccerfield/delete/6608b2e1318af5d91c4c5ff3
Borrar una cancha por su id

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDhiYjFjMTRjOWVlNjc2ZjE2YTFjYyIsIm5hbWUiOiJlemUiLCJsYXN0bmFtZSI6InRlbGFwdXNvIiwicGhvbmUiOiIxMTMzMzM0NDU1Iiwicm9sZXMiOlt7Im5hbWUiOiJhZG1pbiJ9XSwiaWF0IjoxNzExODQ5OTY1LCJleHAiOjE3MTE5MzYzNjV9.MZTPisqtMtJ3P2TZYfjOzAcO6My4VeTpwMCmxXTnmyk
Products
Productos

﻿

GET
https://alangulobknd.onrender.com/api/products
https://alangulobknd.onrender.com/api/products
Obtener todos los productos

﻿

POST
https://alangulobknd.onrender.com/api/products
https://alangulobknd.onrender.com/api/products
Crear un producto

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjMwMzkyMDkzNGY3MDUxZGQxNjU1MiIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwibGFzdG5hbWUiOiJhbCBhbmd1bG8iLCJwaG9uZSI6IjM4MTY2NDYzNjgiLCJpbWFnZSI6Imh0dHBzOi8vaS5pbWd1ci5jb20vSTAzeTJFYy5wbmciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTM1NzE3NjAsImV4cCI6MTcxMzY1ODE2MH0.WQXUQPTQRJ-wk0WTgjrvcN_bWgc5rfNkPnMRPUvP47Q
Body
raw (json)
json
{
  "name": "Nuevo producto",
  "description": "Descripcion nuevo producto",
	"price": 15000,
	"quantity": 2,
    "category" : "Bebidas"
}
GET
https://alangulobknd.onrender.com/api/product/66076935343b3abd5e057637
https://alangulobknd.onrender.com/api/product/6608b2e1318af5d91c4c5fed
Obtener un producto por su id

﻿

PUT
https://alangulobknd.onrender.com/api/product/update/66076935343b3abd5e057637
https://alangulobknd.onrender.com/api/product/update/662303910934f7051dd16531
Modificar un producto por su id

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjMwMzkyMDkzNGY3MDUxZGQxNjU1MiIsIm5hbWUiOiJBZG1pbmlzdHJhZG9yIiwibGFzdG5hbWUiOiJhbCBhbmd1bG8iLCJwaG9uZSI6IjM4MTY2NDYzNjgiLCJpbWFnZSI6Imh0dHBzOi8vaS5pbWd1ci5jb20vSTAzeTJFYy5wbmciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTM1Nzg2MjcsImV4cCI6MTcxMzY2NTAyN30.eSfDP9bBiHrn_Pfypu4Ga40a0ivNNMtUlIqHMATp03E
Body
raw (json)
json
{
    "name": "Remera al angulo",
    "category": "Bebidas"
}
DELETE
https://alangulobknd.onrender.com/api/product/delete/66076935343b3abd5e057637
https://alangulobknd.onrender.com/api/product/delete/6608b2e1318af5d91c4c5fec
Borrar un producto por su id

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDhiYjFjMTRjOWVlNjc2ZjE2YTFjYyIsIm5hbWUiOiJlemUiLCJsYXN0bmFtZSI6InRlbGFwdXNvIiwicGhvbmUiOiIxMTMzMzM0NDU1Iiwicm9sZXMiOlt7Im5hbWUiOiJhZG1pbiJ9XSwiaWF0IjoxNzExODQ5OTY1LCJleHAiOjE3MTE5MzYzNjV9.MZTPisqtMtJ3P2TZYfjOzAcO6My4VeTpwMCmxXTnmyk
GET
https://alangulobknd.onrender.com/api/products/price?sortOrder=desc
https://alangulobknd.onrender.com/api/products/price?sortOrder=asc
Obtener todos los productos ordenados por precio asc / desc

﻿

Query Params
sortOrder
asc
GET
https://alangulobknd.onrender.com/api/products/category/6608b2e1318af5d91c4c5fe2
https://alangulobknd.onrender.com/api/products/category/6608b2e1318af5d91c4c5f44
Obtener todos los productos de una categoria

﻿

User
Usuarios

﻿

POST
https://alangulobknd.onrender.com/api/login
https://alangulobknd.onrender.com/api/login
Inicio de sesion usuario

﻿

Body
raw (json)
json
{
    "email":"usuario@usuario.com",
    "password":"usuario1234"
}
POST
https://alangulobknd.onrender.com/api/register
https://alangulobknd.onrender.com/api/register
Registro usuario

﻿

Body
raw (json)
json
{
    "name":"usuario",
    "lastname":"usuario",
    "email":"usuario@alangulo.com",
    "phone":1133335556,
    "password":"usuario1234"

}
GET
https://alangulobknd.onrender.com/api/users
https://alangulobknd.onrender.com/api/users
Obtener todos los usuarios

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDhiYjFjMTRjOWVlNjc2ZjE2YTFjYyIsIm5hbWUiOiJlemUiLCJsYXN0bmFtZSI6InRlbGFwdXNvIiwicGhvbmUiOiIxMTMzMzM0NDU1Iiwicm9sZXMiOlt7Im5hbWUiOiJhZG1pbiJ9XSwiaWF0IjoxNzExODQ5OTY1LCJleHAiOjE3MTE5MzYzNjV9.MZTPisqtMtJ3P2TZYfjOzAcO6My4VeTpwMCmxXTnmyk
GET
https://alangulobknd.onrender.com/api/user/661ad52fd31031d22d7157d3
https://alangulobknd.onrender.com/api/user/6608bb1c14c9ee676f16a1cc
Obtener un usuario por su id

﻿

GET
https://alangulobknd.onrender.com/api/userEmail/usuario@usuario.com
https://alangulobknd.onrender.com/api/user/email/usuario@usuario.com
Obtener un usuario por su email

﻿

DELETE
https://alangulobknd.onrender.com/api/user/6608bb1c14c9ee676f16a1cc
https://alangulobknd.onrender.com/api/user/6608bb1c14c9ee676f16a1cc
Borrar un usuario por su id

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDhiYjFjMTRjOWVlNjc2ZjE2YTFjYyIsIm5hbWUiOiJlemUiLCJsYXN0bmFtZSI6InRlbGFwdXNvIiwicGhvbmUiOiIxMTMzMzM0NDU1Iiwicm9sZXMiOlt7Im5hbWUiOiJhZG1pbiJ9XSwiaWF0IjoxNzExODQ5OTY1LCJleHAiOjE3MTE5MzYzNjV9.MZTPisqtMtJ3P2TZYfjOzAcO6My4VeTpwMCmxXTnmyk
PUT
https://alangulobknd.onrender.com/api/user/6608ccf89897b94a2f273473
https://alangulobknd.onrender.com/api/user/6608ccf89897b94a2f273473
Modificar un usuario por su id

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MGFjMDkxYjczOGVlYzRhMGFmYzY1ZSIsIm5hbWUiOiJlemUiLCJsYXN0bmFtZSI6InRlbGFwdXNvIiwiZW1haWwiOiJlZUBwdWRvLmNvbSIsInBob25lIjoiMTEzMzMzNDM5MCIsInJvbGVzIjpbIjY2MDhiMmUxMzE4YWY1ZDkxYzRjNWZkOSJdLCJpYXQiOjE3MTE5ODA2OTAsImV4cCI6MTcxMjA2NzA5MH0.H2648gp4ennV_PLhQ562RmrhHM3B7puOuatZ8-VS8ew
Body
raw (json)
json
{
    "lastname":"juancito"
}
Orders
Ordenes

﻿

POST
https://alangulobknd.onrender.com/api/orders
https://alangulobknd.onrender.com/api/orders
Crear una nueva orden

﻿

Body
raw (json)
json
{
    "user":"6621628721fcb7c03388353e",
    "product":"6621625721fcb7c03388351a",
    "quantity":2,
    "orderDate":"2024-04-02"
}
DELETE
https://alangulobknd.onrender.com/api/orders/66076b2d343b3abd5e057660
https://alangulobknd.onrender.com/api/order/delete/6608c27814c9ee676f16a222
Borrar una orden

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDc2Y2I4MjA0YjRjMjlmYzFlNjUyZSIsIm5hbWUiOiJmZXIiLCJsYXN0bmFtZSI6ImFsZiIsImVtYWlsIjoiZmVyQHB1ZG8uY29tIiwicGhvbmUiOiI4NzM0ODk1MDMyIiwicm9sZXMiOlsiNjYwNzY5MzUzNDNiM2FiZDVlMDU3NjMxIl0sImlhdCI6MTcxMTc2MjYxNiwiZXhwIjoxNzExODQ5MDE2fQ.aRTVQzF9eKx1JO-9DXUAIWQ6Z4VqcbB1QaxOo6khsIQ
GET
https://alangulobknd.onrender.comapi/orders/6608c27814c9ee676f16a222
https://alangulobknd.onrender.com/api/order/6608c27814c9ee676f16a222
Obtener una orden por su id

﻿

Request Headers
x-access-token
6608b2e1318af5d91c4c5fec
GET
https://alangulobknd.onrender.com/api/orders
https://alangulobknd.onrender.com/api/orders
Obtener todas las ordenes

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDhiYjFjMTRjOWVlNjc2ZjE2YTFjYyIsIm5hbWUiOiJlemUiLCJsYXN0bmFtZSI6InRlbGFwdXNvIiwicGhvbmUiOiIxMTMzMzM0NDU1Iiwicm9sZXMiOlt7Im5hbWUiOiJhZG1pbiJ9XSwiaWF0IjoxNzExODQ5OTY1LCJleHAiOjE3MTE5MzYzNjV9.MZTPisqtMtJ3P2TZYfjOzAcO6My4VeTpwMCmxXTnmyk
Cart
Carrito

﻿

GET
https://alangulobknd.onrender.com/api/cart/user/661ad52fd31031d22d7157d3
https://alangulobknd.onrender.com/api/cart/user/661d8638b8987a529a55393e
Obtener un carrito por el id del usuario

﻿

POST
https://alangulobknd.onrender.com/api/cart/checkout/user/6621628721fcb7c03388353e
https://alangulobknd.onrender.com/api/cart/checkout/user/6621628721fcb7c03388353e
Limpiar carrito del usuario por id del usuario

﻿

Category
Categorias de productos

﻿

GET
https://alangulobknd.onrender.com/api/categories
https://alangulobknd.onrender.com/api/categories
Obtener todas las categorias disponibles

﻿

POST
https://alangulobknd.onrender.com/api/category
https://alangulobknd.onrender.com/api/category
Crear una categoria

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWFkNTJmZDMxMDMxZDIyZDcxNTdkMyIsIm5hbWUiOiJlemUiLCJsYXN0bmFtZSI6InRlbGFwdXNvIiwiZW1haWwiOiJlZWYzM2RmQHB1ZG8uY29tIiwicGhvbmUiOiIxMTMzMzM0MzU2Iiwicm9sZXMiOlsiNjYxNzEwNzIwYjU4NzM4NDVjMmZkZDNhIl0sImlhdCI6MTcxMzAzNDU0MywiZXhwIjoxNzEzMTIwOTQzfQ.RtS7qeEeSc2OEJOEPBZBvPF01e-byDj-UphwLXEafFU
Body
raw (json)
json
{
    "name": "Botines",
    "description": "Los mejores botines"
}
DELETE
https://alangulobknd.onrender.com/api/category/delete/6608b2e1318af5d91c4c5fe1
https://alangulobknd.onrender.com/api/category/delete/6608b2e1318af5d91c4c5fe1
Borrar una categoria por su id

﻿

PUT
https://alangulobknd.onrender.com/api/category/update/6608b2e1318af5d91c4c5fe2
https://alangulobknd.onrender.com/api/category/update/661ad551d31031d22d7157db
Modificar una categoria por su id

﻿

Request Headers
x-access-token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWFkNTJmZDMxMDMxZDIyZDcxNTdkMyIsIm5hbWUiOiJlemUiLCJsYXN0bmFtZSI6InRlbGFwdXNvIiwiZW1haWwiOiJlZWYzM2RmQHB1ZG8uY29tIiwicGhvbmUiOiIxMTMzMzM0MzU2Iiwicm9sZXMiOlsiNjYxNzEwNzIwYjU4NzM4NDVjMmZkZDNhIl0sImlhdCI6MTcxMzAzNDU0MywiZXhwIjoxNzEzMTIwOTQzfQ.RtS7qeEeSc2OEJOEPBZBvPF01e-byDj-UphwLXEafFU
Body
raw (json)
json
{

    "description":"Tazas"
}
