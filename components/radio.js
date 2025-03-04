export default class RFRadio extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: column;
          position: relative;
        }

        div {
          align-items: center;
          display: flex;
          flex-direction: row;
          gap: 8px;
        }

        input {
          appearance: none;
          border: none;
          box-sizing: border-box;
          cursor: pointer;
          height: 100%;
          left: 0;
          margin: 0;
          opacity: 0;
          padding: 0;
          position: absolute;
          top: 0;
          width: 100%;
          z-index: 1;
        }

        p {
          box-sizing: border-box;
          color: var( --radio-color, #000716 );
          cursor: var( --radio-cursor, default );
          display: inline;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: var( --radio-font-size, 14px );
          font-style: var( --radio-font-style );
          font-weight: var( --radio-font-weight, 400 );
          line-height: var( --radio-line-height, 20px );
          margin: var( --radio-margin, 0 );
          padding: var( --radio-padding, 0 );
          text-align: var( --radio-text-align, left );
          text-decoration: var( --radio-text-decoration, none );
          text-rendering: optimizeLegibility;
          width: 100%;
        }        

        p[part=description] {
          color: #5f6b7a;
          font-size: 12px;
          line-height: 16px;          
          padding: 0 0 4px 24px;
        }

        svg {
          box-sizing: border-box;
          display: inline-block;
          height: 16px;
          min-width: 16px;
          width: 16px;
        }

        :host( :not( [checked] ) ) circle {
          fill: #ffffff;
          stroke: #7d8998;
          stroke-width: 2px;
          r: 7px;
        }
        :host( [checked] ) circle {
          fill: #ffffff;
          stroke: #0972d3;
          stroke-width: 5px;
          r: 5.5px;
        }        

        :host( :not( [description ] ) ) p[part=description] {
          display: none;
        }

        :host( :not( [label ] ) ) p[part=label] {
          display: none;
        }        

        :host( [disabled] ) input { cursor: not-allowed; }
        :host( [disabled] ) circle {
          fill: #d1d5db;
          r: 8px;
          stroke: transparent;
        }
        :host( [disabled] ) p { color: var( --radio-disabled-color, #9ba7b6 ); }
      </style>
      <input part="input" type="radio" />      
      <div>
        <svg part="vector">
          <circle cx="8" cy="8"></circle>
        </svg> 
        <p part="label"></p>             
      </div>
      <p part="description"></p>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$description = this.shadowRoot.querySelector( 'p[part=description]' );    
    this.$icon = this.shadowRoot.querySelector( 'svg' );
    this.$label = this.shadowRoot.querySelector( 'p[part=label]' );

    this.$input = this.shadowRoot.querySelector( 'input' );
    this.$input.addEventListener( 'blur', () => this.dispatchEvent( new CustomEvent( 'rf-blur' ) ) );
    this.$input.addEventListener( 'focus', () => this.dispatchEvent( new CustomEvent( 'rf-focus' ) ) );
    this.$input.addEventListener( 'click', () => {
      if( this.toggle ) {
        this.checked = !this.checked;
      } else {
        this.checked = true; 
      }
      
      this.dispatchEvent( new CustomEvent( 'rf-change', {
        detail: {
          checked: this.checked,
          value: this.value
        }
      } ) );
    } );
  }

  focus() {
    this.$input.focus();
  }

  // When things change
  _render() {
    this.$description.innerText = this.description === null ? '' : this.description;
    this.$label.innerText = this.label === null ? '' : this.label;
    this.$input.checked = this.checked;
    this.$input.disabled = this.disabled;
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
    this._upgrade( 'checked' );        
    this._upgrade( 'description' );            
    this._upgrade( 'disabled' );       
    this._upgrade( 'hidden' );              
    this._upgrade( 'label' );            
    this._upgrade( 'name' );        
    this._upgrade( 'toggle' );            
    this._upgrade( 'value' );
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'checked',
      'description',
      'disabled',
      'hidden',
      'label',
      'name',
      'toggle',
      'value'
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
  get checked() {
    return this.hasAttribute( 'checked' );
  }

  set checked( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'checked' );
      } else {
        this.setAttribute( 'checked', '' );
      }
    } else {
      this.removeAttribute( 'checked' );
    }
  }

  get description() {
    if( this.hasAttribute( 'description' ) ) {
      return this.getAttribute( 'description' );
    }

    return null;
  }

  set description( value ) {
    if( value !== null ) {
      this.setAttribute( 'description', value );
    } else {
      this.removeAttribute( 'description' );
    }
  }

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

  get toggle() {
    return this.hasAttribute( 'toggle' );
  }

  set toggle( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'toggle' );
      } else {
        this.setAttribute( 'toggle', '' );
      }
    } else {
      this.removeAttribute( 'toggle' );
    }
  }  

  get value() {
    if( this.hasAttribute( 'value' ) ) {
      return this.getAttribute( 'value' );
    }

    return null;
  }

  set value( value ) {
    if( value !== null ) {
      this.setAttribute( 'value', value );
    } else {
      this.removeAttribute( 'value' );
    }
  }    
}

window.customElements.define( 'rf-radio', RFRadio );
