export default class RainforestExpandableSection extends HTMLElement {
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

        div[part=content] {
          color: #000716;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          padding: 8px 0 8px 0;
          text-rendering: optimizeLegibility;
        }

        img {
          display: inline-block;
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 9% )
            sepia( 4% )
            saturate( 6363% )
            hue-rotate( 170deg )
            brightness( 100% )
            contrast( 119% );          
          height: 16px;
          width: 16px;
        }

        div[part=actions],
        div[part=info],
        div[part=left],
        p[part=header] {
          display: inline-block;
        }

        p[part=header] {
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 24px;
          margin: 0;
          padding: 0;
        }

        p[part=header-description] {
          color: #414d5c;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin: 0;
          padding: 0;                    
        }

        span[part=header-counter] {
          color: #5f6b7a;
          font-weight: 400;
        }

        div[part=content] {
          color: #000716;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin: 0;
          padding: 8px 0 8px 0;          
        }

        /*
        div[part=left] {
          align-items: baseline;
          cursor: pointer;
          display: flex;
          flex-basis: 0;
          flex-grow: 1;
          gap: 6px;
          flex-direction: row;
        }
        div[part=left]:hover div[part=title] { color: #0972d3; }        
        div[part=left]:hover img { 
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 58% )
            sepia( 87% )
            saturate( 7338% )
            hue-rotate( 195deg )
            brightness( 94% )
            contrast( 93% );        
        }

        div[part=line] {
          align-items: center;
          display: flex;
          flex-direction: row;
          padding: 0;
        }

        div[part=title] {
          color: #000716;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 20px;
          text-rendering: optimizeLegibility;
        }

        header {
          border: solid 2px transparent;
          padding: 4px;
        }

        img {
          align-self: center;
          display: inline-block;
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 9% )
            sepia( 4% )
            saturate( 6363% )
            hue-rotate( 170deg )
            brightness( 100% )
            contrast( 119% );
          height: 16px;
          margin: 2px 0 2px -2px;
          object-fit: contain;
          width: 16px;
        }

        p[part=counter] {
          color: #000716;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 20px;
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;          
        }

        p[part=description] {
          color: #414d5c;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
          margin: 0;
          padding: 0 0 0 20px;
          text-rendering: optimizeLegibility;          
        }        

        :host( [header-description] ) div[part=line] {
          border: 0;
          margin: 0;
          padding: 0;
        }

        :host( [expanded][default-expanded] ) div[part=content] { display: block; }
        :host( [expanded][default-expanded] ) div[part=line] { border-bottom-color: #e9ebed; }
        :host( [expanded] ) img { transform: rotate( 90deg ); }

        :host( [variant=container] ) div[part=left]:hover div[part=title] { color: #000716; }        
        :host( :not( [variant=container] ) ) p[part=counter] { display: none; }
        :host( :not( [variant=container] ) ) div[part=info] { display: none; }
        :host( [variant=container] ) p[part=counter] { 
          color: #5f6b7a; 
          font-size: 20px;
          font-weight: 400;
          line-height: 24px;
        }        
        :host( [variant=container] ) div[part=left]:hover img { 
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 9% )
            sepia( 4% )
            saturate( 6363% )
            hue-rotate( 170deg )
            brightness( 100% )
            contrast( 119% ); 
        }
        :host( [variant=container] ) div[part=line],
        :host( [variant=footer] ) div[part=line] { border-bottom-color: transparent; }

        :host( [variant=container] ) {
          border-radius: 16px;
          box-shadow:
            0 0 1px 1px #e9ebed,
            0 1px 8px 2px #0007161f;  
        }
        :host( [variant=container] ) div[part=content] {
          padding: 4px 20px 20px 20px;
        }
        :host( [variant=container] ) div[part=left] {
          padding: 4px 0 0 0;
        }        
        :host( [variant=container] ) div[part=line] {        
          margin: 0;
          padding: 12px 20px 12px 20px;
        }
        :host( [variant=container][expanded] ) div[part=line] {        
          margin: 0;
          padding: 12px 20px 8px 20px;
        }
        :host( [variant=container] ) div[part=title] {        
          font-size: 20px;
          font-weight: 700;
          line-height: 20px;
        }        

        :host( :not( [header-counter] ) ) p[part=counter] { display: none; }

        :host( :not( [header-description] ) ) p[part=description] { display: none; }

        :host( :not( [expanded] ):not( [default-expanded] ) ) div[part=content] { 
          display: none; 
        }
        
        :host( :not( [expanded] ):not( [default-expanded] ) ) div[part=line] {        
          border-bottom-color: transparent;
        }
        */
      </style>

      <div part="section">
        <div part="summary">
          <div part="line">
            <div part="left">
              <img src="../icons/caret-right-filled.svg" />                    
              <p part="header">
                <slot name="header-text"></slot>
                <span part="header-counter"></span>
              </p>
              <div part="info">
                <slot name="header-info"></slot>
              </div>
            </div>
            <div part="actions">
              <slot name="header-actions"></slot>
            </div>
          </div>
          <p part="header-description"></p>
        </div>
        <div part="content">
          <slot></slot>
        </div>
      </div>

      <!--
      <header part="header">
        <div part="summary">
          <div part="line">
            <div part="left">

              <div part="title">
                <slot name="header-text"></slot>
              </div>
              <p part="counter"></p>
              <div part="info">
                <slot name="header-info"></slot>                                                
              </div>
            </div>
            <div part="actions">
              <slot name="header-actions"></slot>
            </div>
          </div>
          <p part="description"></p>
        </div>
      </header>
      <div part="content">
        <slot></slot>
      </div>
      -->
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$counter = this.shadowRoot.querySelector( 'span[part=header-counter]' );
    this.$description = this.shadowRoot.querySelector( 'p[part=header-description]' );
    this.$left = this.shadowRoot.querySelector( 'div[part=left]' );
    this.$left.addEventListener( 'click', () => {
      this.expanded = !this.expanded;
      this.dispatchEvent( new CustomEvent( 'rf-change', {
        detail: {
          expanded: this.expanded
        }
      } ) );
    } );
  }

   // When attributes change
  _render() {
    this.$counter.innerText = this.headerCounter === null ? '' : this.headerCounter;
    this.$description.innerText = this.headerDescription === null ? '' : this.headerDescription;
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
    this._upgrade( 'defaultExpanded' );           
    this._upgrade( 'disableContentPaddings' );    
    this._upgrade( 'expanded' );        
    this._upgrade( 'headerCounter' );        
    this._upgrade( 'headerDescription' );        
    this._upgrade( 'headingTagOverride' );        
    this._upgrade( 'variant' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'default-expanded',
      'disable-content-paddings',
      'expanded',
      'header-counter',
      'header-description',
      'heading-tag-override',
      'variant'
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
  get defaultExpanded() {
    return this.hasAttribute( 'default-expanded' );
  }

  set defaultExpanded( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'default-expanded' );
      } else {
        this.setAttribute( 'default-expanded', '' );
      }
    } else {
      this.removeAttribute( 'default-expanded' );
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

  get expanded() {
    return this.hasAttribute( 'expanded' );
  }

  set expanded( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'expanded' );
      } else {
        this.setAttribute( 'expanded', '' );
      }
    } else {
      this.removeAttribute( 'expanded' );
    }
  }  

  get headerCounter() {
    if( this.hasAttribute( 'header-counter' ) ) {
      return this.getAttribute( 'header-counter' );
    }

    return null;
  }

  set headerCounter( value ) {
    if( value !== null ) {
      this.setAttribute( 'header-counter', value );
    } else {
      this.removeAttribute( 'header-counter' );
    }
  }        

  get headerDescription() {
    if( this.hasAttribute( 'header-description' ) ) {
      return this.getAttribute( 'header-description' );
    }

    return null;
  }

  set headerDescription( value ) {
    if( value !== null ) {
      this.setAttribute( 'header-description', value );
    } else {
      this.removeAttribute( 'header-description' );
    }
  }          

  get headingTagOverride() {
    if( this.hasAttribute( 'heading-tag-override' ) ) {
      return this.getAttribute( 'heading-tag-override' );
    }

    return null;
  }

  set headingTagOverride( value ) {
    if( value !== null ) {
      this.setAttribute( 'heading-tag-override', value );
    } else {
      this.removeAttribute( 'heading-tag-override' );
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

window.customElements.define( 'rf-expandable-section', RainforestExpandableSection );
