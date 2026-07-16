/**
 * Código para conectar el formulario de contacto de tu sitio con Google Sheets.
 *
 * PASOS PARA INSTALARLO:
 * 1. Ve a https://sheets.google.com y crea una hoja nueva (o usa una existente).
 *    Ponle el nombre que quieras, por ejemplo "Respuestas NCLEX".
 * 2. Dentro de la hoja: Extensiones > Apps Script.
 * 3. Borra el contenido de ejemplo (Code.gs) y pega TODO este archivo.
 * 4. Guarda (icono de disquete o Ctrl+S). Dale un nombre al proyecto si te lo pide.
 * 5. Arriba a la derecha, clic en "Implementar" > "Nueva implementación".
 * 6. En "Seleccionar tipo", elige el ícono de engranaje > "Aplicación web".
 * 7. Configura:
 *      - Descripción: lo que quieras (ej. "Formulario NCLEX")
 *      - Ejecutar como: Yo (tu cuenta)
 *      - Quién tiene acceso: Cualquier usuario
 * 8. Clic en "Implementar". Google te va a pedir autorizar permisos (es tu propio script,
 *    es seguro aceptar). Puede que veas una advertencia de "app no verificada": clic en
 *    "Configuración avanzada" > "Ir a [nombre del proyecto] (no seguro)" > "Permitir".
 * 9. Copia la URL que te da (termina en /exec). Esa es tu SCRIPT_URL.
 * 10. Pégala en index.html donde dice PEGA_AQUI_TU_URL_DE_GOOGLE_APPS_SCRIPT.
 *
 * Nota: cada vez que edites este código y quieras que el cambio se refleje en la URL,
 * tienes que hacer "Implementar" > "Administrar implementaciones" > editar (lápiz) >
 * "Nueva versión" > "Implementar". Si haces una implementación totalmente nueva, la URL
 * cambia y tendrías que actualizarla también en el sitio.
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Respuestas');

  if (!sheet) {
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Respuestas');
    sheet.appendRow(['Fecha', 'Nombre', 'Correo', 'Asunto', 'Mensaje']);
  }

  var data = e.parameter;

  sheet.appendRow([
    new Date(),
    data.nombre || '',
    data.correo || '',
    data.asunto || '',
    data.mensaje || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput('Endpoint activo. Este servicio solo acepta POST desde el formulario.');
}
