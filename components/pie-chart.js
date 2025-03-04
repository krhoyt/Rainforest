import RFObject from "./object.js";
import RFStatusIndicator from "./status-indicator.js";

export default class RFPieChart extends HTMLElement {
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

        :host( [hidden] ) {
          display: none;
        }

        circle {
          fill: #ffffff;
          r: 75px;
        }

        div[part=legend] {
          display: flex;
          flex-direction: row;
          gap: 16px;
        }

        div[part=legend] p {
          align-items: center;
          box-sizing: border-box;
          color: #000716;
          cursor: default;
          display: flex;
          flex-direction: row;
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

        div[part=legend] p::before {        
          background-color: var( --legend-background-color );
          border-radius: 2px;
          content: ' ';
          display: inline-block;
          margin: 0 4px 0 0;
          min-height: 14px;
          min-width: 14px;
        }
        
        div[part=data] {
          display: none;
        }

        div[part=empty] {
          display: none;
        }

        g[part=donut] {
          transform-origin: 50%;
          transform: translate( 50%, 50% );          
        }

        g[part=slices] {
          transform-origin: 50%;
          transform: rotate( -90deg ) translate( 50%, 50% );
        }

        path {
          stroke: #ffffff;
          stroke-linejoin: round;
          stroke-width: 2px;
        }

        svg {
          height: var( --pie-chart-height, 312px );
          width: 100%;
        }

        text {
          fill: #000716;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          text-rendering: optimizeLegibility;          
        }

        text[part=inner-value] {
          font-size: 24px;
          font-weight: 700;
          text-anchor: middle;
          transform: translateY( -4px );
        }

        text[part=inner-description] {
          fill: #414d5c;
          dominant-baseline: hanging;
          font-size: 18px;
          font-weight: 700;          
          text-anchor: middle;          
          transform: translateY( 4px );
        }

        :host( [hide-legend] ) div[part=legend] {
          display: none;
        }

        :host( [size=small] ) svg {
          height: 204px;
        }
        :host( [size=small] ) circle {
          r: 39px;
        }
        :host( [size=small] ) text[part=inner-value] {
          dominant-baseline: middle;
          font-size: 18px;
          transform: translateY( 0 );
        }                
        :host( [size=small] ) text[part=inner-description] {
          display: none;
        }        

        :host( [size=large] ) svg {
          height: 392px;
        }       
        :host( [size=large] ) circle {
          r: 115px;
        }

        :host( :not( [inner-description] ) ) text[part=inner-value] {
          dominant-baseline: middle;
          transform: translate( 0 );
        }
        :host( :not( [inner-description] ) ) text[part=inner-description] {
          display: none;
        }        

        :host( :not( [inner-value] ) ) text[part=inner-value] {
          display: none;
        }
        :host( :not( [inner-value] ) ) text[part=inner-description] {
          dominant-baseline: middle;
          transform: translate( 0 );          
        }                

        :host( [status=loading] ) svg {
          display: none;
        }
        :host( :not( [status=loading] ) ) rf-status-indicator {
          display: none;
        }        

        :host( :not( [variant=donut] ) ) g[part=donut] {
          display: none;
        }
      </style>
      <svg part="vector">
        <g part="chart">
          <g part="slices"></g>
          <g part="labels"></g>          
          <g part="donut">
            <circle></circle>
            <text part="inner-value"></text>
            <text part="inner-description"></text>
          </g>
        </g>
      </svg>
      <div part="legend"></div>
      <rf-status-indicator label="Loading" part="status" type="loading"></rf-status-indicator>
      <div part="empty">
        <slot name="empty"></slot>
      </div>             
      <div part="data">
        <slot></slot>
      </div>
    `;

    // Private
    this._data = [];
    this._colors = [
      '#688ae8', '#c33d69', '#2ea597', '#8456ce', 
      '#e07941', '#3759ce', '#962249', '#096f64',
      '#6237a7', '#a84401', '#273ea5', '#780d35',
      '#03524a', '#4a238b', '#7e3103', '#1b2b88',
      '#ce567c', '#003e38', '#9469d6', '#602400',
      '#4066df', '#a32952', '#0d7d70', '#6b40b2',
      '#bc4d01', '#2c46b1', '#81143b', '#045b52',
      '#512994', '#8a3603', '#1f3191', '#da7596',
      '#01443e', '#a783e1', '#692801', '#5978e3',
      '#b1325c', '#1c8e81', '#7749bf', '#cc5f21',
      '#314fbf', '#8b1b42', '#06645a', '#59309d',
      '#983c02', '#23379b', '#6f062f', '#014b44',
      '#431d84', '#732c02'
    ];    

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$chart = this.shadowRoot.querySelector( 'g[part=chart]' );
    this.$data = this.shadowRoot.querySelector( 'slot:not( [name] )' );
    this.$data.addEventListener( 'slotchange', () => {
      const objects = this.querySelectorAll( 'rf-object' );
      const data = [];
      for( let c = 0; c < objects.length; c++ ) {
        data.push( {
          title: objects[c].title,
          value: objects[c].valueAsFloat
        } );
      }
      this.data = data;
    } );
    this.$innerDescription = this.shadowRoot.querySelector( 'text[part=inner-description]' );
    this.$innerValue = this.shadowRoot.querySelector( 'text[part=inner-value]' );    
    this.$legend = this.shadowRoot.querySelector( 'div[part=legend]' );
    this.$slices = this.shadowRoot.querySelector( 'g[part=slices]' );
    this.$vector = this.shadowRoot.querySelector( 'svg' );    
  }

  arc( cx, cy, r, startAngle, endAngle ) {
    const startX = cx + r * Math.cos( startAngle * Math.PI / 180 );
    const startY = cy + r * Math.sin( startAngle * Math.PI / 180 );
    const endX = cx + r * Math.cos( endAngle * Math.PI / 180 );
    const endY = cy + r * Math.sin( endAngle * Math.PI / 180 );
    const flag = endAngle - startAngle <= 180 ? 0 : 1;  
    return `M ${startX} ${startY} A ${r} ${r} 0 ${flag} 1 ${endX} ${endY} L ${cx} ${cy} Z`;      
  }

  // When attributes change
  _render() {
    this.$innerValue.textContent = this.innerValue === null ? '' : this.innerValue;
    this.$innerDescription.textContent = this.innerDescription === null ? '' : this.innerDescription;    

    while( this.$slices.children.length > 0 ) {
      this.$slices.children[0].remove();
    }

    while( this.$legend.children.length > this._data.length ) {
      this.$legend.children[0].remove();
    }    

    while( this.$legend.children.length < this._data.length ) {
      const label = document.createElement( 'p' );
      this.$legend.appendChild( label );
    }    

    let size = 200;

    switch( this.size ) {
      case 'large':
        size = 300;
        break;
      case 'small':
        size = 100;
        break;
    }

    // const rect = this.$vector.getBoundingClientRect();
    const cx = 0; 
    const cy = 0;
    const r = size / 2;

    let sum = 0;
    for( let d = 0; d < this._data.length; d++ ) {
      sum = sum + this._data[d].value;
    }

    let total = 0;
    for( let d = 0; d < this._data.length; d++ ) {
      this.$legend.children[d].innerText = this._data[d].title;
      this.$legend.children[d].style.setProperty( '--legend-background-color', this._colors[d % this._colors.length] );

      if( this._data[d].value === 0 ) continue;

      const angle = 360 * ( this._data[d].value / sum );

      if( angle === 360 && this._data.length === 1 ) {
        const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' );
        path.setAttributeNS( null, 'cx', cx );
        path.setAttributeNS( null, 'cy', cy );        
        path.setAttributeNS( null, 'r', r );  
        path.setAttributeNS( null, 'fill', this._colors[d % this._colors.length] );
        this.$slices.appendChild( path );                    
      } else {
        const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
        path.setAttributeNS( null, 'd', this.arc( cx, cy, r, total, total + angle ) );
        path.setAttributeNS( null, 'fill', this._colors[d % this._colors.length] );
        this.$slices.appendChild( path );              
      }

      total = total + angle;
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
    this._upgrade( 'data' );
    this._upgrade( 'hidden' );
    this._upgrade( 'hideLegend' );
    this._upgrade( 'innerDescription' );    
    this._upgrade( 'innerValue' );        
    this._upgrade( 'size' );    
    this._upgrade( 'status' );    
    this._upgrade( 'variant' );        
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'hidden',
      'hide-legend',
      'inner-description',
      'inner-value',
      'size',
      'status',
      'variant'
    ];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  } 

  // Properties
  // Not reflected
  // Object, Array, Date, Function
  get data() {
    return this._data.length === 0 ? [] : this._data;
  }

  set data( value ) {
    this._data = value === null ? [] : [... value];
    this._render();
  }

  // Attributes
  // Reflected
  // Boolean, Number, String, null
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

  get hideLegend() {
    return this.hasAttribute( 'hide-legend' );
  }

  set hideLegend( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'hide-legend' );
      } else {
        this.setAttribute( 'hide-legend', '' );
      }
    } else {
      this.removeAttribute( 'hide-legend' );
    }
  }  

  get innerDescription() {
    if( this.hasAttribute( 'inner-description' ) ) {
      return this.getAttribute( 'inner-description' );
    }

    return null;
  }

  set innerDescription( value ) {
    if( value !== null ) {
      this.setAttribute( 'inner-description', value );
    } else {
      this.removeAttribute( 'inner-description' );
    }
  }
  
  get innerValue() {
    if( this.hasAttribute( 'inner-value' ) ) {
      return this.getAttribute( 'inner-value' );
    }

    return null;
  }

  set innerValue( value ) {
    if( value !== null ) {
      this.setAttribute( 'inner-value', value );
    } else {
      this.removeAttribute( 'inner-value' );
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

  get status() {
    if( this.hasAttribute( 'status' ) ) {
      return this.getAttribute( 'status' );
    }

    return null;
  }

  set status( value ) {
    if( value !== null ) {
      this.setAttribute( 'status', value );
    } else {
      this.removeAttribute( 'status' );
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

window.customElements.define( 'rf-pie-chart', RFPieChart );
