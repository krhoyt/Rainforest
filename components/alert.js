import RainforestButton from "./button.js";

export default class RainforestAlert extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-block;
          position: relative;
        }

        div[part=alert] {
          background-color: var( --color-background-status-info );
          border-color: var( --color-border-status-info );
          border-style: solid;
          border-radius: var( --border-radius-alert );
          border-width: 2px;          
          display: flex;
          flex-direction: row;
          padding: 8px 16px 8px 16px;
        }

        div[part=content] {
          font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        }

        div[part=header] {
          font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
        }

        div[part=message] {
          display: flex;
          flex-basis: 0;
          flex-direction: column;
          flex-grow: 1;
          margin: 4px;
          padding: 2px 0 2px 0;
        }

        rf-button[part=button] {
          align-self: flex-start;
        }

        rf-button[part=close] {
          margin: 0 -4px 0 12px;
        }

        rf-button[part=close]::part( button ) {
          width: 28px;
        }

        rf-button[part=close]::part( icon ) {
          margin: 0;
        }

        img {
          filter:
            brightness( 0 ) 
            saturate( 100% )                
            invert( 26% ) 
            sepia( 98% ) 
            saturate( 3640% ) 
            hue-rotate( 196deg ) 
            brightness( 97% ) 
            contrast( 93% );            
          height: 16px;
          margin: 4px 4px 4px 0;
          object-fit: contain;
          padding: 4px 0 4px 0;          
          width: 16px;
        }

        :host( [type=error] ) div[part=alert],
        :host( [variant=error] ) div[part=alert] {
          background-color: #fff7f7;
          border-color: #d91515;
        }
        :host( [type=error] ) img,
        :host( [variant=error] ) img {        
          filter:
            brightness( 0 ) 
            saturate( 100% )            
            invert( 14% ) 
            sepia( 98% ) 
            saturate( 3166% ) 
            hue-rotate( 350deg ) 
            brightness( 107% ) 
            contrast( 105% );          
        }
        
        :host( [type=success] ) div[part=alert],
        :host( [variant=success] ) div[part=alert] {
          background-color: #f2fcf3;
          border-color: #037f0c;
        }
        :host( [type=success] ) img,
        :host( [variant=success] ) img {    
          filter:     
            brightness( 0 ) 
            saturate( 100% )                          
            invert( 29% ) 
            sepia( 72% ) 
            saturate( 1725% ) 
            hue-rotate( 103deg ) 
            brightness( 91% ) 
            contrast( 98% );
        }        

        :host( [type=warning] ) div[part=alert],
        :host( [variant=warning] ) div[part=alert] {
          background-color: #fffce9;
          border-color: #8d6605;
        }
        :host( [type=warning] ) img,
        :host( [variant=warning] ) img {        
          filter: 
            brightness( 0 ) 
            saturate( 100% )                            
            invert( 34% ) 
            sepia( 88% ) 
            saturate( 1021% ) 
            hue-rotate( 23deg ) 
            brightness( 90% ) 
            contrast( 96% );          
        }

        :host( :not( [dismissable] ) ) rf-button[part=close] {
          display: none;
        }

        ::slotted( rf-button[slot=action] ) {
          align-self: flex-start;
          padding-bottom: 4px;
          --button-border-color: #414d5c;
          --button-color: #414d5c;
          --button-hover-background-color: #0007160d;
          --button-hover-color: #414d5c;
        }

        ::slotted( rf-button[variant=primary] ) {
          --button-primary-background-color: #414d5c;
          --button-primary-border-color: #414d5c;
          --button-primary-color: #ffffff;
          --button-primary-hover-background-color: #000716;
          --button-primary-hover-border-color: #000716;          
        }        
      </style>
      <div part="alert">
        <img part="icon" />
        <div>
          <div part="message">
            <div part="header">
              <slot name="header"></slot>
            </div>
            <div part="content">
              <slot></slot>
            </div>
          </div>
          <slot name="action"></slot>          
        </div>
        <rf-button icon-name="close" part="close" variant="icon"></rf-button>      
      </div>
    `;
    
    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$alert = this.shadowRoot.querySelector( 'div[part=alert]' );
    this.$close = this.shadowRoot.querySelector( 'rf-button[part=close]' );
    this.$close.addEventListener( 'rf-click', () => {
      this.dispatchEvent( new CustomEvent( 'rf-dismiss' ) );
    } );
    this.$icon = this.shadowRoot.querySelector( 'img[part=icon]' );
  }

  focus() {
    this.$alert.focus();
  }

  // When things change
  _render() {
    switch( this.type ) {
      case 'error':
        this.$icon.src = '../icons/status-negative.svg';
        break;      
      case 'success':
        this.$icon.src = '../icons/status-positive.svg';
        break;
      case 'warning':
        this.$icon.src = '../icons/status-warning.svg';
        break;        
      default:
        this.$icon.src = '../icons/status-info.svg';        
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
    this._upgrade( 'dismissable' );                
    this._upgrade( 'type' );
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'dismissable',
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

window.customElements.define( 'rf-alert', RainforestAlert );
