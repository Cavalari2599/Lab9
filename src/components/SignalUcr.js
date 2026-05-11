/**
 * <signal-ucr> — Web Component
 *
 * Atributos:
 *   items        → JSON stringificado con el array de textos de las filas
 *   footer-text  → Texto del pie (ej. "UCR")
 *   link-to      → href del botón "Ir a No Acoso" (ej. "poster.html")
 *
 * Ejemplo de uso:
 *   <signal-ucr
 *     items='["Aulas 5, 6, 7","Apoyo Informático","Servidores"]'
 *     footer-text="UCR"
 *     link-to="poster.html"
 *   ></signal-ucr>
 */

const SVG_FLECHA = /* html */`
  <svg class="flecha" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2.5"
       stroke-linecap="round" stroke-linejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
`;

class SignalUcr extends HTMLElement {

  // ── Atributos observados ──────────────────────────────────────────────────
  static get observedAttributes() {
    return ["items", "footer-text", "link-to"];
  }

  attributeChangedCallback() {
    // Re-renderiza si ya está en el DOM
    if (this.isConnected) this.render();
  }

  connectedCallback() {
    this.render();
  }

  // ── Getters de atributos ──────────────────────────────────────────────────
  get items() {
    try {
      return JSON.parse(this.getAttribute("items") ?? "[]");
    } catch {
      return [];
    }
  }

  get footerText() {
    return this.getAttribute("footer-text") ?? "UCR";
  }

  get linkTo() {
    return this.getAttribute("link-to") ?? "#";
  }

  // ── Render ────────────────────────────────────────────────────────────────
  render() {
    const filas = this.items
      .map((texto, i) => {
        const sinBorde = i === this.items.length - 1
          ? "style='border-bottom:none;'" : "";
        // Maneja saltos de línea en el texto
        const html = texto
          .split("\n")
          .join("<br>");
        return /* html */`
          <div class="item" style="--i:${i}" ${sinBorde}>
            <span>${html}</span>
            ${SVG_FLECHA}
          </div>`;
      })
      .join("");

    this.setHTMLUnsafe(/* html */`
      <style>
        @scope {
          :scope {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
        }
      </style>

      <div class="contenedor">
        ${filas}

        <div class="footer-wrap">
          <svg class="ola" viewBox="0 0 300 50"
               preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C60,50 120,50 150,25
                     C180,0 240,0 300,50 L300,0 L0,0 Z" fill="#1c3872"/>
          </svg>
          <div class="footer">${this.footerText}</div>
        </div>
      </div>

      <a href="${this.linkTo}" class="btn">Ir a No Acoso</a>
    `);
  }
}

customElements.define("signal-ucr", SignalUcr);