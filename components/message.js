import RFStatusIndicator from "./status-indicator.js";

export default class RFMessage extends HTMLElement {
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
          margin: 0;
          padding: 0;
          width: 28px;
        }

        button:hover path {
          stroke: #ffffff;
        }

        div[part=content] {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          margin: 0 0 0 4px;
          width: 100%;
        }

        div[part=flash] {
          background-color: var( --flashbar-background-color, #0972d3 );
          border-radius: 12px;
          display: flex;
          flex-direction: row;
          padding: 8px 16px 8px 16px;
        }

        div[part=header] {;}

        div[part=message] {
          align-items: center;          
          box-sizing: border-box;          
          display: flex;
          flex-basis: 0;
          flex-direction: row;
          flex-grow: 1;          
        }

        path {
          fill: none;
          stroke: #d1d5db;
          stroke-width: 2px;
        }

        svg {
          box-sizing: border-box;
          height: 16px;
          min-width: 16px;
          width: 16px;
        }        

        rf-status-indicator {
          align-self: flex-start;
          margin: 2px 0 2px 0;
          padding: 6px 4px 4px 0;
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

        :host( [type=warning] ) div[part=flash] {
          background-color: #ffe457;
        }        

        :host( [type=warning] ) path {
          stroke: #414d5c;
        }

        :host( [type=warning] ) button:hover path {
          stroke: #000716;
        }        
      </style>
      <div part="flash">
        <rf-status-indicator color="inverted" part="status"></rf-status-indicator>
        <div part="content">
          <slot name="header"></slot>
          <div part="message">
            <slot></slot>
          </div>
          <slot name="action"></slot>
        </div>
        <button part="button" type="button">
          <svg part="vector">
            <path d="m2 2 12 12M14 2 2 14"></path>                    
          </svg>
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
    this.$status = this.shadowRoot.querySelector( 'rf-status-indicator' );
  }

   // When attributes change
  _render() {
    /*
    let icon = this.type === null ? 'info' : this.type;
    
    if( icon === 'success' ) {
      icon = 'success';
    }

    if( this.loading ) {
      icon = 'loading';
    }

    this.$status.color = icon === 'warning' ? null : 'inverted';
    this.$status.type = icon;

    this.$header.innerText = this.header === null ? '' : this.header;
    */
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

window.customElements.define( 'rf-message', RFMessage );
