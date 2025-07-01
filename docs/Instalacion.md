# Proceso de Instalacion

Para poder levantar el proyecto se debe clonar el repositorio en la carpeta deseada con el comando
```
git clone https://github.com/valeriaZerain/subastas-proyecto-final.git
```
Posteriormete se debe dirigir a la carpeta en la que el directorio esta creado
```
cd subastas-proyecto-final
```
Para luego poder instalar las dependencias
```
npm install
```
Y poder levantar el frontend
```
npm run dev
```
Para el correcto funcionamiento se debe levantar el backend con el comando
```
npx json-server db.json
```
Y finalmente para terminar se debe levantar el servidor para el Server Sent Event, para esto debemos ir a la carpeta en la que tenemos el backend
```
cd src\backend\sse
```
Se debe realizar la instalacion de dependencias
```
npm install
```
Para finalizar con el comando para levantar el servidor
```
node bid.js
```

Si todo se levanto de manera correcta el proyecto estara levantado de manera local en el puerto 1573 por defecto

[Navegar al proyecto](http://localhost:5173)
