export default class RainforestBox extends HTMLElement {
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

        :host( [concealed] ) {
          visibility: hidden;
        }

        :host( [hidden] ) {
          display: none;
        }

        p {
          box-sizing: border-box;
          color: var( --color-primary );
          cursor: var( --box-cursor, default );
          font-family: var( --font-family-base );
          font-size: var( --font-family-body-m, 14px );
          font-weight: 400;
          line-height: var( --line-height-body-m );
          margin: var( --box-margin, 0 );
          padding: var( --box-padding, 0 );
          text-align: var( --box-text-align, left );
          text-decoration: var( --box-text-decoration, none );
          text-rendering: optimizeLegibility;
          width: 100%;
        }

        :host( [color=text-body-secondary] ) p {
          color: var( --color-secondary );
        }
        :host( [color=text-status-error] ) p {
          color: var( --color-error );
        }        
        :host( [color=text-status-success] ) p {
          color: var( --color-success );
        }                
        :host( [color=text-status-info] ) p {
          color: var( --color-link );
        }                        
        :host( [color=text-status-inactive] ) p {
          color: var( --color-inactive );
        }                                
        :host( [color=text-status-warning] ) p {
          color: var( --color-warning );
        }                                        

        :host( [truncate] ) p {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        :host( [variant=h1] ) p {
          font-size: var( --font-size-heading-xl );
          font-weight: var( --font-weight-heading-xl );
          line-height: var( --line-height-heading-xl );
        }

        :host( [variant=h2] ) p {
          font-size: var( --font-size-heading-l );
          font-weight: var( --font-weight-heading-l );
          line-height: var( --line-height-heading-l );
        }        

        :host( [variant=h3] ) p {
          font-size: var( --font-size-heading-m );
          font-weight: var( --font-weight-heading-m );
          line-height: var( --line-height-heading-m );
        }                

        :host( [variant=h4] ) p {
          font-size: var( --font-size-heading-s );
          font-weight: var( --font-weight-heading-s );
          line-height: var( --line-height-heading-s );
        }                        

        :host( [variant=h5] ) p {
          font-size: var( --font-size-heading-xs );
          font-weight: var( --font-weight-heading-xs );
          line-height: var( --line-height-heading-xs );
        }                   

        :host( [variant=awsui-key-label] ) p,
        :host( [variant=strong] ) p {
          font-size: var( --font-size-body-m );
          font-weight: 700;
          line-height: var( --line-height-body-m );
        }                           

        :host( [variant=small] ) p {
          font-size: var( --font-size-body-s );
          font-weight: 400;
          line-height: var( --line-height-body-s );
        }                                   

        :host( [variant=code] ) p {
          font-family: var( --font-family-monospace );
          font-size: var( --font-size-body-s );
          font-weight: 400;
          line-height: var( --line-height-body-s );
        }                                           

        :host( [variant=samp] ) p,
        :host( [variant=pre] ) p {
          font-family: var( --font-family-monospace );
          font-size: var( --font-size-body-m );
          font-weight: 400;
          line-height: var( --line-height-body-m );
        }                                                   

        :host( [variant=large] ) p {
          font-size: var( --font-size-display-l );
          font-weight: 400;
          line-height: var( --line-height-display-l );
        }                                                           

        :host( [fontsize=body-s] ) p { font-size: var( --font-size-body-s ) }
        :host( [fontsize=heading-xs] ) p { font-size: var( --font-size-heading-xs ) }
        :host( [fontsize=body-m] ) p { font-size: var( --font-size-body-m ) }        
        :host( [fontsize=heading-s] ) p { font-size: var( --font-size-heading-s ); }        
        :host( [fontsize=heading-m] ) p { font-size: var( --font-size-heading-m ); }        
        :host( [fontsize=heading-l] ) p { font-size: var( --font-size-heading-l ); }        
        :host( [fontsize=heading-xl] ) p { font-size: var( --font-size-heading-xl ); }        
        :host( [fontsize=display-l] ) p { font-size: var( --font-size-display-l ); }                                
        :host( [fontweight=light] ) p { font-weight: 300; }                                
        :host( [fontweight=heavy] ) p { font-weight: 700; }                                                
        :host( [fontweight=bold] ) p { font-weight: 700; }                                        

        :host( [textalign=center] ) p { text-align: center; }
        :host( [textalign=left] ) p { text-align: left; }
        :host( [textalign=right] ) p { text-align: right; }
        
        :host( [float=left] ) { float: left; }
        :host( [float=right] ) { float: right; }

        :host( [disabled] ) p { color: var( --color-secondary-disabled ); }                

        :host( [display=block] ) { display: block; }
        :host( [display=inline] ) { display: inline; }
        :host( [display=inline-block] ) { display: inline-block; }        
        :host( [display=none] ) { display: none; }        
      </style>
      <p part="box">
        <span></span>
        <slot></slot>
      </p>
    `;

    // Private
    this._data = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$label = this.shadowRoot.querySelector( 'span' );
  }

   // When attributes change
  _render() {
    this.$label.innerText = this.text === null ? '' : this.text;
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
    this._upgrade( 'color' );            
    this._upgrade( 'concealed' );        
    this._upgrade( 'data' );       
    this._upgrade( 'disabled' );          
    this._upgrade( 'display' );      
    this._upgrade( 'float' );      
    this._upgrade( 'fontSize' );                        
    this._upgrade( 'fontWeight' );                            
    this._upgrade( 'hidden' );    
    this._upgrade( 'text' );    
    this._upgrade( 'textAlign' );        
    this._upgrade( 'truncate' );    
    this._upgrade( 'variant' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'color',
      'concealed',
      'disabled',
      'display',
      'float',
      'fontsize',
      'fontweight',
      'hidden',
      'text',
      'textalign',
      'truncate',
      'variant'
    ];
  }

  // Observed attribute has changed
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
  get color() {
    if( this.hasAttribute( 'color' ) ) {
      return this.getAttribute( 'color' );
    }

    return null;
  }

  set color( value ) {
    if( value !== null ) {
      this.setAttribute( 'color', value );
    } else {
      this.removeAttribute( 'color' );
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

  get display() {
    if( this.hasAttribute( 'display' ) ) {
      return this.getAttribute( 'display' );
    }

    return null;
  }

  set display( value ) {
    if( value !== null ) {
      this.setAttribute( 'display', value );
    } else {
      this.removeAttribute( 'display' );
    }
  }

  get fontSize() {
    if( this.hasAttribute( 'fontsize' ) ) {
      return this.getAttribute( 'fontsize' );
    }

    return null;
  }

  set fontSize( value ) {
    if( value !== null ) {
      this.setAttribute( 'fontsize', value );
    } else {
      this.removeAttribute( 'fontsize' );
    }
  }

  get fontWeight() {
    if( this.hasAttribute( 'fontweight' ) ) {
      return this.getAttribute( 'fontweight' );
    }

    return null;
  }

  set fontWeight( value ) {
    if( value !== null ) {
      this.setAttribute( 'fontweight', value );
    } else {
      this.removeAttribute( 'fontweight' );
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

  get text() {
    if( this.hasAttribute( 'text' ) ) {
      return this.getAttribute( 'text' );
    }

    return null;
  }

  set text( value ) {
    if( value !== null ) {
      this.setAttribute( 'text', value );
    } else {
      this.removeAttribute( 'text' );
    }
  }     

  get textAlign() {
    if( this.hasAttribute( 'textalign' ) ) {
      return this.getAttribute( 'textalign' );
    }

    return null;
  }

  set textAlign( value ) {
    if( value !== null ) {
      this.setAttribute( 'textalign', value );
    } else {
      this.removeAttribute( 'textalign' );
    }
  }       
  
  get truncate() {
    return this.hasAttribute( 'truncate' );
  }

  set truncate( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'truncate' );
      } else {
        this.setAttribute( 'truncate', '' );
      }
    } else {
      this.removeAttribute( 'truncate' );
    }
  }  

  get variant() {
    if( this.hasAttribute( 'variant' ) ) {
      return this.getAttribute( 'variant' );
    }

    return null;
  }

  set variant( value ) {
    if( value !== null ) {
      this.setAttribute( 'variant', value );
    } else {
      this.removeAttribute( 'variant' );
    }
  }  
}

window.customElements.define( 'rf-box', RainforestBox );
