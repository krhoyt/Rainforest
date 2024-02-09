export default class RainforestPopover extends HTMLElement {
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

        div {
          background-color: #ffffff;
          border: solid 2px #9ba7b6;
          border-radius: 8px;
          box-shadow: rgba( 0, 7, 22, 0.10 ) 0px 4px 20px 1px;
          display: inline-block;
          padding: 12px 16px 12px 16px;          
        }
      </style>
      <slot></slot>
    `;

    // Private
    this._pop = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this._pop = document.createElement( 'div' );
    this._pop.classList.add( 'popover' );
    this._pop.classList.add( 'hidden' );
    document.body.appendChild( this._pop );

    this.$slot = this.shadowRoot.querySelector( 'slot' );
    this.$slot.addEventListener( 'slotchange', () => {
      while( this._pop.children.length > 0 )
        this._pop.children[0].remove();

      for( let c = 0; c < this.children.length; c++ ) {
        if( this.children[c].hasAttribute( 'slot' ) ) {
          if( this.children[c].getAttribute( 'slot' ) === 'content' ) {
            this._pop.appendChild( this.children[c] );
          }
        } else {
          this.children[c].addEventListener( 'click', () => {
            console.log( 'POP' );
            this._pop.style.display = 'inline-block';
          } );
        }
      }
    } );
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
    this._upgrade( 'dismissButton' );    
    this._upgrade( 'header' );        
    this._upgrade( 'position' );        
    this._upgrade( 'size' );    
    this._upgrade( 'triggerType' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'dismiss-button',
      'header',
      'position',
      'size',
      'trigger-type'
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
  get dismissButton() {
    return this.hasAttribute( 'dismiss-button' );
  }

  set dismissButton( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'dismiss-button' );
      } else {
        this.setAttribute( 'dismiss-button', '' );
      }
    } else {
      this.removeAttribute( 'dismiss-button' );
    }
  }

  get header() {
    if( this.hasAttribute( 'header' ) ) {
      return this.getAttribute( 'header' );
    }

    return null;
  }

  set header( value ) {
    if( value !== null ) {
      this.setAttribute( 'header', value );
    } else {
      this.removeAttribute( 'header' );
    }
  }   

  get position() {
    if( this.hasAttribute( 'position' ) ) {
      return this.getAttribute( 'position' );
    }

    return null;
  }

  set position( value ) {
    if( value !== null ) {
      this.setAttribute( 'position', value );
    } else {
      this.removeAttribute( 'position' );
    }
  }

  get size() {
    if( this.hasAttribute( 'size' ) ) {
      return this.getAttribute( 'size' );
    }

    return null;
  }

  set size( value ) {
    if( value !== null ) {
      this.setAttribute( 'size', value );
    } else {
      this.removeAttribute( 'size' );
    }
  }  

  get triggerType() {
    if( this.hasAttribute( 'trigger-type' ) ) {
      return this.getAttribute( 'trigger-type' );
    }

    return null;
  }

  set triggerType( value ) {
    if( value !== null ) {
      this.setAttribute( 'trigger-type', value );
    } else {
      this.removeAttribute( 'trigger-type' );
    }
  }    
}

window.customElements.define( 'rf-popover', RainforestPopover );
