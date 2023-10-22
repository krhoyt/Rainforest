import RainforestOption from "./option.js";

export default class RainforestSegmentedControl extends HTMLElement {
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

        ul {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          margin: 0;
          padding: 0;
        }

        rf-option {
          border-left: solid 1px #414d5c;
          border-top: solid 2px #414d5c;          
          border-bottom: solid 2px #414d5c;          
          border-right: solid 1px #414d5c;    
        }

        rf-option:first-of-type {
          border-bottom-left-radius: 20px;          
          border-top-left-radius: 20px;
          border-left: solid 2px #414d5c;
        }

        rf-option:last-of-type {
          border-bottom-right-radius: 20px;          
          border-top-right-radius: 20px;
          border-left: solid 1px #414d5c;          
          border-right: solid 2px #414d5c;          
        }        
      </style>
      <ul part="control"></ul>
    `;

    // Properties
    this._options = [];

    // Events
    this.onChange = this.onChange.bind( this );

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$list = this.shadowRoot.querySelector( 'ul' );
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
    for( let c = 0; c < this.$list.children.length; c++ ) {
      this.$list.children[c].selected = this.$list.children[c].id === this.selectedId ? true : false;
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
    this._upgrade( 'options' );       
    this._upgrade( 'selectedId' );           
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'selected-id'
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

    while( this.$list.children.length > this._options.length ) {
      this.$list.children[0].removeEventListener( 'click', this.onChange );
      this.$list.children[0].remove();
    }

    while( this.$list.children.length < this._options.length ) {
      const item = document.createElement( 'rf-option' );
      item.addEventListener( 'click', this.onChange );
      this.$list.appendChild( item );
    }    

    for( let c = 0; c < this.$list.children.length; c++ ) {
      this.$list.children[c].id = this._options[c].hasOwnProperty( 'id' ) ? this._options[c].id : '';
      this.$list.children[c].disabled = this._options[c].hasOwnProperty( 'disabled' ) ? this._options[c].disabled : false;      
      this.$list.children[c].text = this._options[c].hasOwnProperty( 'text' ) ? this._options[c].text : null;      
      this.$list.children[c].iconName = this._options[c].hasOwnProperty( 'iconName' ) ? this._options[c].iconName : null;            
      this.$list.children[c].iconAlt = this._options[c].hasOwnProperty( 'iconAlt' ) ? this._options[c].iconAlt : null;            
      this.$list.children[c].iconUrl = this._options[c].hasOwnProperty( 'iconUrl' ) ? this._options[c].iconUrl : null;                  
    }
  }  

  // Attributes
  // Reflected
  // Boolean, Number, String, null
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

window.customElements.define( 'rf-segmented-control', RainforestSegmentedControl );
