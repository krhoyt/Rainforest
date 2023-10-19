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

        a {
          align-items: center;
          border: none;
          color: #0972d3;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin: 0;
          outline: none;
          padding: 0;
          text-decoration: none;
          text-rendering: optimizeLegibility;
          -webkit-tap-highlight-color: transparent;          
        }

        img {
          box-sizing: border-box;
          cursor: pointer;
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 35% )
            sepia( 30% )
            saturate( 4678% )
            hue-rotate( 193deg )
            brightness( 86% )
            contrast( 93% );          
          height: 16px;
          margin: 0 0 0 4px;
          object-fit: contain;
          width: 16px;
        }        

        a:hover {
          color: #033160;
          text-decoration: underline;
        }

        a:hover img {
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 11% )
            sepia( 88% )
            saturate( 2426% )
            hue-rotate( 198deg )
            brightness( 91% )
            contrast( 98% );
        }
        
        :host( [color=inverted] ) a { color: #ffffff; }
        :host( [color=inverted] ) img {
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 98% )
            sepia( 6% )
            saturate( 122% )
            hue-rotate( 328deg )
            brightness( 116% )
            contrast( 100% );          
        }        

        :host( [variant=awsui-value-large] ) a {
          font-size: 42px;
          font-weight: 700;
          line-height: 48px;
          text-decoration: underline;
        }
        :host( [variant=info] ) a {
          font-size: 12px;
          font-weight: 700;
          line-height: 16px;
          text-decoration: none;
        }
        :host( [variant=primary] ) a {
          text-decoration: underline;
        }        

        :host( [font-size=body-s] ) a { 
          font-size: 12px; 
          line-height: 16px;
        }
        :host( [font-size=body-m] ) a { 
          font-size: 14px; 
          line-height: 20px;          
        }        
        :host( [font-size=heading-xs] ) a { 
          font-size: 14px; 
          line-height: 18px;
        }        
        :host( [font-size=heading-s] ) a { 
          font-size: 16px; 
          line-height: 20px;                    
        }                
        :host( [font-size=heading-m] ) a { 
          font-size: 18px; 
          line-height: 22px;                              
        }                        
        :host( [font-size=heading-l] ) a {
          font-size: 20px; 
          line-height: 24px;                                        
        }                                
        :host( [font-size=heading-xl] ) a { 
          font-size: 24px; 
          line-height: 30px;                                        
        }                                
        :host( [font-size=display-l] ) a { 
          font-size: 42px; 
          line-height: 48px;                                        
        }                                

        :host( :not( [external] ) ) img {
          display: none;
        }

        :host( :not( [href] ) ) a { font-weight: 700; }
        :host( :not( [href] ) ) a:hover { text-decoration: none; }
      </style>
      <a part="link">
        <slot></slot>
        <img part="icon" src="../icons/external.svg" />
      </a>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$link = this.shadowRoot.querySelector( 'a' );
    this.$link.addEventListener( 'click', () => {
      this.dispatchEvent( new CustomEvent( 'rf-follow', {
        detail: {
          external: this.external,
          href: this.href,
          target: this.target
        }
      } ) );
    } );
  }

  focus() {
    this.$link.focus();
  }

  // When things change
  _render() {
    this.$link.href = this.href === null ? '' : this.href;
    this.$link.target = this.target === null ? '' : this.target;

    if( ( this.external || this.target === '_blank' ) && this.rel === null ) {
      this.$link.rel = 'noopener noreferrer';
    } else {
      this.$link.rel = this.rel === null ? '' : this.rel;
    }
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
    this._upgrade( 'external' );    
    this._upgrade( 'fontSize' );                    
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
      'external',
      'font-size',
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
