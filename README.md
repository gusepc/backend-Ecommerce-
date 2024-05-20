
# Testing

## Mailing

1.-Configuración JWT para expirar en una hora: 

<img width="529" alt="Captura de pantalla 2024-05-19 a la(s) 23 44 19" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/2d2b79ed-0c11-4ab3-88d5-85edf27a79e7">

2.- Validación de email, creacion de JWT y enlace vinculado al JWT:

<img width="677" alt="Captura de pantalla 2024-05-19 a la(s) 23 50 16" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/561d3ec4-f6ee-4e5b-afc6-2295eeefdc17">

3.- Envío del correo mediante nodemailer:

<img width="570" alt="Captura de pantalla 2024-05-19 a la(s) 23 51 32" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/590946c7-eecd-4765-a1df-85c9f1e3b6d7">

<img width="1028" alt="Captura de pantalla 2024-05-20 a la(s) 0 03 16" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/63ac1967-a2b8-4131-9ae9-624ed96e28b5">

4.- Correo recibido:

<img width="732" alt="Captura de pantalla 2024-05-20 a la(s) 0 04 22" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/4dfa4009-eaaf-4cdd-a01c-1dd3fafb0668">

5.- Validación del JWT:

<img width="573" alt="Captura de pantalla 2024-05-20 a la(s) 0 06 38" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/9aac912f-bb05-4ec7-9ed7-65ecb4026388">

6.- Se compruba el JWT, que la nueva contraseña coincida, si la contraseña propuesta coincide con la hasheada en la DB, se informa al usuario, si son diferentes se hashea la propuesta y actualiza en la DB:

<img width="671" alt="Captura de pantalla 2024-05-20 a la(s) 0 09 02" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/9288de5e-8c0d-494a-bbb4-b697b2477957">

## Autorización usuarios Premium

1.- Middlewares de autorización basados en el rol del usuario almacenado en la cookie de sesión:

<img width="705" alt="Captura de pantalla 2024-05-20 a la(s) 1 23 41" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/556ebf90-dcb6-421d-ae39-f865dd8426e9">

2.- Implementación de Middleware 

<img width="710" alt="Captura de pantalla 2024-05-20 a la(s) 0 38 53" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/808234ec-e1c3-4c37-814a-9c6af57c879b">

## Modificación del Schema

1.- Nuevo Schema:

<img width="658" alt="Captura de pantalla 2024-05-20 a la(s) 0 40 20" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/99442ea1-35d7-4b2b-8ed9-fb3d682ecfed">

2.- Logica de creacion de producto:

<img width="739" alt="Captura de pantalla 2024-05-20 a la(s) 1 53 45" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/62d519cc-72f4-44b0-af2d-5c05edb2a998">

3.- Petición:

<img width="1088" alt="Captura de pantalla 2024-05-20 a la(s) 1 57 18" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/4306e25e-6b21-437a-9b70-9b2521f9b136">

4.- DB:

<img width="588" alt="Captura de pantalla 2024-05-20 a la(s) 1 57 55" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/0edf80de-1a01-4faf-bda5-d895c38b3659">

## Autorización para eliminar productos

1.- Verificación del dueño del producto o si se es admin (petición conproducto propio):

<img width="1195" alt="Captura de pantalla 2024-05-20 a la(s) 2 18 05" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/eb24f45f-0814-4ee5-878c-494bb8b2f3ad">

2.- Petición con producto ajeno:

<img width="1195" alt="Captura de pantalla 2024-05-20 a la(s) 2 21 57" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/360421cc-64a9-4f46-92b3-8849e9bdbd83">

3.- Petición como admin:

<img width="1195" alt="Captura de pantalla 2024-05-20 a la(s) 2 27 07" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/0d52a22c-58c4-4cad-99a2-88c334698fb8">

## Autorización para agrar productos al carrito

1.- Petición como dueño del producto:

<img width="1195" alt="Captura de pantalla 2024-05-20 a la(s) 2 41 36" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/7f62652e-abe8-425f-9da0-884eaeb61d32">

2.- Petición como ajeno al producto:

<img width="1195" alt="Captura de pantalla 2024-05-20 a la(s) 2 42 50" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/3fe70a26-3530-4d6e-9e72-a62f96adbe82">

3.- Carrito:

<img width="778" alt="Captura de pantalla 2024-05-20 a la(s) 2 45 00" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/b318a2a7-8036-4964-8657-cb8c04a711f6">

## Cambio de rol

1.- Lógica y resultado con rol "user":

<img width="1432" alt="Captura de pantalla 2024-05-20 a la(s) 2 50 58" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/47b0931f-e5dd-4ffd-85ef-ee4d3db8737f">

2.- Resultado con rol "premium":

<img width="699" alt="Captura de pantalla 2024-05-20 a la(s) 2 51 55" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/1334a08d-9ad2-4fa5-b7d9-214349861bfc">








