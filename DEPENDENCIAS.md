# Dependencias del Proyecto `okta-oidc-una`

Este documento describe las dependencias utilizadas en el proyecto, su propósito y versión.

---

## Información del Proyecto

- **Nombre**: okta-oidc-una
- **Versión**: 1.0.0
- **Autor**: UNA
- **Licencia**: MIT
- **Script principal**: `server.js`
- **Comandos disponibles**:
  - `npm start`: Inicia el servidor.
  - `npm test`: Ejecuta las pruebas utilizando Mocha.

---

## Dependencias

### 1. **@okta/oidc-middleware** (`v0.0.6`)

Middleware para manejar la autenticación OIDC (OpenID Connect) con Okta. Facilita la integración con Okta para proteger rutas y gestionar sesiones.

### 2. **consolidate** (`v^0.15.1`)

Una librería que unifica varios motores de plantillas para Express. Simplifica la renderización de vistas utilizando diferentes motores de plantillas.

### 3. **dotenv** (`v^16.4.5`)

Carga variables de entorno desde un archivo `.env` al proceso de Node.js. Ayuda a gestionar configuraciones sensibles como claves de API.

### 4. **express** (`v^4.18.2`)

Un framework web rápido y minimalista para Node.js. Utilizado para crear y gestionar el servidor del proyecto.

### 5. **express-openid-connect** (`v^2.16.0`)

Middleware para integrar autenticación OpenID Connect en aplicaciones Express, compatible con proveedores como Okta.

### 6. **express-session** (`v^1.15.6`)

Gestor de sesiones para Express. Almacena datos de sesión del usuario en el lado del servidor, como cookies o identificadores.

### 7. **mocha** (`v^10.7.3`)

Un framework de pruebas para JavaScript. Utilizado para escribir y ejecutar pruebas unitarias en el proyecto.

### 8. **socket.io** (`v^1.7.4`)

Una librería para manejar comunicación en tiempo real mediante WebSockets y otros protocolos. Utilizado para implementar funciones en tiempo real en el servidor y cliente.

### 9. **swig** (`v^1.4.2`)

Un motor de plantillas para Node.js y navegadores basado en HTML. Permite generar vistas dinámicas en aplicaciones web.

---

## Cómo Instalar las Dependencias

Ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install
```
