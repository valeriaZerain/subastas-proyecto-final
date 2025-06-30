# Proyecto Final: Plataforma de Subastas en Línea

### US2: Proceso de Puja

Como usuario registrado,
quiero poder ofertar en productos activos,
para intentar ganar la subasta.


-   Las pujas se actualizan en tiempo real para todos los usuarios conectados (simulado con SSE).

-   Al finalizar el cronómetro, se muestra el ganador y el monto final.

![alt text](image-1.png)

![alt text](image-2.png)

# US3: Historial y Resultados

Como usuario registrado,
quiero ver el historial de mis subastas y las ofertas realizadas,
para poder revisar mis actividades pasadas.

-   Se muestra el ganador y estadísticas luego de cada subasta.

## Requerimientos Técnicos

-   Hooks y Estado

-   Zustand: para manejar el estado global de subastas y pujas

-   useMemo, useCallback: para lógica de pujas eficientes

-   Custom hook: useAuction() con funciones para pujar, registrar, cancelar, etc.

-   Manejo de instancias para el json-server y el sse

### UI

-   Render Props para cada ítem subastado

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
| 3   | - Implementar lógica de pujas (US2)- Simulación SSE- Validaciones de oferta          |
| 4   | - Historial por usuario (US3)                                                        |
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

## Features para nota Adicional 

### US-EXTRA: Chat en Tiempo Real entre Postores (Funcionalidad Extra)

Como usuario registrado,quiero poder enviar y recibir mensajes en una sala de subasta,para interactuar en tiempo real con otros participantes mientras pujamos.

-   Cada producto en subasta tendrá su propia sala de chat asociada.

-   Los mensajes se muestran en tiempo real utilizando SSE o WebSockets (simulado).

-   Cada mensaje incluye: nombre del remitente, hora y contenido.

-   El input de mensaje incluye validación de texto no vacío.

-   El historial de mensajes puede almacenarse en JSON Server o mantenerse en memoria.

-   El chat se muestra en un panel lateral o modal al ver una subasta activa.