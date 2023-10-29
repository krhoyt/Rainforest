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

        a {
          color: #0972d3;
          display: inline-block;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        }

        a:hover {
          color: #033160;
        }

        p {
          color: #5f6b7a;
          display: inline-block;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;   
          margin: 0;
          padding: 0;       
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

        img {
          display: inline-block;
          filter:
            brightness( 0 ) 
            saturate( 100% )                    
            invert( 55% ) 
            sepia( 25% ) 
            saturate( 225% ) 
            hue-rotate( 173deg ) 
            brightness( 92% ) 
            contrast( 86% );          
          height: 16px;
          margin: 0 8px 0 8px;
          object-fit: contain;
          width: 16px;
        }
      </style>
      <ol part="list"></ol>
    `;

    // Properties
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
    this._upgrade( 'items' );       
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [];
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

    while( this.$list.children.length > 0 )
      this.$list.children[0].remove();

    for( let i = 0; i < this._items.length; i++ ) {
      const item = document.createElement( 'li' );

      if( i < ( this._items.length - 1 ) ) {
        const anchor = document.createElement( 'a' );      
        anchor.innerText = this._items[i].hasOwnProperty( 'text' ) ? this._items[i].text : '';
        anchor.href = this._items[i].hasOwnProperty( 'href' ) ? this._items[i].href : '';
        item.appendChild( anchor );   
        
        const image = document.createElement( 'img' );
        image.src = '../icons/angle-right.svg';
        item.appendChild( image );

        this.$list.appendChild( item );                
      } else {
        const paragraph = document.createElement( 'p' );  
        paragraph.innerText = this._items[i].hasOwnProperty( 'text' ) ? this._items[i].text : '';
        item.appendChild( paragraph );   

        this.$list.appendChild( item );                        
      }
    }
  }  
}

window.customElements.define( 'rf-breadcrumb-group', RainforestBreadcrumbGroup );
