import RFFileToken from "./file-token.js";

export default class RFFileTokenGroup extends HTMLElement {
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
          display: flex;
          flex-direction: column;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        :host( [alignment=horizontal] ) ul {
          display: grid;
          grid-template-columns: repeat( auto-fill, 230px );
        }
      </style>
      <ul part="list"></ul>
    `;

    // Properties
    this._items = [];

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$list = this.shadowRoot.querySelector( 'ul' );
    this.$list.addEventListener( 'rf-dismiss', ( evt ) => {
      evt.stopImmediatePropagation();
      const index = parseInt( evt.target.getAttribute( 'data-index' ) );
      this._items.splice( index, 1 );
      this._render();

      this.dispatchEvent( new CustomEvent( 'rf-dismiss', {
        detail: {
          fileIndex: index
        }
      } ) );
    } );
  }

  // When attributes change
  _render() {
    while( this.$list.children.length > this._items.length ) {
      this.$list.children[0].remove();
    }

    while( this.$list.children.length < this._items.length ) {
      const token = document.createElement( 'rf-file-token' );
      const item = document.createElement( 'li' );
      item.appendChild( token );
      this.$list.appendChild( item );
    }

    for( let c = 0; c < this.$list.children.length; c++ ) {
      this.$list.children[c].children[0].setAttribute( 'data-index', c );
      this.$list.children[c].children[0].file = this._items[c].file;
      this.$list.children[c].children[0].errorText = this._items[c].hasOwnProperty( 'errorText' ) ? this._items[c].errorText : null;
      this.$list.children[c].children[0].warningText = this._items[c].hasOwnProperty( 'warningText' ) ? this._items[c].warningText : null;      
      this.$list.children[c].children[0].loading = this._items[c].hasOwnProperty( 'loading' ) ? this._items[c].loading : false;            
      this.$list.children[c].children[0].showFileLastModified = this.showFileLastModified;
      this.$list.children[c].children[0].showFileSize = this.showFileSize;      
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
    this._upgrade( 'alignment' );                    
    this._upgrade( 'hidden' );                        
    this._upgrade( 'items' );                    
    this._upgrade( 'limit' );                    
    this._upgrade( 'readOnly' );                     
    this._upgrade( 'showFileLastModified' );       
    this._upgrade( 'showFileSize' );                        
    this._upgrade( 'showFileThumbnail' ); 
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'alignment',
      'hidden',
      'limit',
      'read-only',
      'show-file-last-modified',
      'show-file-size',
      'show-file-thumbnail'
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
    this._render();
  }  

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get alignment() {
    if( this.hasAttribute( 'alignment' ) ) {
      return this.getAttribute( 'alignment' );
    }

    return null;
  }

  set alignment( value ) {
    if( value !== null ) {
      this.setAttribute( 'alignment', value );
    } else {
      this.removeAttribute( 'alignment' );
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

  get limit() {
    if( this.hasAttribute( 'limit' ) ) {
      return parseInt( this.getAttribute( 'limit' ) );
    }

    return null;
  }

  set limit( value ) {
    if( value !== null ) {
      this.setAttribute( 'limit', value );
    } else {
      this.removeAttribute( 'limit' );
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
  
  get showFileLastModified() {
    return this.hasAttribute( 'show-file-last-modified' );
  }

  set showFileLastModified( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'show-file-last-modified' );
      } else {
        this.setAttribute( 'show-file-last-modified', '' );
      }
    } else {
      this.removeAttribute( 'show-file-last-modified' );
    }
  }  

  get showFileSize() {
    return this.hasAttribute( 'show-file-size' );
  }

  set showFileSize( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'show-file-size' );
      } else {
        this.setAttribute( 'show-file-size', '' );
      }
    } else {
      this.removeAttribute( 'show-file-size' );
    }
  }    

  get showFileThumbnail() {
    return this.hasAttribute( 'show-file-thumbnail' );
  }

  set showFileThumbnail( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'show-file-thumbnail' );
      } else {
        this.setAttribute( 'show-file-thumbnail', '' );
      }
    } else {
      this.removeAttribute( 'show-file-thumbnail' );
    }
  }    
}

window.customElements.define( 'rf-file-token-group', RFFileTokenGroup );
