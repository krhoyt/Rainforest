export default class RainforestHBox extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: flex;
          flex-direction: var( --hbox-direction, row );
          gap: var( --hbox-gap, 0 );
          position: relative;
        }

        :host( [direction=column] ) {
          flex-direction: column;
        }

        :host( [direction=column-reverse] ) {
          flex-direction: column-reverse;
        }        

        :host( [direction=row-reverse] ) {
          flex-direction: row-reverse;
        }        

        :host( [hidden] ) {
          display: none;
        }
      </style>
      <slot></slot>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );
  }

   // When attributes change
  _render() {
    const gap = this.gap === null ? 0 : this.gap;
    this.style.gap = `${gap}px`;
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
    this._upgrade( 'direction' );        
    this._upgrade( 'gap' );        
    this._upgrade( 'hidden' );    
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'direction',
      'gap',
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

  get gap() {
    if( this.hasAttribute( 'gap' ) ) {
      return parseInt( this.getAttribute( 'gap' ) );
    }

    return null;
  }

  set gap( value ) {
    if( value !== null ) {
      this.setAttribute( 'gap', value );
    } else {
      this.removeAttribute( 'gap' );
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

window.customElements.define( 'rf-hbox', RainforestHBox );
