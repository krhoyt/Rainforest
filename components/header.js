export default class RainforestHeader extends HTMLElement {
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

        header {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        div[part=left] {
          align-items: baseline;
          flex-basis: 0;
          flex-grow: 1;
          gap: 6px;
        }        

        div[part=line] {
          align-items: center;
        }

        div[part=left],
        div[part=line] {
          display: flex;
          flex-direction: row;
        }

        div[part=title] {
          color: var( --header-color, #000716 );          
          display: inline-block;
          font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: var( --header-font-size, 20px );
          font-weight: var( --header-font-weight, 700 );
          line-height: var( --header-line-height, 24px );
          text-rendering: optimizeLegibility;          
        }        

        p {
          color: var( --header-counter-color, #5f6b7a );
          display: inline-block;  
          font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif;                  
          font-size: var( --header-counter-font-size, 20px );
          font-weight: var( --header-counter-font-weight, 400 );
          line-height: var( --header-counter-line-height, 24px );
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;          
        }                

        :host( [variant=awsui-h1-sticky] ) div[part=title],
        :host( [variant=awsui-h1-sticky] ) p,
        :host( [variant=h1] ) div[part=title],
        :host( [variant=h1] ) p {
          font-size: 24px;
          line-height: 30px;
        }

        :host( [variant=h3] ) div[part=title],
        :host( [variant=h3] ) p {
          font-size: 18px;
          line-height: 22px;
        }

        /*
        :host( [heading-tag-override=h1] ) div[part=title] {
          font-size: var( --font-size-heading-xl );
          line-height: var( --line-height-heading-xl );
        }
        :host( [heading-tag-override=h2] ) div[part=title] {
          font-size: var( --font-size-heading-l );
          line-height: var( --line-height-heading-l );
          margin: 4px 0 0 0;
        }
        :host( [heading-tag-override=h3] ) div[part=title] {
          font-size: var( --font-size-heading-m );
          line-height: var( --line-height-heading-m );
        }
        :host( [heading-tag-override=h4] ) div[part=title] {
          font-size: var( --font-size-heading-s );
          line-height: var( --line-height-heading-s );
        }        
          :host( [heading-tag-override=h5] ) div[part=title] {
          font-size: var( --font-size-heading-xs );
          line-height: var( --line-height-heading-xs );
        }        
        */

        ::slotted( p[slot=description] ),
        ::slotted( span[slot=description] ) {          
          color: var( --header-description-color, #414d5c ) !important;
          font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: var( --header-description-font-size, 14px );
          font-weight: var( --header-description-font-weight, 400 );
          line-height: var( --header-description-line-height, 20px );
          margin: 0;
          padding: 0 !important;
        }

        ::slotted( rf-box[slot=description] ) {
          --box-color: #414d5c;
          --box-padding: 0;
        }

        :host( :not( [counter] ) ) p { display: none; }
      </style>
      <header part="header">
        <div part="line">
          <div part="left">
            <div part="title">
              <slot></slot>
            </div>
            <p part="counter"></p>
            <slot name="info"></slot>                                    
          </div>
          <div part="actions">
            <slot name="actions"></slot>
          </div>
        </div>
        <slot name="description"></slot>
      </header>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$counter = this.shadowRoot.querySelector( 'p' );
  }

   // When attributes change
  _render() {
    this.$counter.innerText = this.counter === null ? '' : this.counter;
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
    this._upgrade( 'headingTagOverride' );       
    this._upgrade( 'variant' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'counter',
      'heading-tag-override',
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

window.customElements.define( 'rf-header', RainforestHeader );
