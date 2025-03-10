export default class RFIconSettings extends HTMLElement {
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

        :host( [hidden] ) {
          display: none;
        }

        svg {
          box-sizing: border-box;
          display: block;
          fill: none;
          height: 16px;
          stroke: var( --icon-color, #000000 );
          stroke-width: var( --icon-stroke-width, 2px );
          width: 16px;
        }

        .filled {
          fill: var( --icon-color, #000000 );
        }

        .no-stroke {
          stroke: none;
          stroke-width: none;
        }

        .stroke-linejoin-round {
          stroke-linejoin: round;
        }
      </style>
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
<path d="M6.11048 1.72895C6.18048 1.30955 6.55049 1 6.97049 1H8.99048C9.42048 1 9.78047 1.30955 9.85047 1.72895L10.0205 2.72753C10.0705 3.01712 10.2605 3.25677 10.5205 3.40655C10.5805 3.43651 10.6305 3.46647 10.6905 3.50642C10.9405 3.6562 11.2505 3.70614 11.5305 3.60628L12.4805 3.25677C12.8805 3.10699 13.3305 3.25678 13.5505 3.63624L14.5605 5.38374C14.7705 5.75321 14.6905 6.22254 14.3605 6.49216L13.5805 7.13125C13.3505 7.32097 13.2405 7.61055 13.2505 7.90014V8.09986C13.2505 8.38945 13.3605 8.67903 13.5805 8.86875L14.3605 9.50784C14.6905 9.77746 14.7805 10.2468 14.5605 10.6163L13.5505 12.3638C13.3405 12.7332 12.8905 12.893 12.4905 12.7432L11.5405 12.3937C11.2605 12.2939 10.9605 12.3338 10.7005 12.4936C10.6405 12.5235 10.5905 12.5635 10.5305 12.5934C10.2705 12.7332 10.0805 12.9829 10.0305 13.2725L9.86048 14.271C9.79048 14.6904 9.42049 15 9.00049 15H6.98047C6.55047 15 6.19049 14.6904 6.12049 14.271L5.95047 13.2725C5.90047 12.9829 5.71047 12.7432 5.45047 12.5934C5.39047 12.5635 5.34049 12.5335 5.28049 12.4936C5.03049 12.3438 4.72049 12.2939 4.44049 12.3937L3.49048 12.7432C3.09048 12.893 2.64048 12.7432 2.43048 12.3638L1.42047 10.6163C1.21047 10.2468 1.29049 9.77746 1.62049 9.50784L2.40048 8.86875C2.63048 8.67903 2.74047 8.38945 2.73047 8.09986V7.90014C2.73047 7.60056 2.62048 7.32097 2.40048 7.13125L1.62049 6.49216C1.29049 6.22254 1.20047 5.75321 1.42047 5.38374L2.43048 3.63624C2.64048 3.26676 3.09049 3.10699 3.50049 3.25677L4.45047 3.60628C4.73047 3.70614 5.03047 3.66619 5.29047 3.50642C5.35047 3.47646 5.40048 3.43651 5.46048 3.40655C5.72048 3.26675 5.91048 3.0271 5.96048 2.72753L6.11048 1.72895Z" class="stroke-linecap-round stroke-linejoin-round"/>
<path d="M10 8C10 9.1 9.1 10 8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8Z" class="stroke-linecap-round stroke-linejoin-round"/>
</svg>

    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );
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
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'hidden'
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
}

window.customElements.define( 'rf-icon-settings', RFIconSettings );
