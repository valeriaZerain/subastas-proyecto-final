# Proyecto Final: Plataforma de Subastas en Línea

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