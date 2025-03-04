import RFHBox from "./hbox.js";
import RFVBox from "./vbox.js";

import RFCheckbox from "./checkbox.js";
import RFLabel from "./label.js";
import RRRadio from "./radio.js";
import RFTableColumn from "./table-column.js";

export default class RainforestTable extends HTMLElement {
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

        :host( [hidden] ) {
          display: none;
        }            

        rf-hbox[part=columns] {
          border-bottom: solid 1px #b6bec9;
        }

        rf-vbox[part=list] {
          overflow: scroll;
        }

        rf-vbox[part=list] rf-hbox {
          background: transparent;
          border-top: solid 1px transparent;
        }

        rf-vbox[part=list] rf-label {
          padding: 8px 20px 9px 20px;
        }

        rf-vbox[part=list] rf-radio,
        rf-vbox[part=list] rf-checkbox {
          align-items: center;
          display: flex;
          height: 36px;
          justify-content: center;
          min-width: 36px;
        }        

        :host( [striped] ) rf-vbox[part=list] rf-hbox:nth-of-type( even ) {
          background: #f8f8f8;
          border-top: solid 1px #e9ebed;
        }

        :host( :not( [selectable] ) ) rf-checkbox {
          display: none;
        }

        :host( [selectable]:not( [selectable=multiple] ) ) rf-hbox[part=columns] rf-checkbox,
        :host( [selectable=single] ) rf-hbox[part=columns] rf-checkbox {
          visibility: hidden;
        }
      </style>
      <rf-hbox part="columns">
        <rf-checkbox></rf-checkbox>
        <slot></slot>
      </rf-hbox>
      <rf-vbox part="list"></rf-vbox>
      <rf-vbox part="empty">
        <slot name="empty"></slot>
      </rf-vbox>
    `;

    // Private
    this._columns = [];
    this._items = [];

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$list = this.shadowRoot.querySelector( 'rf-vbox[part=list]' );
    this.$slot = this.shadowRoot.querySelector( 'slot:not( [name=empty] )' );
    this.$slot.addEventListener( 'slotchange', () => {
      this._columns = this.querySelectorAll( 'rf-table-column' );
    } );
    this._columns = this.querySelectorAll( 'rf-table-column' );
  }

  // When attributes change
  _render() {;}

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
    this._upgrade( 'hidden' );                            
    this._upgrade( 'items' );                                
    this._upgrade( 'selectable' );                                    
    this._upgrade( 'striped' );                                    
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'hidden',
      'selectable',
      'striped'
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
  get items() {
    return this._items.length === 0 ? null : this._items;
  }

  set items( value ) {
    this._items = value === null ? [] : [... value];

    while( this.$list.children.length > this._items.length ) {
      this.$list.children[0].remove();
    }

    while( this.$list.children.length < this._items.length ) {
      const row = document.createElement( 'rf-hbox' );
      const element = this.selectable === 'single' ? 'rf-radio' : 'rf-checkbox';
      const check = document.createElement( element );
      row.appendChild( check );

      for( let c = 0; c < this._columns.length; c++ ) {
        const cell = document.createElement( 'rf-label' );
        cell.style.width = this._columns[c].width === null ? '' : `${this._columns[c].width}px`;
        cell.style.flexBasis = this._columns[c].width === null ? '0' : '';
        cell.style.flexGrow = this._columns[c].width === null ? '1' : '';          
        row.appendChild( cell );
      }
      this.$list.appendChild( row );
    }

    for( let r = 0; r < this.$list.children.length; r++ ) {
      for( let c = 0; c < this._columns.length; c++ ) {
        if( this._columns[c].labelField === null ) {
          this.$list.children[r].children[c + 1].text = this._items[r];
        } else {
          this.$list.children[r].children[c + 1].text = this._items[r][this._columns[c].labelField];          
        }
      }
    }
  }

  // Attributes
  // Reflected
  // Boolean, Number, String, null
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

  get selectable() {
    if( this.hasAttribute( 'selectable' ) ) {
      return this.getAttribute( 'selectable' );
    }

    return null;
  }

  set selectable( value ) {
    if( value !== null ) {
      this.setAttribute( 'selectable', value );
    } else {
      this.removeAttribute( 'selectable' );
    }
  }      

  get striped() {
    return this.hasAttribute( 'striped' );
  }

  set striped( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'striped' );
      } else {
        this.setAttribute( 'striped', '' );
      }
    } else {
      this.removeAttribute( 'striped' );
    }
  }     
}

window.customElements.define( 'rf-table', RainforestTable );
