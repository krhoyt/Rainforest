import RainforestIcon from "./icon.js";

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

        :host( [concealed] ) {
          visibility: hidden;
        }

        :host( [hidden] ) {
          display: none;
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
          border: solid 2px #0972d3;
          border-radius: 20px;
          box-sizing: border-box;
          color: #0972d3;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          font-family: 'Amazon Ember';
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

        button:not( [disabled] ):hover {
          background-color: #f2f8fd;
          border: solid 2px #033160;
          color: #033160;
        }

        button[disabled] {
          border-color: #9ba7b6;
          color: #9ba7b6;
          cursor: not-allowed;
        }

        rf-icon {
          margin: 0 8px 0 -4px;
          --icon-cursor: pointer;
        }

        rf-icon::part( icon ) {
          filter: var( --icon-color-info );
        }

        button:not( [disabled] ):hover rf-icon::part( icon ) {        
          filter: var( --icon-color );
        }

        button[disabled] rf-icon {        
          --icon-cursor: not-allowed;
        }

        button[disabled] rf-icon::part( icon ) {        
          filter: var( --icon-color-disabled );
        }        

        :host( [icon-align=right] ) button {
          flex-direction: row-reverse;
        }

        :host( [icon-align=right] ) rf-icon {
          margin: 0 -4px 0 8px;
        }        

        :host( [variant=icon] ) button {
          background-color: transparent;
          border-color: transparent;
          height: 32px;
          justify-content: center;
          padding: 0;
          width: 32px;
        }

        :host( [variant=icon] ) button rf-icon::part( icon ) {
          filter: var( --icon-color-subtle );
        }

        :host( [variant=inline-icon] ) button:not( [disabled] ):hover rf-icon::part( icon ),
        :host( [variant=icon] ) button:not( [disabled] ):hover rf-icon::part( icon ) {
          filter: var( --icon-color );
        }

        :host( [variant=inline-icon] ) button[disabled] rf-icon::part( icon ),
        :host( [variant=icon] ) button[disabled] rf-icon::part( icon ) {        
          filter: var( --icon-color-disabled );
        }

        :host( [variant=inline-icon] ) button {
          background-color: transparent;
          border-color: transparent;
          height: 20px;
          justify-content: center;
          margin: 0;
          padding: 0;
          width: 20px;          
        }

        :host( [variant=inline-icon] ) button rf-icon {        
          margin: 0;
          padding: 0;
        }

        :host( [variant=inline-icon] ) button rf-icon::part( icon ) {
          filter: var( --icon-color-info );
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
          color: #9ba7b6;
        }                        

        :host( [variant=inline-link] ) button {
          border-color: transparent;
          background-color: transparent;
          height: 20px;
          margin: 0;
          padding: 0;
        }                        

        :host( [variant=inline-link] ) button rf-icon {
          margin: 0 8px 0 0;
        }

        :host( [variant=inline-link][icon-align=right] ) rf-icon {
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

        :host( [variant=primary] ) button:not( [disabled ] ) rf-icon::part( icon ) {
          filter: var( --icon-color-inverted );
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
        
        :host( :not( [icon-name] ) ) rf-icon {
          display: none;
        }
      </style>
      <button part="button" type="button">
        <rf-icon part="icon"></rf-icon>
        <span>
          <slot></slot>
        </span>
      </button>
    `;

    // Properties
    this._data = null;

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
    this.$icon = this.shadowRoot.querySelector( 'rf-icon' );    
  }

  // Force focus
  focus() {
    this.$button.focus();
  }

  // When things change
  _render() {
    this.$button.disabled = this.disabled;
    this.$icon.name = this.iconName;
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
    this._upgrade( 'disabled' );    
    this._upgrade( 'download' );    
    this._upgrade( 'hidden' );
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
      'concealed',
      'disabled',
      'download',
      'hidden',
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
