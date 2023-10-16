import RainforestBox from "./box.js";

export default class RainforestCheckbox extends HTMLElement {
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

        :host( [concealed] ) {
          visibility: hidden;
        }        

        :host( [hidden] ) {
          display: none;
        }      
        
        div {
          display: flex;
          flex-direction: column;
          padding: 0 0 0 8px;
        }

        svg {
          height: 16px;
          margin-top: 2px;
          width: 16px;
        }

        polyline {
          fill: none;
          stroke: var( --color-foreground-control-default );
          stroke-width: 2px;
        }

        rf-box[part=description] {
          padding: 0 0 4px 0;
        }        

        rf-box::part( box ) {
          padding: 0;
        }

        rf-box[part=description]::part( box ) {
          color: var( --color-text-form-secondary );
          font-size: var( --font-size-body-s );
          line-height: var( --line-height-body-s );
        }

        :host( :not( [checked] ) ) rect {
          fill: none;
          stroke: var( --color-border-control-default );
          stroke-width: 2px;
        }

        :host( :not( [checked] ) ) polyline {
          display: none;
        }

        :host( [indeterminate] ) rect,
        :host( [checked] ) rect {
          fill: var( --color-background-control-checked );
          stroke: var( --color-border-control-checked );
        }

        :host( [checked] ) polyline[part=check] {
          display: inline;
        }

        :host( :not( [description] ) ) rf-box[part=description] {
          display: none;
        }

        :host( :not( [indeterminate] ) ) polyline[part=indeterminate] {
          display: none;
        }

        :host( [indeterminate] ) polyline[part=check] {
          display: none;
        }        

        :host( [indeterminate] ) polyline[part=indeterminate] {
          display: inline;
        }        

        :host( [disabled] ) rect {
          fill: var( --color-background-control-disabled );
          stroke: var( --color-border-control-disabled );
        }

        :host( [disabled] ) rf-box::part( box ) {
          color: #9ba7b6;
        }

        ::slotted( rf-box[slot=description] ) {
          padding: 0 0 4px 0;          
        }
      </style>
      <svg part="vector">
        <rect part="box" x="1" y="1" rx="2" ry="2" width="14" height="14"></rect>
        <polyline part="check" points="3.5,8 7,11 12,4"></polyline>
        <polyline part="indeterminate" points="3.5,8 12.5,8"></polyline>        
      </svg>
      <div>
        <rf-box part="label">
          <slot></slot>
        </rf-box>
        <rf-box part="description"></rf-box>      
        <slot name="label"></slot>
        <slot name="description"></slot>      
      </div>
    `;

    // Properties
    this._data = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$description = this.shadowRoot.querySelector( 'rf-box[part=description]' );
  }

  // When things change
  _render() {
    this.$description.content = this.description;
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
    this._upgrade( 'concealed' );    
    this._upgrade( 'data' );     
    this._upgrade( 'description' );     
    this._upgrade( 'disabled' );         
    this._upgrade( 'hidden' ); 
    this._upgrade( 'indeterminate' );             
    this._upgrade( 'label' );        
    this._upgrade( 'name' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'checked',
      'concealed',
      'description',
      'disabled',
      'hidden',
      'indeterminate',
      'label',
      'name'
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
}

window.customElements.define( 'rf-checkbox', RainforestCheckbox );
