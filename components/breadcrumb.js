import RFIconAngleRight from "./icons/angle-right.js";

export default class RFBreadcrumb extends HTMLElement {
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
          gap: 8px;
          position: relative;
        }

        a,
        p {
          background: none;
          border: none;
          color: var( --breadcrumb-color, #0972d3 );
          cursor: var( --breadcrumb-cursor, pointer );
          display: inline-block;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: var( --breadcrumb-font-weight, 400 );
          line-height: 20px;
          margin: 0;
          padding: 0;
          text-decoration: var( --breadcrumb-text-decoration, underline );
          text-decoration-thickness: 1px;
          text-underline-offset: 0.25em;
          
          overflow: hidden;
          text-overflow: ellipsis;          
          white-space: nowrap;
        }

        a:hover {
          color: var( --breadcrumb-hover-color, #033160 );
        }        

        p {
          color: var( --breadcrumb-text-color, #656871 );
          cursor: default;
          font-weight: 700;          
          text-decoration: none;
        }

        rf-icon-angle-right {
          padding: 2px 0 2px 0;          
          --icon-color: var( --breadcrumb-icon-color, #8c8c94 );
        }

        :host( :not( [href] ) ) a {
          display: none;
        }

        :host( :not( [text] ) ) {
          display: none;
        }
      </style>
      <a part="href"></a>
      <p part="text"></p>
      <rf-icon-angle-right part="icon"></rf-icon-angle-right>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$text = this.shadowRoot.querySelector( 'p' );    
    this.$link = this.shadowRoot.querySelector( 'a' );
    this.$link.addEventListener( 'click', () => {
      const detail = {
        external: this.href.indexOf( '//' ) ? true : false,
        href: this.href,
        label: this.label
      };
  
      if( !evt.altKey && !evt.ctrlKey && !evt.metaKey && !evt.shiftKey ) {
        this.dispatchEvent( new CustomEvent( 'rf-follow', {
          bubbles: true,
          cancelable: false,        
          composed: true,
          detail: detail
        } ) );
      }
  
      this.dispatchEvent( new CustomEvent( 'rf-click', {
        bubbles: true,
        cancelable: false,        
        composed: true,
        detail: detail
      } ) );
    } );    
  }

  // When things change
  _render() {
    // this.$button.textContent = this.label === null ? '' : this.label;
    this.$text.textContent = this.text === null ? '' : this.text;
    this.$link.textContent = this.text === null ? '' : this.text;
    this.$link.href = this.href === null ? '' : this.href;
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
    this._upgrade( 'href' );       
    this._upgrade( 'text' );           
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'href',
      'text'
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
  get href() {
    if( this.hasAttribute( 'href' ) ) {
      return this.getAttribute( 'href' );
    }

    return null;
  }

  set href( value ) {
    if( value !== null ) {
      this.setAttribute( 'href', value );
    } else {
      this.removeAttribute( 'href' );
    }
  }

  get text() {
    if( this.hasAttribute( 'text' ) ) {
      return this.getAttribute( 'text' );
    }

    return null;
  }

  set text( value ) {
    if( value !== null ) {
      this.setAttribute( 'text', value );
    } else {
      this.removeAttribute( 'text' );
    }
  }  
}

window.customElements.define( 'rf-breadcrumb', RFBreadcrumb );
