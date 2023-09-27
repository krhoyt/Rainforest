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
          color: var( --box-color, #000716 );
          cursor: var( --box-cursor, default );
          font-family: 'Amazon Ember', sans-serif;
          font-size: var( --box-font-size, 14px );
          font-weight: var( --box-font-weight, 400 );
          line-height: var ( --box-line-height, 20px );
          margin: var( --box-margin, 0 );
          padding: var( --box-padding, 0 );
          text-align: var( --box-text-align, left );
          text-decoration: var( --box-text-decoration, none );
          text-rendering: optimizeLegibility;
          width: 100%;
        }

        :host( [color=text-body-secondary] ) p {
          color: #414d5c;
        }

        :host( [color=text-status-error] ) p {
          color: #d91515;
        }        

        :host( [color=text-status-success] ) p {
          color: #037f0c;
        }                

        :host( [color=text-status-info] ) p {
          color: #0972d3;
        }                        

        :host( [color=text-status-inactive] ) p {
          color: #5f6b7a;
        }                                

        :host( [color=text-status-warning] ) p {
          color: #8d6605;
        }                                        

        :host( [truncate] ) p {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        :host( [variant=h1] ) p {
          font-size: 24px;
          font-weight: 700;
          line-height: 30px;
        }

        :host( [variant=h2] ) p {
          font-size: 20px;
          font-weight: 700;
          line-height: 24px;
        }        

        :host( [variant=h3] ) p {
          font-size: 18px;
          font-weight: 700;
          line-height: 22px;
        }                

        :host( [variant=h4] ) p {
          font-size: 16px;
          font-weight: 700;
          line-height: 20px;
        }                        

        :host( [variant=h5] ) p {
          font-size: 14px;
          font-weight: 700;
          line-height: 18px;
        }                   

        :host( [variant=awsui-key-label] ) p,
        :host( [variant=strong] ) p {
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
        }                           

        :host( [variant=small] ) p {
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
        }                                   

        :host( [variant=code] ) p {
          font-family: monospace;
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
        }                                           

        :host( [variant=samp] ) p,
        :host( [variant=pre] ) p {
          font-family: monospace;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        }                                                   

        :host( [variant=large] ) p {
          font-size: 42px;
          font-weight: 400;
          line-height: 48px;
        }                                                           

        :host( [font-size=body-s] ) p {
          font-size: 12px;
        }

        :host( [font-size=heading-xs] ) p,
        :host( [font-size=body-m] ) p {
          font-size: 14px;
        }        

        :host( [font-size=body-s] ) p {
          font-size: 12px;
        }

        :host( [font-size=heading-s] ) p {
          font-size: 16px;
        }        

        :host( [font-size=heading-m] ) p {
          font-size: 18px;
        }                

        :host( [font-size=heading-l] ) p {
          font-size: 20px;
        }                        

        :host( [font-size=heading-xl] ) p {
          font-size: 24px;
        }                                

        :host( [font-size=display-l] ) p {
          font-size: 42px;
        }                                

        :host( [font-weight=light] ) p {
          font-weight: 300;
        }                                

        :host( [font-weight=heavy] ) p,
        :host( [font-weight=bold] ) p {
          font-weight: 700;
        }                                        

        :host( [text-align=center] ) p {
          text-align: center;
        }

        :host( [text-align=left] ) p {
          text-align: left;
        }

        :host( [text-align=right] ) p {
          text-align: right;
        }

        :host( [float=left] ) {
          float: left;
        }

        :host( [float=right] ) {
          float: right;
        }

        :host( [disabled] ) p {
          color: var( --box-disabled-color, #9ba7b6 );
        }                
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
      'float',
      'font-size',
      'font-weight',
      'hidden',
      'text',
      'text-align',
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

  get fontSize() {
    if( this.hasAttribute( 'font-size' ) ) {
      return this.getAttribute( 'font-size' );
    }

    return null;
  }

  set fontSize( value ) {
    if( value !== null ) {
      this.setAttribute( 'font-size', value );
    } else {
      this.removeAttribute( 'font-size' );
    }
  }

  get fontWeight() {
    if( this.hasAttribute( 'font-weight' ) ) {
      return this.getAttribute( 'font-weight' );
    }

    return null;
  }

  set fontWeight( value ) {
    if( value !== null ) {
      this.setAttribute( 'font-weight', value );
    } else {
      this.removeAttribute( 'font-weight' );
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
    if( this.hasAttribute( 'text-align' ) ) {
      return this.getAttribute( 'text-align' );
    }

    return null;
  }

  set textAlign( value ) {
    if( value !== null ) {
      this.setAttribute( 'text-align', value );
    } else {
      this.removeAttribute( 'text-align' );
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
}

window.customElements.define( 'rf-box', RainforestBox );
