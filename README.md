
## Testing
Se desabilitaron los perimisos para la realizacion del testing mediante postman

1.- Mediante faker.js se crean 100 productos simulando una petición a la BD de Mongo:

/mockingproducts

<img width="1624" alt="Captura de pantalla 2024-04-29 a la(s) 14 22 04" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/0e02927b-cd20-470a-9e91-353775082f23">



2.- Se crea un producto mediante POST con todos los parametros del modelo:
<img width="1062" alt="Captura de pantalla 2024-04-29 a la(s) 14 32 13" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/dd883739-351e-409c-9fae-cdc8c2f8ca08">


3.- Se omite uno de los parametros del modelo al hacer la petición:

POSTMAN
<img width="1084" alt="Captura de pantalla 2024-04-29 a la(s) 14 30 55" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/7f3c437a-d352-4c09-abe9-d0b6ff2460be">
TERMINAL
<img width="971" alt="Captura de pantalla 2024-04-29 a la(s) 14 31 35" src="https://github.com/gusepc/Pre-entrega-3/assets/87159839/d2c6c00d-645f-4cf8-a45d-325e58478f29">
