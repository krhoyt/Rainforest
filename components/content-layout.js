export default class RainforestContentLayout extends HTMLElement {
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

        div[part=header] {
          background-color: #000716;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 56px;
          margin-bottom: -40px;
        }

        ::slotted( rf-alert ) {
          --alert-background-color: transparent;
          --alert-border-color: #539fe5;
          --alert-content-color: #b6bec9;
          --alert-header-color: #b6bec9;       
          --alert-icon-filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 66% )
            sepia( 42% )
            saturate( 3536% )
            hue-rotate( 183deg )
            brightness( 95% )
            contrast( 88% );            
        }       
        
        ::slotted( rf-header ) {
          --header-title-color: #b6bec9;
        }

        :host( [disable-overlap] ) div[part=header] {
          padding-bottom: 16px;
          margin-bottom: 0;
        }
      </style>
      <div part="header">
        <slot name="header"></slot>
      </div>
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
    this._upgrade( 'disableOverlap' );            
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'disable-overlap'
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
  get disableOverlap() {
    return this.hasAttribute( 'disable-overlap' );
  }

  set disableOverlap( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'disable-overlap' );
      } else {
        this.setAttribute( 'disable-overlap', '' );
      }
    } else {
      this.removeAttribute( 'disable-overlap' );
    }
  }
}

window.customElements.define( 'rf-content-layout', RainforestContentLayout );
