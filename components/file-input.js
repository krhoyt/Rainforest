export default class RFFileInput extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
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

        button {
          align-items: center;
          background: none;
          border: none;
          border: solid 2px #0972d3;
          border-radius: 16px;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          gap: 8px;
          margin: 0;
          padding: 4px 20px 4px 20px;
        }

        input {
          display: none;
        }


        span {
          color: #0972d3;
          cursor: pointer;
          flex-basis: 0;
          flex-grow: 1;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
        }

        path {
          fill: none;
          stroke: #0972d3;
          stroke-width: 2px;
        }

        path:first-of-type {
          stroke-linejoin: round;
        }

        button:hover {
          background-color: #f2f8fd;
          border: solid 2px #033160;
        }

        button:hover path {
          stroke: #033160;
        }

        button:hover span {
          color: #033160;
        }                

        svg {
          cursor: pointer;
          height: 16px;
          margin-left: -4px;
          min-width: 16px;
          width: 16px;
        }

        :host( [variant=icon] ) button,
        :host( :empty ) button {
          height: 32px;
          justify-content: center;
          padding: 0;
          width: 32px;
        }

        :host( [variant=icon] ) svg,
        :host( :empty ) svg {        
          margin-left: auto;
        }

        :host( [variant=icon] ) button span,
        :host( :empty ) button span {        
          display: none;
        }

        :host( [variant=icon] ) button {
          background: none;
          border: none;
          width: 28px;
        }        

        :host( [variant=icon] ) path {
          stroke: #424650;
        }

        :host( [variant=icon] ) button:hover path {
          stroke: #0f141a;
        }        
      </style>
      <button part="button" type="button">
        <svg part="icon">
          <path d="M1 1h14M13 10 8 5l-5 5M8 6v9"></path>
        </svg>
        <span part="label">
          <slot></slot>
        </span>
      </button>
      <input type="file">
    `;

    // Properties
    this._value = [];

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$button.addEventListener( 'click', () => this.$input.click() );
    this.$input = this.shadowRoot.querySelector( 'input' );     
    this.$input.addEventListener( 'change', ( evt ) => {
      this.value = evt.currentTarget.files;
      this.dispatchEvent( new CustomEvent( 'rf-change', {
        detail: {
          value: this.value
        }
      } ) );
    } );   
    this.$label = this.shadowRoot.querySelector( 'span' );
  }

  focus() {
    this.$input.focus();
  }

   // When attributes change
  _render() {
    this.$input.accept = this.accept === null ? '' : this.accept;
    this.$input.multiple = this.multiple;
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
    this._upgrade( 'accept' );                    
    this._upgrade( 'hidden' );                    
    this._upgrade( 'invalid' );                     
    this._upgrade( 'multiple' );                        
    this._upgrade( 'value' );            
    this._upgrade( 'variant' );                
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'accept',
      'hidden',
      'invalid',
      'multiple',
      'variant'
    ];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  } 

  // Properties
  // Not reflected
  // Array, Date, Object, null
  get value() {
    return this._value.length === 0 ? null : this._value;
  }
  
  set value( files ) {
    this._value = files === null ? [] : [... files];
  }  

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get accept() {
    if( this.hasAttribute( 'accept' ) ) {
      return this.getAttribute( 'accept' );
    }

    return null;
  }

  set accept( value ) {
    if( value !== null ) {
      this.setAttribute( 'accept', value );
    } else {
      this.removeAttribute( 'accept' );
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

  get invalid() {
    return this.hasAttribute( 'invalid' );
  }

  set invalid( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'invalid' );
      } else {
        this.setAttribute( 'invalid', '' );
      }
    } else {
      this.removeAttribute( 'invalid' );
    }
  }

  get multiple() {
    return this.hasAttribute( 'multiple' );
  }

  set multiple( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'multiple' );
      } else {
        this.setAttribute( 'multiple', '' );
      }
    } else {
      this.removeAttribute( 'multiple' );
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

window.customElements.define( 'rf-file-input', RFFileInput );
