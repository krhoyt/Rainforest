import RainforestCalendar from "./calendar.js";
import RainforestButton from "./button.js";
import RainforestInput from "./input.js";

export default class RainforestDatePicker extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: row;
          gap: 8px;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }
        
        rf-button {
          --button-padding: 4px 6px 4px 6px;
        }        

        rf-input {
          flex-basis: 0;
          flex-grow: 1;
        }

        :host( [read-only] ) rf-icon {
          --icon-cursor: not-allowed;
        }
      </style>
      <rf-input></rf-input>
      <rf-button>
        <rf-icon name="calendar" slot="prefix" variant="info"></rf-icon>
      </rf-button>
    `;

    // Events
    this.onCalendarChange = this.onCalendarChange.bind( this );

    // Private
    this._calendar = null;
    this._format = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    document.addEventListener( 'click', ( evt ) => {      
      const path = evt.composedPath();
      if( this && !path.includes( this ) && !path.includes( this._calendar ) ) {
        this._calendar.style.display = 'none';
      }
    } );

    this.$button = this.shadowRoot.querySelector( 'rf-button' );    
    this.$button.addEventListener( 'click', () => {
      if( this.disabled ) return;

      if( this._calendar.style.display === 'none' || this._calendar.style.display === '' ) {
        const bounds = this.$input.getBoundingClientRect();
        this._calendar.style.display = 'inline-block';

        if( ( bounds.top + bounds.height + this._calendar.clientHeight + window.scrollY ) > window.innerHeight ) {
          this._calendar.style.top = `${bounds.top - this._calendar.clientHeight + window.scrollY - 6}px`;
        } else {
          this._calendar.style.top = `${bounds.top + bounds.height + window.scrollY + 2}px`;  
        }

        this._calendar.style.left = `${bounds.x + window.scrollX}px`;
      }
    } );    
    this.$icon = this.shadowRoot.querySelector( 'rf-icon' );
    this.$input = this.shadowRoot.querySelector( 'rf-input' );    
  }

  onCalendarChange( evt ) {
    this.value = evt.detail.value.replaceAll( '-', '/' );
    this._calendar.style.display = 'none';
  }

  // When attributes change
  _render() {
    let formatted = '';

    if( this.value !== null ) {
      if( this._format === null ) {
        formatted = new Intl.DateTimeFormat( navigator.language, {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric'
        } ).format( this.valueAsDate );    
      } else {
        formatted = this._format( this.valueAsDate );
      }
    }

    this.$input.disabled = this.disabled;
    this.$input.placeholder = this.placeholder;
    this.$input.readOnly = this.readOnly;
    this.$input.value = formatted;
    this.$button.disabled = this.readOnly;
    this.$icon.variant = this.readOnly ? 'disabled' : 'info';
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
    if( this._calendar === null ) {
      this._calendar = document.createElement( 'div' );
      this._calendar.classList.add( 'popover' );
      const element = document.createElement( 'rf-calendar' );
      element.addEventListener( 'rf-change', this.onCalendarChange );
      this._calendar.appendChild( element );
      document.body.appendChild( this._calendar ); 
    }

    this._upgrade( 'disabled' );                    
    this._upgrade( 'formatFunction' );                    
    this._upgrade( 'hidden' );    
    this._upgrade( 'name' );        
    this._upgrade( 'placeholder' );        
    this._upgrade( 'readOnly' );    
    this._upgrade( 'value' );        
    this._upgrade( 'valueAsDate' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'disabled',
      'hidden',
      'name',
      'placeholder',
      'read-only',
      'value'
    ];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  } 

  // Properties
  // Not reflected
  // Array, Date, Object, null 
  get formatFunction() {
    return this._format;
  }

  set formatFunction( value ) {  
    this._format = value;
  }

  get valueAsDate() {
    return this.value === null ? null : new Date( this.value );
  }

  set valueAsDate( value ) {  
    this.value = value === null ? null : new Date( Date.parse( value ) );
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

window.customElements.define( 'rf-date-picker', RainforestDatePicker );
