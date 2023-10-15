import RainforestBox from "./box.js";
import RainforestButton from "./button.js";
import RainforestIcon from "./icon.js";

export default class RainforestAlert extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: none;
          position: relative;
        }

        :host( [concealed] ) {
          visibility: hidden;
        }        

        :host( [hidden] ) {
          display: none;
        }

        div[part=alert] {
          background-color: var( --color-background-status-info );
          border-color: var( --color-border-status-info );
          border-style: solid;
          border-radius: var( --border-radius-alert );
          border-width: 2px;          
          display: flex;
          flex-direction: row;
          padding: 8px 16px 8px 16px;
        }

        div[part=message] {
          display: flex;
          flex-basis: 0;
          flex-direction: column;
          flex-grow: 1;
          margin: 4px;
          padding: 2px 0 2px 0;
        }

        rf-box::part( box ) {
          padding: 0;
        }

        rf-button[part=button] {
          align-self: flex-start;
        }

        rf-button[part=close] {
          margin: 0 -4px 0 12px;
        }

        rf-button[part=close]::part( button ) {
          width: 28px;
        }

        rf-button[part=close]::part( icon ) {
          margin: 0;
        }

        rf-icon {
          margin: 4px 4px 4px 0;
          padding: 4px 0 4px 0;
        }

        rf-icon::part( icon ) {
          filter: var( --filter-color-link );
        }

        :host( [buttontext] ) div[part=alert] > div {
          padding-bottom: 4px;
        }        

        :host( [type=error] ) div[part=alert],
        :host( [variant=error] ) div[part=alert] {
          background-color: var( --color-background-status-error  );
          border-color: var( --color-border-status-error );
        }
        :host( [type=error] ) rf-icon::part( icon ),
        :host( [variant=error] ) rf-icon::part( icon ) {        
          filter: var( --filter-color-error );
        }
        
        :host( [type=success] ) div[part=alert],
        :host( [variant=success] ) div[part=alert] {
          background-color: var( --color-background-status-success  );
          border-color: var( --color-border-status-success );
        }
        :host( [type=success] ) rf-icon::part( icon ),
        :host( [variant=success] ) rf-icon::part( icon ) {        
          filter: var( --filter-color-success );
        }        

        :host( [type=warning] ) div[part=alert],
        :host( [variant=warning] ) div[part=alert] {
          background-color: var( --color-background-status-warning  );
          border-color: var( --color-border-status-warning );
        }
        :host( [type=warning] ) rf-icon::part( icon ),
        :host( [variant=warning] ) rf-icon::part( icon ) {        
          filter: var( --filter-color-warning );
        }

        :host( [visible] ) {
          display: inline-block;
        }

        :host( :not( [buttontext] ) ) rf-button[part=button] {
          display: none;
        }

        :host( :not( [dismissable] ) ) rf-button[part=close] {
          display: none;
        }

        :host( :not( [header] ) ) rf-box[part=header] {
          display: none;
        }

        ::slotted( rf-button[slot=action] ) {
          align-self: flex-start;
          padding-bottom: 4px;
        }
      </style>
      <div part="alert">
        <rf-icon name="status-info" part="icon"></rf-icon>   
        <div>
          <div part="message">
            <rf-box part="header" variant="strong"></rf-box>
            <slot name="header"></slot>
            <rf-box part="content">
              <slot></slot>
            </rf-box>        
          </div>
          <rf-button part="button"></rf-button>
          <slot name="action"></slot>          
        </div>
        <rf-button iconname="close" part="close" variant="icon"></rf-button>      
      </div>
    `;
    
    // Properties
    this._data = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'rf-button[part=button]' );    
    this.$button.addEventListener( 'click', () => {
      this.dispatchEvent( new CustomEvent( 'rf-action' ) );
    } );
    this.$close = this.shadowRoot.querySelector( 'rf-button[part=close]' );
    this.$close.addEventListener( 'rf-click', () => {
      this.dispatchEvent( new CustomEvent( 'rf-dismiss' ) );
    } );
    this.$header = this.shadowRoot.querySelector( 'rf-box[part=header]' );
    this.$icon = this.shadowRoot.querySelector( 'rf-icon' );
    this.$content = this.shadowRoot.querySelector( 'rf-box[part=content]' );
  }

  // When things change
  _render() {
    this.$header.content = this.header === null ? '' : this.header;
    this.$content.content = this.content === null ? '' : this.content;
    this.$button.text = this.buttonText === null ? '' : this.buttonText;

    switch( this.type ) {
      case 'error':
        this.$icon.name = 'status-negative';
        break;      
      case 'success':
        this.$icon.name = 'status-positive';
        break;
      case 'warning':
        this.$icon.name = 'status-warning';
        break;        
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
    this._upgrade( 'buttonText' );        
    this._upgrade( 'concealed' );    
    this._upgrade( 'content' );        
    this._upgrade( 'data' );            
    this._upgrade( 'dismissable' );                
    this._upgrade( 'header' );    
    this._upgrade( 'hidden' );    
    this._upgrade( 'type' );            
    this._upgrade( 'variant' );                
    this._upgrade( 'visible' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'buttontext',
      'concealed',
      'content',
      'dismissable',
      'header',
      'hidden',
      'type',
      'variant',
      'visible'
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
  get buttonText() {
    if( this.hasAttribute( 'buttontext' ) ) {
      return this.getAttribute( 'buttontext' );
    }

    return null;
  }

  set buttonText( value ) {
    if( value !== null ) {
      this.setAttribute( 'buttontext', value );
    } else {
      this.removeAttribute( 'buttontext' );
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

  get content() {
    if( this.hasAttribute( 'content' ) ) {
      return this.getAttribute( 'content' );
    }

    return null;
  }

  set content( value ) {
    if( value !== null ) {
      this.setAttribute( 'content', value );
    } else {
      this.removeAttribute( 'content' );
    }
  }

  get dismissable() {
    return this.hasAttribute( 'dismissable' );
  }

  set dismissable( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'dismissable' );
      } else {
        this.setAttribute( 'dismissable', '' );
      }
    } else {
      this.removeAttribute( 'dismissable' );
    }
  }  

  get header() {
    if( this.hasAttribute( 'header' ) ) {
      return this.getAttribute( 'header' );
    }

    return null;
  }

  set header( value ) {
    if( value !== null ) {
      this.setAttribute( 'header', value );
    } else {
      this.removeAttribute( 'header' );
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

  get type() {
    if( this.hasAttribute( 'type' ) ) {
      return this.getAttribute( 'type' );
    }

    return null;
  }

  set type( value ) {
    if( value !== null ) {
      this.setAttribute( 'type', value );
    } else {
      this.removeAttribute( 'type' );
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

  get visible() {
    return this.hasAttribute( 'visible' );
  }

  set visible( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'visible' );
      } else {
        this.setAttribute( 'visible', '' );
      }
    } else {
      this.removeAttribute( 'visible' );
    }
  }  
}

window.customElements.define( 'rf-alert', RainforestAlert );
