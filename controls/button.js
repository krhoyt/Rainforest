import RainforestIcon from "./icon.js";

export default class RainforestButton extends HTMLElement {
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

        button {
          align-items: center;
          background: none;
          border: none;
          border: solid 2px #0972d3;
          border-radius: 20px;
          box-sizing: border-box;
          color: #0972d3;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          font-family: 'Amazon Ember';
          font-size: 14px;
          font-weight: 700;
          height: 34px;
          line-height: 20px;
          margin: 0;
          outline: none;
          overflow: hidden;          
          padding: 4px 20px 4px 20px;
          text-overflow: ellipsis;                    
          white-space: nowrap;          
          -webkit-tap-highlight-color: transparent;
        }

        button:hover {
          background-color: #f2f8fd;
          border: solid 2px #033160;
          color: #033160;
        }

        button:disabled {
          border-color: #5f6b7a;
          color: #5f6b7a;
          cursor: not-allowed;
        }

        :host( [variant=header] ) button {
          align-items: center;
          background-color: #192534;
          border-color: transparent;
          border-radius: 40px;
          height: 40px;
          justify-content: center;
          padding: 0;
          width: 40px;
        }

        :host( [variant=icon] ) button {
          align-items: center;
          background-color: transparent;
          border-color: transparent;
          height: 34px;
          justify-content: center;
          padding: 0;
          width: 34px;
        }

        :host( [variant=link] ) button {
          background-color: transparent;
          border-color: transparent;
          color: #0972d3;
        }        

        :host( [variant=link] ) button:disabled {
          color: #9ba7b6;
        }                

        :host( [variant=normal] ) button:disabled {
          border-color: #5f6b7a;
          color: #5f6b7a;
        }

        :host( [variant=primary] ) button {
          background-color: #0972d3;
          border-color: #0972d3;
          color: #ffffff;        
        }                

        :host( [variant=primary] ) button[disabled] {
          background-color: #e9ebed;
          border-color: #e9ebed;
          color: #9ba7b6;
          cursor: not-allowed;
        }                    
        
        :host( :not( [icon-name] ) ) rf-icon {
          display: none;
        }

        :host( [wrap] ) button {
          white-space: normal;          
        }

        ::slotted( aws-icon ) {
          --icon-cursor: pointer;
        }
      </style>
      <button part="button" type="button">
        <rf-icon part="icon"></rf-icon>
        <span>
          <slot></slot>
        </span>
      </button>
    `;

    // Properties
    this._data = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$icon = this.shadowRoot.querySelector( 'rf-icon' );
  }

  // Remove focus for button
  blur() {
    this.$button.blur();
  }

  // Click the button
  click() {
    this.$button.click();
  }

  // Get focus for button
  focus() {
    this.$button.focus();
  }

  // When things change
  _render() {
    if( this.label !== null )
      this.innerText = this.label;

    this.$button.disabled = this.disabled;
    this.$button.type = this.type === null ? 'button' : this.type;
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
    this._upgrade( 'concealed' );
    this._upgrade( 'data' );
    this._upgrade( 'disabled' );    
    this._upgrade( 'hidden' );
    this._upgrade( 'label' );  
    this._upgrade( 'type' );      
    this._upgrade( 'variant' );
    this._upgrade( 'wrap' );
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'concealed',
      'disabled',
      'hidden',
      'label',
      'type',
      'variant',
      'wrap'
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

  get variant() {
    if( this.hasAttribute( 'variant' ) ) {
      return this.getAttribute( 'variant' );
    }

    return null;
  }

  set variant( value ) {
    if( value !== null ) {
      this.setAttribute( 'variant', value );
    } else {
      this.removeAttribute( 'variant' );
    }
  }

  get wrap() {
    return this.hasAttribute( 'wrap' );
  }

  set wrap( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'wrap' );
      } else {
        this.setAttribute( 'wrap', '' );
      }
    } else {
      this.removeAttribute( 'wrap' );
    }
  }  
}

window.customElements.define( 'rf-button', RainforestButton );
