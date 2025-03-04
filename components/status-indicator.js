import RFSpinner from "./spinner.js";

export default class RFStatusIndicator extends HTMLElement {
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

        p {
          box-sizing: border-box;
          color: var( --status-indicator-color, #037f0c );
          cursor: var( --status-indicator-cursor, default );
          display: inline;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: var( --status-indicator-font-size, 14px );
          font-style: var( --status-indicator-font-style );
          font-weight: var( --status-indicator-font-weight, 400 );
          line-height: var( --status-indicator-line-height, 20px );
          margin: var( --status-indicator-margin, 0 );
          padding: var( --status-indicator-padding, 0 );
          text-align: var( --status-indicator-text-align, left );
          text-decoration: var( --status-indicator-text-decoration, none );
          text-rendering: optimizeLegibility;
          width: 100%;
        }                

        rf-spinner {
          --spinner-indicator-color: #5f6b7a;
        }

        svg {
          align-self: flex-start;
          box-sizing: border-box;
          display: inline-block;
          height: 16px;
          min-height: 16px;
          min-width: 16px;
          width: 16px;
        }

        :host( :empty ) p {
          display: none;
        }

        :host( [type=error] ) g[part=error] { display: block; }
        :host( [type=error] ) circle { stroke: #d91515; }                
        :host( [type=error] ) path { stroke: #d91515; }        
        :host( [type=error] ) p { color: #d91515; }                

        :host( [type=warning] ) g[part=warning] { display: block; }
        :host( [type=warning] ) path { stroke: #8d6605; }      
        :host( [type=warning] ) p { color: #8d6605; }                        

        :host( [type=info] ) g[part=info] { display: block; }
        :host( [type=info] ) circle { stroke: #0972d3; }                                
        :host( [type=info] ) path { stroke: #0972d3; }      
        :host( [type=info] ) p { color: #0972d3; }                                

        :host( [type=stopped] ) g[part=stopped] { display: block; }
        :host( [type=stopped] ) circle { stroke: #5f6b7a; }                        
        :host( [type=stopped] ) path { stroke: #5f6b7a; }      
        :host( [type=stopped] ) p { color: #5f6b7a; }                                        
        
        :host( [type=pending] ) g[part=pending] { display: block; }
        :host( [type=pending] ) circle { stroke: #5f6b7a; }                        
        :host( [type=pending] ) path { stroke: #5f6b7a; }      
        :host( [type=pending] ) p { color: #5f6b7a; }         
        
        :host( [type=in-progress] ) g[part=progress] { display: block; }
        :host( [type=in-progress] ) circle { stroke: #5f6b7a; }                        
        :host( [type=in-progress] ) path { stroke: #5f6b7a; }      
        :host( [type=in-progress] ) p { color: #5f6b7a; }                 

        :host( [type=loading] ) g[part=loading] { display: block; }
        :host( [type=loading] ) circle { stroke: #5f6b7a; }                        
        :host( [type=loading] ) path { stroke: #5f6b7a; }      
        :host( [type=loading] ) p { color: #5f6b7a; }                         
        :host( [type=loading] ) svg { display: none; }    
        
        :host( [type=success] ) g[part=success] { display: inline-block; }        

        :host( [color=blue] ) circle { stroke: #0972d3; }                                
        :host( [color=blue] ) path { stroke: #0972d3; }      
        :host( [color=blue] ) p { color: #0972d3; }                                

        :host( [color=grey] ) circle { stroke: #5f6b7a; }                                
        :host( [color=grey] ) path { stroke: #5f6b7a; }      
        :host( [color=grey] ) p { color: #5f6b7a; }                                       
        
        :host( [color=green] ) circle { stroke: #037f0c; }                                
        :host( [color=green] ) path { stroke: #037f0c; }      
        :host( [color=green] ) p { color: #037f0c; }                                               

        :host( [color=red] ) circle { stroke: #d91515; }                                
        :host( [color=red] ) path { stroke: #d91515; }      
        :host( [color=red] ) p { color: #d91515; }                                                      
        
        :host( [color=yellow] ) circle { stroke: #8d6605; }                                
        :host( [color=yellow] ) path { stroke: #8d6605; }      
        :host( [color=yellow] ) p { color: #8d6605; }                                                       
        
        :host( [color=inverted] ) circle { stroke: #ffffff; }                                
        :host( [color=inverted] ) path { stroke: #ffffff; }      
        :host( [color=inverted] ) p { color: #ffffff; }                                                               

        :host( [color=black] ) circle { stroke: #000716; }                                
        :host( [color=black] ) path { stroke: #000716; }      
        :host( [color=black] ) p { color: #000716; }                                                                       

        :host( :not( [type] ) ) g[part=success] { display: inline-block; }
        :host( :not( [type=loading] ) ) rf-spinner { display: none; }
      </style>
      <rf-spinner part="spinner"></rf-spinner>
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
      <p part="label">
        <slot></slot>
      </p>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$spinner = this.shadowRoot.querySelector( 'rf-spinner' );
  }

  // When things change
  _render() {
    this.$spinner.inverted = this.type === 'loading' ? true : false;
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
    this._upgrade( 'type' );      
    this._upgrade( 'truncate' );                   
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'color',
      'hidden',
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

window.customElements.define( 'rf-status-indicator', RFStatusIndicator );
