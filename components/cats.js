export default class RainforestCats extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-block;
          position: relative;
        }

        img {
          box-sizing: border-box;
          display: block;
          cursor: var( --cat-cursor, default );
          height: var( --cat-height, 100px );
          object-fit: var( --cat-object-fit, cover );
          width: var( --cat-width, 100px );
        }
      </style>
      <img part="image" />
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$image = this.shadowRoot.querySelector( 'img' );

    // Setup
    fetch( 'https://api.thecatapi.com/v1/images/search' )
    .then( ( response ) => response.json() )
    .then( ( cat ) => {
      this.$image.src = cat[0].url;
    } );    
  }
}

window.customElements.define( 'rf-cats', RainforestCats );
