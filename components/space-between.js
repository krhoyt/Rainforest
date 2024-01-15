export default class RainforestSpaceBetween extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          align-items: flex-start;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        :host( [align-items=center] ) { align-items: center; }
        :host( [align-items=end] ) { align-items: flex-end; }

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

        :host( [size=xxxs] ) { gap: 2px; }
        :host( [size=xxs] ) { gap: 4px }
        :host( [size=xs] ) { gap: 8px }
        :host( [size=s] ) { gap: 12px }        
        :host( [size=m] ) { gap: 16px }                
        :host( [size=l] ) { gap: 20px }                        
        :host( [size=xl] ) { gap: 24px }                                
        :host( [size=xxl] ) { gap: 32px }                                        
        :host( [size=xxxl] ) { gap: 40px }      
      </style>
      <slot></slot>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );
  }

  // When things change
  _render() {;}

  // Properties set before module loaded
  _upgrade( property ) {
    if( this.hasOwnProperty( property ) ) {
      const value = this[property];
      delete this[property];
      this[property] = value;
    }    
  }    

  // Setup
  connectedCallback() {
    this._upgrade( 'alignItems' );           
    this._upgrade( 'direction' );                    
    this._upgrade( 'size' );            
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'align-items',
      'direction',
      'size'     
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
  get alignItems() {
    if( this.hasAttribute( 'align-items' ) ) {
      return this.getAttribute( 'align-items' );
    }

    return null;
  }

  set alignItems( value ) {
    if( value !== null ) {
      this.setAttribute( 'align-items', value );
    } else {
      this.removeAttribute( 'align-items' );
    }
  }

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
}

window.customElements.define( 'rf-space-between', RainforestSpaceBetween );
