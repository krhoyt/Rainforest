import RainforestIcon from "./icon.js";

export default class RainforestLink extends HTMLElement {
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

        button {
          align-items: center;
          background: none;
          border: none;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          margin: 0;
          padding: 0;
          width: 100%;
          -webkit-tap-highlight-color: transparent;
        }

        button span {
          color: #0972d3;          
          font-family: 'Amazon Ember';
          font-size: var( --font-size-body-medium, 14px );
          font-weight: 400;          
          line-height: 20px;          
          text-rendering: optimizeLegibility;
        }

        button:hover span {
          color: #033160;
          text-decoration: underline;
        }

        button:hover rf-icon::part( icon ) {
          filter: var( --filter-color-primary );
        }
        
        rf-icon {
          margin: 0 0 0 4px;
          --icon-cursor: pointer;
        }

        rf-icon::part( icon ) {
          filter: var( --filter-color-link );
        }

        :host( [color=inverted] ) span {
          color: #ffffff;
        }

        :host( [color=inverted] ) rf-icon::part( icon ) {
          filter: var( --filter-color-inverted );
        }        

        :host( [variant=awsui-value-large] ) button span {
          font-size: var( --font-size-awsui-display-large );
          font-weight: 700;
          text-decoration: underline;
        }

        :host( [variant=info] ) button span {
          font-size: var( --font-size-awsui-body-small );
          font-weight: 700;
        }

        :host( [fontsize=body-s] ) span { font-size: var( --font-size-body-small ); }
        :host( [fontsize=body-m] ) span { font-size: var( --font-size-body-medium ); }        
        :host( [fontsize=heading-xs] ) span { font-size: var( --font-size-heading-extra-small ); }        
        :host( [fontsize=heading-s] ) span { font-size: var( --font-size-heading-small ); }                
        :host( [fontsize=heading-m] ) span { font-size: var( --font-size-heading-medium ); }                        
        :host( [fontsize=heading-l] ) span { font-size: var( --font-size-heading-large ); }                                
        :host( [fontsize=heading-xl] ) span { font-size: var( --font-size-heading-extra-large ); }                                
        :host( [fontsize=display-l] ) span { font-size: var( --font-size-display-large ); }                                

        :host( [variant=primary] ) button span {
          text-decoration: underline;
        }

        :host( :not( [external] ) ) rf-icon {
          display: none;
        }
      </style>
      <button part="button" type="button">
        <span part="span">
          <slot></slot>
        </span>
        <rf-icon name="external" part="icon"></rf-icon>              
      </button>
    `;

    // Properties
    this._data = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$button.addEventListener( 'click', () => {
      if( this.href !== null ) {
        const link = document.createElement( 'a' );
        this.shadowRoot.appendChild( link );

        link.href = this.href;
        link.target = this.target === null ? '' : this.target;
        link.rel = this.rel === null ? 'noopener noreferrer' : this.rel;          

        link.click();
        link.remove();        

        this.dispatchEvent( new CustomEvent( 'rf-follow', {
          detail: {
            external: this.external,
            href: this.href,
            target: this.target
          }
        } ) );        
      }
    } );
  }

  focus() {
    this.$button.focus();
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
    this._upgrade( 'color' );    
    this._upgrade( 'concealed' );    
    this._upgrade( 'data' );            
    this._upgrade( 'external' );    
    this._upgrade( 'fontSize' );                    
    this._upgrade( 'hidden' );    
    this._upgrade( 'href' );    
    this._upgrade( 'rel' );        
    this._upgrade( 'target' );        
    this._upgrade( 'variant' );            
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'color',
      'concealed',
      'external',
      'fontsize',
      'hidden',
      'href',
      'rel',
      'target',
      'variant'
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

  get external() {
    return this.hasAttribute( 'external' );
  }

  set external( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'external' );
      } else {
        this.setAttribute( 'external', '' );
      }
    } else {
      this.removeAttribute( 'external' );
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

  get href() {
    if( this.hasAttribute( 'href' ) ) {
      return this.getAttribute( 'href' );
    }

    return null;
  }

  set href( value ) {
    if( value !== null ) {
      this.setAttribute( 'href', value );
    } else {
      this.removeAttribute( 'href' );
    }
  }

  get rel() {
    if( this.hasAttribute( 'rel' ) ) {
      return this.getAttribute( 'rel' );
    }

    return null;
  }

  set rel( value ) {
    if( value !== null ) {
      this.setAttribute( 'rel', value );
    } else {
      this.removeAttribute( 'rel' );
    }
  }  
  
  get target() {
    if( this.hasAttribute( 'target' ) ) {
      return this.getAttribute( 'target' );
    }

    return null;
  }

  set target( value ) {
    if( value !== null ) {
      this.setAttribute( 'target', value );
    } else {
      this.removeAttribute( 'target' );
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

window.customElements.define( 'rf-link', RainforestLink );
