export default class RainforestLabel extends HTMLElement {
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

        :host( [hidden] ),
        :host( :not( [text] ) ) {
          display: none;
        }

        p {
          box-sizing: border-box;
          color: var( --label-color, #000716 );
          cursor: var( --label-cursor, default );
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: var( --label-font-size, 14px );
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

        :host( [monospace] ) p {
          font-family: Monaco, Menlo, Consolas, "Courier Prime", Courier, "Courier New";
        }

        :host( [truncate] ) {
          width: 100%;
        }
        :host( [truncate] ) p {
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        :host( [disabled] ) p {
          color: var( --label-disabled-color, #9ba7b6 );
        }                
      </style>
      <p part="label"></p>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$label = this.shadowRoot.querySelector( 'p' );
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
    this._upgrade( 'balanced' );                            
    this._upgrade( 'color' );                        
    this._upgrade( 'disabled' );                    
    this._upgrade( 'fontSize' );                    
    this._upgrade( 'fontWeight' );                        
    this._upgrade( 'hidden' );    
    this._upgrade( 'monospace' );        
    this._upgrade( 'text' );        
    this._upgrade( 'truncate' );    
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'balanced',
      'color',      
      'disabled',
      'font-size',
      'font-weight',
      'hidden',
      'monospace',
      'text',
      'truncate'
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

window.customElements.define( 'rf-label', RainforestLabel );
