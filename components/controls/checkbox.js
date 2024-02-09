import RainforestHBox from "../containers/hbox.js";
import RainforestLabel from "./label.js";

export default class RainforestCheckbox extends HTMLElement {
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

        input {
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

        polyline {
          fill: none;
          stroke: #ffffff;
          stroke-width: 2px;
        }

        rf-label[part=description] {
          padding: 0 0 4px 24px;
          --label-color: #5f6b7a;
          --label-font-size: 12px;
          --label-line-height: 16px;
        }

        svg {
          height: 16px;
          margin-top: 2px;
          width: 16px;
        }

        :host( :not( [checked] ) ) polyline { display: none; }
        :host( :not( [checked] ) ) rect {
          fill: none;
          stroke: #7d8998;
          stroke-width: 2px;
        }
        :host( [checked] ) polyline[part=check] { display: inline; }
        :host( [checked] ) rect {
          fill: #0972d3;
          stroke: #0972d3;
        }

        :host( :not( [indeterminate] ) ) polyline[part=indeterminate] { display: none; }
        :host( [indeterminate] ) polyline[part=check] { display: none; }        
        :host( [indeterminate] ) polyline[part=indeterminate] { display: inline; }        
        :host( [indeterminate] ) rect {
          fill: #0972d3;
          stroke: #0972d3;
        }

        :host( [disabled] ) input { cursor: not-allowed; }
        :host( [disabled] ) rect {
          fill: #d1d5db;
          stroke: #d1d5db;
        }
        :host( [disabled] ) rf-label { --label-color: #9ba7b6; }
      </style>
      <input part="input" type="checkbox" />      
      <rf-hbox gap="8">
        <svg part="vector">
          <rect part="box" x="1" y="1" rx="2" ry="2" width="14" height="14"></rect>
          <polyline part="check" points="3.5,8 7,11 12,4"></polyline>
          <polyline part="indeterminate" points="3.5,8 12.5,8"></polyline>        
        </svg> 
        <rf-label part="label"></rf-label>             
      </rf-hbox>
      <rf-label part="description"></rf-label>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$description = this.shadowRoot.querySelector( 'rf-label[part=description]' );    
    this.$icon = this.shadowRoot.querySelector( 'svg' );
    this.$label = this.shadowRoot.querySelector( 'rf-label[part=label]' );

    this.$input = this.shadowRoot.querySelector( 'input' );
    this.$input.addEventListener( 'blur', () => this.dispatchEvent( new CustomEvent( 'rf-blur' ) ) );
    this.$input.addEventListener( 'focus', () => this.dispatchEvent( new CustomEvent( 'rf-focus' ) ) );
    this.$input.addEventListener( 'click', () => {
      this.checked = !this.checked;
      this.value = this.checked;
      this.dispatchEvent( new CustomEvent( 'rf-change', {
        detail: {
          checked: this.checked,
          indeterminate: this.indeterminate
        }
      } ) );
    } );
  }

  focus() {
    this.$input.focus();
  }

  // When things change
  _render() {
    this.$description.text = this.description;
    this.$label.text = this.label;
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
    this._upgrade( 'indeterminate' );             
    this._upgrade( 'label' );            
    this._upgrade( 'name' );        
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
      'indeterminate',
      'label',
      'name',
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

  get indeterminate() {
    return this.hasAttribute( 'indeterminate' );
  }

  set indeterminate( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'indeterminate' );
      } else {
        this.setAttribute( 'indeterminate', '' );
      }
    } else {
      this.removeAttribute( 'indeterminate' );
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

window.customElements.define( 'rf-checkbox', RainforestCheckbox );
