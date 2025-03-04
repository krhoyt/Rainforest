export default class RFChatBubble extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          align-items: flex-start;
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: row;
          gap: 8px;
          position: relative;
        }

        :host( [hidden] ) {
          display: none;
        }

        div[part=actions] {
          display: none;
        }

        div[part=avatar] {
          padding: 8px 0 8px 0;          
        }

        div[part=message] {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 12px;
        }

        p {
          box-sizing: border-box;
          color: #000716;
          cursor: default;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px;
          margin: 0;
          padding: 0;
          text-align: var( --label-text-align, left );
          text-rendering: optimizeLegibility;
          width: 100%;          
        }

        :host( [hide-avatar] ) div[part=avatar] {
          visibility: hidden;
        }

        :host( [type=incoming] ) div[part=message] {
          background-color: #f6f6f9;
          border-radius: 8px;
        }
      </style>
      <div part="avatar">
        <slot name="avatar"></slot>
      </div>
      <div part="message">
        <p part="content">
          <slot></slot>
        </p>
        <div part="actions">
          <slot name="actions"></slot>        
        </div>
      </div>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements

  }

  // When things change
  _render() {;}

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
    this._upgrade( 'hideAvatar' );
    this._upgrade( 'showLoadingBar' );
    this._upgrade( 'type' );    
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'hidden',
      'hide-avatar',
      'show-loading-bar',
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
  
  get hideAvatar() {
    return this.hasAttribute( 'hide-avatar' );
  }

  set hideAvatar( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'hide-avatar' );
      } else {
        this.setAttribute( 'hide-avatar', '' );
      }
    } else {
      this.removeAttribute( 'hide-avatar' );
    }
  }  

  get showLoadingBar() {
    return this.hasAttribute( 'show-loading-bar' );
  }

  set showLoadingBar( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'show-loading-bar' );
      } else {
        this.setAttribute( 'show-loading-bar', '' );
      }
    } else {
      this.removeAttribute( 'show-loading-bar' );
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

window.customElements.define( 'rf-chat-bubble', RFChatBubble );
