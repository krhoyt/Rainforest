import RainforestStatusIndicator from "./status-indicator.js";
import RainforestIcon from "./icon.js";

export default class RainforestFlashbar extends HTMLElement {
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

        button {
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          height: 32px;
          justify-content: center;
          margin: 0 -4px 0 12px;
          padding: 6px;
          width: 28px;
        }

        button:hover rf-icon::part( icon ) {
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 100% )
            sepia( 0% )
            saturate( 7500% )
            hue-rotate( 104deg )
            brightness( 102% )
            contrast( 107% );
        }

        div[part=flash] {
          background-color: var( --flashbar-background-color, #0972d3 );
          border-radius: 12px;
          display: flex;
          flex-direction: row;
          padding: 8px 16px 8px 16px;
        }

        div[part=flash] > div {
          display: flex;
          flex-basis: 0;
          flex-direction: column;
          flex-grow: 1;
        }

        div[part=content] {
          display: inline-block;
          width: 100%;
        }

        rf-icon::part( icon ) {
          cursor: pointer;
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 93% )
            sepia( 9% )
            saturate( 128% )
            hue-rotate( 177deg )
            brightness( 88% )
            contrast( 100% );         
        }

        rf-status-indicator {
          align-self: flex-start;
          margin: 6px 4px 0 0;
          --status-indicator-size: 20px;
        }

        ::slotted( rf-box ) {
          display: inline-block;
          margin: 2px 0 2px 0;
          padding: 4px 0 4px 0;
        }

        ::slotted( rf-box[slot=header] ) {
          --box-font-weight: 700;
        }        

        ::slotted( rf-box:not( [slot] ) ) {
          margin: 0;
          padding: 0;
        }

        ::slotted( rf-button ) {
          align-self: flex-start;
          margin: 0 0 4px 0;
          --button-border-color: #ffffff;
          --button-color: #ffffff;
          --button-hover-background-color: #00071626;
          --button-hover-border-color: #ffffff;
          --button-hover-color: #ffffff;
        }

        ::slotted( rf-link ) {
          --link-color: #ffffff;
          --link-hover-color: #ffffff;
          --link-hover-text-decoration: none;
        }

        :host( :not( [dismissable] ) ) button {
          display: none;
        }

        :host( [type=error] ) div[part=flash] {
          background-color: #d91515;
        }

        :host( [type=success] ) div[part=flash] {
          background-color: #037f0c;
        }
      </style>
      <div part="flash">
        <rf-status-indicator color-override="white" part="status"></rf-status-indicator>
        <div>
          <div part="header">
            <slot name="header"></slot>
          </div>
          <div part="content">
            <slot></slot>
          </div>
          <slot name="action"></slot>
        </div>
        <button>
          <rf-icon name="close"></rf-icon>
        </button>
      </div>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$button.addEventListener( 'click', () => {
      this.dispatchEvent( new CustomEvent( 'rf-dismiss' ) );
    } );    
    this.$close = this.shadowRoot.querySelector( 'button' );
    this.$status = this.shadowRoot.querySelector( 'rf-status-indicator' );
  }

   // When attributes change
  _render() {
    let icon = this.type === null ? 'info' : this.type;
    
    if( icon === 'success' ) {
      icon = 'positive';
    }

    this.$status.type = icon;
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
    this._upgrade( 'dismissable' );           
    this._upgrade( 'hidden' );           
    this._upgrade( 'loading' );           
    this._upgrade( 'type' );           
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'dismissable',
      'hidden',
      'loading',
      'type'
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
  get dismissable() {
    return this.hasAttribute( 'dismissable' );
  }

  set dismissable( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'dismissable' );
      } else {
        this.setAttribute( 'dismissable', '' );
      }
    } else {
      this.removeAttribute( 'dismissable' );
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

  get loading() {
    return this.hasAttribute( 'loading' );
  }

  set loading( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'loading' );
      } else {
        this.setAttribute( 'loading', '' );
      }
    } else {
      this.removeAttribute( 'loading' );
    }
  }  

  get type() {
    if( this.hasAttribute( 'type' ) ) {
      return this.getAttribute( 'type' );
    }

    return null;
  }

  set type( value ) {
    if( value !== null ) {
      this.setAttribute( 'type', value );
    } else {
      this.removeAttribute( 'type' );
    }
  }      
}

window.customElements.define( 'rf-flashbar', RainforestFlashbar );
