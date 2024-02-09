import RainforestLabel from "./label.js";

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

        :host( [hidden] ) {
          display: none;
        }

        rf-label {
          background-color: var( --badge-background-color, #414d5c );
          border-radius: var( --badge-border-radius, 4px );
          padding: var( --badge-padding, 0 8px 0 8px );
          --label-color: var( --badge-color, #fbfbfb );
          --label-cursor: var( --badge-cursor, default );
          --label-font-size: var( --badge-font-size, 12px );
        }

        :host( [color=blue] ) rf-label {
          background-color: #0972d3;
        }

        :host( [color=red] ) rf-label {
          background-color: #d91515;
        }

        :host( [color=green] ) rf-label {
          background-color: #037f0c;
        }

        :host( :not( [label] ) ) {
          display: none;
        }
      </style>
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
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'color',
      'hidden',
      'label'
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
}

window.customElements.define( 'rf-badge', RainforestBadge );
