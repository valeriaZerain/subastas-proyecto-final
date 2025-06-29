# Proyecto Final: Plataforma de Subastas en Línea

## Descripción General

Esta aplicación simula una plataforma de subastas donde los usuarios pueden participar en pujas por distintos artículos dentro de un tiempo límite. 

Cada subasta está asociada a un producto con imagen, descripción, precio base y una duración definida. 

Los usuarios registrados pueden realizar ofertas en tiempo real y visualizar los resultados cuando la subasta finaliza.

## Requerimientos Funcionales

A continuación se describen las historias de usuario (User Stories) que deberás implementar en esta aplicación. Cada historia representa un requerimiento funcional que debe estar completamente resuelto para cumplir con los criterios del proyecto.

Estas historias están pensadas para ser desarrolladas **por un estudiante de manera individual** en un plazo de una semana (5 dias). **(Proyecto Individual)**


### Registro e Identificación de Usuarios

-   Registro simple con nombre de usuario y avatar (opcional pts extras para el avatar).

-   No se requiere autenticación avanzada con contraseña.

-   El rol (usuario o admin) se define al momento del registro mediante una opción de selección.

-   Los usuarios y sus roles se mantienen persistentes en JSON Server (/usuarios.json).

### US1: Subasta de Productos

Como usuario visitante,
quiero ver una lista de productos disponibles para subasta con sus detalles,
para poder decidir en cuál me interesa participar.

-   El sistema carga los productos desde un backend simulado (JSON Server).

-   Cada producto contiene: título, descripción, imagen, precio base y duración (en segundos).

- Cada subasta tiene un cronómetro visible.

- Se agrupan en 3 Subastas actuales, Subastas Proximas y Subastas Pasadas.

![alt text](image.png)

### US2: Proceso de Puja

Como usuario registrado,
quiero poder ofertar en productos activos,
para intentar ganar la subasta.

-   La oferta debe ser mayor al valor actual para ser válida.

-   Las pujas se actualizan en tiempo real para todos los usuarios conectados (simulado con SSE).

-   Si una oferta no es válida, se notifica al usuario con una alerta.

-   Al finalizar el cronómetro, se muestra el ganador y el monto final.

-   Cada usuario puede ofertar una cantidad mayor al precio actual.
![alt text](image-1.png)

![alt text](image-2.png)

# US3: Historial y Resultados

Como usuario registrado,
quiero ver el historial de mis subastas y las ofertas realizadas,
para poder revisar mis actividades pasadas.

-   El sistema registra quién ofertó, cuánto y cuándo.

-   Se muestra el ganador y estadísticas luego de cada subasta.

-   Los usuarios pueden revisar el historial completo de subastas anteriores.

-   Se registra el historial de pujas por producto, incluyendo usuario, hora y monto.


### US4: Gestión de Productos (Administrador)

Como administrador,
quiero crear, editar y eliminar productos de subasta,
para poder gestionar qué artículos están disponibles.

-   CRUD completo de productos desde un panel exclusivo para el administrador.

-   Protegido mediante Context y guards de ruta.

-   CRUD completo de productos de subasta: crear, editar, eliminar.

-   Se almacena en products.json (JSON-server)

-   Los administradores pueden ser definidos estáticamente o mediante un CRUD de usuarios.

### US5: Gestion de Usuarios(Administrador)

Como administrador,
quiero crear, editar y eliminar usuarios,
para poder gestionar qué artículos están disponibles.

-   CRUD completo de usuarios.

-   Acceso exclusivo con rol admin.

-   Protegido mediante Context y guards de ruta.

-   CRUD completo de usuarios de subasta: crear, editar, eliminar.

-   Panel exclusivo accesible solo por usuarios con rol admin.
-   datos persistentes en usuarios.json

## Requerimientos Técnicos

-   Hooks y Estado

-   useContext: para manejar la sesión del usuario

-   Zustand: para manejar el estado global de subastas y pujas

-   useEffect + useRef: para temporizador de subasta y actualizaciones

-   useMemo, useCallback: para lógica de pujas eficientes

-   Custom hook: useAuction() con funciones para pujar, registrar, cancelar, etc.
  
-   Compound Component: Para la Card del Producto.

-   Manejo de instancias para el json-server y el sse

### Formulario y Validación

-   Formularios controlados con Formik + Yup

-   Validación de formato, rango de monto, reglas de negocio

### UI

-   Interfaz moderna con MUI

-   Tablero de subastas en tiempo real

-   Componente visual del cronómetro

-   Snackbar para confirmaciones o errores

-   Render Props para cada ítem subastado

-   Internacionalización

    -   i18n con react-i18next para soporte en múltiples idiomas

### Manejo de Errores

-   Implementación de ErrorBoundary para manejar errores en renderizado de subastas o conexión

### Arquitectura del Proyecto Sugerida
```
/src
  /context
    UserContext.jsx
  /store
    useAuctionStore.js
  /hooks
    useAuction.js
  /components
    AuctionItem.jsx
    Timer.jsx
    BidForm.jsx
    HistoryTable.jsx
    UserTable.jsx
  /pages
    Home.jsx
    AuctionRoom.jsx
    AdminPanel.jsx
    UserAdmin.jsx
  /i18n
  /api
```

### Cronograma Sugerido (5 días)

| Día | Actividades principales                                                              |
| --- | ------------------------------------------------------------------------------------ |
| 1   | - Setup del proyecto, JSON Server y Context- Registro de usuarios + selección de rol |
| 2   | - Implementar US1 (lista de productos + cronómetro)- CRUD de productos (US4)         |
| 3   | - Implementar lógica de pujas (US2)- Simulación SSE- Validaciones de oferta          |
| 4   | - Historial por usuario (US3)- CRUD de usuarios con guard (US5)                      |
| 5   | - Estilizar con MUI- Agregar i18n + ErrorBoundary- README + video + revisión final   |


### Rubrica de Evaluacion

| Criterio                         | Puntaje |
| -------------------------------- | ------- |
| Subasta funcional con cronómetro | 25%     |
| SSE                              | 15%     |
| Validaciones efectivas           | 10%     |
| UI clara con MUI                 | 10%     |
| Estado global bien usado         | 10%     |
| Lógica en hooks                  | 10%     |
| Manejo de errores                | 10%     |
| Documentación (README + JSON)    | 10%     |

### Entregables

-   Código completo (/src, db.json, usuarios.json, etc.). Repositorio Github

-   Video demostrativo (máx. 5 minutos).

-   README.md con instrucciones y descripción clara del proyecto.

-   JSON Server funcionando con datos iniciales.

## Features para nota Adicional 

### US-EXTRA: Chat en Tiempo Real entre Postores (Funcionalidad Extra)

Como usuario registrado,quiero poder enviar y recibir mensajes en una sala de subasta,para interactuar en tiempo real con otros participantes mientras pujamos.

-   Cada producto en subasta tendrá su propia sala de chat asociada.

-   Los mensajes se muestran en tiempo real utilizando SSE o WebSockets (simulado).

-   Cada mensaje incluye: nombre del remitente, hora y contenido.

-   El input de mensaje incluye validación de texto no vacío.

-   El historial de mensajes puede almacenarse en JSON Server o mantenerse en memoria.

-   El chat se muestra en un panel lateral o modal al ver una subasta activa.