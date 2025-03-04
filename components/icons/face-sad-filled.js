export default class RFIconFaceSadFilled extends HTMLElement {
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
<path d="M7.99519 1.10278C4.18473 1.10278 1.10289 4.18463 1.10289 7.99509C1.10289 11.8056 4.18473 14.8874 7.99519 14.8874C11.8057 14.8874 14.8875 11.8056 14.8875 7.99509C14.8875 4.18463 11.8057 1.10278 7.99519 1.10278ZM4.34731 10.7021C4.88643 9.21313 6.31351 8.12502 8.00004 8.12502C9.68658 8.12502 11.1137 9.21313 11.6528 10.7021L10.0073 11.2979C9.70643 10.4669 8.91351 9.87502 8.00004 9.87502C7.08658 9.87502 6.29365 10.4669 5.99278 11.2979L4.34731 10.7021ZM7.14841 6.02979C7.14841 6.65111 6.64473 7.15479 6.02341 7.15479C5.40209 7.15479 4.89841 6.65111 4.89841 6.02979C4.89841 5.40846 5.40209 4.90479 6.02341 4.90479C6.64473 4.90479 7.14841 5.40846 7.14841 6.02979ZM11.0979 6.02979C11.0979 6.65111 10.5942 7.15479 9.97289 7.15479C9.35156 7.15479 8.84789 6.65111 8.84789 6.02979C8.84789 5.40846 9.35156 4.90479 9.97289 4.90479C10.5942 4.90479 11.0979 5.40846 11.0979 6.02979Z" class="filled no-stroke" />
<path d="M8 0.5C3.85357 0.5 0.5 3.85357 0.5 8C0.5 12.1464 3.85357 15.5 8 15.5C12.1464 15.5 15.5 12.1464 15.5 8C15.5 3.85357 12.1464 0.5 8 0.5ZM8 2.05853C11.6091 2.05853 14.0085 4.62478 14.0085 8C14.0085 10.4041 11.9638 14.0135 8 14.0135C4.18158 14.0135 1.99087 11.1135 1.99087 8C1.99087 5.39675 3.70171 2.05853 8 2.05853Z" class="filled no-stroke"/>
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

window.customElements.define( 'rf-icon-face-sad-filled', RFIconFaceSadFilled );
