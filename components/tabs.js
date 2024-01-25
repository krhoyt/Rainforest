export default class RainforestTabs extends HTMLElement {
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

        button {
          background: none;
          border: none;
          box-sizing: border-box;
          cursor: pointer;
          margin: 0;
          padding: 9px 0 9px 0;
          position: relative;
          text-rendering: optimizeLegibility;
        }

        button[disabled] {
          cursor: not-allowed;
        }

        button span {
          border-right: solid 1px #b6bec9;
          color: var( --tabs-button-color, #414d5c );
          display: inline-block;
          font-family: 'Open Sans', sans-serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 20px;
          padding: 4px 20px 4px 20px;
        }

        button[data-selected]::after {
          background-color: var( --tabs-button-selected-color, #0972d3 );
          bottom: 0;
          content: ' ';
          height: 4px;
          left: 0;
          position: absolute;
          right: 0;
        }

        button[data-selected] span {
          color: var( --tabs-button-selected-color, #0972d3 );
        }

        button[disabled] span {
          color: var( --tabs-button-disabled-color, #9ba7b6 );
        }

        button:last-of-type span {
          border-right: solid 1px transparent;
        }

        div[part=container] {
          display: flex;
          flex-direction: column;
        }

        div[part=content] {
          padding: var( --tabs-content-padding, 12px 20px 20px 20px );
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
        this.$tabs.children[0].removeEventListener( 'click', this.doTabClick );
        this.$tabs.children[0].remove();
      }

      while( this.$tabs.children.length < this.children.length ) {
        const tab = document.createElement( 'button' );
        const span = document.createElement( 'span' );
        tab.appendChild( span );
        tab.addEventListener( 'click', this.doTabClick );
        this.$tabs.appendChild( tab );
      }

      for( let t = 0; t < this.children.length; t++ ) {
        this.$tabs.children[t].children[0].innerText = this.children[t].getAttribute( 'data-label' );
        this.$tabs.children[t].setAttribute( 'data-id', this.children[t].getAttribute( 'data-id' ) );

        if( this.children[t].hasAttribute( 'data-disabled' ) ) {
          this.$tabs.children[t].disabled = true;
        } else {
          this.$tabs.children[t].disabled = false;
        }

        if( this.activeTabId === null ) {
          if( t === 0 ) {
            this.$tabs.children[t].setAttribute( 'data-selected', true );
            this.children[t].style.display = 'inherit';
          } else {
            this.$tabs.children[t].removeAttribute( 'data-selected' );
            this.children[t].style.display = 'none';            
          }
        } else {
          if( this.activeTabId === this.children[t].getAttribute( 'data-label' ) ) {
            this.$tabs.children[t].setAttribute( 'data-selected', true );
            this.children[t].style.display = 'inherit';
          } else {
            this.$tabs.children[t].removeAttribute( 'data-selected' );
            this.children[t].style.display = 'none';            
          }
        }        
      }
    } );
    this.$tabs = this.shadowRoot.querySelector( 'div[part=tabs]' );
  }

  doTabClick( evt ) {
    if( this.activeTabId === evt.currentTarget.getAttribute( 'data-id' ) ) return;

    this.activeTabId = evt.currentTarget.getAttribute( 'data-id' );

    /*
    for( let t = 0; t < this.children.length; t++ ) {    
      if( this.children[t].hasAttribute( 'data-disabled' ) ) {
        this.$tabs.children[t].disabled = true;
      } else {
        this.$tabs.children[t].disabled = false;
      }

      if( this.activeTabId === null ) {
        if( t === 0 ) {
          this.$tabs.children[t].setAttribute( 'data-selected', true );
          this.children[t].style.display = 'inherit';
        } else {
          this.$tabs.children[t].removeAttribute( 'data-selected' );
          this.children[t].style.display = 'none';            
        }
      } else {
        if( this.activeTabId === this.children[t].getAttribute( 'data-id' ) ) {
          this.$tabs.children[t].setAttribute( 'data-selected', true );
          this.children[t].style.display = 'inherit';
        } else {
          this.$tabs.children[t].removeAttribute( 'data-selected' );
          this.children[t].style.display = 'none';            
        }
      }    
    }
    */

    this.dispatchEvent( new CustomEvent( 'rf-change', {
      detail: {
        activeTabId: this.activeTabId
      }
    } ) );
  }

  // When things change
  _render() {
    if( this.$tabs.children.length !== this.children.length ) return;

    for( let t = 0; t < this.children.length; t++ ) {
      /*
      if( this.children[t].hasAttribute( 'data-disabled' ) ) {
        this.$tabs.children[t].disabled = true;
      } else {
        this.$tabs.children[t].disabled = false;
      }
      */

      console.log( this.activeTabId );
      if( this.activeTabId === null ) {
        if( t === 0 ) {
          this.$tabs.children[t].setAttribute( 'data-selected', true );
          this.children[t].style.display = 'inherit';
        } else {
          this.$tabs.children[t].removeAttribute( 'data-selected' );
          this.children[t].style.display = 'none';            
        }
      } else {
        console.log( this.activeTabId + ': ' + this.children[t].getAttribute( 'data-id' ) );
        if( this.activeTabId === this.children[t].getAttribute( 'data-id' ) ) {
          this.$tabs.children[t].setAttribute( 'data-selected', true );
          this.children[t].style.display = 'inherit';
        } else {
          this.$tabs.children[t].removeAttribute( 'data-selected' );
          this.children[t].style.display = 'none';            
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
    this._upgrade( 'activeTabId' );      
    this._upgrade( 'disableContentPaddings' );
    this._upgrade( 'variant' );          
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'active-tab-id',      
      'disable-content-paddings',
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
  get activeTabId() {
    if( this.hasAttribute( 'active-tab-id' ) ) {
      return this.getAttribute( 'active-tab-id' );
    }

    return null;
  }

  set activeTabId( value ) {
    if( value !== null ) {
      this.setAttribute( 'active-tab-id', value );
    } else {
      this.removeAttribute( 'active-tab-id' );
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

window.customElements.define( 'rf-tabs', RainforestTabs );
