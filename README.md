# Portfolio — EloRC4

Portfolio personal de desarrollador web full stack. Construido a mano con HTML, CSS y JavaScript, sin frameworks ni proceso de build: lo que hay en el repositorio es exactamente lo que se sirve.

## Características

- Tema oscuro/claro con persistencia y respeto de la preferencia del sistema.
- Demos en vivo de los proyectos incrustadas bajo demanda (los sitios externos solo se cargan si el visitante lo pide).
- Vídeo de demostración del panel de administración de Muebles C Palma grabado sobre la aplicación real.
- Accesible: HTML semántico, navegación por teclado, `prefers-reduced-motion`, contraste cuidado.
- Sin dependencias: una sola petición de fuente tipográfica y cero JavaScript de terceros.

## Despliegue (GitHub Pages)

El sitio se publica automáticamente con cada push:

1. Crea el repositorio `EloRC4.github.io` en GitHub.
2. Conecta este directorio y sube el contenido:

   ```bash
   git remote add origin https://github.com/EloRC4/EloRC4.github.io.git
   git push -u origin main
   ```

3. En *Settings → Pages*, comprueba que la fuente es la rama `main` (raíz).
4. El portfolio queda publicado en `https://elorc4.github.io` y se actualiza solo con cada commit.

## Estructura

```
├── index.html          Página única del portfolio
├── css/styles.css      Sistema de diseño (tokens, temas, layout)
├── js/main.js          Tema, scroll-spy, animaciones, embeds
├── assets/             Imágenes de proyectos y certificaciones
└── videos/             Vídeos de demostración
```
