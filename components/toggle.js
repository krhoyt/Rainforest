export default class RFToggle extends HTMLElement {
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

        div[part=toggle] {
          background-color: var( --toggle-track-background-color, #414d5c );
          border-radius: 8px;
          box-sizing: border-box;
          display: inline-block;
          height: 16px;
          margin: 2px 0 0 0;
          position: relative;
          width: 24px;
        }

        div[part=toggle] div {     
          background-color: var( --toggle-handle-background-color, #ffffff );
          border-radius: 8px;
          box-sizing: border-box;
          display: inline-block;
          height: 12px;     
          left: 2px;
          position: absolute;
          top: 2px;
          width: 12px;     
        }   

        div:not( [part] ) {
          display: flex;
          flex-direction: column;
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

        p {
          box-sizing: border-box;
          color: var( --toggle-color, #000716 );
          cursor: var( --toggle-cursor, default );
          display: inline;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: var( --toggle-font-size, 14px );
          font-style: var( --toggle-font-style );
          font-weight: var( --toggle-font-weight, 400 );
          line-height: var( --toggle-line-height, 20px );
          margin: var( --toggle-margin, 0 );
          padding: var( --toggle-padding, 0 0 0 8px );
          text-align: var( --toggle-text-align, left );
          text-decoration: var( --toggle-text-decoration, none );
          text-rendering: optimizeLegibility;
          width: 100%;
        }        

        p[part=description] {
          color: #5f6b7a;
          font-size: 12px;
          line-height: 16px;          
          padding: 0 0 4px 8px;          
        }        

        :host( [checked] ) div[part=toggle] { background-color: var( --toggle-track-checked-background-color, #0972d3 ); }
        :host( [checked] ) div[part=toggle] div { left: 10px; }        

        :host( :not( [description ] ) ) p[part=description] {
          display: none;
        }

        :host( :not( [label ] ) ) p[part=label] {
          display: none;
        }        

        :host( :not( [label] ):not( [description] ) ) div[part=toggle] {
          margin: 0;
        }

        :host( [disabled] ) input { cursor: not-allowed; }        
        :host( [disabled] ) div[part=toggle] { background-color: var( --toggle-track-disabled-background-color, #d1d5db ); }
        :host( [checked][disabled] ) div[part=toggle] { background-color: var( --toggle-track-disabled-checked-background-color, #b5d6f4 ); }
        :host( [disabled] ) p { 
          color: var( --toggle-disabled-color, #9ba7b6 ); 
          cursor: not-allowed;
        }
      </style>
      <div part="toggle">
        <div part="check"></div>
      </div>
      <input part="input" type="checkbox" />
      <div>
        <p part="label"></p>
        <p part="description"></p>
      </div>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$description = this.shadowRoot.querySelector( 'p[part=description]' );
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
    this.$label = this.shadowRoot.querySelector( 'p[part=label]' );
  }

  focus() {
    this.$input.focus();
  }

  // When things change
  _render() {
    this.$input.checked = this.checked;
    this.$input.disabled = this.disabled;
    this.$label.innerText = this.label === null ? '' : this.label;
    this.$description.innerText = this.description === null ? '' : this.description;
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

  get value() {
    return this.hasAttribute( 'value' );
  }

  set value( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'value' );
      } else {
        this.setAttribute( 'value', '' );
      }
    } else {
      this.removeAttribute( 'value' );
    }
  }  
}

window.customElements.define( 'rf-toggle', RFToggle );
