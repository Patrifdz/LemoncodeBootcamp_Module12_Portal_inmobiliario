# Módulo 12 - Caso Práctico Portal Inmobiliario - Laboratorio

En este módulo trabajaremos con otra aplicación diferente a la anterior. Vamos a simular un portal inmobiliario, donde mostraremos un listado de propiedades, filtraremos por una serie de campos, mostraremos el detalle y subiremos una nueva.

## Aplicación

Esta aplicación consta de varias páginas que vamos a ir implementando poco a poco.

### Listado de propiedades

**Página con las propiedades disponibles según filtro.**  
En esta página implementaremos:

- Recuperar las propiedades disponibles del servidor.
- Crear mapper para cumplir con el modelo de la vista.
- Recuperar datos maestros del servidor para cargarlos en el filtro.
- Crear datos maestros del cliente para cargarlos en el filtro.
- Recoger valores del filtro.
- Utilizar el filtro para filtrar en el servidor.

### Detalle de propiedad

**Página para visualizar el detalle de una propiedad.**  
En esta página implementaremos:

- Recuperar la propiedad del servidor según el ID de la URL.
- Crear mapper para cumplir con el modelo de la vista.
- Recuperar los valores del formulario de contacto.
- Crear validaciones necesarias de dicho formulario.
- Crear método POST para enviar información de contacto.

La firma que tendría un `PropertyDetail` como modelo de la vista sería:

```javascript
PropertyDetail {
  id,
  title,
  notes,
  price,
  city,
  squareMeter,
  rooms,
  bathrooms,
  locationUrl,
  mainFeatures,
  equipments,
  mainImage,
  images
}
```

### Subir una nueva propiedad

**Página con el formulario para subir una propiedad nueva.**  
En esta página implementaremos:

- Recuperar los valores del formulario de **Datos generales**.
- Crear validaciones necesarias de dicho formulario.
- Recuperar los valores del formulario de **Datos de la vivienda**.
- Crear validaciones necesarias de dicho formulario.
- Recuperar los valores del formulario de **Subir fotos**.
- Crear mapper para cumplir con el modelo de la API.
- Crear método **POST** para enviar información del formulario.

**Sugerencia:**  
Se pueden utilizar los validadores:

- `fonk-array-required-validator` para hacer que un array sea requerido.
- `fonk-is-url-validator` para validar una URL.
