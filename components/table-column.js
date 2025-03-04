import RFVBox from "./vbox.js";

import RFIcon from "./icon.js";
import RFLabel from "./label.js";

export default class RFTableColumn extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-block;
          flex-basis: 0;
          flex-grow: 1;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        button {
          align-items: center;
          background: none;
          border: none;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          margin: 0;
          padding: 8px 0 8px 20px;
          width: 100%;
        }

        button:hover rf-label[part=label] {
          --label-color: #000716;
        }

        button::after {
          background-color: #b6bec9;
          content: ' ';
          height: 20px;
          width: 1px;
        }

        rf-label {
          margin: 0 8px 0 0;
          --label-cursor: pointer;
        }

        rf-label[part=label] {
          --label-color: #5f6b7a;
        }

        rf-vbox {
          flex-basis: 0;
          flex-grow: 1;
        }

        :host( :not( [helper] ) ) rf-label[part=helper] {
          display: none;
        }

        :host( :not( [sortable] ) ) button {
          cursor: default;
        }

        :host( :not( [sortable] ) ) button rf-label[part=label] {
          --label-cursor: default;
        }        

        :host( :not( [sortable] ) ) button:hover rf-label[part=label] {
          --label-color: #5f6b7a;
        }        

        :host( :not( [sortable] ) ) rf-icon {
          display: none;
        }
      </style>
      <button part="button">
        <rf-vbox>
          <rf-label font-weight="bold" part="label"></rf-label>
          <rf-label part="helper"></rf-label>          
        </rf-vbox>
        <rf-icon></rf-icon>
      </button>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$helper = this.shadowRoot.querySelector( 'rf-label[part=helper]' );    
    this.$icon = this.shadowRoot.querySelector( 'rf-icon' );    
    this.$label = this.shadowRoot.querySelector( 'rf-label[part=label]' );
  }

  // When attributes change
  _render() {
    this.style.maxWidth = this.width === null ? '' : `${this.width}px`;
    this.$label.text = this.headerText;

    if( this.sortable ) {
      if( this.direction === null ) {
        this.$icon.name = 'caret-down';
      } else if( this.direction === 'desc' || this.direction === 'descending' ) {
        this.$icon.name = 'caret-down';
      } else if( this.direction === 'asc' || this.direction === 'ascending' ) {
        this.$icon.name = 'caret-up';
      }
    } else {
      this.$icon.name = 'caret-down';
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
    this._upgrade( 'direction' );                                
    this._upgrade( 'headerText' );                                
    this._upgrade( 'helper' );        
    this._upgrade( 'hidden' );                                    
    this._upgrade( 'labelField' );                                        
    this._upgrade( 'sortable' );                                    
    this._upgrade( 'width' );                                
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'direction',
      'header-text',      
      'helper',
      'hidden',
      'label-field',
      'sortable',
      'width'
    ];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  } 

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get direction() {
    if( this.hasAttribute( 'direction' ) ) {
      return this.getAttribute( 'direction' );
    }

    return null;
  }

  set direction( value ) {
    if( value !== null ) {
      this.setAttribute( 'direction', value );
    } else {
      this.removeAttribute( 'direction' );
    }
  }        

  get headerText() {
    if( this.hasAttribute( 'header-text' ) ) {
      return this.getAttribute( 'header-text' );
    }

    return null;
  }

  set headerText( value ) {
    if( value !== null ) {
      this.setAttribute( 'header-text', value );
    } else {
      this.removeAttribute( 'header-text' );
    }
  }         

  get helper() {
    if( this.hasAttribute( 'helper' ) ) {
      return this.getAttribute( 'helper' );
    }

    return null;
  }

  set helper( value ) {
    if( value !== null ) {
      this.setAttribute( 'helper', value );
    } else {
      this.removeAttribute( 'helper' );
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

  get labelField() {
    if( this.hasAttribute( 'label-field' ) ) {
      return this.getAttribute( 'label-field' );
    }

    return null;
  }

  set labelField( value ) {
    if( value !== null ) {
      this.setAttribute( 'label-field', value );
    } else {
      this.removeAttribute( 'label-field' );
    }
  }         

  get sortable() {
    return this.hasAttribute( 'sortable' );
  }

  set sortable( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'sortable' );
      } else {
        this.setAttribute( 'sortable', '' );
      }
    } else {
      this.removeAttribute( 'sortable' );
    }
  }

  get width() {
    if( this.hasAttribute( 'width' ) ) {
      return parseInt( this.getAttribute( 'width' ) );
    }

    return null;
  }

  set width( value ) {
    if( value !== null ) {
      this.setAttribute( 'width', value );
    } else {
      this.removeAttribute( 'width' );
    }
  }            
}

window.customElements.define( 'rf-table-column', RFTableColumn );
