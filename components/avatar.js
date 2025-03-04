import RFIconGenAi from "./icons/gen-ai.js";
import RFIconUserProfile from "./icons/user-profile.js";

export default class RFAvatar extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = /* template */ `
      <style>
        @keyframes dots {
          0% { transform: translateY( 0 ); }
          28% { transform: translateY( -4px ); }
          44% { transform: translateY( 0 ); }
        }

        :host {
          align-items: center;
          background-color: #424650;
          border-radius: 28px;
          box-sizing: border-box;
          display: inline-flex;
          height: 28px;
          justify-content: center;
          position: relative;
          width: 28px;
        }

        :host( [hidden] ) {
          display: none;
        }

        div[part=icon] {
          display: contents;
        }

        div[part=loading] {
          align-items: center;
          display: none;
          flex-direction: row;
          justify-content: space-between;
          width: 18px;
        }

        div[part=loading] div {
          background-color: #ffffff;
          border-radius: 4px;
          height: 4px;
          width: 4px;
        }

        :host( [color=gen-ai] ) {
          background: 
            radial-gradient( circle farthest-corner at top left, #0096fa -25%, #0096fa00 55% ), 
            radial-gradient( circle farthest-corner at top right, #d8b2ff -10%, #7300e5 50% );
        }

        p {
          color: #ffffff;
          cursor: default;
          display: block;  
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 12px;
          font-weight: 700;
          line-height: 16px;
          margin: 0;
          padding: 0;
          text-align: center;
          text-rendering: optimizeLegibility;     
          width: 28px;            
        } 

        rf-icon-gen-ai {
          display: none;
          --icon-color: #ffffff;
        }

        rf-icon-user-profile {
          --icon-color: #ffffff;
        }

        :host( [initials] ) rf-icon-user-profile {
          display: none;
        }

        :host( :not( [initials] ) ) p {
          display: none;
        }

        :host( [color=gen-ai]:not( [initials] ) ) p,
        :host( [color=gen-ai] ) rf-icon-user-profile {
          display: none;
        }

        :host( [color=gen-ai]:not( [initials] ):not( [loading] ) ) rf-icon-gen-ai {
          display: inline;
        }

        :host( [loading] ) div[part=icon],
        :host( [loading] ) p,
        :host( [loading] ) rf-icon-gen-ai,
        :host( [loading] ) rf-icon-user-profile {
          display: none;
        }

        :host( [loading] ) div[part=loading] {
          display: flex;
        }

        div[part=loading] div:nth-of-type( 1 ) {
          animation: dots 1.20s infinite ease-in-out;                    
          animation-delay: 0.10s;
        }

        div[part=loading] div:nth-of-type( 2 ) {
          animation: dots 1.20s infinite ease-in-out;                              
          animation-delay: 0.20s;
        }
        
        div[part=loading] div:nth-of-type( 3 ) {
          animation: dots 1.20s infinite ease-in-out;                              
          animation-delay: 0.30s;
        }        
      </style>
      <p part="initials"></p>
      <rf-icon-user-profile part="profile"></rf-icon-user-profile>
      <rf-icon-gen-ai part="ai"></rf-icon-gen-ai>
      <div part="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div part="icon">
        <slot></slot>
      </div>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$initials = this.shadowRoot.querySelector( 'p' );
  }

  // When things change
  _render() {
    this.$initials.textContent = this.initials === null ? '' : this.initials;
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
    this._upgrade( 'color' );                
    this._upgrade( 'hidden' );                    
    this._upgrade( 'initials' );                        
    this._upgrade( 'loading' );                            
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'color',
      'hidden',
      'initials',
      'loading'
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
  get color() {
    if( this.hasAttribute( 'color' ) ) {
      return this.getAttribute( 'color' );
    }

    return null;
  }

  set color( value ) {
    if( value !== null ) {
      this.setAttribute( 'color', value );
    } else {
      this.removeAttribute( 'color' );
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

  get initials() {
    if( this.hasAttribute( 'initials' ) ) {
      return this.getAttribute( 'initials' );
    }

    return null;
  }

  set initials( value ) {
    if( value !== null ) {
      this.setAttribute( 'initials', value );
    } else {
      this.removeAttribute( 'initials' );
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
}

window.customElements.define( 'rf-avatar', RFAvatar );
