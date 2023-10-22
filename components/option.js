export default class RainforestOption extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-block;
          overflow: hidden;      
          position: relative;
        }

        img {
          height: 16px;
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 27% )
            sepia( 19% )
            saturate( 573% )
            hue-rotate( 173deg )
            brightness( 96% )
            contrast( 88% );
          padding: 2px 0 2px 0;
          margin: 0 8px 0 -4px;
          width: 16px;
        }

        li {
          align-items: center;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          margin: 0;
          padding: 4px 20px 4px 20px;
        }

        li:hover img {
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 30% )
            sepia( 89% )
            saturate( 1411% )
            hue-rotate( 189deg )
            brightness( 95% )
            contrast( 95% );          
        }

        li:hover p {
          color: #0972d3;
        }

        p {
          color: #414d5c;
          font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
          margin: 0;
          padding: 0;
        }

        :host( [selected] ) li {
          background-color: #0972d3;
          cursor: default;
        }

        :host( [selected] ) li img {        
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 100% )
            sepia( 0% )
            saturate( 0% )
            hue-rotate( 231deg )
            brightness( 102% )
            contrast( 101% );          
        }

        :host( [selected] ) li p {
          color: #ffffff;
        }

        :host( :not( [icon-name] ) ) img {
          display: none;
        }

        :host( :not( [text] ) ) p {
          display: none;
        }

        :host( :not( [text] ) ) img {        
          margin: 0;
        }

        :host( [disabled] ) li {
          cursor: not-allowed;
        }

        :host( [disabled] ) li p {        
          color: #9ba7b6;          
        }

        :host( [disabled] ) li img {
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 74% )
            sepia( 11% )
            saturate( 417% )
            hue-rotate( 173deg )
            brightness( 90% )
            contrast( 83% );          
        }        
      </style>
      <li part="item">
        <img part="icon" />
        <p part="text"></p>
      </li>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$icon = this.shadowRoot.querySelector( 'img' );
    this.$text = this.shadowRoot.querySelector( 'p' );
  }

  // When things change
  _render() {
    this.$icon.alt = this.iconAlt === null ? '' : this.iconAlt;

    if( this.iconName !== null ) {
      this.$icon.src = `../icons/${this.iconName}.svg`;
    }
    
    if( this.iconUrl !== null ) {
      this.$icon.src = this.iconUrl;
    }

    if( this.iconName === null && this.iconUrl === null ) {
      this.$icon.src = '';
    }

    this.$text.innerText = this.text === null ? '' : this.text;
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
    this._upgrade( 'disabled' );       
    this._upgrade( 'iconAlt' );           
    this._upgrade( 'iconName' );               
    this._upgrade( 'iconUrl' );               
    this._upgrade( 'selected' );               
    this._upgrade( 'text' );               
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'disabled',
      'icon-alt',      
      'icon-name',
      'icon-url',
      'selected',
      'text'
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
  get disabled() {
    return this.hasAttribute( 'disabled' );
  }

  set disabled( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'disabled' );
      } else {
        this.setAttribute( 'disabled', '' );
      }
    } else {
      this.removeAttribute( 'disabled' );
    }
  }

  get iconAlt() {
    if( this.hasAttribute( 'icon-alt' ) ) {
      return this.getAttribute( 'icon-alt' );
    }

    return null;
  }

  set iconAlt( value ) {
    if( value !== null ) {
      this.setAttribute( 'icon-alt', value );
    } else {
      this.removeAttribute( 'icon-alt' );
    }
  }    

  get iconName() {
    if( this.hasAttribute( 'icon-name' ) ) {
      return this.getAttribute( 'icon-name' );
    }

    return null;
  }

  set iconName( value ) {
    if( value !== null ) {
      this.setAttribute( 'icon-name', value );
    } else {
      this.removeAttribute( 'icon-name' );
    }
  }      

  get iconUrl() {
    if( this.hasAttribute( 'icon-url' ) ) {
      return this.getAttribute( 'icon-url' );
    }

    return null;
  }

  set iconUrl( value ) {
    if( value !== null ) {
      this.setAttribute( 'icon-url', value );
    } else {
      this.removeAttribute( 'icon-url' );
    }
  }        

  get selected() {
    return this.hasAttribute( 'selected' );
  }

  set selected( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'selected' );
      } else {
        this.setAttribute( 'selected', '' );
      }
    } else {
      this.removeAttribute( 'selected' );
    }
  }  

  get text() {
    if( this.hasAttribute( 'text' ) ) {
      return this.getAttribute( 'text' );
    }

    return null;
  }

  set text( value ) {
    if( value !== null ) {
      this.setAttribute( 'text', value );
    } else {
      this.removeAttribute( 'text' );
    }
  }        
}

window.customElements.define( 'rf-option', RainforestOption );
