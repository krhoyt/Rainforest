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

        rf-box::part( box ) {
          padding: 0;
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

        :host( [coloroverride=blue] ) rf-box::part( box ) { 
          color: var( --color-link );
        }        

        :host( [coloroverride=blue] ) rf-icon::part( icon ) {
          filter: var( --filter-color-link );
        }

        :host( [coloroverride=grey] ) rf-box::part( box ) { 
          color: var( --color-inactive );
        }        

        :host( [coloroverride=grey] ) rf-icon::part( icon ) {
          filter: var( --filter-color-inactive );
        }        

        :host( [coloroverride=green] ) rf-box::part( box ) { 
          color: var( --color-success );
        }        

        :host( [coloroverride=green] ) rf-icon::part( icon ) {
          filter: var( --filter-color-success );
        }        

        :host( [coloroverride=red] ) rf-box::part( box ) { 
          color: var( --color-error );
        }

        :host( [coloroverride=red] ) rf-icon::part( icon ) {
          filter: var( --filter-color-error );
        }                

        :host( :not( [type=loading] ) ) rf-spinner {
          display: none;
        }

        :host( [type=loading] ) rf-icon {
          display: none;
        }

        :host( [coloroverride=blue] ) rf-spinner::part( circle ) {
          stroke: var( --color-link );
        }       

        :host( [coloroverride=green] ) rf-spinner::part( circle ) {
          stroke: var( --color-success );
        }               

        :host( [coloroverride=grey] ) rf-spinner::part( circle ) {
          stroke: var( --color-inactive );
        }                       

        :host( [coloroverride=red] ) rf-spinner::part( circle ) {
          stroke: var( --color-error );
        }        
      </style>
      <rf-spinner exportparts="circle: c, vector: v" part="spinner"></rf-spinner>
      <rf-icon exportpart="icon: i, vector: v" part="icon"></rf-icon>
      <rf-box exportparts="box: b" part="box">
        <slot></slot>
      </rf-box>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$box = this.shadowRoot.querySelector( 'rf-box' );
    this.$icon = this.shadowRoot.querySelector( 'rf-icon' );  
    this.$label = this.shadowRoot.querySelector( 'span' );  
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
    this._upgrade( 'type' );      
    this._upgrade( 'wrapText' );                   
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'color-override',
      'type',
      'wrap-text'      
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
  get colorOverride() {
    if( this.hasAttribute( 'color-override' ) ) {
      return this.getAttribute( 'color-override' );
    }

    return null;
  }

  set colorOverride( value ) {
    if( value !== null ) {
      this.setAttribute( 'color-override', value );
    } else {
      this.removeAttribute( 'color-override' );
    }
  }

  get wrapText() {
    return this.hasAttribute( 'wrap-text' );
  }

  set wrapText( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'wrap-text' );
      } else {
        this.setAttribute( 'wrap-text', '' );
      }
    } else {
      this.removeAttribute( 'wrap-text' );
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
