export default class RFBox extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        :host( [align-items=center] ) { align-items: center; }
        :host( [align-items=end] ) { align-items: flex-end; }                
        :host( [align-items=start] ) { align-items: flex-start; }        

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

        :host( [float=left] ) { float: left; }
        :host( [float=right] ) { float: right; }      
        
        :host( [justify-content=center] ) { justify-content: center; }
        :host( [justify-content=end] ) { justify-content: flex-end; }                
        :host( [justify-content=start] ) { justify-content: flex-start; }                

        :host( [size=n] ), :host( [gap=n] ) { gap: 0; }        
        :host( [size=xxxs] ), :host( [gap=xxxs] ) { gap: 2px; }
        :host( [size=xxs] ), :host( [gap=xxs] ) { gap: 4px }
        :host( [size=xs] ), :host( [gap=xs] ) { gap: 8px }
        :host( [size=s] ), :host( [gap=s] ) { gap: 12px }        
        :host( [size=m] ), :host( [gap=m] ) { gap: 16px }                
        :host( [size=l] ), :host( [gap=l] ) { gap: 20px }                        
        :host( [size=xl] ), :host( [gap=xl] ) { gap: 24px }                                
        :host( [size=xxl] ), :host( [gap=xxl] ) { gap: 32px }                                        
        :host( [size=xxxl] ), :host( [gap=xxxl] ) { gap: 40px }      

        :host( [margin=xxx] ) { margin: 0; }        
        :host( [margin=xxl] ) { margin: 32px; }
        :host( [margin=xl] ) { margin: 24px; }        
        :host( [margin=l] ) { margin: 20px; }                
        :host( [margin=m] ) { margin: 16px; }                        
        :host( [margin=s] ) { margin: 12px; }                                
        :host( [margin=xs] ) { margin: 8px; }                    
        :host( [margin=xxs] ) { margin: 4px; }                            
        :host( [margin=xxxs] ) { margin: 2px; }                            
        :host( [margin=n] ) { margin: 0; }    
        
        :host( [padding=xxx] ) { padding: 0; }        
        :host( [padding=xxl] ) { padding: 32px; }
        :host( [padding=xl] ) { padding: 24px; }        
        :host( [padding=l] ) { padding: 20px; }                
        :host( [padding=m] ) { padding: 16px; }                        
        :host( [padding=s] ) { padding: 12px; }                                
        :host( [padding=xs] ) { padding: 8px; }                    
        :host( [padding=xxs] ) { padding: 4px; }                            
        :host( [padding=xxxs] ) { padding: 2px; }                            
        :host( [padding=n] ) { padding: 0; }                                                   
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
    this._upgrade( 'float' );
    this._upgrade( 'gap' );                        
    this._upgrade( 'hidden' );                        
    this._upgrade( 'justifyContent' );                            
    this._upgrade( 'margin' );                            
    this._upgrade( 'padding' );                        
    this._upgrade( 'size' );                            
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'align-items',
      'direction',
      'float',
      'gap',
      'hidden',
      'justify-content',
      'margin',
      'padding',
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
  
  get float() {
    if( this.hasAttribute( 'float' ) ) {
      return this.getAttribute( 'float' );
    }

    return null;
  }

  set float( value ) {
    if( value !== null ) {
      this.setAttribute( 'float', value );
    } else {
      this.removeAttribute( 'float' );
    }
  }    

  get gap() {
    if( this.hasAttribute( 'gap' ) ) {
      return this.getAttribute( 'gap' );
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

  get justifyContent() {
    if( this.hasAttribute( 'justify-content' ) ) {
      return this.getAttribute( 'justify-content' );
    }

    return null;
  }

  set justifyContent( value ) {
    if( value !== null ) {
      this.setAttribute( 'justify-content', value );
    } else {
      this.removeAttribute( 'justify-content' );
    }
  }  

  get margin() {
    if( this.hasAttribute( 'margin' ) ) {
      return this.getAttribute( 'margin' );
    }

    return null;
  }

  set margin( value ) {
    if( value !== null ) {
      this.setAttribute( 'margin', value );
    } else {
      this.removeAttribute( 'margin' );
    }
  }

  get padding() {
    if( this.hasAttribute( 'padding' ) ) {
      return this.getAttribute( 'padding' );
    }

    return null;
  }

  set padding( value ) {
    if( value !== null ) {
      this.setAttribute( 'padding', value );
    } else {
      this.removeAttribute( 'padding' );
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

window.customElements.define( 'rf-box', RFBox );
