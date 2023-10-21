export default class RainforestBadge extends HTMLElement {
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

        p {
          background-color: var( --badge-background-color, #414d5c );
          border-radius: var( --badge-border-radius, 4px );
          box-sizing: border-box;
          color: var( --badge-color, #fbfbfb );
          cursor: var( --badge-cursor, default );
          font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: var( --badge-font-size, 12px );
          font-weight: var( --badge-font-weight, 400 );
          line-height: var( --badge-line-height, 20px );
          margin: var( --badge-marge, 0 );
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
      </style>
      <p part="badge">
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
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'color'
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
}

window.customElements.define( 'rf-badge', RainforestBadge );
