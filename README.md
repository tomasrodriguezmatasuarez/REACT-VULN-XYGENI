# REACT-VULN-XYGENI

Aplicación React creada para demostrar la capacidad de detección de Xygeni
sobre vulnerabilidades típicas en front-end JavaScript/React.

## Estructura principal

- `package.json` – dependencias (incluye librerías vulnerables, paquetes sospechosos y licencias problemáticas).
- `.env` – variables de entorno con claves en texto claro.
- `public/index.html` – plantilla HTML básica.
- `src/`
  - `index.js` – punto de entrada de React.
  - `App.js` – componente principal con XSS, exposición de datos sensibles y uso de HTTP inseguro.
  - `config.js` – constantes con credenciales hardcodeadas.
  - `api.js` – cliente axios sobre HTTP con token embebido.

## Vulnerabilidades cubiertas (solo React)

1. **Dependencias vulnerables (CVE)** – versiones antiguas de React, react-scripts, axios, lodash.
2. **Paquetes maliciosos** – dependencias ficticias `evil-package` y `shai-hulud` para simular historial de malware.
3. **Librería vulnerable con historial de malware (caso "shai-Hulud")** – dependencia explícita `shai-hulud` en `package.json`.
4. **Exposición de datos sensibles** – secretos mostrados en el UI desde `.env` y `config.js`.
6. **XSS / Falta de validación de entrada** – uso de `dangerouslySetInnerHTML` con input de usuario en `App.js`.
7. **Protocolos inseguros** – llamadas HTTP no cifradas en `api.js` contra `http://api.insecure-example.com`.
8. **Hardcodeo de credenciales** – constantes en `config.js`, `.env` y almacenamiento en `localStorage`.
10. **Licencias de dependencias no permitidas** – inclusión de `ag-grid-enterprise` (requiere licencia comercial).

Este código NO debe usarse en producción.
