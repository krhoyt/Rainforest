import RainforestBox from "./box.js";

export default class RainforestContainer extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          background: var( --color-background-container-content );
          border-radius: var( --border-radius-container );
          box-shadow: var( --shadow-container );
          box-sizing: border-box;
          display: block;
          position: relative;
        }

        :host( [concealed] ) {
          visibility: hidden;
        }

        :host( [hidden] ) {
          display: none;
        } 

        div {
          padding: 4px 20px 20px 20px;
        }

        footer {
          border-top-style: solid;
          border-top-width: 2px;
          border-top-color: var( --color-border-divider-default );
          padding: 12px 20px 12px 20px;
        }

        :host( :not( [footer] ) ) footer {
          display: none;
        }

        :host( :not( [footer] ) ) rf-box[part=footer] {
          display: none;
        }

        ::slotted( rf-header ) {
          padding: 12px 20px 8px 20px;
        }
      </style>
      <slot name="header"></slot>
      <div part="content">
        <slot></slot>
      </div>
      <footer>
        <rf-box part="footer"></rf-box>
        <slot name="footer"></slot>
      </footer>
    `;

    // Private
    this._data = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$footer = this.shadowRoot.querySelector( 'rf-box[part=footer]' );
  }

   // When attributes change
  _render() {
    this.$footer.content = this.footer;
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
    this._upgrade( 'concealed' );        
    this._upgrade( 'counter' );           
    this._upgrade( 'data' );    
    this._upgrade( 'footer' );    
    this._upgrade( 'headingTagOverride' );       
    this._upgrade( 'hidden' );    
    this._upgrade( 'variant' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'concealed',
      'counter',
      'footer',
      'headingtagoverride',
      'hidden',
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
  get data() {
    return this._data;
  }

  set data( value ) {
    this._data = value;
  }

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get concealed() {
    return this.hasAttribute( 'concealed' );
  }

  set concealed( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'concealed' );
      } else {
        this.setAttribute( 'concealed', '' );
      }
    } else {
      this.removeAttribute( 'concealed' );
    }
  }

  get counter() {
    if( this.hasAttribute( 'counter' ) ) {
      return this.getAttribute( 'counter' );
    }

    return null;
  }

  set counter( value ) {
    if( value !== null ) {
      this.setAttribute( 'counter', value );
    } else {
      this.removeAttribute( 'counter' );
    }
  }  
  
  get footer() {
    if( this.hasAttribute( 'footer' ) ) {
      return this.getAttribute( 'footer' );
    }

    return null;
  }

  set footer( value ) {
    if( value !== null ) {
      this.setAttribute( 'footer', value );
    } else {
      this.removeAttribute( 'footer' );
    }
  }    

  get headingTagOverride() {
    if( this.hasAttribute( 'headingtagoverride' ) ) {
      return this.getAttribute( 'headingtagoverride' );
    }

    return null;
  }

  set headingTagOverride( value ) {
    if( value !== null ) {
      this.setAttribute( 'headingtagoverride', value );
    } else {
      this.removeAttribute( 'headingtagoverride' );
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

window.customElements.define( 'rf-container', RainforestContainer );
