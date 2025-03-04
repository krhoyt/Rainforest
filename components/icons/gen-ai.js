export default class RFIconGenAi extends HTMLElement {
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
<path class="stroke-linejoin-round" d="M6.15 10.3649L8 15.0049L9.86 10.3649L14.5 8.50488L9.86 6.65488L8 2.00488L6.15 6.65488L1.5 8.50488L6.15 10.3649Z"  />
<path class="filled no-stroke" d="M2.38 4.915C2.4 4.965 2.45 4.995 2.5 4.995C2.55 4.995 2.62 4.915 2.62 4.915L3.28 3.275L4.92 2.615C4.97 2.595 5 2.545 5 2.495C5 2.445 4.92 2.375 4.92 2.375L3.28 1.715L2.62 0.075C2.58 -0.025 2.42 -0.025 2.38 0.075L1.72 1.715L0.0799942 2.375C0.0299942 2.395 0 2.445 0 2.495C0 2.545 0.0799942 2.615 0.0799942 2.615L1.72 3.275L2.38 4.915Z" />
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

window.customElements.define( 'rf-icon-gen-ai', RFIconGenAi );
