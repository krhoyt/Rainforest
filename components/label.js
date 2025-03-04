export default class RFLabel extends HTMLElement {
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

        :host( [hidden] ) {
          display: none;
        }

        p {
          box-sizing: border-box;
          color: var( --label-color, #000716 );
          cursor: var( --label-cursor, default );
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: var( --label-font-size, 14px );
          font-style: var( --label-font-style );
          font-weight: var( --label-font-weight, 400 );
          line-height: var( --label-line-height, 20px );
          margin: var( --label-margin, 0 );
          padding: var( --label-padding, 0 );
          text-align: var( --label-text-align, left );
          text-decoration: var( --label-text-decoration, none );
          text-rendering: optimizeLegibility;
          width: 100%;
        }

        :host( [balanced] ) p { text-wrap: balanced; }

        :host( [display=block] ) { display: block; }
        :host( [display=inline-block] ) { display: inline-block; }        
        :host( [display=inline] ) { display: inline; }                

        :host( [float=left] ) { float: left; }
        :host( [float=right] ) { float: right; }

        :host( [color=text-body-secondary] ) p { color: #414d5c; }
        :host( [color=text-status-error] ) p { color: #d91515; }       
        :host( [color=text-status-success] ) p { color: #037f0c; }
        :host( [color=text-status-info] ) p { color: #0972d3; }                      
        :host( [color=text-status-inactive] ) p { color: #5f6b7a; }
        :host( [color=text-status-warning] ) p { color: #8d6605; }

        :host( [font-size=body-s] ) p { font-size: 12px; line-height: 16px; }
        :host( [font-size=heading-xs] ) p { line-height: 18px; }
        :host( [font-size=heading-s] ) p { font-size: 16px; line-height: 20px; }
        :host( [font-size=heading-m] ) p { font-size: 18px; line-height: 22px; }
        :host( [font-size=heading-l] ) p { font-size: 20px; line-height: 24px; }        
        :host( [font-size=heading-xl] ) p { font-size: 24px; line-height: 30px; }                
        :host( [font-size=display-l] ) p { font-size: 42px; line-height: 48px; }                        

        :host( [font-weight=light] ) p { font-weight: 300; }
        :host( [font-weight=bold] ) p { font-weight: 700; }
        :host( [font-weight=heavy] ) p { font-weight: 700; }      
        
        :host( [margin=xxx] ) p { margin: 0; }        
        :host( [margin=xxl] ) p { margin: 32px; }
        :host( [margin=xl] ) p { margin: 24px; }        
        :host( [margin=l] ) p { margin: 20px; }                
        :host( [margin=m] ) p { margin: 16px; }                        
        :host( [margin=s] ) p { margin: 12px; }                                
        :host( [margin=xs] ) p { margin: 8px; }                    
        :host( [margin=xxs] ) p { margin: 4px; }                            
        :host( [margin=xxxs] ) p { margin: 2px; }                            
        :host( [margin=n] ) p { margin: 0; }                                    

        :host( [monospace] ) p {
          font-family: Monaco, Menlo, Consolas, "Courier Prime", Courier, "Courier New";
        }

        :host( [padding=xxx] ) p { padding: 0; }        
        :host( [padding=xxl] ) p { padding: 32px; }
        :host( [padding=xl] ) p { padding: 24px; }        
        :host( [padding=l] ) p { padding: 20px; }                
        :host( [padding=m] ) p { padding: 16px; }                        
        :host( [padding=s] ) p { padding: 12px; }                                
        :host( [padding=xs] ) p { padding: 8px; }                    
        :host( [padding=xxs] ) p { padding: 4px; }                            
        :host( [padding=xxxs] ) p { padding: 2px; }                            
        :host( [padding=n] ) p { padding: 0; }                                           

        :host( [text-align=center] ) p { text-align: center; }
        :host( [text-align=right] ) p { text-align: right; }        

        :host( [truncate] ) {
          width: 100%;
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
          padding: 4px 0 4px 0;
        }
        :host( [variant=h2] ) p {
          font-size: 20px;
          font-weight: 700;
          line-height: 24px;   
          padding: 4px 0 4px 0;                 
        }        
        :host( [variant=h3] ) p {
          font-size: 18px;
          font-weight: 700;
          line-height: 22px;          
          padding: 4px 0 4px 0;                           
        }                
        :host( [variant=h4] ) p {
          font-size: 16px;
          font-weight: 700;
          line-height: 20px;          
          padding: 4px 0 4px 0;                                     
        }                        
        :host( [variant=h5] ) p {
          font-size: 14px;
          font-weight: 700;
          line-height: 18px;          
          padding: 4px 0 4px 0;                                     
        }                                
        :host( [variant=p] ) p {
          font-size: 14px;
          line-height: 20px;      
          padding: 4px 0 4px 0;                                                   
        }        
        :host( [variant=code] ) p {
          font-family: Monaco, Menlo, Consolas, "Courier Prime", Courier, "Courier New";
          font-size: 12px;
          line-height: 16px;         
        }
        :host( [variant=key-label] ) p {
          font-weight: 700;
        }        
        :host( [variant=strong] ) p {
          font-weight: 700;
        }                
        :host( [variant=small] ) p {
          color: #5f6b7a;
          font-size: 12px;
          line-height: 16px;          
        }
        :host( [variant=pre] ) p {
          font-family: Monaco, Menlo, Consolas, "Courier Prime", Courier, "Courier New";
          font-size: 14px;
          line-height: 20px;        
          margin: 14px 0 14px 0;             
        }                                
        :host( [variant=samp] ) p {
          font-family: Monaco, Menlo, Consolas, "Courier Prime", Courier, "Courier New";
          font-size: 14px;
          line-height: 20px;          
        }         
        :host( [variant=value-large] ) p {
          font-size: 42px;
          font-weight: 700;
          line-height: 48px;
        }                                               

        :host( [disabled] ) p {
          color: var( --label-disabled-color, #9ba7b6 );
        }                
      </style>
      <p part="label">
        <slot></slot>
      </p>
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
    this._upgrade( 'balanced' );                            
    this._upgrade( 'color' );                        
    this._upgrade( 'disabled' );                    
    this._upgrade( 'display' );                        
    this._upgrade( 'float' );                        
    this._upgrade( 'fontSize' );                    
    this._upgrade( 'fontWeight' );                        
    this._upgrade( 'hidden' );    
    this._upgrade( 'margin' );    
    this._upgrade( 'monospace' );        
    this._upgrade( 'padding' );        
    this._upgrade( 'text' );        
    this._upgrade( 'text-align' );            
    this._upgrade( 'truncate' );    
    this._upgrade( 'variant' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'balanced',
      'color',      
      'disabled',
      'display',
      'float',
      'font-size',
      'font-weight',
      'hidden',
      'margin',
      'monospace',
      'padding',
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

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get balanced() {
    return this.hasAttribute( 'balanced' );
  }

  set balanced( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'balanced' );
      } else {
        this.setAttribute( 'balanced', '' );
      }
    } else {
      this.removeAttribute( 'balanced' );
    }
  }

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

  get monospace() {
    return this.hasAttribute( 'monospace' );
  }

  set monospace( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'monospace' );
      } else {
        this.setAttribute( 'monospace', '' );
      }
    } else {
      this.removeAttribute( 'monospace' );
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

window.customElements.define( 'rf-label', RFLabel );
