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

        :host( [concealed] ) {
          visibility: hidden;
        }       

        :host( [align-items=center] ) {
          align-items: center;
        }

        :host( [align-items=end] ) {
          align-items: flex-end;
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

        :host( [size=xxxs] ) {
          gap: var( --space-static-xxs );
        }

        :host( [size=xxs] ) {
          gap: var( --space-static-xxs );
        }

        :host( [size=xs] ) {
          gap: var( --space-static-xs );
        }

        :host( [size=s] ) {
          gap: var( --space-static-s );
        }        

        :host( [size=m] ) {
          gap: var( --space-static-m );
        }                

        :host( [size=l] ) {
          gap: var( --space-static-l );
        }                        

        :host( [size=xl] ) {
          gap: var( --space-static-xl );
        }                                

        :host( [size=xxl] ) {
          gap: var( --space-static-xxl );
        }                                        

        :host( [hidden] ) {
          display: none;
        }        
      </style>
      <slot></slot>
    `;

    // Properties
    this._data = null;

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
    this._upgrade( 'concealed' );        
    this._upgrade( 'data' );                
    this._upgrade( 'direction' );                    
    this._upgrade( 'disabled' );            
    this._upgrade( 'gap' );                
    this._upgrade( 'hidden' );    
    this._upgrade( 'hint' );            
    this._upgrade( 'icon' );        
    this._upgrade( 'label' );        
    this._upgrade( 'size' );            
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'align-items',
      'concealed',
      'direction',
      'disabled',
      'hidden',
      'hint',
      'icon',
      'label',
      'size'     
    ];
  }

  // Observed tag attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  }

  // Properties
  // Not reflected
  // Array, Date, Object, null
  get data() {
    return this._data;
  }

  set data( value ) {
    this._data = value;
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

  get concealed() {
    return this.hasAttribute( 'concealed' );
  }

  set concealed( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'concealed' );
      } else {
        this.setAttribute( 'concealed', '' );
      }
    } else {
      this.removeAttribute( 'concealed' );
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
  
  get hint() {
    if( this.hasAttribute( 'hint' ) ) {
      return this.getAttribute( 'hint' );
    }

    return null;
  }

  set hint( value ) {
    if( value !== null ) {
      this.setAttribute( 'hint', value );
    } else {
      this.removeAttribute( 'hint' );
    }
  }  

  get icon() {
    if( this.hasAttribute( 'icon' ) ) {
      return this.getAttribute( 'icon' );
    }

    return null;
  }

  set icon( value ) {
    if( value !== null ) {
      this.setAttribute( 'icon', value );
    } else {
      this.removeAttribute( 'icon' );
    }
  }   
  
  get label() {
    if( this.hasAttribute( 'label' ) ) {
      return this.getAttribute( 'label' );
    }

    return null;
  }

  set label( value ) {
    if( value !== null ) {
      this.setAttribute( 'label', value );
    } else {
      this.removeAttribute( 'label' );
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
