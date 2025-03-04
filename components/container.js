export default class RFContainer extends HTMLElement {
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

        div[part=container] {
          background: #ffffff;
          border-color: var( --container-border-color, #b6bec9 );
          border-style: solid;
          border-width: 1px;
          border-radius: var( --container-border-radius, 16px );
          width: 100%;
        }

        div[part=content] { 
          padding: var( --container-content-padding, 4px 20px 20px 20px ); 
        }                

        div[part=footer] { 
          border-top: solid 2px #e9ebed;
          display: none;
          padding: var( --container-footer-padding, 12px 20px 12px 20px ); 
        }        

        div[part=header] {
          padding: var( --container-header-padding, 12px 20px 8px 20px );
        }

        :host( [disable-content-paddings] ) div[part=content] {
          padding: 0;
        }

        :host( [disable-header-paddings] ) div[part=header] {
          padding: 0;
        }        

        :host( [slim-shady] ) div[part=container] {
          border: none;
          box-shadow: var( --container-box-shadow, 
            0 0 1px 1px #e9ebed,
            0 1px 8px 2px #0007161f
          );
        }

        ::slotted( rf-header ) {
          padding: 4px 0 0 0;
        }

        :host( [slot=header] ) div[part=header] {
          background-color: red !important;
        }
      </style>
      <div part="container">
        <div part="header">
          <slot name="header"></slot>
        </div>
        <div part="content">
          <slot></slot>
        </div>
        <div part="footer">
          <slot name="footer"></slot>
        </div>        
      </div>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    // NOTE: ::slotted does not support :has, reverting to manual configuration
    /*
    this.$footer = this.shadowRoot.querySelector( 'slot[name=footer]' );
    this.$footer.addEventListener( 'slotchange', () => {
      const footer = this.querySelectorAll( '[slot=footer]' );
      this.$footer.parentElement.style.display = footer.length > 0 ? 'block' : 'none';
    } );
    this.$header = this.shadowRoot.querySelector( 'slot[name=header]' );
    this.$header.addEventListener( 'slotchange', () => {
      const actions = this.querySelectorAll( '[slot=actions]' );
      const header = this.querySelector( 'rf-header[slot=header]' );      
      if( actions.length > 0 ) {
        header.style.setProperty( '--header-column-gap', '0' );
      } else {
        header.style.setProperty( '--header-column-gap', '2px' );        
      }
    } );
    */    
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
    this._upgrade( 'disableContentPaddings' );           
    this._upgrade( 'disableHeaderPaddings' );    
    this._upgrade( 'hidden' );        
    this._upgrade( 'slimShady' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'disable-content-paddings',
      'disable-header-paddings',
      'hidden',
      'slim-shady'
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
  get disableContentPaddings() {
    return this.hasAttribute( 'disable-content-paddings' );
  }

  set disableContentPaddings( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'disable-content-paddings' );
      } else {
        this.setAttribute( 'disable-content-paddings', '' );
      }
    } else {
      this.removeAttribute( 'disable-content-paddings' );
    }
  }

  get disableHeaderPaddings() {
    return this.hasAttribute( 'disable-header-paddings' );
  }

  set disableHeaderPaddings( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'disable-header-paddings' );
      } else {
        this.setAttribute( 'disable-header-paddings', '' );
      }
    } else {
      this.removeAttribute( 'disable-header-paddings' );
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

  get slimShady() {
    return this.hasAttribute( 'slim-shady' );
  }

  set slimShady( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'slim-shady' );
      } else {
        this.setAttribute( 'slim-shady', '' );
      }
    } else {
      this.removeAttribute( 'slim-shady' );
    }
  }  
}

window.customElements.define( 'rf-container', RFContainer );
