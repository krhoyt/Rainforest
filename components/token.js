export default class RFToken extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
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

        button {
          align-items: center;
          background: none;
          border: none;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          height: 22px;
          justify-content: center;
          margin: -1px -1px 0 4px;
          padding: 2px 4px 2px 4px;
          min-width: 26px;
          width: 26px;
        }

        button:hover path {
          stroke: #033160;
        }

        button[disabled] {
          cursor: not-allowed;
        }

        button[disabled] path {
          stroke: #9ba7b6;
        }

        div {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
        }

        div.vertical {
          flex-basis: 0;
          flex-direction: column;
          flex-grow: 1;
          gap: 2px;
        }

        div[part=options] {
          display: none;
        }

        div[part=token] {
          background: #f2f8fd;
          border: solid 2px #0972d3;
          border-radius: 8px;
          padding: 4px 4px 4px 12px;
        }

        img {
          filter:
            brightness( 0 )
            saturate( 100% );
          height: 32px;
          margin: 0 8px 0 0;
          min-width: 32px;
          width: 32px;
        }

        li,
        p {
          box-sizing: border-box;
          color: #000716;
          cursor: default;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin: 0;
          padding: 0;
          text-align: left;
          text-decoration: none;
          text-rendering: optimizeLegibility;
        }

        li {
          color: #5f6b7a;
          font-size: 12px;
          line-height: 16px;
        }                

        p[part=description] {
          color: #5f6b7a;
          flex-basis: 0;
          flex-grow: 1;
          font-size: 12px;
          line-height: 16px;
        }

        p[part=label] {
          flex-basis: 0;
          flex-grow: 1;
        }

        path {
          fill: none;
          stroke: #0972d3;
          stroke-width: 2px;
        }

        svg {
          height: 16px;
          min-width: 16px;
          width: 16px;
        }

        ul {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          gap: 16px;
          list-style-type: none;          
          margin: 0;
          padding: 0;
        }        

        ul:not( :has( li ) ) {
          display: none;
        }

        :host( [disabled] ) div[part=token] {
          background-color: #ffffff;
          border: solid 2px #d1d5db;
        }

        :host( [disabled] ) li,
        :host( [disabled] ) p[part=description],
        :host( [disabled] ) p[part=label] {
          color: #9ba7b6;
        }

        :host( :not( [description] ) ) p[part=description] { display: none; }
        :host( :not( [icon-name] ) ) img { display: none; }
        :host( :not( [label-tag] ) ) p[part=label-tag] { display: none; }
      </style>
      <div part="token">
        <img part="image" />
        <div class="vertical">
          <div>
            <p part="label"></p>
            <p part="label-tag"></p>
          </div>
          <p part="description"></p>
          <ul part="list"></ul>
        </div>
        <button part="button">
          <svg part="vector">
            <path d="m2 2 12 12M14 2 2 14"></path>          
          </svg>
        </button>
      </div>
      <div part="options">
        <slot></slot>
      </div>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$button.addEventListener( 'click', () => this.dispatchEvent( new CustomEvent( 'rf-dismiss' ) ) );
    this.$description = this.shadowRoot.querySelector( 'p[part=description]' );    
    this.$icon = this.shadowRoot.querySelector( 'img' );
    this.$label = this.shadowRoot.querySelector( 'p[part=label]' );
    this.$slot = this.shadowRoot.querySelector( 'slot' );
    this.$slot.addEventListener( 'slotchange', () => {
      while( this.$tags.children.length > this.children.length ) {
        this.$tags.children[0].remove();
      }

      while( this.$tags.children.length < this.children.length ) {
        const item = document.createElement( 'li' );
        this.$tags.appendChild( item );
      }

      for( let c = 0; c < this.children.length; c++ ) {
        this.$tags.children[c].innerText = this.children[c].innerText;
      }
    } );
    this.$tag = this.shadowRoot.querySelector( 'p[part=label-tag]' );
    this.$tags = this.shadowRoot.querySelector( 'ul' );
  }

  // When things change
  _render() {
    this.$icon.src = this.iconName === null ? '' : `../icons/${this.iconName}.svg`;     
    this.$label.innerText = this.label === null ? '' : this.label;    
    this.$tag.innerText = this.labelTag === null ? '' : this.labelTag;
    this.$description.innerText = this.description === null ? '' : this.description;
    this.$button.disabled = this.disabled;           
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
    this._upgrade( 'description' );           
    this._upgrade( 'disabled' );
    this._upgrade( 'hidden' );
    this._upgrade( 'iconName' );               
    this._upgrade( 'label' );      
    this._upgrade( 'labelTag' );      
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'description',
      'disabled',
      'hidden',
      'icon-name',
      'label',
      'label-tag'
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

  get description() {
    if( this.hasAttribute( 'description' ) ) {
      return this.getAttribute( 'description' );
    }

    return null;
  }

  set description( value ) {
    if( value !== null ) {
      this.setAttribute( 'description', value );
    } else {
      this.removeAttribute( 'description' );
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

  get label() {
    if( this.hasAttribute( 'label' ) ) {
      return this.getAttribute( 'label' );
    }

    return null;
  }

  set label( value ) {
    if( value !== null ) {
      this.setAttribute( 'label', value );
    } else {
      this.removeAttribute( 'label' );
    }
  }     
  
  get labelTag() {
    if( this.hasAttribute( 'label-tag' ) ) {
      return this.getAttribute( 'label-tag' );
    }

    return null;
  }

  set labelTag( value ) {
    if( value !== null ) {
      this.setAttribute( 'label-tag', value );
    } else {
      this.removeAttribute( 'label-tag' );
    }
  }       
}

window.customElements.define( 'rf-token', RFToken );
