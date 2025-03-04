import RFRadio from "./radio.js";

export default class RFRadioGroup extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: var( --radio-group-direction, column );
          gap: 4px;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        p[part=description] {
          padding: 0 0 4px 0;
        }

        :host( [direction=horizontal] ),
        :host( [direction=row] ) {
          flex-direction: row;
        }
        :host( [direction=horizontal-reverse] ),
        :host( [direction=row-reverse] ) {
          flex-direction: row-reverse;
        }
        :host( [direction=vertical-reverse] ),
        :host( [direction=column-reverse] ) {
          flex-direction: column-reverse;
        }                 
      </style>
      <slot></slot>
    `;

    // Events
    this.doRadioChange = this.doRadioChange.bind( this );

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$slot = this.shadowRoot.querySelector( 'slot' );
    this.$slot.addEventListener( 'slotchange', () => {
      let description = false;
      
      for( let c = 0; c < this.children.length; c++ ) {
        this.children[c].removeEventListener( 'rf-change', this.doRadioChange );
        this.children[c].addEventListener( 'rf-change', this.doRadioChange );        
        
        if( this.children[c].hasAttribute( 'description' ) ) {
          description = true;
        }
      }
    } );
  }

  focus() {
    this.$children[0].focus();
  }

  doRadioChange( evt ) {
    this.value = evt.detail.value;

    for( let c = 0; c < this.children.length; c++ ) {
      this.children[c].checked = evt.currentTarget === this.children[c] ? true : false;
    }

    this.dispatchEvent( new CustomEvent( 'rf-change', {
      detail: {
        value: this.value
      }
    } ) );
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
    this._upgrade( 'direction' );        
    this._upgrade( 'hidden' );    
    this._upgrade( 'name' );        
    this._upgrade( 'toggle' );            
    this._upgrade( 'value' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'direction',
      'hidden',
      'name',
      'toggle',
      'value'
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
  get direction() {
    if( this.hasAttribute( 'direction' ) ) {
      return this.getAttribute( 'direction' );
    }

    return null;
  }

  set direction( value ) {
    if( value !== null ) {
      this.setAttribute( 'direction', value );
    } else {
      this.removeAttribute( 'direction' );
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

  get name() {
    if( this.hasAttribute( 'name' ) ) {
      return this.getAttribute( 'name' );
    }

    return null;
  }

  set name( value ) {
    if( value !== null ) {
      this.setAttribute( 'name', value );
    } else {
      this.removeAttribute( 'name' );
    }
  }  

  get toggle() {
    return this.hasAttribute( 'toggle' );
  }

  set toggle( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'toggle' );
      } else {
        this.setAttribute( 'toggle', '' );
      }
    } else {
      this.removeAttribute( 'toggle' );
    }
  } 

  get value() {
    if( this.hasAttribute( 'value' ) ) {
      return this.getAttribute( 'value' );
    }

    return null;
  }

  set value( value ) {
    if( value !== null ) {
      this.setAttribute( 'value', value );
    } else {
      this.removeAttribute( 'value' );
    }
  }   
}

window.customElements.define( 'rf-radio-group', RFRadioGroup );
