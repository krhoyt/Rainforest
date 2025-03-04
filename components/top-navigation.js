export default class RFTopNavigation extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          background-color: var( --top-navigation-background-color, #0f1b2a );
          box-sizing: border-box;
          display: grid;
          grid-template-columns: repeat( 3, 1fr );
          grid-template-rows: 1fr;
          grid-column-gap: 0px;
          grid-row-gap: 0px;
          height: var( --top-navigation-height, 48px );
          position: relative;
        }
        
        a {
          align-items: center;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          gap: 12px;
        }

        a:hover p {
          color: #539fe5;
        }

        div {
          align-items: center;
          display: flex;
          flex-direction: row;
        }

        div:first-of-type {
          padding: 0 0 0 20px;
        }
        
        div:nth-of-type( 1 ) { grid-area: 1 / 1 / 2 / 2; }
        div:nth-of-type( 2 ) {           
          grid-area: 1 / 2 / 2 / 3; 
          justify-content: center;
        }
        div:nth-of-type( 3 ) { 
          grid-area: 1 / 3 / 2 / 4; 
          justify-content: end;          
        }        

        img {
          height: 32px;
          max-height: 32px;
        }

        p {
          box-sizing: border-box;
          color: #fbfbfb;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 18px;
          font-weight: 700;
          line-height: 22px;
          margin: 0;
          padding: 0;
          text-align: left;
          text-decoration: none;
          text-rendering: optimizeLegibility;
        }

        ::slotted( rf-button ) {
          cursor: pointer;
          padding: 8px 20px 8px 20px;          
          --button-border-color: transparent;
          --button-caret-fill: #d1d5db;
          --button-caret-stroke: #d1d5db;
          --button-color: #d1d5db;
          --button-padding: 4px 0 4px 0;
          --icon-filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 93% )
            sepia( 7% )
            saturate( 182% )
            hue-rotate( 177deg )
            brightness( 92% )
            contrast( 90% );
        }

        ::slotted( rf-button[variant=icon] ) {
          padding: 8px 12px 8px 12px;
        }        

        ::slotted( rf-button:hover ) {
          --button-color: #ffffff;                    
          --button-caret-fill: #ffffff;
          --button-caret-stroke: #ffffff;          
          --button-hover-background-color: transparent;
          --button-hover-border-color: transparent;
          --button-hover-color: #ffffff;          
          --icon-filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 100% )
            sepia( 100% )
            saturate( 0% )
            hue-rotate( 277deg )
            brightness( 104% )
            contrast( 101% );
        }        

        ::slotted( rf-input ) {
          width: 72%;
          --input-background-color: transparent;
          --input-color: #b6bec9;
          --input-focus-border-color: #b5d6f4;
          --input-placeholder-color: #8d99a8;
        }

        ::slotted( rf-link ) {
          padding: 0 20px 0 20px;
          --link-color: #d1d5db;
          --link-hover-color: #ffffff;
          --link-padding: 14px 0 14px 0;
        }

        :host( [hidden] ) {
          display: none;
        }

        :host( :not( [href] ) ) a,
        :host( :not( [href] ) ) a:hover p,
        :host( :not( [href] ) ) img,
        :host( :not( [href] ) ) p {
          color: #fbfbfb;
          cursor: default;
          text-decoration: none;
        }

        :host( :not( [title] ) ) p,
        :host( :not( [logo] ) ) img {
          display: none;
        }
      </style>
      <div part="identity">
        <a part="link">
          <img part="logo" />
          <p part="title"></p>
        </a>
      </div>
      <div>
        <slot name="search"></slot>
      </div>
      <div part="utilities">
        <slot></slot>
      </div>      
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$image = this.shadowRoot.querySelector( 'img' );
    this.$link = this.shadowRoot.querySelector( 'a' );
    this.$title = this.shadowRoot.querySelector( 'p' );
  }

   // When attributes change
  _render() {
    this.$link.href = this.href === null ? '' : this.href;
    this.$image.src = this.logo === null ? '' : this.logo;
    this.$title.innerText = this.title === null ? '' : this.title;
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
    this._upgrade( 'href' );     
    this._upgrade( 'logo' );     
    this._upgrade( 'title' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'hidden',      
      'href',
      'logo',
      'title'
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

  get logo() {
    if( this.hasAttribute( 'logo' ) ) {
      return this.getAttribute( 'logo' );
    }

    return null;
  }

  set logo( value ) {
    if( value !== null ) {
      this.setAttribute( 'logo', value );
    } else {
      this.removeAttribute( 'logo' );
    }
  }
  
  get title() {
    if( this.hasAttribute( 'title' ) ) {
      return this.getAttribute( 'title' );
    }

    return null;
  }

  set title( value ) {
    if( value !== null ) {
      this.setAttribute( 'title', value );
    } else {
      this.removeAttribute( 'title' );
    }
  }  
}

window.customElements.define( 'rf-top-navigation', RFTopNavigation );
