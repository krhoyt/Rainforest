export default class RainforestInput extends HTMLElement {
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

        :host( [concealed] ) {
          visibility: hidden;
        }        

        :host( [hidden] ) {
          display: none;
        }        

        input {
          border: solid 2px #7d8998;
          border-radius: 8px;
          box-sizing: border-box;
          color: #000716;
          font-family: var( --font-family-base );
          font-size: var( font-size-body-m );
          font-weight: 400;
          height: 32px;
          margin: 0;
          outline: none;
          padding: 4px 12px 4px 12px;
          text-rendering: optimizeLegibility;
          width: 100%;
        }

        input:focus {
          border: solid 2px #0972d3;
        }

        input::placeholder {
          color: #5f6b7a;
          font-style: italic;
        }

        input[readonly] {
          border: solid 2px #e9ebed;
        }

        input[disabled] {
          background-color: #e9ebed;
          border: solid 2px #e9ebed;
          color: #9ba7b6;
          cursor: not-allowed;
        }

        input[disabled]::placeholder {
          color: #9ba7b6;
        }        

        :host( [invalid] ) input {
          border-color: #d91515;
          border-left-width: 8px;
          color: #d91515;
          padding: 4px 12px 4px 8px;
        }
      </style>
      <input part="input">
    `;

    // Properties
    this._data = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$input = this.shadowRoot.querySelector( 'input' );
    this.$input.addEventListener( 'input', ( evt ) => {
      this.value = evt.currentTarget.value;
      this.dispatchEvent( new CustomEvent( 'rf-change', {
        detail: {
          value: this.value
        }
      } ) )
    } );
  }

  focus() {
    this.$input.focus();
  }

  select() {
    this.$input.select();
  }  

  // When things change
  _render() {
    this.$input.autocomplete = this.autoComplete === null ? 'off' : this.autoComplete;
    this.$input.autofocus = this.autoFocus;
    this.$input.autocorrect = this.disableBrowserAutocorrect === true ? 'off' : '';        
    this.$input.autocapitalize = this.disableBrowserAutocorrect === true ? 'off' : '';
    this.$input.disabled = this.disabled;
    this.$input.inputMode = this.inputMode === null ? 'text' : this.inputMode;
    this.$input.placeholder = this.placeholder === null ? '' : this.placeholder;    
    this.$input.readOnly = this.readOnly;    
    this.$input.spellcheck = this.spellcheck;
    this.$input.step = this.step === null ? 'any' : this.step;    
    this.$input.type = this.type === null ? 'text' : this.type;
    this.$input.value = this.value === null ? '' : this.value;
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
    this._upgrade( 'autoComplete' );         
    this._upgrade( 'autoFocus' );        
    this._upgrade( 'concealed' );    
    this._upgrade( 'data' );            
    this._upgrade( 'disabled' );        
    this._upgrade( 'disableBrowserAutocorrect' );        
    this._upgrade( 'hidden' );    
    this._upgrade( 'inputMode' );       
    this._upgrade( 'invalid' );    
    this._upgrade( 'name' );        
    this._upgrade( 'placeholder' );   
    this._upgrade( 'readOnly' );      
    this._upgrade( 'spellcheck' );      
    this._upgrade( 'step' );           
    this._upgrade( 'type' );   
    this._upgrade( 'value' );       
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'auto-complete',
      'auto-focus',
      'concealed',
      'disablebrowserautocorrect',
      'hidden',
      'inputmode',      
      'invalid',
      'name',
      'placeholder',
      'readonly',
      'spellcheck',
      'step',
      'type',
      'value'
    ];
  }

  // Observed tag attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  }

  // Properties
  // Not reflected
  // Array, Date, Object, null 
  get data() {
    return this._data;
  }

  set data( value ) {
    this._data = value;
  }

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get autoComplete() {
    if( this.hasAttribute( 'auto-complete' ) ) {
      return this.getAttribute( 'auto-complete' );
    }

    return null;
  }

  set autoComplete( value ) {
    if( value !== null ) {
      this.setAttribute( 'auto-complete', value );
    } else {
      this.removeAttribute( 'auto-complete' );
    }
  }     

  get autoFocus() {
    return this.hasAttribute( 'auto-focus' );
  }

  set autoFocus( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'auto-focus' );
      } else {
        this.setAttribute( 'auto-focus', '' );
      }
    } else {
      this.removeAttribute( 'auto-focus' );
    }
  }  

  get concealed() {
    return this.hasAttribute( 'concealed' );
  }

  set concealed( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'concealed' );
      } else {
        this.setAttribute( 'concealed', '' );
      }
    } else {
      this.removeAttribute( 'concealed' );
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

  get disableBrowserAutocorrect() {
    return this.hasAttribute( 'disablebrowserautocorrect' );
  }

  set disableBrowserAutocorrect( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'disablebrowserautocorrect' );
      } else {
        this.setAttribute( 'disablebrowserautocorrect', '' );
      }
    } else {
      this.removeAttribute( 'disablebrowserautocorrect' );
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

  get inputMode() {
    if( this.hasAttribute( 'inputmode' ) ) {
      return this.getAttribute( 'inputmode' );
    }

    return null;
  }

  set inputMode( value ) {
    if( value !== null ) {
      this.setAttribute( 'inputmode', value );
    } else {
      this.removeAttribute( 'inputmode' );
    }
  }      

  get invalid() {
    return this.hasAttribute( 'invalid' );
  }

  set invalid( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'invalid' );
      } else {
        this.setAttribute( 'invalid', '' );
      }
    } else {
      this.removeAttribute( 'invalid' );
    }
  } 

  get placeholder() {
    if( this.hasAttribute( 'placeholder' ) ) {
      return this.getAttribute( 'placeholder' );
    }

    return null;
  }

  set placeholder( value ) {
    if( value !== null ) {
      this.setAttribute( 'placeholder', value );
    } else {
      this.removeAttribute( 'placeholder' );
    }
  } 

  get readOnly() {
    return this.hasAttribute( 'readonly' );
  }

  set readOnly( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'readonly' );
      } else {
        this.setAttribute( 'readonly', '' );
      }
    } else {
      this.removeAttribute( 'readonly' );
    }
  }  

  get step() {
    if( this.hasAttribute( 'step' ) ) {
      return parseInt( this.getAttribute( 'step' ) );
    }

    return null;
  }

  set step( value ) {
    if( value !== null ) {
      this.setAttribute( 'step', value );
    } else {
      this.removeAttribute( 'step' );
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

window.customElements.define( 'rf-input', RainforestInput );
