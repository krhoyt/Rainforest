export default class RFIconFlag extends HTMLElement {
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

        :host( [hidden] ) {
          display: none;
        }

        svg {
          box-sizing: border-box;
          display: block;
          fill: none;
          height: 16px;
          stroke: var( --icon-color, #000000 );
          stroke-width: var( --icon-stroke-width, 2px );
          width: 16px;
        }

        .filled {
          fill: var( --icon-color, #000000 );
        }

        .no-stroke {
          stroke: none;
          stroke-width: none;
        }

        .stroke-linejoin-round {
          stroke-linejoin: round;
        }
      </style>
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M1.98999 16V1" class="stroke-linejoin-round"/>
<path d="M2 2.14005C6 4.85005 10 -0.849945 14 1.86006V9.14005C10 6.25005 6 11.7501 2 8.86006" class="stroke-linejoin-round"/>
</svg>

    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );
  }

  // When things change
  _render() {;}

  // Promote properties
  // Values may be set before module load
  _upgrade( property ) {
    if( this.hasOwnProperty( property ) ) {
      const value = this[property];
      delete this[property];
      this[property] = value;
    }
  }

  // Setup
  connectedCallback() {
    this._upgrade( 'hidden' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'hidden'
    ];
  }

  // Observed tag attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  }

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get hidden() {
    return this.hasAttribute( 'hidden' );
  }

  set hidden( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'hidden' );
      } else {
        this.setAttribute( 'hidden', '' );
      }
    } else {
      this.removeAttribute( 'hidden' );
    }
  }  
}

window.customElements.define( 'rf-icon-flag', RFIconFlag );
