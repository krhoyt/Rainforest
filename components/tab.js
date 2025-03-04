export default class RFTab extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
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

        button {
          background: none;
          border: none;
          box-sizing: border-box;
          cursor: pointer;
          margin: 0;
          padding: 9px 0 9px 0;
          position: relative;
          text-rendering: optimizeLegibility;
        }

        button span {
          border-right: solid 1px #b6bec9;
          color: var( --tab-color, #414d5c );
          display: inline-block;
          font-family: 'Open Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 20px;
          padding: 4px 20px 4px 20px;
        }

        button[disabled] {
          cursor: not-allowed;
        }

        button[disabled] span {
          color: var( --tab-disabled-color, #9ba7b6 );
        }

        button:last-of-type span {
          border-right: solid 1px transparent;
        }        

        :host( [selected] ) button::after {
          background-color: var( --tab-selected-color, #0972d3 );
          bottom: 0;
          content: ' ';
          height: 4px;
          left: 0;
          position: absolute;
          right: 0;
        }

        :host( [selected] ) span {
          color: var( --tab-selected-color, #0972d3 );
        }
      </style>
      <button part="button" type="button">
        <span></span>
      </button>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$button.addEventListener( 'click', () => {
      this.dispatchEvent( new CustomEvent( 'rf-change', {
        detail: {
          name: this.name
        }
      } ) );
    } );
    this.$span = this.shadowRoot.querySelector( 'span' );
  }

  // When things change
  _render() {
    this.$button.disabled = this.disabled;
    this.$span.innerText = this.label === null ? '' : this.label;
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
    this._upgrade( 'disabled' );              
    this._upgrade( 'hidden' );              
    this._upgrade( 'label' );          
    this._upgrade( 'name' );      
    this._upgrade( 'selected' );          
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'disabled',
      'hidden',
      'label',      
      'name',      
      'selected'
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

  get name() {
    if( this.hasAttribute( 'name' ) ) {
      return this.getAttribute( 'name' );
    }

    return null;
  }

  set name( value ) {
    if( value !== null ) {
      this.setAttribute( 'name', value );
    } else {
      this.removeAttribute( 'name' );
    }
  }    

  get selected() {
    return this.hasAttribute( 'selected' );
  }

  set selected( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'selected' );
      } else {
        this.setAttribute( 'selected', '' );
      }
    } else {
      this.removeAttribute( 'selected' );
    }
  }  
}

window.customElements.define( 'rf-tab', RFTab );
