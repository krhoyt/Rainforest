import RainforestSpinner from "./spinner.js";

export default class RainforestStatusIndicator extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = /* template */ `
      <style>
        :host {
          align-items: center;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          position: relative;
        }

        div {
          box-sizing: border-box;
          color: #037f0c;
          display: inline-block;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          text-rendering: optimizeLegibility;
        }

        img {
          box-sizing: border-box;
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 26% )
            sepia( 35% )
            saturate( 4393% )
            hue-rotate( 114deg )
            brightness( 94% )
            contrast( 98% );
          height: var( --status-indicator-size, 16px );
          padding: 0 4px 0 0;
          width: var( --status-indicator-size, 16px );
        }

        rf-spinner { padding: 0 4px 0 0; }
        rf-spinner::part( circle ) { stroke: #5f6b7a; }

        :host( [type=error] ) div { color: #d91515; }
        :host( [type=error] ) img {
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
        :host( [type=warning] ) div { color: #8d6605; }   
        :host( [type=warning] ) img {
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 39% )
            sepia( 8% )
            saturate( 7402% )
            hue-rotate( 17deg )
            brightness( 95% )
            contrast( 96% );
        }             
        :host( [type=info] ) div { color: #0972d3; }                
        :host( [type=info] ) img { 
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
        :host( [type=stopped] ) div,
        :host( [type=pending] ) div,
        :host( [type=in-progress] ) div,        
        :host( [type=loading] ) div { color: #5f6b7a; }
        :host( [type=stopped] ) img,
        :host( [type=pending] ) img,
        :host( [type=in-progress] ) img,        
        :host( [type=loading] ) img { 
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 43% )
            sepia( 3% )
            saturate( 2471% )
            hue-rotate( 174deg )
            brightness( 92% )
            contrast( 87% );
        }        

        :host( [color-override=blue] ) div { color: #0972d3; }
        :host( [color-override=blue] ) img { 
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
        :host( [color-override=blue] ) rf-spinner::part( circle ) { stroke: #0972d3; }
        :host( [color-override=grey] ) div { color: #5f6b7a; }
        :host( [color-override=grey] ) img { 
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 43% )
            sepia( 3% )
            saturate( 2471% )
            hue-rotate( 174deg )
            brightness( 92% )
            contrast( 87% );
        }                                       
        :host( [color-override=grey] ) rf-spinner::part( circle ) { stroke: #5f6b7a; }         
        :host( [color-override=green] ) div { color: #037f0c; }
        :host( [color-override=green] ) img { 
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
        :host( [color-override=green] ) rf-spinner::part( circle ) { stroke: #037f0c; }                           
        :host( [color-override=red] ) div { color: #d91515; }
        :host( [color-override=red] ) img { 
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
        :host( [color-override=red] ) rf-spinner::part( circle ) { stroke: #d91515; }                                                           

        :host( [color-override=white] ) div { color: #ffffff; }
        :host( [color-override=white] ) img { 
          filter:
            brightness( 0 )
            saturate( 100% )
            invert( 89% )
            sepia( 83% )
            saturate( 0% )
            hue-rotate( 346deg )
            brightness( 115% )
            contrast( 100% );
        }                               
        :host( [color-override=white] ) rf-spinner::part( circle ) { stroke: #ffffff; }                                                           

        :host( [type=loading] ) img { display: none; }
        :host( :not( [type=loading] ) ) rf-spinner {
          display: none;
        }

        :host( [wrap-text=false] ) div {
          min-width: 0;
          overflow: hidden;          
          text-overflow: ellipsis;    
          white-space: nowrap;
        }
      </style>
      <rf-spinner exportparts="circle: c, vector: v" part="spinner"></rf-spinner>
      <img part="icon" src="../icons/status-positive.svg" />
      <div part="content">
        <slot></slot>
      </div>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$icon = this.shadowRoot.querySelector( 'img' );  
  }

  // When things change
  _render() {
    let icon = null;

    if( this.type === null ) {
      icon = 'status-positive';
    } else {
      if( this.type === 'error' ) {
        icon = 'status-negative';
      } else {
        if( this.type !== 'loading' ) {
          icon = 'status-' + this.type;
        }
      }
    }

    if( icon !== null ) {
      this.$icon.src = `../icons/${icon}.svg`;
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
    this._upgrade( 'colorOverride' )
    this._upgrade( 'type' );      
    this._upgrade( 'wrapText' );                   
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'color-override',
      'type',
      'wrap-text'      
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
  get colorOverride() {
    if( this.hasAttribute( 'color-override' ) ) {
      return this.getAttribute( 'color-override' );
    }

    return null;
  }

  set colorOverride( value ) {
    if( value !== null ) {
      this.setAttribute( 'color-override', value );
    } else {
      this.removeAttribute( 'color-override' );
    }
  }

  get wrapText() {
    return this.hasAttribute( 'wrap-text' );
  }

  set wrapText( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'wrap-text' );
      } else {
        this.setAttribute( 'wrap-text', '' );
      }
    } else {
      this.removeAttribute( 'wrap-text' );
    }
  }

  get type() {
    if( this.hasAttribute( 'type' ) ) {
      return this.getAttribute( 'type' );
    }

    return null;
  }

  set type( value ) {
    if( value !== null ) {
      this.setAttribute( 'type', value );
    } else {
      this.removeAttribute( 'type' );
    }
  }
}

window.customElements.define( 'rf-status-indicator', RainforestStatusIndicator );
