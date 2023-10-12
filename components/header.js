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

        div rf-box {
          flex-basis: 0;
          flex-grow: 1;
        }

        div rf-box::part( box ) {
          color: var( --color-text-heading-default );
          font-size: var( --font-size-heading-l );
          line-height: var( --line-height-heading-l );
        }

        header {
          display: flex;
          flex-direction: column;
          gap: var( --space-scaled-xxxs );
        }

        rf-box span {
          color: var( --color-inactive );
          font-size: var( --font-size-heading-l );
          font-weight: 400;
          line-height: var( --line-height-heading-l );
        }

        :host( [variant=h1] ) div rf-box::part( box ) {
          font-size: var( --font-size-heading-xl );
          line-height: var( --line-height-heading-xl );
        }
        :host( [variant=h2] ) div rf-box::part( box ) {
          font-size: var( --font-size-heading-l );
          line-height: var( --line-height-heading-l );
          margin: 4px 0 0 0;
        }
        :host( [variant=h3] ) div rf-box::part( box ) {
          font-size: var( --font-size-heading-m );
          line-height: var( --line-height-heading-m );
        }
        :host( [variant=awsui-h1-sticky] ) div rf-box::part( box ) {
          font-size: var( --font-size-heading-xl );
          line-height: var( --line-height-heading-xl );
        }

        :host( [headingtagoverride=h1] ) div rf-box::part( box ) {
          font-size: var( --font-size-heading-xl );
          line-height: var( --line-height-heading-xl );
        }
        :host( [headingtagoverride=h2] ) div rf-box::part( box ) {
          font-size: var( --font-size-heading-l );
          line-height: var( --line-height-heading-l );
          margin: 4px 0 0 0;
        }
        :host( [headingtagoverride=h3] ) div rf-box::part( box ) {
          font-size: var( --font-size-heading-m );
          line-height: var( --line-height-heading-m );
        }
        :host( [headingtagoverride=h4] ) div rf-box::part( box ) {
          font-size: var( --font-size-heading-s );
          line-height: var( --line-height-heading-s );
        }        
        :host( [headingtagoverride=h5] ) div rf-box::part( box ) {
          font-size: var( --font-size-heading-xs );
          line-height: var( --line-height-heading-xs );
        }        

        :host( :not( [counter] ) ) span {
          display: none;
        }

        :host( :not( [description] ) ) rf-box[part=description] {
          display: none;
        }

        :host( :not( [link] ) ) rf-link {
          display: none;
        }        

        .actions {
          gap: var( --space-scaled-xxs );
        }
      </style>
      <header part="header">
        <div>
          <rf-box part="title" variant="h2">
            <slot></slot>
            <span part="counter"></span>
            <rf-link part="link" variant="info"></rf-link>            
            <slot name="info"></slot>
          </rf-box>
          <slot name="actions"></slot>
        </div>
        <rf-box color="text-body-secondary" part="description"></rf-box>
        <slot name="description"></slot>
      </header>
    `;

    // Private
    this._data = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$actions = this.shadowRoot.querySelector( 'slot[name=actions]' );
    this.$actions.addEventListener( 'slotchange', () => {
      const buttons = this.querySelectorAll( 'rf-button' );
      if( buttons.length === 0 ) {
        this.$header.classList.remove( 'actions' );
      } else {
        this.$header.classList.add( 'actions' );
      }
    } );
    this.$counter = this.shadowRoot.querySelector( 'span' );
    this.$description = this.shadowRoot.querySelector( 'rf-box[part=description]' );
    this.$header = this.shadowRoot.querySelector( 'header' );
    this.$link = this.shadowRoot.querySelector( 'rf-link' );
    this.$title = this.shadowRoot.querySelector( 'rf-box[part=title]' );
  }

   // When attributes change
  _render() {
    this.$title.content = this.title;    
    this.$counter.innerText = this.counter === null ? '' : this.counter;
    this.$link.content = this.link;
    this.$link.href = this.href;
    this.$description.content = this.description === null ? '' : this.description;
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
    this._upgrade( 'description' );               
    this._upgrade( 'headingTagOverride' );       
    this._upgrade( 'hidden' );  
    this._upgrade( 'href' );           
    this._upgrade( 'info' );    
    this._upgrade( 'title' );     
    this._upgrade( 'variant' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'concealed',
      'counter',
      'description',
      'headingtagoverride',
      'hidden',
      'href',
      'info',
      'title',
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

  get info() {
    if( this.hasAttribute( 'info' ) ) {
      return this.getAttribute( 'info' );
    }

    return null;
  }

  set info( value ) {
    if( value !== null ) {
      this.setAttribute( 'info', value );
    } else {
      this.removeAttribute( 'info' );
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
