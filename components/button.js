import RFIconExternal from "./icons/external.js";
import RFSpinner from "./spinner.js";

export default class RFButton extends HTMLElement {
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

        button {
          align-items: center;
          background: var( --button-background-color, none );
          border: none;
          border-style: var( --button-border-style, solid );
          border-width: var( --button-border-width, 2px );
          border-color: var( --button-border-color, #0972d3 );
          border-radius: var( --button-border-radius, 20px );
          box-sizing: border-box;
          cursor: var( --button-cursor, pointer );
          display: flex;
          flex-direction: row;
          height: var( --button-height, 32px );
          margin: var( --button-margin, 0 );
          outline: none;
          overflow: hidden;          
          padding: var( --button-padding, 4px 20px 4px 20px );
          position: relative;
          -webkit-tap-highlight-color: transparent;
        }

        button:hover {
          background-color: var( --button-hover-background-color, #f2f8fd );
          border-color: var( --button-hover-border-color, #033160 );
        }

        p {
          box-sizing: border-box;
          color: var( --button-color, #0972d3 );
          cursor: var( --button-cursor, pointer );          
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: var( --button-font-size, 14px );
          font-weight: var( --button-font-weight, 700 );     
          line-height: var( --button-line-height, 20px );               
          margin: 0;
          padding: 0;
          text-overflow: ellipsis;                    
          text-rendering: optimizeLegibility;
          white-space: nowrap;      
          width: 100%;                                  
        } 

        rf-spinner {
          cursor: not-allowed;
          margin: 0 8px 0 -4px;
          --spinner-indicator-color: #9ba7b6;          
        }

        rf-icon-external {
          margin: 0 0 0 4px;
          --icon-color: #0972d3;
        }

        button:hover p {
          color: var( --button-hover-color, #033160 );          
        }

        button:hover rf-icon-external {
          --icon-color: #033160;
        }

        button[disabled] {
          border-color: var( --button-disabled-border-color, #9ba7b6 );
          cursor: not-allowed;
        }

        button[disabled]:hover {        
          background: var( --button-disabled-background-color, none );          
        }

        button[disabled] p {
          color: var( --button-disabled-color, #9ba7b6 );
          cursor: not-allowed;
        }

        :host( [disabled] ) rf-icon-external {
          --icon-color: #9ba7b6;
        }

        :host( :not( [external] ) ) rf-icon-external {
          display: none;
        }

        :host( :not( [loading] ) ) rf-spinner {
          display: none;
        }

        /* Primary */
        :host( [variant=primary]:not( [disabled] ) ) button {
          background-color: var( --button-background-color, #006ce0 );
          border-color: var( --button-border-color, #006ce0 );
        }                

        :host( [variant=primary]:not( [disabled] ) ) button:hover {
          background-color: var( --button-hover-background-color, #002b66 );
          border-color: var( --button-hover-border-color, #002b66 );
        }                                

        :host( [variant=primary]:not( [disabled] ) ) button p {
          color: var( --button-color, #ffffff );
        }

        :host( [variant=primary]:not( [disabled] ) ) rf-icon-external {
          --icon-color: #ffffff;
        }

        :host( [variant=primary][disabled] ) button {
          background-color: var( --button-background-color, #ebebf0 );
          border-color: var( --button-border-color, #ebebf0 );          
        }

        /* Link */
        :host( [variant=link]:not( [disabled] ) ) button {
          background-color: var( --button-background-color, transparent );
          border-color: var( --button-border-color, transparent );
        }                        
        
        :host( [variant=link]:not( [disabled] ) ) button:hover {
          background-color: var( --button-hover-background-color, #f0fbff );
          border-color: var( --button-hover-border-color, #f0fbff );
        }                          
        
        :host( [variant=link][disabled] ) button {
          background-color: var( --button-background-color, transparent );
          border-color: var( --button-border-color, transparent );          
        }        

        /* Inline link */
        :host( [variant=inline-link]:not( [disabled] ) ) button {
          background-color: var( --button-background-color, transparent );
          border: none;
          height: var( --button-height, 20px );          
          padding: var( --button-padding, 0 );
        }                        

        :host( [variant=inline-link]:not( [disabled] ) ) button:hover {
          background-color: var( --button-hover-background-color, transparent );
        }                          
        
        :host( [variant=inline-link][disabled] ) button {
          border: none;
          height: var( --button-height, 20px );
          padding: var( --button-padding, 0 );
        }                

        :host( [loading] ) rf-spinner {        
          margin: 0 8px 0 0;          
        }

        /* Icon */
        /* Inline icon */        
        :host( [variant=icon] ) button,
        :host( [variant=inline-icon] ) button {
          border: none;
          padding: 0 8px 0 8px;
        }

        :host( [external][variant=inline-icon] ) rf-icon-external,
        :host( [external][variant=icon] ) rf-icon-external {
          display: none;
        }        

        :host( [loading][variant=inline-icon] ) rf-spinner,
        :host( [loading][variant=icon] ) rf-spinner {
          margin: 0;
        }        

        :host( [variant=inline-icon]:not( [disabled] ) ) button:hover,
        :host( [variant=icon]:not( [disabled] ) ) button:hover {
          background-color: var( --button-hover-background-color, transparent );
        }             

        /* Alignment */
        :host( [icon-align=right] ) button {
          flex-direction: row-reverse;
        }
      </style>
      <button part="button" type="button">
        <rf-spinner exportparts="vector: svg" part="spinner" variant="disabled"></rf-spinner>
        <slot name="icon"></slot>
        <p part="label">
          <slot></slot>
        </p>
        <rf-icon-external part="external"></rf-icon-external>
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
  }

  // Force focus
  focus() {
    this.$button.focus();
  }

  // When things change
  _render() {
    if( !this.disabled ) {
      this.disabled = this.loading;
    }

    this.$button.disabled = this.disabled;
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
    this._upgrade( 'external' );        
    this._upgrade( 'hidden' );     
    this._upgrade( 'href' );    
    this._upgrade( 'iconAlign' );        
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
      'external',
      'hidden',
      'href',
      'icon-align',
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

window.customElements.define( 'rf-button', RFButton );
