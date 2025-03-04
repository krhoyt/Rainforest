import RFBreadcrumb from "./breadcrumb.js";

export default class RFBreadcrumbGroup extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: row;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        div {
          align-items: center;
          display: flex;
          flex-direction: row;
          gap: 8px;
        }
      </style>
      <slot name="prefix"></slot>
      <div part="list">
        <slot></slot>
      </div>
      <slot name="suffix"></slot>
    `;

    // Private
    this._items = [];

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );
  }

  // When things change
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
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'hidden'
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
  get items() {
    return this._items.length === 0 ? null : this._items;
  }

  set items( value ) {
    this._items = value === null ? [] : [... value];

    while( this.children.length > this._items.length ) {
      this.children[0].remove();
    }

    while( this.children.length < this._items.length ) {
      const element = document.createElement( 'rf-breadcrumb' );
      this.appendChild( element );
    }

    for( let c = 0; c < this.children.length; c++ ) {
      this.children[c].href = this._items[c].href;
      this.children[c].text = this._items[c].text;      
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
}

window.customElements.define( 'rf-breadcrumb-group', RFBreadcrumbGroup );
