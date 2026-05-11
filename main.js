/**
 * main.js — Punto de entrada ESM
 *
 * 1. Importa los Web Components (registro automático con customElements.define)
 * 2. Carga anuncios.json con import() dinámico
 * 3. Inyecta los atributos en cada componente ya montado en el DOM
 */

import "./components/SignalUcr.js";
import "./components/PosterAcoso.js";

// ── Carga datos del JSON y configura los componentes ──────────────────────
const data = await import("./data/anuncios.json", { with: { type: "json" } });
const { signal, poster } = data.default;

// ── <signal-ucr> ──────────────────────────────────────────────────────────
const $signal = document.querySelector("signal-ucr");
if ($signal) {
  $signal.setAttribute("items",       JSON.stringify(signal.items));
  $signal.setAttribute("footer-text", signal.footer);
  $signal.setAttribute("link-to",     `${signal.linkTo}.html`);
}

// ── <poster-acoso> ────────────────────────────────────────────────────────
const $poster = document.querySelector("poster-acoso");
if ($poster) {
  $poster.setAttribute("badge1",         poster.badge1);
  $poster.setAttribute("badge2",         poster.badge2);
  $poster.setAttribute("texto-acompana", poster.textoAcompana);
  $poster.setAttribute("linea-respeto",  poster.lineaRespeto);
  $poster.setAttribute("linea-para",     poster.linea_para);
  $poster.setAttribute("qr-texto",       poster.qrTexto);
  $poster.setAttribute("qr-src",         poster.qrSrc);
  $poster.setAttribute("foto-src",       poster.fotoSrc);
  $poster.setAttribute("logo-ucr",       poster.logoUcr);
  $poster.setAttribute("libre-linea1",   poster.libreLinea1);
  $poster.setAttribute("libre-linea2",   poster.libreLinea2);
  $poster.setAttribute("sg-letras",      poster.sgLetras);
  $poster.setAttribute("sede-nombre",    poster.sedeNombre);
  $poster.setAttribute("link-to",        `${poster.linkTo}.html`);
}