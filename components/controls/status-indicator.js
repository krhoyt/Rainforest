import RainforestLabel from "./label.js";
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
          display: inline-flex;
          flex-direction: row;
          gap: 4px;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        g {
          display: none;
        }

        circle,
        path {
          fill: none;          
          stroke: var( --status-indicator-stroke, #037f0c );          
          stroke-width: var( --status-indicator-stroke-width, 2px );
        }        

        rf-label {
          --label-color: #037f0c;
        }

        rf-spinner {
          --spinner-indicator-color: #5f6b7a;
        }

        svg {
          box-sizing: border-box;
          display: inline-block;
          height: 16px;
          min-height: 16px;
          min-width: 16px;
          width: 16px;
        }

        :host( :not( [label ] ) ) rf-label {
          display: none;
        }

        :host( [type=error] ) g[part=error] { display: block; }
        :host( [type=error] ) circle { stroke: #d91515; }                
        :host( [type=error] ) path { stroke: #d91515; }        
        :host( [type=error] ) rf-label { --label-color: #d91515; }                

        :host( [type=warning] ) g[part=warning] { display: block; }
        :host( [type=warning] ) path { stroke: #8d6605; }      
        :host( [type=warning] ) rf-label { --label-color: #8d6605; }                        

        :host( [type=info] ) g[part=info] { display: block; }
        :host( [type=info] ) circle { stroke: #0972d3; }                                
        :host( [type=info] ) path { stroke: #0972d3; }      
        :host( [type=info] ) rf-label { --label-color: #0972d3; }                                

        :host( [type=stopped] ) g[part=stopped] { display: block; }
        :host( [type=stopped] ) circle { stroke: #5f6b7a; }                        
        :host( [type=stopped] ) path { stroke: #5f6b7a; }      
        :host( [type=stopped] ) rf-label { --label-color: #5f6b7a; }                                        
        
        :host( [type=pending] ) g[part=pending] { display: block; }
        :host( [type=pending] ) circle { stroke: #5f6b7a; }                        
        :host( [type=pending] ) path { stroke: #5f6b7a; }      
        :host( [type=pending] ) rf-label { --label-color: #5f6b7a; }         
        
        :host( [type=in-progress] ) g[part=progress] { display: block; }
        :host( [type=in-progress] ) circle { stroke: #5f6b7a; }                        
        :host( [type=in-progress] ) path { stroke: #5f6b7a; }      
        :host( [type=in-progress] ) rf-label { --label-color: #5f6b7a; }                 

        :host( [type=loading] ) g[part=loading] { display: block; }
        :host( [type=loading] ) circle { stroke: #5f6b7a; }                        
        :host( [type=loading] ) path { stroke: #5f6b7a; }      
        :host( [type=loading] ) rf-label { --label-color: #5f6b7a; }                         
        :host( [type=loading] ) svg { display: none; }                         

        :host( [color=blue] ) circle { stroke: #0972d3; }                                
        :host( [color=blue] ) path { stroke: #0972d3; }      
        :host( [color=blue] ) rf-label { --label-color: #0972d3; }                                

        :host( [color=grey] ) circle { stroke: #5f6b7a; }                                
        :host( [color=grey] ) path { stroke: #5f6b7a; }      
        :host( [color=grey] ) rf-label { --label-color: #5f6b7a; }                                       
        
        :host( [color=green] ) circle { stroke: #037f0c; }                                
        :host( [color=green] ) path { stroke: #037f0c; }      
        :host( [color=green] ) rf-label { --label-color: #037f0c; }                                               

        :host( [color=red] ) circle { stroke: #d91515; }                                
        :host( [color=red] ) path { stroke: #d91515; }      
        :host( [color=red] ) rf-label { --label-color: #d91515; }                                                      
        
        :host( [color=yellow] ) circle { stroke: #8d6605; }                                
        :host( [color=yellow] ) path { stroke: #8d6605; }      
        :host( [color=yellow] ) rf-label { --label-color: #8d6605; }                                                       
        
        :host( [color=inverted] ) circle { stroke: #ffffff; }                                
        :host( [color=inverted] ) path { stroke: #ffffff; }      
        :host( [color=inverted] ) rf-label { --label-color: #ffffff; }                                                               

        :host( :not( [type] ) ) g[part=success] { display: block; }
        :host( :not( [type=loading] ) ) rf-spinner { display: none; }
      </style>
      <rf-spinner exportparts="vector" part="spinner"></rf-spinner>
      <svg part="vector">
        <g part="error">
          <circle cx="8" cy="8" fill="none" r="7"></circle>
          <path d="m10.828 5.172-5.656 5.656M10.828 10.828 5.172 5.172"></path>        
        </g>
        <g part="warning">
          <path d="m8 1 7 14H1L8 1z"></path>
          <path d="M7.99 12H8v.01h-.01zM8 6v4"></path>        
        </g>
        <g part="success">
          <circle cx="8" cy="8" r="7"></circle>
          <path d="m5 8 2 2 3.521-3.521"></path>
        </g>
        <g part="info">
          <circle cx="8" cy="8" r="7"></circle>
          <path d="M8 11V8H6"></path>
          <path d="M10 11H6"></path>
          <path d="M7.99 5H8v.01h-.01z"></path>
        </g>        
        <g part="stopped">
          <circle cx="8" cy="8" r="7"></circle>
          <path d="M11 8H5"></path>        
        </g>
        <g part="pending">
          <circle cx="8" cy="8" r="7"></circle>
          <path d="M8 5v4H5"></path>        
        </g>
        <g part="progress">
          <circle cx="8" cy="8" r="7"></circle>
          <path d="M4.99 7.995H5v.01h-.01zM7.99 7.995H8v.01h-.01zM10.99 7.995H11v.01h-.01z"></path>    
        </g>
      </svg>
      <rf-label exportparts="label: p" part="label"></rf-label>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$label = this.shadowRoot.querySelector( 'rf-label' );  
  }

  // When things change
  _render() {
    this.$label.text = this.label;
    this.$label.truncate = this.truncate;
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
    this._upgrade( 'hidden' );
    this._upgrade( 'label' );
    this._upgrade( 'type' );      
    this._upgrade( 'truncate' );                   
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'color',
      'hidden',
      'label',
      'type',
      'truncate'      
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

  get truncate() {
    return this.hasAttribute( 'truncate' );
  }

  set truncate( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'truncate' );
      } else {
        this.setAttribute( 'truncate', '' );
      }
    } else {
      this.removeAttribute( 'truncate' );
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
