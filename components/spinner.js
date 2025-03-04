export default class RFSpinner extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-flex;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        @keyframes spin {
          0% {
            stroke-dasharray: 1% 300%;
            transform: rotate( 0 );
          }

          50% {
            stroke-dasharray: 137% 137%;
            transform: rotate( 450deg );            
          }
          
          100% {
            stroke-dasharray: 1% 300%;            
            transform: rotate( 1080deg );
          }
        }        

        svg {
          height: 16px;
          width: 16px;
        }

        circle:first-of-type {
          cx: 8px;
          cy: 8px;                    
          fill: none;
          r: calc( 6px - var( --spinner-track-width, 2px ) / 2 );          
          stroke: var( --spinner-track-color, transparent );
          stroke-width: var( --spinner-track-width, 2px );
        }

        circle:last-of-type {
          animation: spin var( --spinner-speed, 2s ) linear infinite;
          cx: 8px;
          cy: 8px;
          fill: none;
          r: calc( 6px - var( --spinner-track-width, 2px ) / 2 );
          stroke: var( --spinner-indicator-color, #000716 );
          stroke-dasharray: 150% 75%;          
          stroke-linecap: round;
          stroke-width: var( --spinner-track-width, 2px );
          transform-origin: 50% 50% 0px;
        }

        :host( [size=big] ) svg {
          height: 32px;
          width: 32px;
        }
        :host( [size=big] ) circle {
          cx: 16px;
          cy: 16px;
          r: calc( 12px - var( --spinner-track-width, 2px ) / 2 );          
        }

        :host( [size=large] ) svg {
          height: 48px;
          width: 48px;
        }
        :host( [size=large] ) circle {
          cx: 24px;
          cy: 24px;
          r: calc( 18px - var( --spinner-track-width, 2px ) / 2 );          
        }

        :host( [disabled] ) circle:last-of-type {
          stroke: #9ba7b6;
        }

        :host( [inverted] ) circle:last-of-type {
          stroke: #ffffff;
        }        
      </style>
      <svg part="vector">
        <circle></circle>
        <circle></circle>
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
    this._upgrade( 'disabled' );                    
    this._upgrade( 'hidden' );                    
    this._upgrade( 'inverted' );                    
    this._upgrade( 'size' );                
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'disabled',
      'hidden',
      'inverted',
      'size'
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
}

window.customElements.define( 'rf-spinner', RFSpinner );
