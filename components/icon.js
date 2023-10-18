export default class RainforestIcon extends HTMLElement {
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

        img {
          box-sizing: border-box;
          display: block;
          cursor: var( --icon-cursor, default );
          filter: var( --icon-filter,
            brightness( 0 )
            saturate( 100% )
            invert( 4% )
            sepia( 24% )
            saturate( 4129% )
            hue-rotate( 186deg )
            brightness( 102% )
            contrast( 107% )
          );
          height: var( --icon-height, 16px );
          object-fit: var( --icon-object-fit, contain );
          width: var( --icon-width, 16px );
        }

        :host( [size=big] ) img {
          height: 32px;
          width: 32px;
        }

        :host( [size=large] ) img {
          height: 48px;
          width: 48px;
        }

        :host( [size=medium] ) img {
          height: 20px;
          width: 20px;
        }

        :host( [variant=disabled] ) img {
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 69% )
            sepia( 11% )
            saturate( 375% )
            hue-rotate( 173deg )
            brightness( 93% )
            contrast( 93% );
        }

        :host( [variant=subtle] ) img {
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 43% )
            sepia( 2% )
            saturate( 3565% )
            hue-rotate( 174deg )
            brightness( 89% )
            contrast( 74% );
        }

        :host( [variant=error] ) img,
        :host( [variant=warning] ) img {
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 16% )
            sepia( 89% )
            saturate( 6443% )
            hue-rotate( 357deg )
            brightness( 89% )
            contrast( 90% );
        }

        :host( [variant=info] ) img,
        :host( [variant=link] ) img {
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 35% )
            sepia( 30% )
            saturate( 4678% )
            hue-rotate( 193deg )
            brightness( 86% )
            contrast( 93% );
        }

        :host( [variant=inverted] ) img {
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 99% )
            sepia( 78% )
            saturate( 164% )
            hue-rotate( 67deg )
            brightness( 119% )
            contrast( 100% );
        }

        :host( [variant=success] ) img {
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 26% )
            sepia( 35% )
            saturate( 4393% )
            hue-rotate( 114deg )
            brightness( 94% )
            contrast( 98% );
        }
      </style>
      <img part="icon" />
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$image = this.shadowRoot.querySelector( 'img' );
  }

  // When things change
  _render() {
    let src = null;

    if( this.url === null ) {
      let name = this.name === null ? '' : this.name + '.svg';
      let path = this.path === null ? '../icons/' : this.path;
      path = this.name === null ? '' : path;
      src = path + name;
    } else {
      src = this.url;
    }

    this.$image.src = src;
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
    this._upgrade( 'name' );
    this._upgrade( 'path' );
    this._upgrade( 'size' );
    this._upgrade( 'url' );
    this._upgrade( 'variant' );
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'name',
      'path',
      'size',
      'url',
      'variant'
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
  get name() {
    if( this.hasAttribute( 'name' ) ) {
      return this.getAttribute( 'name' );
    }

    return null;
  }

  set name( value ) {
    if( value !== null ) {
      this.setAttribute( 'name', value );
    } else {
      this.removeAttribute( 'name' );
    }
  }

  get path() {
    if( this.hasAttribute( 'path' ) ) {
      return this.getAttribute( 'path' );
    }

    return null;
  }

  set path( value ) {
    if( value !== null ) {
      this.setAttribute( 'path', value );
    } else {
      this.removeAttribute( 'path' );
    }
  }

  get size() {
    if( this.hasAttribute( 'size' ) ) {
      return this.getAttribute( 'size' );
    }

    return null;
  }

  set size( value ) {
    if( value !== null ) {
      this.setAttribute( 'size', value );
    } else {
      this.removeAttribute( 'size' );
    }
  }

  get url() {
    if( this.hasAttribute( 'url' ) ) {
      return this.getAttribute( 'url' );
    }

    return null;
  }

  set url( value ) {
    if( value !== null ) {
      this.setAttribute( 'url', value );
    } else {
      this.removeAttribute( 'url' );
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

window.customElements.define( 'rf-icon', RainforestIcon );
