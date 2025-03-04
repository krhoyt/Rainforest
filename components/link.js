export default class RFLink extends HTMLElement {
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

        a {
          align-items: center;
          border: none;
          color: var( --link-color, #0972d3 );
          cursor: pointer;
          display: flex;
          flex-direction: row;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: var( --link-font-size, 14px );
          font-weight: var( --link-font-weight, 400 );
          gap: 4px;
          line-height: var( --link-line-height, 20px );
          margin: 0;
          outline: none;
          padding: var( --link-padding, 0 );
          text-decoration: var( --link-text-decoration, none );
          text-decoration-thickness: 1px;
          text-underline-offset: 0.25em;
          text-rendering: optimizeLegibility;
          -webkit-tap-highlight-color: transparent;          
        }

        line,
        polyline {
          fill: none;
          stroke: var( --link-color, #0972d3 );
          stroke-width: 2px;
        }

        line,
        polyline:first-of-type {
          stroke-miterlimit: 10;
        }

        polyline:last-of-type {
          stroke-linejoin: round;          
        }

        svg {
          display: inline-block;
          height: 16px;
          width: 16px;
        }

        a:hover {
          color: var( --link-hover-color, #033160 );
          text-decoration: var( --link-hover-text-decoration, underline );
        }

        a:hover line,
        a:hover polyline {
          stroke: var( --link-hover-color, #033160 );
        }

        :host( [color=inverted] ) a { color: #ffffff; }
        :host( [color=inverted] ) line, 
        :host( [color=inverted] ) polyline { 
          stroke: #ffffff; 
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
          text-decoration-thickness: 1px;          
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

        :host( :not( [external] ) ) svg {
          display: none;
        }

        :host( :not( [href] ) ) a { font-weight: 700; }
        :host( :not( [href] ) ) a:hover { text-decoration: none; }
      </style>
      <a part="link">
        <span part="label">
          <slot></slot>
        </span>
        <svg part="vector">
          <polyline points="10 2 14 2 14 6" />
          <line x1="6" y1="10" x2="14" y2="2" />
          <polyline points="14 9.048 14 14 2 14 2 2 7 2" />        
        </svg>
      </a>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    // this.$label = this.shadowRoot.querySelector( 'span' );
    this.$link = this.shadowRoot.querySelector( 'a' );
    this.$link.addEventListener( 'click', () => {
      this.dispatchEvent( new CustomEvent( 'rf-follow', {
        detail: {
          external: this.external,
          href: this.href
        }
      } ) );
    } );
  }

  focus() {
    this.$link.focus();
  }

  // When things change
  _render() {
    // this.$label.innerText = this.label;
    this.$link.href = this.href === null ? '' : this.href;
    this.$link.target = this.target === null ? '' : this.target;
    this.$link.title = this.title === null ? '' : this.title;

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
    this._upgrade( 'hidden' );        
    this._upgrade( 'href' );    
    this._upgrade( 'label' );        
    this._upgrade( 'rel' );        
    this._upgrade( 'target' );        
    this._upgrade( 'title' );            
    this._upgrade( 'variant' );            
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'color',
      'external',
      'font-size',
      'hidden',
      'href',
      'label',
      'rel',
      'target',
      'title',
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

  get title() {
    if( this.hasAttribute( 'title' ) ) {
      return this.getAttribute( 'title' );
    }

    return null;
  }

  set title( value ) {
    if( value !== null ) {
      this.setAttribute( 'title', value );
    } else {
      this.removeAttribute( 'title' );
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

window.customElements.define( 'rf-link', RFLink );
