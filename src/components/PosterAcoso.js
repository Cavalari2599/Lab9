/**
 * <poster-acoso> — Web Component
 *
 * Atributos:
 *   badge1          → Primer badge (ej. "LA SEDE")
 *   badge2          → Segundo badge (ej. "TE")
 *   texto-acompana  → Texto grande junto al badge2 (ej. "ACOMPAÑA")
 *   linea-respeto   → Subtítulo línea 1 (ej. "El respeto no se negocia")
 *   linea-para      → Subtítulo línea 2 (ej. "¡Pará ya de acosar!")
 *   qr-texto        → Texto sobre el QR (acepta \n)
 *   qr-src          → Ruta de la imagen QR
 *   foto-src        → Ruta de la foto principal
 *   logo-ucr        → Texto logo UCR (ej. "UCR")
 *   libre-linea1    → Primera línea logo libre (ej. "UCR")
 *   libre-linea2    → Resto del logo libre (ej. "LIBRE DE\nACOSO\nSEXUAL")
 *   sg-letras       → Siglas sede (ej. "SG")
 *   sede-nombre     → Nombre de la sede (ej. "Sede de\nGuanacaste")
 *   link-to         → href del botón "← Volver" (ej. "index.html")
 *
 * Ejemplo de uso:
 *   <poster-acoso
 *     badge1="LA SEDE"
 *     badge2="TE"
 *     texto-acompana="ACOMPAÑA"
 *     linea-respeto="El respeto no se negocia"
 *     linea-para="¡Pará ya de acosar!"
 *     qr-texto="Si necesitás ayuda,\nescaneá este QR:"
 *     qr-src="./assets/qr.png"
 *     foto-src="./assets/poster.png"
 *     logo-ucr="UCR"
 *     libre-linea1="UCR"
 *     libre-linea2="LIBRE DE\nACOSO\nSEXUAL"
 *     sg-letras="SG"
 *     sede-nombre="Sede de\nGuanacaste"
 *     link-to="index.html"
 *   ></poster-acoso>
 */

class PosterAcoso extends HTMLElement {

  // ── Atributos observados ──────────────────────────────────────────────────
  static get observedAttributes() {
    return [
      "badge1", "badge2", "texto-acompana",
      "linea-respeto", "linea-para",
      "qr-texto", "qr-src", "foto-src",
      "logo-ucr", "libre-linea1", "libre-linea2",
      "sg-letras", "sede-nombre", "link-to"
    ];
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  connectedCallback() {
    this.render();
  }

  // ── Getters ───────────────────────────────────────────────────────────────
  get badge1()         { return this.getAttribute("badge1")         ?? "LA SEDE"; }
  get badge2()         { return this.getAttribute("badge2")         ?? "TE"; }
  get textoAcompana()  { return this.getAttribute("texto-acompana") ?? "ACOMPAÑA"; }
  get lineaRespeto()   { return this.getAttribute("linea-respeto")  ?? ""; }
  get lineaPara()      { return this.getAttribute("linea-para")     ?? ""; }
  get qrTexto()        { return this.getAttribute("qr-texto")       ?? ""; }
  get qrSrc()          { return this.getAttribute("qr-src")         ?? ""; }
  get fotoSrc()        { return this.getAttribute("foto-src")       ?? ""; }
  get logoUcr()        { return this.getAttribute("logo-ucr")       ?? "UCR"; }
  get libreLinea1()    { return this.getAttribute("libre-linea1")   ?? "UCR"; }
  get libreLinea2()    { return this.getAttribute("libre-linea2")   ?? ""; }
  get sgLetras()       { return this.getAttribute("sg-letras")      ?? "SG"; }
  get sedeNombre()     { return this.getAttribute("sede-nombre")    ?? ""; }
  get linkTo()         { return this.getAttribute("link-to")        ?? "#"; }

  // Convierte \n en <br> para atributos multilínea
  #br(str) { return str.replace(/\\n|\n/g, "<br>"); }

  // ── Render ────────────────────────────────────────────────────────────────
  render() {
    this.setHTMLUnsafe(/* html */`
      <div class="poster">

        <div class="titulo-wrap">
          <div class="exclamacion izq">¡</div>

          <div class="titulo-bloque">
            <div class="linea-1">
              <span class="badge morado">${this.badge1}</span>
            </div>
            <div class="linea-2">
              <span class="badge azul">${this.badge2}</span>
              <span class="texto-acompana">${this.textoAcompana}</span>
            </div>
          </div>

          <div class="exclamacion der">!</div>
        </div>

        <div class="subtitulo">
          <p class="linea-respeto">${this.lineaRespeto}</p>
          <p class="linea-para">${this.lineaPara}</p>
        </div>

        <div class="qr-wrap">
          <p class="qr-texto">${this.#br(this.qrTexto)}</p>
          <img class="qr-img" src="${this.qrSrc}" alt="Código QR de ayuda">
        </div>

        <div class="imagen-wrap">
          <img src="${this.fotoSrc}" alt="Imagen del afiche" class="foto">
        </div>

        <div class="footer">
          <div class="logo-ucr">${this.logoUcr}</div>
          <div class="separador"></div>

          <div class="logo-libre">
            <span class="libre-titulo">${this.libreLinea1}</span>
            <span class="libre-sub">${this.#br(this.libreLinea2)}</span>
          </div>

          <div class="separador"></div>

          <div class="logo-sede">
            <span class="sg">${this.sgLetras}</span>
            <span class="sede-texto">${this.#br(this.sedeNombre)}</span>
          </div>
        </div>

      </div>

      <a href="${this.linkTo}" class="btn-volver">← Volver</a>
    `);
  }
}

customElements.define("poster-acoso", PosterAcoso);