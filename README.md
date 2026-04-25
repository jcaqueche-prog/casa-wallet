# Proyecto nuevo de casa

Aplicacion web simple para registrar y controlar gastos del hogar.

## Incluye

- Registro de gastos con descripcion, monto, fecha, categoria, metodo y nota.
- Presupuesto mensual configurable.
- Resumen automatico de gasto total, disponible y promedio.
- Filtros por categoria y buscador.
- Guardado local en el navegador con `localStorage`.
- Configuracion base para publicar en GitHub y Render.

## Como usarla localmente

1. Abre `index.html` en tu navegador.
2. Define tu presupuesto mensual.
3. Agrega cada gasto del hogar.
4. Usa los filtros para revisar informacion rapidamente.

## Publicar en GitHub

Si esta carpeta sera tu repositorio, sube el contenido de `proyecto nuevo de casa` a un repo nuevo.

Comandos sugeridos:

```bash
git init
git add .
git commit -m "Primer version de app de gastos del hogar"
git branch -M main
git remote add origin TU_URL_DE_GITHUB
git push -u origin main
```

## Publicar en Render

Segun la documentacion oficial de Render para sitios estaticos y Blueprints, el proyecto ya incluye un archivo `render.yaml` para desplegarlo como static site.

Pasos:

1. Sube este proyecto a GitHub.
2. En Render, crea un nuevo servicio desde el repositorio.
3. Render detectara el archivo `render.yaml`.
4. Acepta la configuracion y despliega.

Configuracion incluida:

- Tipo de servicio: static site (`type: web`, `runtime: static`)
- Rama sugerida: `main`
- Publicacion desde la raiz del proyecto
- Auto deploy en cada commit

## Archivos principales

- `index.html`: estructura de la interfaz.
- `styles.css`: estilos visuales y responsive.
- `app.js`: logica de la app y persistencia local.
- `render.yaml`: configuracion para Render.
- `.gitignore`: archivos locales a ignorar.
