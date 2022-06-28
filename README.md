# login-exercise
---

Servicio de identificación de usuarios con el cual podamos registrarnos con email, contraseña y nombre, e iniciar sesión con autenticacion JWT.

## Endpoints

1.	[POST] /registrar: Este endpoint debe esperar recibir en el body de la request email que debe ser un string con formato de email válido, contraseña que debe ser un string con números, letras, al menos una mayúscula y 8 o más caracteres. De no cumplir con lo requerido, el servidor debería responder un status 400 con un mensaje de error adecuado. En caso de que la request sea exitosa debería registrar el usuario en la capa de persistencia (base de datos o lo que uses) de manera apropiada. Tener en cuenta como debería guardarse esa contraseña.
2.	[POST] /login: Este endpoint debe esperar recibir en el body de la request un email y una contraseña que el servidor debe utilizar para autenticar al usuario y devolver alguna forma de autorización (preferentemente jwt) con el que pueda autenticar comunicaciones futuras con el servidor. En caso de que el email o la contraseña no sean correctas deberá retornar un 400.
3.	[GET] /user?email={userEmail}: Este endpoint debe esperar recibir como parámetro en la query un email, el cual debe utilizar para buscar el nombre del usuario y retornarlo. Solo debe retornar el nombre del usuario asociado al email en caso de que la llamada este autenticada apropiadamente (es decir quien hace la request sea dueño de ese email), en caso contrario el servidor debería retornar un status 404

---
## Guia de instalacion

Se deberán configurar las variables de entorno presentes en .env. Se brinda un ejemplo en .env.example

```
git clone [link]
npm install
npm run dev
```

---
## Guia de instalacion

Se proporcionan pruebas POSTMAN en el path ./test/postman con las cuales se podrá probar la funcionalidad.