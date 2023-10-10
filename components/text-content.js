export default class RainforestTextContent extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
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
        
        ::slotted( h1 ) {
          font-size: var( --font-size-heading-xl );
          font-weight: var( --font-weight-heading-xl );
          line-height: var( --line-height-heading-xl );          
        }

        ::slotted( h2 ) {
          font-size: var( --font-size-heading-l );
          font-weight: var( --font-weight-heading-l );
          line-height: var( --line-height-heading-l );
        }

        ::slotted( h3 ) {
          font-size: var( --font-size-heading-m );
          font-weight: var( --font-weight-heading-m );
          line-height: var( --line-height-heading-m );
        }

        ::slotted( h4 ) {
          font-size: var( --font-size-heading-s );
          font-weight: var( --font-weight-heading-s );
          line-height: var( --line-height-heading-s );
          margin: 4px 0 0 0;
        }

        ::slotted( h5 ) {
          font-size: var( --font-size-heading-xs );
          font-weight: var( --font-weight-heading-xs );
          line-height: var( --line-height-heading-xs );
        }        

        ::slotted( p ) {
          font-size: var( --font-size-body-m );
          font-weight: 400;
          line-height: var( --line-height-body-m );    
        }  
        
        ::slotted( code ) {
          color: var( --color-primary );
          font-family: var( --font-family-monospace );
          font-size: var( --font-size-body-s );
          line-height: var( --line-height-body-s );
        }

        ::slotted( small ) {
          color: var( --color-inactive );
          font-size: var( --font-size-body-s );
          line-height: var( --line-height-body-s );
          padding: 0;
        }

        ::slotted( strong ) {
          font-weight: var( --font-weight-heading-m );
        }     
        
        ::slotted( ol ) {
          margin: 8px 0 8px 0;
          padding: 0 0 0 20px;
        }

        :slotted( ol li ) {
          color: var( --color-primary );
          font-family: var( --font-family-base );
          font-size: var( --font-size-body-m );
          font-weight: 400;
          line-height: var( --line-height-body-m );
          margin: 0;
          padding: 4px 0 0 0;
          text-rendering: optimizeLegibility;          
        }

        :slotted( ol li:first-of-type ) {
          padding: 0;
        }                

        ::slotted( ul ) {
          margin: 8px 0 8px 0;
          padding: 0 0 0 20px;
        }

        :slotted( ul li ) {
          color: var( --color-primary );
          font-family: var( --font-family-base );
          font-size: var( --font-size-body-m );
          font-weight: 400;
          line-height: var( --line-height-body-m );
          margin: 0;
          padding: 4px 0 0 0;
          text-rendering: optimizeLegibility;          
        }        

        :slotted( ul li:first-of-type ) {
          padding: 0;
        }        
      </style>
      <slot></slot>
    `;

    // Properties
    this._data = null;

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
    this._upgrade( 'concealed' );    
    this._upgrade( 'data' );            
    this._upgrade( 'hidden' );    
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'concealed',
      'hidden'
    ];
  }

  // Observed tag attribute has changed
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

window.customElements.define( 'rf-text-content', RainforestTextContent );
