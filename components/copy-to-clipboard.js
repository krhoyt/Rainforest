export default class RFCopyToClipboard extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          align-items: center;
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: row;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        button {
          align-items: center;
          background: none;
          border: none;
          border-style: var( --copy-button-border-style, solid );
          border-width: var( --copy-button-border-width, 2px );2px;
          border-color: var( --copy-button-border-color, #006ce0 );
          border-radius: var( --copy-button-border-radius, 20px );
          box-sizing: border-box;          
          cursor: pointer;
          display: flex;
          flex-direction: row;
          height: 32px;
          margin: 0;
          outline: none;
          padding: 4px 20px 4px 20px;
          -webkit-tap-highlight-color: transparent;
        }

        p {
          box-sizing: border-box;
          color: #0f141a;
          cursor: default;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          text-rendering: optimizeLegibility;
        }        

        path {
          fill: none;
          stroke: #006ce0;
          stroke-linejoin: round;
          stroke-width: 2px;
        }

        span {
          box-sizing: border-box;
          color: #006ce0;
          cursor: pointer;
          flex-basis: 0;
          flex-grow: 1;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 700;
          line-height: 20px;
          text-rendering: optimizeLegibility;
        }

        button:hover {
          background-color: #f0fbff;
          border-color: #002b66;
        }

        button:active {
          background-color: #d1f1ff;
        }

        button:hover path {
          stroke: #002b66;
        }

        button:hover span {
          color: #002b66;
        }

        svg {
          box-sizing: border-box;
          height: 16px;
          margin: 0 8px 0 -4px;
          width: 16px;
        }

        :host( :not( [copy-button-text] ) ) button {
          justify-content: center;
          padding: 4px;
          width: 32px;
        }

        :host( :not( [copy-button-text] ) ) span {
          display: none;
        }

        :host( :not( [copy-button-text] ) ) svg {
          margin: 0;
        }        


        :host( [variant=inline] ) {
          gap: 4px;
        }

        :host( [variant=inline] ) button {
          border: none;
          border-radius: 0;
          height: 20px;
          padding: 0;
          width: 24px;
        }

        :host( [variant=icon] ) button:active,
        :host( [variant=icon] ) button:hover,               
        :host( [variant=inline] ) button:active,
        :host( [variant=inline] ) button:hover {                  
          background: none;
        }

        :host( [variant=icon] ) span,
        :host( [variant=inline] ) span {
          display: none;
        }        

        :host( :not( [variant=inline] ) ) p {
          display: none;
        }

        :host( [variant=icon] ) button {
          border: none;
          border-radius: 0;
          padding: 0;
          width: 28px;
        }

        :host( [variant=icon] ) button path {
          stroke: #424650;
        }        

        :host( [variant=icon] ) button:hover path {
          stroke: #0f141a;
        }         
      </style>
      <button part="button" type="button">
        <svg part="vector">
          <path d="M15 5H5v10h10V5Z"></path>
          <path d="M13 1H1v11"></path>        
        </svg>
        <span part="label"></span>
      </button>
      <p part="inline"></p>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$button.addEventListener( 'click', () => {
      navigator.clipboard.writeText( this.textToCopy );
    } );
    this.$inline = this.shadowRoot.querySelector( 'p' );
    this.$label = this.shadowRoot.querySelector( 'span' );
  }

   // When attributes change
  _render() {
    this.$label.textContent = this.copyButtonText === null ? '' : this.copyButtonText;
    this.$inline.textContent = this.textToCopy === null ? '' : this.textToCopy;
  }

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
    this._upgrade( 'copyButtonText' );           
    this._upgrade( 'hidden' );        
    this._upgrade( 'textToCopy' );        
    this._upgrade( 'variant' );            
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'copy-button-text',
      'hidden',
      'text-to-copy',
      'variant'
    ];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  } 

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get copyButtonText() {
    if( this.hasAttribute( 'copy-button-text' ) ) {
      return this.getAttribute( 'copy-button-text' );
    }

    return null;
  }

  set copyButtonText( value ) {
    if( value !== null ) {
      this.setAttribute( 'copy-button-text', value );
    } else {
      this.removeAttribute( 'copy-button-text' );
    }
  }

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

  get textToCopy() {
    if( this.hasAttribute( 'text-to-copy' ) ) {
      return this.getAttribute( 'text-to-copy' );
    }

    return null;
  }

  set textToCopy( value ) {
    if( value !== null ) {
      this.setAttribute( 'text-to-copy', value );
    } else {
      this.removeAttribute( 'text-to-copy' );
    }
  }

  get variant() {
    if( this.hasAttribute( 'variant' ) ) {
      return this.getAttribute( 'variant' );
    }

    return null;
  }

  set variant( value ) {
    if( value !== null ) {
      this.setAttribute( 'variant', value );
    } else {
      this.removeAttribute( 'variant' );
    }
  }  
}

window.customElements.define( 'rf-copy-to-clipboard', RFCopyToClipboard );
