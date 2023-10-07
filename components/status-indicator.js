import RainforestBox from "./box.js";
import RainforestIcon from "./icon.js";
import RainforestSpinner from "./spinner.js";

export default class RainforestStatusIndicator extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = /* template */ `
      <style>
        :host {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          position: relative;
        }

        :host( [concealed] ) {
          visibility: hidden;
        }        

        :host( [hidden] ) {
          display: none;
        }        

        rf-icon {
          margin: 0 4px 0 0;
        }

        rf-icon::part( icon ) {
          filter: var( --filter-color-success );
        }

        rf-spinner {
          margin: 0 6px 0 2px;
        }

        rf-spinner::part( circle ) {
          stroke: var( --color-inactive );
        }

        :host( [type=error] ) rf-icon::part( icon ) {
          filter: var( --filter-color-error );
        }

        :host( [type=info] ) rf-icon::part( icon ) {
          filter: var( --filter-color-link );
        }        

        :host( [type=in-progress] ) rf-icon::part( icon ),
        :host( [type=pending] ) rf-icon::part( icon ),
        :host( [type=stopped] ) rf-icon::part( icon ) {
          filter: var( --filter-color-inactive );
        }                

        :host( [type=warning] ) rf-icon::part( icon ) {
          filter: var( --filter-color-warning );
        }        

        :host( [color-override=blue] ) rf-box::part( box ) { 
          color: var( --color-link );
        }        

        :host( [color-override=blue] ) rf-icon::part( icon ) {
          filter: var( --filter-color-link );
        }

        :host( [color-override=grey] ) rf-box::part( box ) { 
          color: var( --color-inactive );
        }        

        :host( [color-override=grey] ) rf-icon::part( icon ) {
          filter: var( --filter-color-inactive );
        }        

        :host( [color-override=green] ) rf-box::part( box ) { 
          color: var( --color-success );
        }        

        :host( [color-override=green] ) rf-icon::part( icon ) {
          filter: var( --filter-color-success );
        }        

        :host( [color-override=red] ) rf-box::part( box ) { 
          color: var( --color-error );
        }

        :host( [color-override=red] ) rf-icon::part( icon ) {
          filter: var( --filter-color-error );
        }                

        :host( :not( [type=loading] ) ) rf-spinner {
          display: none;
        }

        :host( [type=loading] ) rf-icon {
          display: none;
        }

        :host( [color-override=blue] ) rf-spinner::part( circle ) {
          stroke: var( --color-link );
        }       

        :host( [color-override=green] ) rf-spinner::part( circle ) {
          stroke: var( --color-success );
        }               

        :host( [color-override=grey] ) rf-spinner::part( circle ) {
          stroke: var( --color-inactive );
        }                       

        :host( [color-override=red] ) rf-spinner::part( circle ) {
          stroke: var( --color-error );
        }        
      </style>
      <rf-spinner part="spinner"></rf-spinner>
      <rf-icon part="icon"></rf-icon>
      <rf-box part="box">
        <slot></slot>
      </rf-box>
    `;

    // Properties
    this._data = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$box = this.shadowRoot.querySelector( 'rf-box' );
    this.$icon = this.shadowRoot.querySelector( 'rf-icon' );    
  }

  // When things change
  _render() {
    switch( this.type ) {
      case 'error':
        this.$icon.name = 'status-negative';
        this.$box.color = 'text-status-error';        
        break;
      case 'info':
        this.$icon.name = 'status-info';
        this.$box.color = 'text-status-info';        
        break;        
      case 'loading':
        this.$box.color = 'text-status-inactive';        
        break;                        
      case 'in-progress':
        this.$icon.name = 'status-in-progress';
        this.$box.color = 'text-status-inactive';        
        break;                
      case 'pending':
        this.$icon.name = 'status-pending';
        this.$box.color = 'text-status-inactive';        
        break;                
      case 'stopped':
        this.$icon.name = 'status-stopped';
        this.$box.color = 'text-status-inactive';        
        break;                
      case 'warning':
        this.$icon.name = 'status-warning';
        this.$box.color = 'text-status-warning';        
        break;        
      default:
        this.$icon.name = 'status-positive';
        this.$box.color = 'text-status-success';
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
    this._upgrade( 'colorOverride' )
    this._upgrade( 'concealed' );    
    this._upgrade( 'data' );            
    this._upgrade( 'hidden' );    
    this._upgrade( 'type' );      
    this._upgrade( 'wrapText' );                   
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'coloroverride',
      'concealed',
      'hidden',
      'type',
      'wraptext'      
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
  get colorOverride() {
    if( this.hasAttribute( 'coloroverride' ) ) {
      return this.getAttribute( 'coloroverride' );
    }

    return null;
  }

  set colorOverride( value ) {
    if( value !== null ) {
      this.setAttribute( 'coloroverride', value );
    } else {
      this.removeAttribute( 'coloroverride' );
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

  get wrapText() {
    return this.hasAttribute( 'wraptext' );
  }

  set wrapText( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'wraptext' );
      } else {
        this.setAttribute( 'wraptext', '' );
      }
    } else {
      this.removeAttribute( 'wraptext' );
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
}

window.customElements.define( 'rf-status-indicator', RainforestStatusIndicator );
