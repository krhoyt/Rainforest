import RFIconClose from "./icons/close.js";
import RFIconStatusInfo from "./icons/status-info.js";
import RFIconStatusNegative from "./icons/status-negative.js";
import RFIconStatusPositive from "./icons/status-positive.js";
import RFIconStatusWarning from "./icons/status-warning.js";
import RFStatusIndicator from "./status-indicator.js";

export default class RFAlert extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
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
          align-self: flex-start;
          background: none;
          border: none;
          border: solid 2px transparent;
          border-radius: 20px;
          cursor: pointer;
          margin: 0;
          padding: 4px 4px 0 4px;
        }

        div[part=alert] {
          background-color: var( --alert-background-color, #f2f8fd );
          border-color: var( --alert-border-color, #0972d3 );
          border-style: solid;
          border-radius: 12px;
          border-width: 2px;          
          display: flex;
          flex-direction: row;
          padding: 8px 16px 8px 16px;
        }

        div[part=alert] > div:last-of-type {
          flex-basis: 0;
          flex-grow: 1;
        }

        div[part=icons] {
          align-self: flex-start;
          margin: 8px 4px 2px 0;
        }        

        div[part=message] {
          display: flex;
          flex-basis: 0;
          flex-direction: column;
          flex-grow: 1;
          margin: 4px;
          padding: 2px 0 2px 0;
          width: 100%;
        }        

        p {
          color: var( --alert-color, #000716 );
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;
        }

        p[part=content] {
          width: 100%;
        }

        p[part=header] {
          color: var( --alert-header-color, #000716 );
          font-weight: 700;
        }        

        rf-icon-close {
          margin: 2px 0 2px 0;
          --icon-color: #414d5c;
        }

        rf-icon-status-info { 
          --icon-color: #006ce0;
        }

        rf-icon-status-negative { 
          display: none;
          --icon-color: #db0000;
        }        

        rf-icon-status-positive { 
          display: none;
          --icon-color: #00802f;
        }        

        rf-icon-status-warning { 
          display: none;
          --icon-color: #855900;
        }                

        :host( [type=error] ) div[part=alert] {
          background-color: #fff7f7;
          border-color: #d91515;
        }
        :host( [type=error] ) rf-icon-status-info { display: none; }                
        :host( [type=error] ) rf-icon-status-negative { display: inline; }            
        
        :host( [type=success] ) div[part=alert] {
          background-color: #f2fcf3;
          border-color: #037f0c;
        }
        :host( [type=success] ) rf-icon-status-info { display: none; }                
        :host( [type=success] ) rf-icon-status-positive { display: inline; }        

        :host( [type=warning] ) div[part=alert] {
          background-color: #fffce9;
          border-color: #8d6605;
        }
        :host( [type=warning] ) rf-icon-status-info { display: none; }                
        :host( [type=warning] ) rf-icon-status-warning { display: inline; }            

        :host( :not( [dismissable] ) ) button {
          display: none;
        }
      </style>
      <div part="alert">
        <div part="icons">
          <rf-icon-status-info></rf-icon-status-info>
          <rf-icon-status-positive></rf-icon-status-positive>        
          <rf-icon-status-negative></rf-icon-status-negative>
          <rf-icon-status-warning></rf-icon-status-warning>         
        </div>
        <div>
          <div part="message">
            <p part="header"></p>
            <p part="content">
              <slot></slot>
            </p>
          </div>
          <slot name="action"></slot>          
        </div>
        <button part="close" type="button">
          <rf-icon-close></rf-icon-close>
        </button>  
      </div>
    `;
    
    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$alert = this.shadowRoot.querySelector( 'div[part=message]' );
    this.$close = this.shadowRoot.querySelector( 'button' );
    this.$close.addEventListener( 'rf-click', () => {
      this.dispatchEvent( new CustomEvent( 'rf-dismiss' ) );
    } );
    this.$header = this.shadowRoot.querySelector( 'p[part=header]' );
  }

  focus() {
    this.$alert.focus();
  }

  // When things change
  _render() {
    this.$header.innerText = this.header === null ? '' : this.header;
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
    this._upgrade( 'header' );                         
    this._upgrade( 'hidden' );                    
    this._upgrade( 'type' );
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'dismissable',
      'header',      
      'hidden',
      'type'
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

  get header() {
    if( this.hasAttribute( 'header' ) ) {
      return this.getAttribute( 'header' );
    }

    return null;
  }

  set header( value ) {
    if( value !== null ) {
      this.setAttribute( 'header', value );
    } else {
      this.removeAttribute( 'header' );
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

window.customElements.define( 'rf-alert', RFAlert );
