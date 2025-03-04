export default class RFContentLayout extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        div[part=header] {
          background-color: #000716;
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-bottom: 56px;
          margin-bottom: -40px;
        }

        ::slotted( rf-alert ) {
          padding: 16px 0 0 0;                    
          --alert-background-color: #00142b; 
          --alert-border-color: #539fe5;
          --alert-color: #b6bec9;          
        }       
        
        ::slotted( rf-header ) {
          --button-primary-background-color: #539fe5;
          --button-primary-border-color: #539fe5;
          --button-primary-color: #000716;
          --button-primary-hover-background-color: #89bdee;
          --button-primary-hover-border-color: #89bdee;
          --header-description-color: #8d99a8;          
          --header-title-color: #d1d5db;
          --link-color: #539fe5;
          --link-hover-color: #89bdee;          
        }

        :host( [disable-overlap] ) {
          --container-border-color: transparent;
          --container-border-radius: 0;
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

window.customElements.define( 'rf-content-layout', RFContentLayout );
