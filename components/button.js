import RainforestIcon from "./icon.js";
import RainforestSpinner from "./spinner.js";

export default class RainforestButton extends HTMLElement {
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
          display: none;
          left: 0;
          position: absolute;
          top: 0;
        }

        button {
          align-items: center;
          background: none;
          border: none;
          border-style: solid;
          border-width: 2px;
          border-color: #0972d3;
          border-radius: 20px;
          box-sizing: border-box;
          color: #0972d3;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 700;
          height: 32px;
          line-height: 20px;
          margin: 0;
          outline: none;
          overflow: hidden;          
          padding: 4px 20px 4px 20px;
          text-overflow: ellipsis;                    
          text-rendering: optimizeLegibility;
          white-space: nowrap;          
          width: 100%;
          -webkit-tap-highlight-color: transparent;
        }

        button span {
          text-rendering: optimizeLegibility;
        }

        button:not( [disabled] ):hover {
          background-color: var( --color-secondary-hover );
          border-color: var( --color-primary-hover );
          color: var( --color-primary-hover );
        }

        button[disabled] {
          border-color: var( --color-secondary-disabled );
          color: var( --color-secondary-disabled );
          cursor: not-allowed;
        }

        img {
          cursor: pointer;
          filter: 
            brightness( 0 ) 
            saturate( 100% )                
            invert( 26% ) 
            sepia( 98% ) 
            saturate( 3640% ) 
            hue-rotate( 196deg ) 
            brightness( 97% ) 
            contrast( 93% );            
          height: 16px;
          margin: 0 8px 0 -4px;
          width: 16px;
        }

        rf-spinner {
          cursor: pointer;
          margin: 0 8px 0 -4px;
        }

        button:not( [disabled] ):hover img {        
          filter: 
            brightness( 0 ) 
            saturate( 100% )          
            invert( 4% ) 
            sepia( 24% ) 
            saturate( 4129% ) 
            hue-rotate( 186deg ) 
            brightness( 102% ) 
            contrast( 107% );          
        }

        button[disabled] rf-spinner,
        button[disabled] img {        
          cursor: not-allowed;
        }

        button[disabled] img {        
          filter: 
            brightness( 0 ) 
            saturate( 100% )                      
            invert( 74% ) 
            sepia( 4% ) 
            saturate( 1016% ) 
            hue-rotate( 173deg ) 
            brightness( 90% ) 
            contrast( 85% );          
        }        

        :host( [icon-align=right] ) button {
          flex-direction: row-reverse;
        }

        :host( [icon-align=right] ) img {
          margin: 0 -4px 0 8px;
        }       
        
        :host( [loading][icon-align=right] ) rf-spinner {
          order: 3;
        }               

        :host( [loading][icon-name] ) button img {
          display: none;
        }                       

        :host( [variant=icon] ) button {
          background-color: transparent;
          border-color: transparent;
          border-radius: 0;
          height: 32px;
          justify-content: center;
          padding: 0;
          width: 32px;
        }

        :host( [loading][variant=inline-icon] ) button img,
        :host( [loading][variant=icon] ) button img {
          display: none;
        }

        :host( [variant=icon] ) button img {
          filter: 
            brightness( 0 ) 
            saturate( 100% )                    
            invert( 25% ) 
            sepia( 43% ) 
            saturate( 260% ) 
            hue-rotate( 173deg ) 
            brightness( 98% ) 
            contrast( 89% );          
        }

        :host( [variant=inline-icon] ) button:not( [disabled] ):hover img,
        :host( [variant=icon] ) button:not( [disabled] ):hover img {
          filter:
            brightness( 0 ) 
            saturate( 100% )          
            invert( 4% ) 
            sepia( 24% ) 
            saturate( 4129% ) 
            hue-rotate( 186deg ) 
            brightness( 102% ) 
            contrast( 107% );
        }

        :host( [variant=inline-icon] ) button[disabled] img,
        :host( [variant=icon] ) button[disabled] img {        
          filter:
            brightness( 0 ) 
            saturate( 100% )          
            invert( 100% ) 
            sepia( 1% ) 
            saturate( 3425% ) 
            hue-rotate( 176deg ) 
            brightness( 99% ) 
            contrast( 87% );          
        }

        :host( [variant=inline-icon] ) button {
          background-color: transparent;
          border-color: transparent;
          border-radius: 0;
          height: 20px;
          justify-content: center;
          margin: 0;
          padding: 0;
          width: 20px;          
        }

        :host( [variant=inline-icon] ) button rf-spinner,
        :host( [variant=inline-icon] ) button img {        
          margin: 0;
          padding: 0;
        }

        :host( [variant=inline-icon] ) button img {
          filter: 
            brightness( 0 ) 
            saturate( 100% )                
            invert( 26% ) 
            sepia( 98% ) 
            saturate( 3640% ) 
            hue-rotate( 196deg ) 
            brightness( 97% ) 
            contrast( 93% );            
        }

        :host( [variant=link] ) button {
          background-color: transparent;
          border-color: transparent;
          color: #0972d3;
        }        

        :host( [variant=link] ) button:not( [disabled] ):hover {
          background-color: #f2f8fd;
          border-color: #f2f8fd;
          color: #033160;
        }

        :host( [variant=inline-link] ) button[disabled],
        :host( [variant=link] ) button[disabled] {
          background: transparent;
          border-color: transparent;
          border-radius: 0;
          color: #9ba7b6;
          cursor: not-allowed;
        }                        

        :host( [variant=inline-link] ) button {
          border-color: transparent;
          background-color: transparent;
          height: 20px;
          margin: 0;
          padding: 0;
        }                        

        :host( [variant=inline-link] ) button img {
          margin: 0 8px 0 0;
        }

        :host( [variant=inline-link] ) button rf-spinner {
          margin: 0 8px 0 0;          
        }

        :host( [variant=inline-link][icon-align=right] ) img {
          margin: 0 0 0 8px;
        }

        :host( [variant=inline-link] ) button:not( [disabled] ):hover {
          color: #033160;
        }                         

        :host( [variant=primary] ) button {
          background-color: #0972d3;
          border-color: #0972d3;
          color: #ffffff;        
        }                

        :host( [variant=primary] ) button:not( [disabled ] ) img {
          filter:
            brightness( 0 ) 
            saturate( 100% )                  
            invert( 100% ) 
            sepia( 2% ) 
            saturate( 0% ) 
            hue-rotate( 173deg ) 
            brightness( 103% ) 
            contrast( 101% );          
        }

        :host( [variant=primary] ) button:hover {
          background-color: #033160;
          border-color: #033160;          
        }

        :host( [variant=primary] ) button[disabled] {
          background-color: #e9ebed;
          border-color: #e9ebed;
          color: #9ba7b6;
          cursor: not-allowed;
        }                    
        
        :host( :not( [icon-name] ) ) img {
          display: none;
        }

        :host( :not( [loading] ) ) rf-spinner {        
          display: none;
        }

        :host( :not( [text] ) ) span {
          display: none;
        }
      </style>
      <button part="button" type="button">
        <rf-spinner exportparts="vector: v" part="spinner" variant="disabled"></rf-spinner>
        <img part="icon" />
        <slot></slot>
      </button>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$button.addEventListener( 'click', ( evt ) => {
      if( this.href !== null ) {
        const link = document.createElement( 'a' );
        this.shadowRoot.appendChild(  link );

        link.href = this.href;
        link.target = this.target === null ? '' : this.target;
        link.download = this.download === null ? '' : this.download;        
        link.rel = this.rel === null ? 'noopener noreferrer' : this.rel;          

        link.click();
        link.remove();        

        this.dispatchEvent( new CustomEvent( 'rf-follow', {
          detail: {
            href: this.href,
            target: this.target
          }
        } ) );
      }

      this.dispatchEvent( new CustomEvent( 'rf-click', {
        detail: {
          altKey: evt.altKey,
          ctrlKey: evt.ctrlKey,
          metaKey: evt.metaKey,
          shiftKey: evt.shiftKey
        }
      } ) );
    } );
    this.$icon = this.shadowRoot.querySelector( 'img' );  
  }

  // Force focus
  focus() {
    this.$button.focus();
  }

  // When things change
  _render() {
    if( this.disabled === false ) {
      this.disabled = this.loading;
    }

    this.$button.disabled = this.disabled;
    this.$icon.src = this.iconName === null ? '' : `../icons/${this.iconName}.svg`;
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
    this._upgrade( 'disabled' );    
    this._upgrade( 'download' );    
    this._upgrade( 'href' );    
    this._upgrade( 'iconAlign' );    
    this._upgrade( 'iconName' );
    this._upgrade( 'loading' );
    this._upgrade( 'rel' );    
    this._upgrade( 'target' );
    this._upgrade( 'variant' );
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'disabled',
      'download',
      'href',
      'icon-align',
      'icon-name',
      'loading',
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
  
  get download() {
    return this.hasAttribute( 'download' );
  }

  set download( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'download' );
      } else {
        this.setAttribute( 'download', '' );
      }
    } else {
      this.removeAttribute( 'download' );
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

  get iconAlign() {
    if( this.hasAttribute( 'icon-align' ) ) {
      return this.getAttribute( 'icon-align' );
    }

    return null;
  }

  set iconAlign( value ) {
    if( value !== null ) {
      this.setAttribute( 'icon-align', value );
    } else {
      this.removeAttribute( 'icon-align' );
    }
  }

  get iconName() {
    if( this.hasAttribute( 'icon-name' ) ) {
      return this.getAttribute( 'icon-name' );
    }

    return null;
  }

  set iconName( value ) {
    if( value !== null ) {
      this.setAttribute( 'icon-name', value );
    } else {
      this.removeAttribute( 'icon-name' );
    }
  }

  get loading() {
    return this.hasAttribute( 'loading' );
  }

  set loading( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'loading' );
      } else {
        this.setAttribute( 'loading', '' );
      }
    } else {
      this.removeAttribute( 'loading' );
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

window.customElements.define( 'rf-button', RainforestButton );
