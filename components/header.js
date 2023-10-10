import RainforestBox from "./box.js";

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

        :host( [concealed] ) {
          visibility: hidden;
        }

        :host( [hidden] ) {
          display: none;
        } 

        div {
          align-items: center;
          display: flex;
          flex-direction: row;
        }

        header {
          display: flex;
          flex-direction: column;
        }

        rf-box {
          flex-basis: 0;
          flex-grow: 1;
        }

        rf-box::part( box ) {
          font-size: var( --font-size-heading-l );
          line-height: var( --line-height-heading-l );
        }

        rf-box span {
          color: var( --color-inactive );
          font-size: var( --font-size-heading-l );
          font-weight: 400;
          line-height: var( --line-height-heading-l );
        }

        :host( [variant=h1] ) rf-box::part( box ) {
          font-size: var( --font-size-heading-xl );
          line-height: var( --line-height-heading-xl );
        }

        :host( [variant=h2] ) rf-box::part( box ) {
          font-size: var( --font-size-heading-l );
          line-height: var( --line-height-heading-l );
        }

        :host( [variant=h3] ) rf-box::part( box ) {
          font-size: var( --font-size-heading-m );
          line-height: var( --line-height-heading-m );
        }

        :host( [variant=awsui-h1-sticky] ) rf-box::part( box ) {
          font-size: var( --font-size-heading-xl );
          line-height: var( --line-height-heading-xl );
        }

        :host( [headingtagoverride=h1] ) rf-box::part( box ) {
          font-size: var( --font-size-heading-xl );
          line-height: var( --line-height-heading-xl );
        }

        :host( [headingtagoverride=h2] ) rf-box::part( box ) {
          font-size: var( --font-size-heading-l );
          line-height: var( --line-height-heading-l );
        }

        :host( [headingtagoverride=h3] ) rf-box::part( box ) {
          font-size: var( --font-size-heading-m );
          line-height: var( --line-height-heading-m );
        }

        :host( [headingtagoverride=h4] ) rf-box::part( box ) {
          font-size: var( --font-size-heading-s );
          line-height: var( --line-height-heading-s );
        }        

        :host( [headingtagoverride=h5] ) rf-box::part( box ) {
          font-size: var( --font-size-heading-xs );
          line-height: var( --line-height-heading-xs );
        }        

        :host( :not( [counter] ) ) span {
          display: none;
        }
      </style>
      <header part="header">
        <div>
          <rf-box part="title" variant="h2">
            <slot></slot>
            <span part="counter"></span>
            <slot name="info"></slot>
          </rf-box>
          <slot name="actions"></slot>
        </div>
        <slot name="description"></slot>
      </header>
    `;

    // Private
    this._data = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$counter = this.shadowRoot.querySelector( 'span' );
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
    this._upgrade( 'concealed' );        
    this._upgrade( 'counter' );           
    this._upgrade( 'data' );    
    this._upgrade( 'headingTagOverride' );       
    this._upgrade( 'hidden' );    
    this._upgrade( 'variant' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'concealed',
      'counter',
      'headingtagoverride',
      'hidden',
      'variant'
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
  get data() {
    return this._data;
  }

  set data( value ) {
    this._data = value;
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
    if( this.hasAttribute( 'headingtagoverride' ) ) {
      return this.getAttribute( 'headingtagoverride' );
    }

    return null;
  }

  set headingTagOverride( value ) {
    if( value !== null ) {
      this.setAttribute( 'headingtagoverride', value );
    } else {
      this.removeAttribute( 'headingtagoverride' );
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

window.customElements.define( 'rf-header', RainforestHeader );
