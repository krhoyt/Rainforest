export default class RFHeader extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: block;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        header {
          display: flex;
          flex-direction: column;
          gap: var( --header-column-gap, 4px );
        }

        div[part=left] {
          align-items: baseline;
          flex-basis: 0;
          flex-grow: 1;
          gap: var( --header-row-gap, 6px );
        }        

        div[part=line] {
          align-items: center;
        }

        div[part=left],
        div[part=line] {
          display: flex;
          flex-direction: row;
        }

        p {
          display: inline-block;  
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;          
        }                

        p[part=counter] {
          color: var( --header-counter-color, #5f6b7a );
          font-size: var( --header-counter-font-size, 20px );
          font-weight: var( --header-counter-font-weight, 400 );
          line-height: var( --header-counter-line-height, 24px );          
        }

        p[part=description] {
          color: var( --header-description-color, #414d5c );
          font-size: var( --header-description-font-size, 14px );
          font-weight: var( --header-description-font-weight, 400 );
          line-height: var( --header-description-line-height, 20px );          
        }
        
        p[part=title] {
          color: var( --header-title-color, #000716 );
          font-size: var( --header-title-font-size, 20px );
          font-weight: var( --header-title-font-weight, 700 );
          line-height: var( --header-title-line-height, 24px );          
        }        

        :host( [variant=h1] ) p[part=counter],
        :host( [variant=h1] ) p[part=title] {
          font-size: 24px;
          line-height: 30px;                    
        }

        :host( [variant=h3] ) p[part=counter],
        :host( [variant=h3] ) p[part=title] {
          font-size: 18px;
          line-height: 22px;                    
        }        

        ::slotted( rf-link ) {
          --link-font-size: 12px;
          --link-line-height: 16px;
        }

        :host( :not( [counter] ) ) p[part=counter] { display: none; }
        :host( :not( [description] ) ) p[part=description] { display: none; } 
      </style>
      <header part="header">
        <div part="line">
          <div part="left">
            <p part="title">
              <slot></slot>
            </p>
            <p part="counter"></p>
            <slot name="info"></slot>                                    
          </div>
          <div part="actions">
            <slot name="actions"></slot>
          </div>
        </div>
        <p part="description"></p>
        <slot name="description"></slot>
      </header>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$counter = this.shadowRoot.querySelector( 'p[part=counter]' );
    this.$description = this.shadowRoot.querySelector( 'p[part=description]' );
  }

   // When attributes change
  _render() {
    this.$counter.innerText = this.counter === null ? '' : this.counter;
    this.$description.innerText = this.description === null ? '' : this.description;    
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
    this._upgrade( 'counter' );           
    this._upgrade( 'description' );               
    this._upgrade( 'headingTagOverride' );
    this._upgrade( 'hidden' );                      
    this._upgrade( 'variant' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'counter',
      'description',
      'heading-tag-override',
      'hidden',
      'variant'
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
  get counter() {
    if( this.hasAttribute( 'counter' ) ) {
      return this.getAttribute( 'counter' );
    }

    return null;
  }

  set counter( value ) {
    if( value !== null ) {
      this.setAttribute( 'counter', value );
    } else {
      this.removeAttribute( 'counter' );
    }
  } 
  
  get description() {
    if( this.hasAttribute( 'description' ) ) {
      return this.getAttribute( 'description' );
    }

    return null;
  }

  set description( value ) {
    if( value !== null ) {
      this.setAttribute( 'description', value );
    } else {
      this.removeAttribute( 'description' );
    }
  } 

  get headingTagOverride() {
    if( this.hasAttribute( 'heading-tag-override' ) ) {
      return this.getAttribute( 'heading-tag-override' );
    }

    return null;
  }

  set headingTagOverride( value ) {
    if( value !== null ) {
      this.setAttribute( 'heading-tag-override', value );
    } else {
      this.removeAttribute( 'heading-tag-override' );
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

  get variant() {
    if( this.hasAttribute( 'variant' ) ) {
      return this.getAttribute( 'variant' );
    }

    return null;
  }

  set variant( value ) {
    if( value !== null ) {
      this.setAttribute( 'variant', value );
    } else {
      this.removeAttribute( 'variant' );
    }
  }    
}

window.customElements.define( 'rf-header', RFHeader );
