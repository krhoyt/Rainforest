export default class RainforestSpinner extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = /* template */ `
      <style>
        :host {
          align-items: center;
          box-sizing: border-box;
          display: inline-flex;
          position: relative;
        }

        @keyframes spin {
          from {
            transform: rotate( 0 );
          }
          
          to {
            transform: rotate( 360deg );
          }
        }        

        svg {
          animation: 1.50s infinite spin;
          animation-timing-function: linear;
          height: var( --spinner-height, 12px );
          width: var( --spinner-width, 12px );
        }

        svg circle {
          fill: var( --spinner-fill, none );
          r: var( --spinner-radius, 5px );
          stroke: var( --spinner-stroke, #000716 );
          stroke-dasharray: var( --spinner-stroke-dasharray, 20px );          
          stroke-width: var( --spinner-stroke-width, 2px );
        }

        :host( [size=big] ) svg {
          height: 24px;
          width: 24px;
        }

        :host( [size=big] ) svg circle {
          r: 11px;
          stroke-dasharray: 40px;
        }                       

        :host( [size=large] ) svg {
          height: 36px;
          width: 36px;
        }       
        
        :host( [size=large] ) svg circle {
          r: 17px;
          stroke-dasharray: 60px;
        }               

        :host( [variant=disabled] ) svg circle {
          stroke: #9ba7b6;
        }

        :host( [variant=inverted] ) svg circle {
          stroke: #ffffff;
        }
      </style>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        part="vector"
        preserveAspectRatio="xMidYMid">
        <circle cx="50%" cy="50%" part="circle"></circle>
      </svg>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );
  }

  // When things change
  _render() {;}

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
    this._upgrade( 'size' );                
    this._upgrade( 'variant' );            
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'size',
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

window.customElements.define( 'rf-spinner', RainforestSpinner );
