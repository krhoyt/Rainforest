import RFStatusIndicator from "./status-indicator.js";
import RFSpinner from "./spinner.js";

export default class RFFileToken extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline;
          position: relative;
        }

        button {
          align-items: center;
          align-self: flex-start;
          background: none;
          border: solid 1px transparent;
          box-sizing: border-box;
          cursor: pointer;
          display: inline-flex;
          justify-content: center;
          margin: -1px -1px 0 4px;
          padding: 2px 4px 2px 4px;
        }

        div[part=container] {
          background: #f0fbff;
          border: solid 2px #006ce0;
          border-radius: 8px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          padding: 4px 4px 4px 12px;
        }

        div[part=labels] {   
          display: flex;
          flex-basis: 0;
          flex-grow: 1;
          flex-direction: column;          
        }     

        div[part=suffix] {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        p {
          color: #424650;
          cursor: default;
          display: inline-block;  
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 12px;
          line-height: 16px;
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;                
        }

        p:first-of-type {
          color: #0f141a;          
          font-size: 14px;
          line-height: 20px;
        }

        path {
          stroke: #006ce0;
          stroke-linejoin: round;
          stroke-width: 2px;
        }

        rf-spinner {
          align-self: flex-end;
          padding: 0 4px 0 0;
        }

        rf-status-indicator {
          margin-top: 4px;
          --status-indicator-font-size: 12px;
          --status-indicator-line-height: 16px;
        }

        svg {
          height: 16px;
          width: 16px;
        }

        button:hover path {
          stroke: #002b66;
        }
        
        :host( :not( [show-file-size] ) ) p[part=size] {
          display: none;
        }

        :host( :not( [show-file-last-modified] ) ) p[part=modified] {
          display: none;
        }        

        :host( [error-text] ) div[part=container] {
          border-color: #db0000;
          border-left-width: 8px;
        }

        :host( [warning-text] ) div[part=container] {
          border-color: #855900;
          border-left-width: 8px;
        }        

        :host( :not( [error-text] ):not( [warning-text] ) ) rf-status-indicator {
          display: none;
        }

        :host( [loading] ) div[part=container] {
          background-color: #ffffff;
          border-color: #dedee3;
        }

        :host( :not( [loading] ) ) rf-spinner {
          display: none;
        }
      </style>
      <div part="container">
        <div part="labels">
          <p part="name"></p>
          <p part="size"></p>
          <p part="modified"></p>
        </div>
        <div part="suffix">
          <button part="button" type="button">
            <svg part="close">
              <path d="m2 1.71 12 12M2 13.71l12-12"></path>
            </svg>
          </button> 
          <rf-spinner disabled></rf-spinner>
        </div>
      </div>
      <rf-status-indicator></rf-status-indicator>
    `;

    // Properties
    this._file = null;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$button = this.shadowRoot.querySelector( 'button' );
    this.$button.addEventListener( 'click', () => {
      this.dispatchEvent( new CustomEvent( 'rf-dismiss', {
        bubbles: true,
        cancelable: true,
        composed: true
      } ) );
    } );
    this.$name = this.shadowRoot.querySelector( 'div[part=labels] p:nth-of-type( 1 )' );
    this.$size = this.shadowRoot.querySelector( 'div[part=labels] p:nth-of-type( 2 )' );
    this.$modified = this.shadowRoot.querySelector( 'div[part=labels] p:nth-of-type( 3 )' );
    this.$status = this.shadowRoot.querySelector( 'rf-status-indicator' );
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
    this.$name.textContent = this._file === null ? '' : this._file.name;
    this.$size.textContent = this._file === null ? '' : this.formatBytes( this._file.size );

    if( this.file === null ) {
      this.$modified.textContent = '';
    } else {
      const formatted = new Intl.DateTimeFormat( navigator.language, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      } ).format( new Date( this._file.lastModified ) ); 
      this.$modified.textContent = formatted;
    }

    this.$status.textContent = this.errorText === null ? '' : this.errorText;
    this.$status.type = this.errorText === null ? null : 'error';

    if( this.errorText === null ) {
      this.$status.textContent = this.warningText === null ? '' : this.warningText;
      this.$status.type = this.warningText === null ? null : 'warning';
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
    this._upgrade( 'errorText' );                        
    this._upgrade( 'file' );                    
    this._upgrade( 'loading' );                        
    this._upgrade( 'showFileLastModified' );       
    this._upgrade( 'showFileSize' );                        
    this._upgrade( 'showFileThumbnail' );              
    this._upgrade( 'warningText' );           
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'error-text',
      'loading',
      'show-file-last-modified',
      'show-file-size',
      'show-file-thumbnail',
      'warning-text'
    ];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  } 

  // Properties
  // Not reflected
  // Array, Date, Object, null
  get file() {
    return this._file;
  }
  
  set file( value ) {
    this._file = value === null ? null : structuredClone( value );
    this._render();
  }      

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get errorText() {
    if( this.hasAttribute( 'error-text' ) ) {
      return this.getAttribute( 'error-text' );
    }

    return null;
  }

  set errorText( value ) {
    if( value !== null ) {
      this.setAttribute( 'error-text', value );
    } else {
      this.removeAttribute( 'error-text' );
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

  get showFileLastModified() {
    return this.hasAttribute( 'show-file-last-modified' );
  }

  set showFileLastModified( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'show-file-last-modified' );
      } else {
        this.setAttribute( 'show-file-last-modified', '' );
      }
    } else {
      this.removeAttribute( 'show-file-last-modified' );
    }
  }  

  get showFileSize() {
    return this.hasAttribute( 'show-file-size' );
  }

  set showFileSize( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'show-file-size' );
      } else {
        this.setAttribute( 'show-file-size', '' );
      }
    } else {
      this.removeAttribute( 'show-file-size' );
    }
  }    

  get showFileThumbnail() {
    return this.hasAttribute( 'show-file-thumbnail' );
  }

  set showFileThumbnail( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'show-file-thumbnail' );
      } else {
        this.setAttribute( 'show-file-thumbnail', '' );
      }
    } else {
      this.removeAttribute( 'show-file-thumbnail' );
    }
  }    

  get warningText() {
    if( this.hasAttribute( 'warning-text' ) ) {
      return this.getAttribute( 'warning-text' );
    }

    return null;
  }

  set warningText( value ) {
    if( value !== null ) {
      this.setAttribute( 'warning-text', value );
    } else {
      this.removeAttribute( 'warning-text' );
    }
  }
}

window.customElements.define( 'rf-file-token', RFFileToken );
