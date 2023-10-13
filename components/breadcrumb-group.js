import RainforestBox from './box.js';
import RainforestIcon from './icon.js';
import RainforestLink from './link.js'

export default class RainforestBreadcrumbGroup extends HTMLElement {
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

        ol {
          align-items: center;
          display: flex;
          flex-direction: row;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        li {
          align-items: center;
          display: flex;
          flex-direction: row;
          margin: 0;
          padding: 0;
        }

        rf-box::part( box ) {
          padding: 0;
        }

        rf-icon {
          margin: 0 8px 0 8px;
        }

        rf-icon::part( icon ) {
          filter:
            brightness( 0 ) 
            saturate( 100% )                    
            invert( 55% ) 
            sepia( 25% ) 
            saturate( 225% ) 
            hue-rotate( 173deg ) 
            brightness( 92% ) 
            contrast( 86% );
        }
      </style>
      <ol part="list"></ol>
    `;

    // Properties
    this._data = null;
    this._items = [];

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$list = this.shadowRoot.querySelector( 'ol' );
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
    this._upgrade( 'concealed' );    
    this._upgrade( 'data' );            
    this._upgrade( 'hidden' );    
    this._upgrade( 'items' );       
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'concealed',
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
  get data() {
    return this._data;
  }

  set data( value ) {
    this._data = value;
  }

  get items() {
    return this._items.length === 0 ? null : this._items;
  }

  set items( value ) {
    this._items = value === null ? [] : [... value];

    while( this.$list.children.length > 0 )
      this.$list.children[0].remove();

    for( let i = 0; i < this._items.length; i++ ) {
      const item = document.createElement( 'li' );

      if( i < ( this._items.length - 1 ) ) {
        const element = document.createElement( 'rf-link' );      
        element.content = this._items[i].text;
        element.href = this._items[i].href;
        element.variant = 'primary';
        item.appendChild( element );   
        
        const icon = document.createElement( 'rf-icon' );
        icon.name = 'angle-right';
        item.appendChild( icon );

        this.$list.appendChild( item );                
      } else {
        const element = document.createElement( 'rf-box' );  
        element.color = 'text-status-inactive';    
        element.content = this._items[i].text;
        element.variant = 'strong';
        item.appendChild( element );   

        this.$list.appendChild( item );                        
      }
    }
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

window.customElements.define( 'rf-breadcrumb-group', RainforestBreadcrumbGroup );
