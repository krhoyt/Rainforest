import RainforestBox from "./box.js";
import RainforestStatusIndicator from "./status-indicator.js";

export default class RainforestFormField extends HTMLElement {
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

        :host( [concealed] ) {
          visibility: hidden;
        }        

        :host( [hidden] ) {
          display: none;
        }        

        rf-box[part=constraint]::part( box ) {
          color: var( --color-text-form-secondary );
          font-size: var( --font-size-body-s );
          line-height: var( --line-height-body-s );
          padding: 4px 0 0 0;
        }

        rf-box[part=description]::part( box ) {
          color: var( --color-text-form-secondary );
          font-size: var( --font-size-body-s );
          line-height: var( --line-height-body-s );
          padding: 0;
        }

        rf-box[part=label]::part( box ) {
          color: var( --color-text-form-default );
          font-size: var( --font-size-body-m );
          font-weight: var( --font-weight-heading-m );
          line-height: var( --line-height-body-m );
          padding: 0;
        }

        rf-status-indicator {
          padding: 4px 0 0 0;
        }

        rf-status-indicator::part( b ) {
          font-size: var( --font-size-body-s );
        }

        :host( :not( [constrainttext] ) ) rf-box[part=constraint] {
          display: none;
        }

        :host( :not( [description] ) ) rf-box[part=description] {
          display: none;
        }

        :host( :not( [errortext] ) ) rf-status-indicator {
          display: none;
        }

        :host( :not( [label] ) ) rf-box[part=label] {
          display: none;
        }

        ::slotted( rf-input ) {
          padding: 4px 0 0 0;
        }        

        ::slotted( span[slot=label] ) {
          color: var( --color-text-form-default );
          font-family: var( --font-family-base );
          font-size: var( --font-size-body-m );
          font-weight: var( --font-weight-heading-m );
          line-height: var( --line-height-body-m );          
        }
      </style>
      <div>
        <rf-box part="label"></rf-box>
        <slot name="label"></slot>
        <rf-box part="info"></rf-box>
      </div>
      <rf-box part="description"></rf-box>
      <slot></slot>
      <rf-status-indicator coloroverride="red" type="warning"></rf-status-indicator>
      <rf-box part="constraint"></rf-box>
    `;

    // Properties
    this._data = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$constraint = this.shadowRoot.querySelector( 'rf-box[part=constraint]' );
    this.$description = this.shadowRoot.querySelector( 'rf-box[part=description]' );
    this.$error = this.shadowRoot.querySelector( 'rf-status-indicator' );
    this.$info = this.shadowRoot.querySelector( 'rf-box[part=info]' );
    this.$label = this.shadowRoot.querySelector( 'rf-box[part=label]' );
  }

  // When things change
  _render() {
    this.$constraint.content = this.constraintText;
    this.$description.content = this.description;
    this.$error.content = this.errorText;
    this.$label.content = this.label;
    this.$info.content = this.info;
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
    this._upgrade( 'constraintText' );    
    this._upgrade( 'data' );            
    this._upgrade( 'description' );            
    this._upgrade( 'errorText' );            
    this._upgrade( 'hidden' );    
    this._upgrade( 'info' );            
    this._upgrade( 'label' );                
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'concealed',
      'constrainttext',
      'description',
      'errortext',
      'hidden',
      'info',
      'label'
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

  get constraintText() {
    if( this.hasAttribute( 'constrainttext' ) ) {
      return this.getAttribute( 'constrainttext' );
    }

    return null;
  }

  set constraintText( value ) {
    if( value !== null ) {
      this.setAttribute( 'constrainttext', value );
    } else {
      this.removeAttribute( 'constrainttext' );
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
  
  get errorText() {
    if( this.hasAttribute( 'errortext' ) ) {
      return this.getAttribute( 'errortext' );
    }

    return null;
  }

  set errorText( value ) {
    if( value !== null ) {
      this.setAttribute( 'errortext', value );
    } else {
      this.removeAttribute( 'errortext' );
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

  get info() {
    if( this.hasAttribute( 'info' ) ) {
      return this.getAttribute( 'info' );
    }

    return null;
  }

  set info( value ) {
    if( value !== null ) {
      this.setAttribute( 'info', value );
    } else {
      this.removeAttribute( 'info' );
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

window.customElements.define( 'rf-form-field', RainforestFormField );
