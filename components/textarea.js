export default class RainforestTextarea extends HTMLElement {
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

        textarea {
          border: solid 2px #7d8998;
          border-radius: 8px;
          box-sizing: border-box;
          color: #000716;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          min-height: 32px;
          line-height: 20px;
          margin: 0;
          outline: none;
          padding: 4px 12px 4px 12px;
          resize: none;          
          text-rendering: optimizeLegibility;
          width: 100%;
        }

        textarea:focus {
          border: solid 2px #0972d3;
        }

        textarea::placeholder {
          color: #5f6b7a;
          font-style: italic;
        }

        :host( [resize=horizontal] ) textarea {
          resize: horizontal;
        }        

        :host( [resize=vertical] ) textarea {
          resize: vertical;
        }                

        textarea[readonly] {
          border: solid 2px #e9ebed;
          resize: none;
        }

        textarea[readonly]:focus {
          border: solid 2px #0972d3;
        }        

        textarea[disabled] {
          background-color: #e9ebed;
          border: solid 2px #e9ebed;
          color: #9ba7b6;
          cursor: not-allowed;
          resize: none;
        }

        textarea[disabled]::placeholder {
          color: #9ba7b6;
        }        

        :host( [invalid] ) textarea {
          border-color: #d91515;
          border-left-width: 8px;
          color: #d91515;
          padding: 4px 12px 4px 8px;
        }
      </style>
      <textarea part="area"></textarea>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$area = this.shadowRoot.querySelector( 'textarea' );
    this.$area.addEventListener( 'input', ( evt ) => {
      this.value = evt.currentTarget.value;
      this.dispatchEvent( new CustomEvent( 'rf-change', {
        detail: {
          value: this.value
        }
      } ) )
    } );
  }

  focus() {
    this.$area.focus();
  }

  select() {
    this.$area.select();
  }  

  // When things change
  _render() {
    this.$area.autocomplete = this.autoComplete === null ? 'off' : this.autoComplete;
    this.$area.autofocus = this.autoFocus;
    this.$area.autocorrect = this.disableBrowserAutocorrect === true ? 'off' : '';        
    this.$area.autocapitalize = this.disableBrowserAutocorrect === true ? 'off' : '';
    this.$area.disabled = this.disabled;
    this.$area.placeholder = this.placeholder === null ? '' : this.placeholder;    
    this.$area.readOnly = this.readOnly;
    this.$area.rows = this.rows === null ? '' : this.rows;
    this.$area.spellcheck = this.spellcheck;
    this.$area.innerText = this.value === null ? '' : this.value;
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
    this._upgrade( 'disableBrowserAutocorrect' );        
    this._upgrade( 'disabled' );            
    this._upgrade( 'hidden' );                
    this._upgrade( 'invalid' );    
    this._upgrade( 'name' );        
    this._upgrade( 'placeholder' );   
    this._upgrade( 'readOnly' );     
    this._upgrade( 'resize' );     
    this._upgrade( 'rows' );          
    this._upgrade( 'spellcheck' );      
    this._upgrade( 'value' );       
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'auto-complete',
      'auto-focus',
      'concealed',
      'disable-browser-autocorrect',
      'disabled',
      'hidden',
      'invalid',
      'name',
      'placeholder',
      'read-only',
      'resize',
      'rows',
      'spellcheck',
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
  get autoComplete() {
    return this.hasAttribute( 'auto-complete' );
  }

  set autoComplete( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'auto-complete' );
      } else {
        this.setAttribute( 'auto-complete', '' );
      }
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

  get disableBrowserAutocorrect() {
    return this.hasAttribute( 'disable-browser-autocorrect' );
  }

  set disableBrowserAutocorrect( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'disable-browser-autocorrect' );
      } else {
        this.setAttribute( 'disable-browser-autocorrect', '' );
      }
    } else {
      this.removeAttribute( 'disable-browser-autocorrect' );
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
    return this.hasAttribute( 'read-only' );
  }

  set readOnly( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'read-only' );
      } else {
        this.setAttribute( 'read-only', '' );
      }
    } else {
      this.removeAttribute( 'read-only' );
    }
  }  

  get resize() {
    if( this.hasAttribute( 'resize' ) ) {
      return this.getAttribute( 'resize' );
    }

    return null;
  }

  set resize( value ) {
    if( value !== null ) {
      this.setAttribute( 'resize', value );
    } else {
      this.removeAttribute( 'resize' );
    }
  }      

  get rows() {
    if( this.hasAttribute( 'rows' ) ) {
      return parseInt( this.getAttribute( 'rows' ) );
    }

    return null;
  }

  set rows( value ) {
    if( value !== null ) {
      this.setAttribute( 'rows', value );
    } else {
      this.removeAttribute( 'rows' );
    }
  }          

  get spellcheck() {
    return this.hasAttribute( 'spellcheck' );
  }

  set spellcheck( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'spellcheck' );
      } else {
        this.setAttribute( 'spellcheck', '' );
      }
    } else {
      this.removeAttribute( 'spellcheck' );
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

window.customElements.define( 'rf-textarea', RainforestTextarea );
