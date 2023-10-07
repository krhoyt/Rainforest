export default class RainforestIcon extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
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

        img {
          box-sizing: border-box;
          display: block;
          cursor: var( --icon-cursor, default );
          filter: var( --filter-color-primary );          
          height: var( --icon-height, 16px );
          object-fit: var( --icon-object-fit, contain );
          width: var( --icon-width, 16px );
        }        

        :host( [size=big] ) img {
          height: 32px;
          width: 32px;
        }

        :host( [size=large] ) img {
          height: 48px;
          width: 48px;
        }        

        :host( [size=medium] ) img {
          height: 20px;
          width: 20px;
        }

        :host( [variant=disabled] ) img {
          filter: var( --filter-color-disabled );          
        }

        :host( [variant=subtle] ) img {
          filter: var( --filter-color-subtle );
        }        

        :host( [variant=error] ) img,
        :host( [variant=warning] ) img {
          filter: var( --filter-color-error );
        }        

        :host( [variant=info] ) img,
        :host( [variant=link] ) img {
          filter: var( --filter-color-link );
        }                

        :host( [variant=inverted] ) img {
          filter: var( --filter-color-inverted );
        }

        :host( [variant=success] ) img {
          filter: var( --filter-color-success );
        }        
      </style>
      <img part="icon" />
    `;

    // Properties
    this._data = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$image = this.shadowRoot.querySelector( 'img' );
  }

  // When things change
  _render() {
    let src = null;
    
    if( this.url === null ) {
      let name = this.name === null ? '' : this.name + '.svg';
      let path = this.path === null ? '../icons/' : this.path;      
      path = this.name === null ? '' : path;
      src = path + name;      
    } else {
      src = this.url;
    }

    this.$image.src = src;    
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
    this._upgrade( 'concealed' );    
    this._upgrade( 'data' );            
    this._upgrade( 'hidden' );    
    this._upgrade( 'name' );        
    this._upgrade( 'path' );                
    this._upgrade( 'size' );                
    this._upgrade( 'url' );                        
    this._upgrade( 'variant' );            
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'concealed',
      'hidden',
      'name',
      'path',
      'size',
      'url',
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

  get name() {
    if( this.hasAttribute( 'name' ) ) {
      return this.getAttribute( 'name' );
    }

    return null;
  }

  set name( value ) {
    if( value !== null ) {
      this.setAttribute( 'name', value );
    } else {
      this.removeAttribute( 'name' );
    }
  }

  get path() {
    if( this.hasAttribute( 'path' ) ) {
      return this.getAttribute( 'path' );
    }

    return null;
  }

  set path( value ) {
    if( value !== null ) {
      this.setAttribute( 'path', value );
    } else {
      this.removeAttribute( 'path' );
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

  get url() {
    if( this.hasAttribute( 'url' ) ) {
      return this.getAttribute( 'url' );
    }

    return null;
  }

  set url( value ) {
    if( value !== null ) {
      this.setAttribute( 'url', value );
    } else {
      this.removeAttribute( 'url' );
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

window.customElements.define( 'rf-icon', RainforestIcon );
