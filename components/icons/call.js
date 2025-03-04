export default class RFIconCall extends HTMLElement {
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
<path d="M13.99 7.08252C13.99 4.32252 11.75 2.08252 8.98999 2.08252" class="stroke-linejoin-round"/>
<path d="M11.07 10.0025C10.47 10.5825 9.51999 10.6125 8.92999 10.0225L6.04999 7.1425C5.45999 6.5525 5.45999 5.6025 6.04999 5.0225C6.56999 4.5025 6.56999 3.6625 6.04999 3.1425L5.19998 2.2925C4.80998 1.9025 4.17998 1.9025 3.78998 2.2925L3.41 2.6725C2.5 3.5825 2 4.8025 2 6.0825C2 7.3625 2.51 8.5925 3.41 9.4925L6.57999 12.6625C7.48999 13.5725 8.70999 14.0725 9.98999 14.0725C11.27 14.0725 12.5 13.5625 13.4 12.6625L13.78 12.2825C14.17 11.8925 14.17 11.2625 13.78 10.8725L12.93 10.0225C12.42 9.5125 11.59 9.5025 11.07 10.0025Z" class="stroke-linejoin-round"/>
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

window.customElements.define( 'rf-icon-call', RFIconCall );
