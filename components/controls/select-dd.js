export default class RFSelect extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
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

        path {
          fill: #0972d3;
          stroke: #0972d3;
          stroke-width: 2px;
        }
        
        select {
          appearance: none;
          background: none;
          border: solid 2px #7d8998;
          border-radius: 8px;
          box-sizing: border-box;
          color: #000716;
          cursor: pointer;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;           
          font-size: 14px;
          height: 32px;   
          margin: 0;
          padding: 0 32px 0 12px;
          width: 100%;
        }

        svg {
          height: 16px;
          pointer-events: none;
          position: absolute;
          right: 10px;
          top: 8px;
          width: 16px;
          z-index: 1;
        }        

        :host( :hover ) path {
          fill: #033160;
          stroke: #033160;
        }        

        :host( [invalid] ) select {
          border-color: #d91515;
          border-left-width: 8px;          
          padding: 0 32px 0 6px;
        }

        :host( [read-only] ) select {
          background: #ffffff;
          border: solid 2px #e9ebed;
          cursor: default;
        }
        :host( [read-only] ) path {
          fill: #9ba7b6;
          stroke: #9ba7b6;
        }        

        :host( [disabled] ) select {
          background-color: #e9ebed;       
          border: solid 2px #e9ebed;             
          color: #9ba7b6;          
          cursor: not-allowed;          
        }
        :host( [disabled] ) svg {
          cursor: not-allowed;                    
        }        
        :host( [disabled] ) path {
          fill: #9ba7b6;
          stroke: #9ba7b6;
        }
      </style>
      <select part="select"></select>
      <svg part="vector">
        <path d="M4 5h8l-4 6-4-6z" part="caret"></path>
      </svg>
    `;

    // Private
    this._options = [];    

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$select = this.shadowRoot.querySelector( 'select' );
    this.$select.addEventListener( 'change', () => {
      this.selectedIndex = this.$select.selectedIndex;
    } );
  }

  blur() {
    this.$select.blur();
  }

  focus() {
    this.$select.focus();
  }

  onItemClick() {
    this.selectedIndex = this.$select.selectedIndex;

    this.$caret.classList.remove( 'open' );
    this.focus();

    this.dispatchEvent( new CustomEvent( 'rf-change', {
      detail: {
        selectedIndex: this.selectedIndex,
        selectedOption: this.selectedIndex === null ? null : this._options[this.selectedIndex]
      }
    } ) );
  }

  // When things change
  _render() {
    if( this.readOnly ) {
      this.$select.disabled = this.readOnly;
    } else {
      this.$select.disabled = this.disabled;
    }
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
    this._upgrade( 'invalid' );
    this._upgrade( 'options' );
    this._upgrade( 'read-only' ); 
    this._upgrade( 'selectedIndex' );  
    this._upgrade( 'selectedOption' );  
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'disabled',
      'hidden',
      'invalid',
      'read-only',
      'selected-index'
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
  get options() {
    return this._options.length === 0 ? null : this._options;
  }

  set options( value ) {
    this._options = value === null ? [] : [... value];

    while( this.$select.children.length > this._options.length ) {
      this.$select.children[0].remove();
    }

    while( this.$select.children.length < this._options.length ) {
      const option = document.createElement( 'option' );
      this.$select.appendChild( option );
    }    

    for( let c = 0; c < this.$select.children.length; c++ ) {
      this.$select.children[c].disabled = this._options[c].hasOwnProperty( 'disabled' ) ? this._options[c].disabled : false;      
      this.$select.children[c].label = this._options[c].hasOwnProperty( 'label' ) ? this._options[c].label : null;
      this.$select.children[c].selected = this._options[c].hasOwnProperty( 'selected' ) ? true : false;   
      
      if( this._options[c].hasOwnProperty( 'value' ) ) {
        this.$select.children[c].value = this._options[c].value === null ? '' : this._options[c].value;
      } else {
        this.$select.children[c].value = '';  
      }
    }

    this.selectedIndex = null;
  }  

  get selectedOption() {
    return this.selectedIndex === null ? null : this._options[this.selectedIndex];
  }

  set selectedOption( value ) {
    if( value === null ) {
      this.selectedIndex = null;
    } if( this._options.length === 0 ) {
      this.selectedIndex = null;
    } else {
      const keys1 = Object.keys( value );

      for( let i = 0; i < this._options.length; i++ ) {
        const keys2 = Object.keys( this._options[i] );        
        if( this.shallowEqual( keys1, keys2, true ) ) {
          this.selectedIndex = i;
          break;
        } 
      }
    }
  }

  // ATTRIBUTION: https://dmitripavlutin.com/how-to-compare-objects-in-javascript/
  shallowEqual( object1, object2, keys = false ) {
    let keys1 = null;
    let keys2 = null;

    if( keys ) {
      keys1 = object1;
      keys2 = object2;
    } else {
      keys1 = Object.keys( object1 );
      keys2 = Object.keys( object2 );
    }
  
    for( const k of keys1 ) if( !keys2.includes( k ) ) return false;
    for( const k of keys2 ) if( !keys1.includes( k ) ) return false;
    for( const key of keys1 ) if( object1[key] !== object2[key] ) return false;
  
    return true;
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

  get selectedIndex() {
    if( this.hasAttribute( 'selected-index' ) ) {
      return parseInt( this.getAttribute( 'selected-index' ) );
    }

    return null;
  }

  set selectedIndex( value ) {
    if( value !== null ) {
      this.setAttribute( 'selected-index', value );
    } else {
      this.removeAttribute( 'selected-index' );
    }
  }
}

window.customElements.define( 'rf-select', RainforestSelect );
