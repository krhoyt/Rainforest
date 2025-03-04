export default class RFBadge extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
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

        p {
          color: var( --badge-color, #fbfbfb );
          cursor: var( --badge-cursor, default );
          background-color: var( --badge-background-color, #414d5c );
          border-radius: var( --badge-border-radius, 4px );
          display: inline-block;  
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: var( --badge-font-size, 12px );
          line-height: var( --badge-line-height, 20px );
          margin: var( --badge-margin, 0 );
          padding: var( --badge-padding, 0 8px 0 8px );
          text-rendering: optimizeLegibility;                 
        }

        :host( [color=blue] ) p {
          background-color: #0972d3;
        }

        :host( [color=red] ) p {
          background-color: #d91515;
        }

        :host( [color=green] ) p {
          background-color: #037f0c;
        }

        :host( [color=severity-critical] ) p {
          background-color: #870303;
        }        

        :host( [color=severity-high] ) p {
          background-color: #ce3311;
        }                

        :host( [color=severity-medium] ) p {
          background-color: #f89256;
          color: #0f141a;
        }                        

        :host( [color=severity-low] ) p {
          background-color: #f2cd54;
          color: #0f141a;
        }                          
        
        :host( [color=severity-neutral] ) p {
          background-color: #656871;
        }                                  
      </style>
      <p part="label">
        <slot></slot>
      </p>
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
    this._upgrade( 'color' );                
    this._upgrade( 'hidden' );                    
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'color',
      'hidden'
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
}

window.customElements.define( 'rf-badge', RFBadge );
