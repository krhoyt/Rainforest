export default class RFIconBackward10Seconds extends HTMLElement {
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
<path d="M5.94997 14.01H4.98997C4.42997 14.01 3.96997 13.55 3.96997 12.99V10.03C3.96997 9.47001 4.41997 9.02001 4.97997 9.01001H5.93997C6.49997 9.01001 6.95997 9.46001 6.95997 10.03V12.99C6.95997 13.55 6.49997 14.01 5.93997 14.01H5.94997Z" class="stroke-linejoin-round"/>
<path d="M1 9V14" class="stroke-linecap-square" />
<path d="M1 0V5H6" class="stroke-linejoin-round" />
<path d="M9.97593 15C12.8862 14.0994 15 11.3772 15 8.16374C15 4.20322 11.8038 1 7.85193 1C5.08806 1 2.68895 2.57421 1.5 4.87539" class="stroke-linejoin-round"/>
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

window.customElements.define( 'rf-icon-backward-10-seconds', RFIconBackward10Seconds );
