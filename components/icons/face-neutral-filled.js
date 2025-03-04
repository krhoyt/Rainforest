export default class RFIconFaceNeutralFilled extends HTMLElement {
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
<path d="M7.99508 1.10275C4.18461 1.10275 1.10277 4.1846 1.10277 7.99506C1.10277 11.8055 4.18461 14.8874 7.99508 14.8874C11.8055 14.8874 14.8874 11.8055 14.8874 7.99506C14.8874 4.1846 11.8055 1.10275 7.99508 1.10275ZM11 10.875H5V9.12499H11V10.875ZM7.14841 6.02975C7.14841 6.65107 6.64473 7.15475 6.02341 7.15475C5.40209 7.15475 4.89841 6.65107 4.89841 6.02975C4.89841 5.40843 5.40209 4.90475 6.02341 4.90475C6.64473 4.90475 7.14841 5.40843 7.14841 6.02975ZM11.0979 6.02975C11.0979 6.65107 10.5942 7.15475 9.97289 7.15475C9.35156 7.15475 8.84789 6.65107 8.84789 6.02975C8.84789 5.40843 9.35156 4.90475 9.97289 4.90475C10.5942 4.90475 11.0979 5.40843 11.0979 6.02975Z" class="filled no-stroke" />
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

window.customElements.define( 'rf-icon-face-neutral-filled', RFIconFaceNeutralFilled );
