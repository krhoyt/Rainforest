export default class RFIconMicrophoneOff extends HTMLElement {
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
<path d="M3 15.01H13" />
<path d="M8 15V12" />
<path d="M6.6001 8.43002C6.9601 8.79002 7.4601 9.02002 8.0101 9.02002C9.1101 9.02002 10.0101 8.12002 10.0101 7.02002V5.02002L6.6001 8.43002Z" class="filled"/>
<path d="M13 7.01001C13 9.77001 10.76 12.01 8 12.01C6.72 12.01 5.54992 11.53 4.66992 10.73" />
<path d="M3 12.01L13 2.01001" />
<path d="M8.01001 1.01001C6.91001 1.01001 6.01001 1.91001 6.01001 3.01001V4.68001L9.24001 1.45001C8.90001 1.18001 8.47001 1.01001 8.01001 1.01001Z" class="filled"/>
<path d="M3.00998 7.01001C3.00998 7.49219 2.84766 8.27344 3.33998 8.76001" />
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

window.customElements.define( 'rf-icon-microphone-off', RFIconMicrophoneOff );
