export default class RFTextContent extends HTMLElement {
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

        :host( [hidden] ) {
          display: none;
        }
        
        ::slotted( h1 ) {
          font-size: 24px;
          font-weight: 700;
          line-height: 30px;          
        }

        ::slotted( h2 ) {
          font-size: 20px;
          font-weight: 700;
          line-height: 24px;
        }

        ::slotted( h3 ) {
          font-size: 18px;
          font-weight: 700;
          line-height: 22px;
        }

        ::slotted( h4 ) {
          font-size: 16px;
          font-weight: 700;
          line-height: 20px;
          margin: 4px 0 0 0;
        }

        ::slotted( h5 ) {
          font-size: 14px;
          font-weight: 700;
          line-height: 18px;
        }        

        ::slotted( p ) {
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;    
        }  
        
        ::slotted( code ) {
          color: #000716;
          font-family: Monaco, Menlo, Consolas, 'Courier Prime', Courier, 'Courier New', monospace;
          font-size: 12px;
          line-height: 16px;
        }

        ::slotted( small ) {
          color: #5f6b7a;
          font-size: 12px;
          line-height: 16px;
          padding: 0;
        }

        ::slotted( strong ) {
          font-weight: 700;
        }     
        
        ::slotted( ol ) {
          margin: 8px 0 8px 0;
          padding: 0 0 0 20px;
        }

        :slotted( ol li ) {
          color: #000716;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
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
          color: #000716;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
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

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );
  }

   // When attributes change
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

  // Observed attribute has changed
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

window.customElements.define( 'rf-text-content', RFTextContent );
