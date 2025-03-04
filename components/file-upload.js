import RFTokenGroup from "./token-group.js";

export default class RFFileUpload extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: block;
          position: relative;
        }

        button {
          align-items: center;
          background: none;
          border: none;
          border: solid 2px #0972d3;
          border-radius: 16px;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          gap: 8px;
          margin: 0;
          padding: 4px 20px 4px 20px;
        }

        button:hover {
          background-color: #f2f8fd;
          border: solid 2px #033160;
        }

        button:hover span {
          color: #033160;
        }

        input {
          display: none;
        }

        p {
          color: #5f6b7a;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 12px;
          line-height: 16px;
          margin: 4px 0 0 0;
          padding: 0;
        }

        path {
          fill: none;
          stroke: #0972d3;
          stroke-width: 2px;
        }

        path:first-of-type {
          stroke-linejoin: round;
        }

        button:hover path {
          stroke: #033160;
        }

        span {
          color: #0972d3;
          cursor: pointer;
          flex-basis: 0;
          flex-grow: 1;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
        }

        svg {
          cursor: pointer;
          height: 16px;
          min-width: 16px;
          width: 16px;
        }

        :host( :not( [hint] ) ) p {
          display: none;
        }
      </style>
      <button part="button">
        <svg>
          <path class="stroke-linejoin-round" d="M5 14H2V2h12v12h-3"></path>
          <path d="M12 10 8 6l-4 4M8 6v9"></path>        
        </svg>
        <span part="label"></span>
      </button>
      <p part="hint"></p>
      <rf-token-group></rf-token-group>
      <input type="file">
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$button.addEventListener( 'click', () => this.$input.click() );
    this.$hint = this.shadowRoot.querySelector( 'p' );    
    this.$input = this.shadowRoot.querySelector( 'input' );     
    this.$input.addEventListener( 'change', ( evt ) => {
      for( let f = 0; f < evt.currentTarget.files.length; f++ ) {
        const token = document.createElement( 'rf-token' );
        token.label = evt.currentTarget.files[0].name;
        token.description = this.formatBytes( evt.currentTarget.files[0].size );

        const formatted = new Intl.DateTimeFormat( navigator.language, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        } ).format( new Date( evt.currentTarget.files[0].lastModified ) ); 

        const tag = document.createElement( 'option' );
        tag.value = evt.currentTarget.files[0].lastModified;
        tag.innerText = formatted;
        token.appendChild( tag );
        
        this.$tokens.appendChild( token );
      }

      this.dispatchEvent( new CustomEvent( 'rf-change', {
        detail: {
          files: evt.currentTarget.files
        }
      } ) );
    } );   
    this.$label = this.shadowRoot.querySelector( 'span' );
    this.$tokens = this.shadowRoot.querySelector( 'rf-token-group' );
    this.$tokens.addEventListener( 'rf-dismiss', ( evt ) => {
      // TODO: Track and remove from file list
      const index = evt.detail.itemIndex;
      this.$tokens.children[index].remove();    

      this.$input.value = null;
    } );
    this.$renderer = this.shadowRoot.querySelector( 'template' );
  }

  focus() {
    this.$input.focus();
  }

  // Attribution: 
  // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
  formatBytes( bytes, decimals = 2 ) {
    if( !+bytes ) return '0 bytes';

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor( Math.log( bytes ) / Math.log( k ) )

    return `${parseFloat( ( bytes / Math.pow( k, i ) ).toFixed( dm ) )} ${sizes[i]}`;
  }  

   // When attributes change
  _render() {
    const label = this.label === null ? 'Choose file' : this.label;
    this.$label.innerText = label;

    this.$hint.innerText = this.hint === null ? '' : this.hint;
    this.$input.accept = this.accept === null ? '' : this.accept;
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
    this._upgrade( 'accept' );                    
    this._upgrade( 'hidden' );                    
    this._upgrade( 'hint' );                    
    this._upgrade( 'invalid' );                     
    this._upgrade( 'label' );       
    this._upgrade( 'multiple' );                        
    this._upgrade( 'name' );                
    this._upgrade( 'showFileLastModified' );                
    this._upgrade( 'showFileSize' );   
    this._upgrade( 'showFileThumbnail' );   
    this._upgrade( 'tokenLimit' );   
    this._upgrade( 'value' );            
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'accept',
      'hidden',
      'hint',
      'invalid',
      'label',
      'multiple',
      'name',
      'show-file-last-modified',
      'show-file-size',
      'show-file-thumbnail',
      'token-limit'
    ];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  } 

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get accept() {
    if( this.hasAttribute( 'accept' ) ) {
      return this.getAttribute( 'accept' );
    }

    return null;
  }

  set accept( value ) {
    if( value !== null ) {
      this.setAttribute( 'accept', value );
    } else {
      this.removeAttribute( 'accept' );
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

  get hint() {
    if( this.hasAttribute( 'hint' ) ) {
      return this.getAttribute( 'hint' );
    }

    return null;
  }

  set hint( value ) {
    if( value !== null ) {
      this.setAttribute( 'hint', value );
    } else {
      this.removeAttribute( 'hint' );
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
}

window.customElements.define( 'rf-file-upload', RFFileUpload );
