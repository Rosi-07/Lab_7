# Convenciones y Estilos de Código

Este documento define las convenciones de estilo a seguir en el código para asegurar consistencia y legibilidad.

---

## 1. Estructura del Código

- Mantener líneas de código cortas (máximo 80-100 caracteres).
- Usar sangrías consistentes: **2 o 4 espacios**, no tabulaciones.
- Separar bloques de código con una línea en blanco.

---

## 2. Nombres de Variables y Métodos

- Usar nombres descriptivos y en inglés.
- Formatos recomendados:
  - Variables: `camelCase` (ejemplo: `totalAmount`).
  - Clases: `PascalCase` (ejemplo: `UserModel`).
  - Constantes: `UPPER_SNAKE_CASE` (ejemplo: `MAX_LIMIT`).
- Evitar abreviaturas o nombres ambiguos.

---

## 3. Comentarios

- Usar comentarios solo cuando sea necesario para explicar lógica compleja.
- Tipos de comentarios:
  - Comentarios de línea: `// Explicación breve`
  - Comentarios de bloque:
    ```csharp
    /*
     * Explicación detallada del método o lógica
     */
    ```

---

## 4. Formato de Código

- Abrir llaves `{` en la misma línea del encabezado (excepto en clases).
- Espacios antes y después de operadores:
  - Ejemplo: `a + b`, no `a+b`.
- Usar comillas dobles (`"`) para cadenas de texto.

---

## 5. Manejo de Errores

- Usar bloques `try-catch` para capturar excepciones.
- Incluir mensajes descriptivos en los errores.
- Evitar capturar excepciones genéricas, usar tipos específicos.

---

## 6. Buenas Prácticas

- Escribir métodos pequeños y especializados (máximo 30-40 líneas).
- Aplicar principios DRY (No te repitas).
- Eliminar código comentado o no usado.
- Usar herramientas de linters para mantener consistencia en el estilo.

---

Siguiendo estas convenciones, nuestro código será más legible, mantenible y profesional.
