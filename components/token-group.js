import RFToken from "./token.js";

export default class RFTokenGroup extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          gap: 8px;
          padding: 8px 0 0 0;
          position: relative;
        }

        :host( [alignment=vertical] ) {
          flex-direction: column
        }

        :host( [disable-outer-padding] ) {
          padding: 0;
        }        
      
        :host( [hidden] ) {
          display: none;
        }

        ::slotted( rf-token ) {
          width: 100%;
        }
      </style>
      <slot></slot>
    `;

    // Events
    this.onDismiss = this.onDismiss.bind( this );

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$slot = this.shadowRoot.querySelector( 'slot' );
    this.$slot.addEventListener( 'slotchange', () => {
      for( let c = 0; c < this.children.length; c++ ) {
        this.children[c].removeEventListener( 'rf-dismiss', this.onDismiss );
        this.children[c].addEventListener( 'rf-dismiss', this.onDismiss );
        this.children[c].setAttribute( 'data-index', c );
      }
    } );
  }

  onDismiss( evt ) {
    const index = parseInt( evt.currentTarget.getAttribute( 'data-index' ) );
    this.dispatchEvent( new CustomEvent( 'rf-dismiss', {
      detail: {
        itemIndex: index
      }
    } ) );
  }

  // When things change
  _render() {
    for( let c = 0; c < this.children.length; c++ ) {
      if( !this.children[c].hasAttribute( 'disabled' ) ) {
        this.children[c].disabled = this.disabled;
      }
    }
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
    this._upgrade( 'alignment' );
    this._upgrade( 'disableOuterPadding' );    
    this._upgrade( 'disabled' );
    this._upgrade( 'hidden' );
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'alignment',
      'disable-outer-padding',
      'disabled',
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
  get disableOuterPadding() {
    return this.hasAttribute( 'disable-outer-padding' );
  }

  set disableOuterPadding( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'disable-outer-padding' );
      } else {
        this.setAttribute( 'disable-outer-padding', '' );
      }
    } else {
      this.removeAttribute( 'disable-outer-padding' );
    }
  }  

  get disabled() {
    return this.hasAttribute( 'disabled' );
  }

  set disabled( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'disabled' );
      } else {
        this.setAttribute( 'disabled', '' );
      }
    } else {
      this.removeAttribute( 'disabled' );
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

window.customElements.define( 'rf-token-group', RFTokenGroup );
