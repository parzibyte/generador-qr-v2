import './style.css'
import QRious from 'qrious';
const $contenido = document.querySelector("#contenido");
const $colorFondo = document.querySelector("#colorFondo");
const $colorFrente = document.querySelector("#colorFrente");
const $nivelRecuperacion = document.querySelector("#nivelRecuperacion");
const $tamaño = document.querySelector("#tamaño");
const $formatoSalida = document.querySelector("#formatoSalida");
const $descargar = document.querySelector("#descargar");
const $canvas = document.querySelector("#canvas");
let apuntadorGlobalAQr = new QRious({
  element: $canvas,
});

const refrescarQr = () => {
  apuntadorGlobalAQr.set({
    value: $contenido.value,
    background: $colorFondo.value,
    foreground: $colorFrente.value,
    level: $nivelRecuperacion.value,
    size: $tamaño.valueAsNumber,
  });
}
refrescarQr();
[$contenido, $colorFondo, $colorFrente, $nivelRecuperacion, $tamaño].forEach(elemento => elemento.oninput = refrescarQr);

$descargar.onclick = () => {
  const formato = $formatoSalida.value;
  let extension = "";
  if (formato === "image/jpeg") {
    extension = "jpg";
  } else {
    extension = formato.substring(formato.indexOf("/") + 1)
  }
  const contenidoCanvasComoBase64 = apuntadorGlobalAQr.toDataURL(formato);
  const enlace = document.createElement('a');
  enlace.download = "Qr." + extension;
  enlace.href = contenidoCanvasComoBase64;
  enlace.click();
}