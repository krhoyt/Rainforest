export default class RainforestContainer extends HTMLElement {
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

        div[part=container] {
          background: #ffffff;
          border-color: var( --container-border-color, #b6bec9 );
          border-style: solid;
          border-width: 1px;
          border-radius: var( --container-border-radius, 16px );
          /*
          box-shadow: var( --container-box-shadow, 
            0 0 1px 1px #e9ebed,
            0 1px 8px 2px #0007161f
          );
          */
        }

        div[part=content],
        div[part=footer] {
          color: #000716;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          text-rendering: optimizeLegibility;
        }
        div[part=content] { padding: 4px 20px 20px 20px; }                
        div[part=footer] { 
          border-top: solid 2px #e9ebed;
          display: none;
          padding: 12px 20px 12px 20px; 
        }        

        div[part=header] {
          padding: 12px 20px 8px 20px;
        }

        :host( [disable-content-paddings] ) div[part=content] {
          padding: 0;
        }

        :host( [disable-header-paddings] ) div[part=header] {
          padding: 0;
        }        

        ::slotted( rf-header ) {
          padding: 4px 0 0 0;
        }

        :host( [slot=footer] ) div[part=footer] {
          display: none;
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
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'disable-content-paddings',
      'disable-header-paddings'
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
}

window.customElements.define( 'rf-container', RainforestContainer );
