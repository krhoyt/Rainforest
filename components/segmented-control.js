import RFSegment from "./segment.js";

export default class RFSegmentedControl extends HTMLElement {
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

        ul {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          margin: 0;
          padding: 0;
        }        
      </style>
      <ul part="control">
        <slot></slot>
      </ul>
    `;

    // Events
    this.onChange = this.onChange.bind( this );

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$list = this.shadowRoot.querySelector( 'ul' );
    this.$slot = this.shadowRoot.querySelector( 'slot' );
    this.$slot.addEventListener( 'slotchange', () => {
      for( let c = 0; c < this.children.length; c++ ) {
        this.children[c].removeEventListener( 'click', this.onChange );
        this.children[c].addEventListener( 'click', this.onChange );
      }
    } );
  }

  onChange( evt ) {
    if( !evt.target.disabled ) {
      if( evt.target.selectedId !== this.selectedId ) {
        this.selectedId = evt.target.id;
        this.dispatchEvent( new CustomEvent( 'rf-change', {
          detail: {
            selectedId: this.selectedId
          }
        } ) );
      }
    }
  }

  // When things change
  _render() {
    for( let c = 0; c < this.children.length; c++ ) {
      this.children[c].selected = this.children[c].id === this.selectedId ? true : false;
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
    this._upgrade( 'hidden' );                   
    this._upgrade( 'label' );               
    this._upgrade( 'selectedId' );           
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'hidden',
      'label',
      'selected-id'
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

  get selectedId() {
    if( this.hasAttribute( 'selected-id' ) ) {
      return this.getAttribute( 'selected-id' );
    }

    return null;
  }

  set selectedId( value ) {
    if( value !== null ) {
      this.setAttribute( 'selected-id', value );
    } else {
      this.removeAttribute( 'selected-id' );
    }
  }    
}

window.customElements.define( 'rf-segmented-control', RFSegmentedControl );
