export default class RFPagination extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          align-items: center;
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: row;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        p {
          box-sizing: border-box;
          color: #424650;
          cursor: default;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
          margin: 0;
          padding: 2px 0 2px 0;
          text-align: center;
          text-rendering: optimizeLegibility;
          width: 20px;
        }

        button {
          align-items: center;
          background: none;
          border: none;
          box-sizing: border-box;
          color: #424650;
          cursor: pointer;
          display: inline-flex;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          justify-content: center;
          line-height: 20px;
          margin: 0;
          min-width: 20px;
          padding: 2px;
          text-align: center;
          text-rendering: optimizeLegibility;          
        }

        button:has( svg ) {
          padding: 4px 2px 4px 2px;
        }

        button.current {
          color: #0f141a;
          font-weight: 700;
        }

        path {
          fill: none;
          stroke: #424650;
          stroke-linejoin: round;
          stroke-width: 2px;
        }

        svg {
          box-sizing: border-box;
          cursor: pointer;
          height: 16px;
          width: 16px;
        }

        ul {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

        li {
          box-sizing: border-box;
          margin: 4px;
          padding: 0;
        }

        button[data-index][disabled] {
          color: #b4b4bb;
        }

        button[disabled],
        button[disabled] svg {          
          cursor: not-allowed;
        }

        button[disabled] path {
          stroke: #b4b4bb;
        }        

        :host( [disabled] ) p {
          color: #b4b4bb;
        }

        :host( :not( [open-end] ) ) p {
          display: none;
        }
      </style>
      <button part="previous" type="button">
        <svg>
          <path d="M11 2 5 8l6 6"></path>        
        </svg>
      </button>
      <ul part="list"></ul>
      <p part="open">...</p>
      <button part="next" type="button">
        <svg>
          <path d="m5 2 6 6-6 6"></path>        
        </svg>
      </button>
    `;

    // Events
    this.doNextClick = this.doNextClick.bind( this );    
    this.doPageClick = this.doPageClick.bind( this );
    this.doPreviousClick = this.doPreviousClick.bind( this );

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$list = this.shadowRoot.querySelector( 'ul' );
    this.$previous = this.shadowRoot.querySelector( '[part=previous]' );
    this.$previous.addEventListener( 'click', this.doPreviousClick );
    this.$next = this.shadowRoot.querySelector( '[part=next]' );    
    this.$next.addEventListener( 'click', this.doNextClick );
  }

  doNextClick() {
    const index = this.currentPageIndex === null ? 1 : this.currentPageIndex;
    this.currentPageIndex = index + 1;
    this.dispatchEvent( new CustomEvent( 'rf-next', {
      detail: {
        currentPageIndex: this.currentPageIndex,
        requestedPageIndex: this.currentPageIndex
      }
    } ) );
  }

  doPageClick( evt ) {
    const index = parseInt( evt.currentTarget.getAttribute( 'data-index' ) );
    this.currentPageIndex = index;

    this.dispatchEvent( new CustomEvent( 'rf-change', {
      detail: {
        currentPageIndex: index
      }
    } ) );
  }

  doPreviousClick() {
    const index = this.currentPageIndex === null ? 1 : this.currentPageIndex;    
    this.currentPageIndex = index - 1;
    this.dispatchEvent( new CustomEvent( 'rf-previous', {
      detail: {
        currentPageIndex: this.currentPageIndex,
        requestedPageIndex: this.currentPageIndex
      }
    } ) );
  }

  // When things change
  _render() {
    const count = this.pagesCount === null ? 0 : this.pagesCount;
    const index = this.currentPageIndex === null ? 1 : this.currentPageIndex;

    while( this.$list.children.length > count ) {
      this.$list.children[0].children[0].removeEventListener( 'click', this.doPageClick );
      this.$list.children[0].remove();
    }

    while( this.$list.children.length < count ) {
      const button = document.createElement( 'button' );
      button.addEventListener( 'click', this.doPageClick );
      button.type = 'button';

      const item = document.createElement( 'li' );
      item.appendChild( button );

      this.$list.appendChild( item );
    }

    if( !this.disabled ) {
      this.$previous.disabled = index === 1 ? true : false;

      if( !this.openEnd ) {
        this.$next.disabled = index === this.pagesCount ? true : false;    
      }
    } else {
      this.$previous.disabled = true;
      this.$next.disabled = true;
    }

    for( let c = 0; c < this.$list.children.length; c++ ) {
      this.$list.children[c].children[0].disabled = this.disabled ? true : false;

      this.$list.children[c].children[0].setAttribute( 'data-index', c + 1 );
      this.$list.children[c].children[0].textContent = c + 1;

      if( ( c + 1 ) === index ) {
        this.$list.children[c].children[0].classList.add( 'current' ); 
      } else {
        this.$list.children[c].children[0].classList.remove( 'current' ); 
      }
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
    this._upgrade( 'currentPageIndex' );    
    this._upgrade( 'disabled' );         
    this._upgrade( 'hidden' );     
    this._upgrade( 'openEnd' );         
    this._upgrade( 'pagesCount' );         
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'current-page-index',
      'disabled',
      'hidden',
      'open-end',
      'pages-count'
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
  get currentPageIndex() {
    if( this.hasAttribute( 'current-page-index' ) ) {
      return parseInt( this.getAttribute( 'current-page-index' ) );
    }

    return null;
  }

  set currentPageIndex( value ) {
    if( value !== null ) {
      this.setAttribute( 'current-page-index', value );
    } else {
      this.removeAttribute( 'current-page-index' );
    }
  }

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

  get openEnd() {
    return this.hasAttribute( 'open-end' );
  }

  set openEnd( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'open-end' );
      } else {
        this.setAttribute( 'open-end', '' );
      }
    } else {
      this.removeAttribute( 'open-end' );
    }
  } 

  get pagesCount() {
    if( this.hasAttribute( 'pages-count' ) ) {
      return parseInt( this.getAttribute( 'pages-count' ) );
    }

    return null;
  }

  set pagesCount( value ) {
    if( value !== null ) {
      this.setAttribute( 'pages-count', value );
    } else {
      this.removeAttribute( 'pages-count' );
    }
  }  
}

window.customElements.define( 'rf-pagination', RFPagination );
