import RFTab from "./tab.js";
import RFTabPanel from "./tab-panel.js";

export default class RFTabGroup extends HTMLElement {
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

        div[part=container] {
          display: flex;
          flex-direction: column;
        }

        div[part=content] {
          padding: var( --tab-group-content-padding, 12px 20px 20px 20px );
        }

        div[part=tabs] {
          border-bottom: solid 1px #b6bec9;
        }

        :host( [disable-content-paddings] ) div[part=content] {
          padding: 0;
        }

        :host( [variant=container] ) div[part=container] {
          border: solid 1px #b6bec9;
          border-radius: 16px;
        }
      </style>
      <div part="container">
        <div part="tabs"></div>
        <div part="content">
          <slot></slot>
        </div>
      </div>
    `;

    // Events
    this.doTabClick = this.doTabClick.bind( this );

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$slot = this.shadowRoot.querySelector( 'slot' );
    this.$slot.addEventListener( 'slotchange', () => {
      while( this.$tabs.children.length > this.children.length ) {
        this.$tabs.children[0].removeEventListener( 'rf-change', this.doTabClick );
        this.$tabs.children[0].remove();
      }

      while( this.$tabs.children.length < this.children.length ) {
        const tab = document.createElement( 'rf-tab' );
        tab.addEventListener( 'rf-change', this.doTabClick );
        this.$tabs.appendChild( tab );
      }

      for( let t = 0; t < this.children.length; t++ ) {
        this.$tabs.children[t].label = this.children[t].label;
        this.$tabs.children[t].name = this.children[t].name;
        this.$tabs.children[t].disabled = this.children[t].disabled;

        if( this.activeTabName === null ) {
          if( t === 0 ) {
            this.$tabs.children[t].selected = true;
            this.children[t].hidden = false;
          } else {
            this.$tabs.children[t].selected = false;
            this.children[t].hidden = true;            
          }
        } else {
          if( this.activeTabName === this.children[t].name ) {
            this.$tabs.children[t].selected = true;
            this.children[t].hidden = false;
          } else {
            this.$tabs.children[t].selected = false;
            this.children[t].hidden = true;            
          }
        }        
      }
    } );
    this.$tabs = this.shadowRoot.querySelector( 'div[part=tabs]' );
  }

  doTabClick( evt ) {
    if( this.activeTabName === evt.currentTarget.name ) return;

    this.activeTabName = evt.currentTarget.name;

    this.dispatchEvent( new CustomEvent( 'rf-change', {
      detail: {
        activeTabName: this.activeTabName
      }
    } ) );
  }

  // When things change
  _render() {
    if( this.$tabs.children.length !== this.children.length ) return;

    for( let t = 0; t < this.children.length; t++ ) {
      if( this.activeTabName === null ) {
        if( t === 0 ) {
          this.$tabs.children[t].selected = true;
          this.children[t].hidden = false;
        } else {
          this.$tabs.children[t].selected = false;
          this.children[t].hidden = true;
        }
      } else {
        if( this.activeTabName === this.children[t].name ) {
          this.$tabs.children[t].selected = true;
          this.children[t].hidden = false;
        } else {
          this.$tabs.children[t].selected = false;
          this.children[t].hidden = true;            
        }
      }    
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
    this._upgrade( 'activeTabName' );      
    this._upgrade( 'disableContentPaddings' );
    this._upgrade( 'hidden' );    
    this._upgrade( 'variant' );          
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'active-tab-name',      
      'disable-content-paddings',
      'hidden',
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
  get activeTabName() {
    if( this.hasAttribute( 'active-tab-name' ) ) {
      return this.getAttribute( 'active-tab-name' );
    }

    return null;
  }

  set activeTabName( value ) {
    if( value !== null ) {
      this.setAttribute( 'active-tab-name', value );
    } else {
      this.removeAttribute( 'active-tab-name' );
    }
  }    

  get disableContentPaddings() {
    return this.hasAttribute( 'disable-content-paddings' );
  }

  set disableContentPaddings( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'disable-content-paddings' );
      } else {
        this.setAttribute( 'disable-content-paddings', '' );
      }
    } else {
      this.removeAttribute( 'disable-content-paddings' );
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

window.customElements.define( 'rf-tab-group', RFTabGroup );
