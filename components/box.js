export default class RainforestBox extends HTMLElement {
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

        div {
          box-sizing: border-box;
          color: var( --box-color, #000716 );
          cursor: var( --box-cursor, default );
          display: var( --box-display, block );
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: var( --box-font-size, 14px );
          font-weight: var( --box-font-weight, 400 );
          line-height: var( --box-line-height, 20px );
          margin: var( --box-margin, 0 );
          padding: var( --box-padding, 0 );
          text-align: var( --box-text-align, left );
          text-decoration: var( --box-text-decoration, none );
          text-rendering: optimizeLegibility;
          text-wrap: var( --box-text-wrap, none );
          width: 100%;
        }

        :host( [balanced] ) div {
          text-wrap: balanced;
        }

        :host( [variant=span] ) { display: inline; }
        :host( [variant=h1] ) div {
          font-size: 24px;
          font-weight: 700;
          line-height: 30px;
          padding: 4px 0 4px 0;
        }
        :host( [variant=h2] ) div {
          font-size: 20px;
          font-weight: 700;
          line-height: 24px;
          padding: 4px 0 4px 0;
        }        
        :host( [variant=h3] ) div {
          font-size: 18px;
          font-weight: 700;
          line-height: 22px;
          padding: 4px 0 4px 0;
        }                
        :host( [variant=h4] ) div {
          font-size: 16px;
          font-weight: 700;
          line-height: 20px;
          padding: 4px 0 4px 0;
        }                        
        :host( [variant=h5] ) div {
          font-size: 16px;
          font-weight: 700;
          line-height: 18px;
          padding: 4px 0 4px 0;
        }            
        :host( [variant=p] ) div {
          padding: 4px 0 4px 0;
        }                
        :host( [variant=strong] ) { display: inline; }       
        :host( [variant=strong] ) div {
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
        }                         
        :host( [variant=small] ) { display: inline-block; }
        :host( [variant=small] ) div {
          color: #5f6b7a;
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
        }                                                     
        :host( [variant=code] ) { display: inline; }
        :host( [variant=code] ) div {
          font-family: Monaco, Menlo, Consolas, 'Courier Prime', Courier, 'Courier New', monospace;
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
        }                                           
        :host( [variant=pre] ) div {
          font-family: Monaco, Menlo, Consolas, 'Courier Prime', Courier, 'Courier New', monospace;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin: 14px 0 14px 0;
        }
        :host( [variant=samp] ) { display: inline; }        
        :host( [variant=samp] ) div {
          font-family: Monaco, Menlo, Consolas, 'Courier Prime', Courier, 'Courier New', monospace;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
        }                                                                  
        :host( [variant=awsui-key-label] ) div {
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
        }
        :host( [variant=awsui-value-large] ) { display: inline; }
        :host( [variant=awsui-value-large] ) div {
          font-size: 42px;
          font-weight: 700;
          line-height: 48px;
        }                                                           

        :host( [color=text-body-secondary] ) div { color: #414d5c; }
        :host( [color=text-status-error] ) div { color: #d91515; }        
        :host( [color=text-status-success] ) div { color: #037f0c; }                
        :host( [color=text-status-info] ) div { color: #0972d3; }                        
        :host( [color=text-status-inactive] ) div { color: #5f6b7a; }                                
        :host( [color=text-status-warning] ) div { color: #8d6605; }                                        

        :host( [font-size=body-s] ) div { 
          font-size: 12px;
          line-height: 16px;
        }
        :host( [font-size=body-m] ) div { 
          font-size: 14px;
          line-height: 20px;
        }               
        :host( [font-size=heading-xs] ) div { 
          font-size: 14px;
          line-height: 18px;
        } 
        :host( [font-size=heading-s] ) div { 
          font-size: 16px; 
          line-height: 20px;
        }        
        :host( [font-size=heading-m] ) div { 
          font-size: 18px; 
          line-height: 22px;
        }        
        :host( [font-size=heading-l] ) div { 
          font-size: 20px; 
          line-height: 24px;
        }        
        :host( [font-size=heading-xl] ) div { 
          font-size: 24px; 
          line-height: 30px;
        }        
        :host( [font-size=display-l] ) div { 
          font-size: 42px; 
          line-height: 48px;
        }                                

        :host( [font-weight=light] ) div { font-weight: 300; }                                
        :host( [font-weight=heavy] ) div { font-weight: 700; }                                                
        :host( [font-weight=bold] ) div { font-weight: 700; }                                        

        :host( [text-align=center] ) div { text-align: center; }
        :host( [text-align=left] ) div { text-align: left; }
        :host( [text-align=right] ) div { text-align: right; }
        
        :host( [float=left] ) { float: left; }
        :host( [float=right] ) { float: right; }

        :host( [display=block] ) { display: block; }
        :host( [display=inline] ) { display: inline; }
        :host( [display=inline-block] ) { display: inline-block; }        
        :host( [display=none] ) { display: none; }        
      </style>
      <div part="box">
        <slot></slot>
      </div>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );
  }

   // When attributes change
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
    this._upgrade( 'balanced' );                
    this._upgrade( 'color' );            
    this._upgrade( 'display' );      
    this._upgrade( 'float' );      
    this._upgrade( 'fontSize' );                        
    this._upgrade( 'fontWeight' );                            
    this._upgrade( 'textAlign' );        
    this._upgrade( 'variant' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'balanced',
      'color',
      'display',
      'float',
      'font-size',
      'font-weight',
      'text-align',
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
  get balanced() {
    return this.hasAttribute( 'balanced' );
  }

  set balanced( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'balanced' );
      } else {
        this.setAttribute( 'balanced', '' );
      }
    } else {
      this.removeAttribute( 'balanced' );
    }
  }

  get color() {
    if( this.hasAttribute( 'color' ) ) {
      return this.getAttribute( 'color' );
    }

    return null;
  }

  set color( value ) {
    if( value !== null ) {
      this.setAttribute( 'color', value );
    } else {
      this.removeAttribute( 'color' );
    }
  }

  get display() {
    if( this.hasAttribute( 'display' ) ) {
      return this.getAttribute( 'display' );
    }

    return null;
  }

  set display( value ) {
    if( value !== null ) {
      this.setAttribute( 'display', value );
    } else {
      this.removeAttribute( 'display' );
    }
  }

  get fontSize() {
    if( this.hasAttribute( 'font-size' ) ) {
      return this.getAttribute( 'font-size' );
    }

    return null;
  }

  set fontSize( value ) {
    if( value !== null ) {
      this.setAttribute( 'font-size', value );
    } else {
      this.removeAttribute( 'font-size' );
    }
  }

  get fontWeight() {
    if( this.hasAttribute( 'font-weight' ) ) {
      return this.getAttribute( 'font-weight' );
    }

    return null;
  }

  set fontWeight( value ) {
    if( value !== null ) {
      this.setAttribute( 'font-weight', value );
    } else {
      this.removeAttribute( 'font-weight' );
    }
  }  

  get textAlign() {
    if( this.hasAttribute( 'text-align' ) ) {
      return this.getAttribute( 'text-align' );
    }

    return null;
  }

  set textAlign( value ) {
    if( value !== null ) {
      this.setAttribute( 'text-align', value );
    } else {
      this.removeAttribute( 'text-align' );
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

window.customElements.define( 'rf-box', RainforestBox );
