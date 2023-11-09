export default class RainforestPolarChart extends HTMLElement {
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
      </style>
      <svg></svg>
    `;

    // Private
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
    this._series = [];

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$vector = this.shadowRoot.querySelector( 'svg' );
  }

  _spokes( count, size ) {
    const group = document.createElementNS( 'http://www.w3.org/2000/svg', 'g' );
    for( let c = 0; c < count; c++ ) {
      const line = document.createElementNS( 'http://www.w3.org/2000/svg', 'rect' );
      line.setAttributeNS( null, 'fill', '#d1d5db' );
      line.setAttributeNS( null, 'width', 1 );
      line.setAttributeNS( null, 'height', size / 2 );        
      line.setAttributeNS( null, 'x', -0.50 );
      line.setAttributeNS( null, 'y', 0 - ( size / 2 ) );
      line.setAttributeNS( null, 'transform', `rotate( ${( 360 / count ) * c} )` );
      group.appendChild( line );
    }
    return group;
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
    this._upgrade( 'series' );                               
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [];
  }

  // Observed attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  } 

  // Properties
  // Not reflected
  // Object, Array, Date, Function
  get series() {
    return this._series.length === 0 ? [] : this._series;
  }

  set series( value ) {
    this._series = value === null ? [] : [... value];

    if( this._series.length > 0 ) {
      const count = this._series[0].data.length;
      const maximum = this._series.reduce( ( value, current ) => {
        const inner = current.data.reduce( ( previous, current ) => current > previous ? current : previous );
        return inner > value ? inner : value;
      }, 0 );
      const minimum = this._series.reduce( ( value, current ) => {
        const inner = current.data.reduce( ( previous, current ) => current < previous ? current : previous );
        return inner < value ? inner : value;
      }, maximum );
      const size = Math.min( this.$vector.clientWidth, this.$vector.clientHeight );

      const chart = document.createElementNS( 'http://www.w3.org/2000/svg', 'g' );
      const spokes = this._spokes( count, size );
      const polygons = this._polygons( count, size );
      chart.appendChild( spokes );
      chart.appendChild( polygons );      
      for( let s = 0; s < this._series.length; s++ ) {
        const area = this._area( size, count, 0, 5, this._series[s].data, this._colors[s] );
        area.setAttribute( 'data-series', s );
        chart.appendChild( area );
      }
      chart.setAttributeNS( null, 'transform', `translate( ${size / 2} ${size / 2} )` );
      this.$vector.appendChild( chart );
    }
  }

  _map( x, in_min, in_max, out_min, out_max ) {
    return ( x - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
  }

  _area( size, count, minimum, maximum, data, color ) {
    const slice = ( 360 / count ) * ( Math.PI / 180 );

    const group = document.createElementNS( 'http://www.w3.org/2000/svg', 'g' );
    group.style.cursor = 'pointer';
    group.addEventListener( 'mouseover', ( evt ) => {
      for( let c = 0; c < evt.currentTarget.children.length; c++ ) {
        if( evt.currentTarget.children[c].tagName === 'circle' ) {
          evt.currentTarget.children[c].style.opacity = '1.0';
        }
      }
    } );
    group.addEventListener( 'mouseout', ( evt ) => {
      for( let c = 0; c < evt.currentTarget.children.length; c++ ) {
        if( evt.currentTarget.children[c].tagName === 'circle' ) {
          evt.currentTarget.children[c].style.opacity = '0';
        }
      }
    } );    
    const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
    path.setAttributeNS( null, 'fill', `${color}66` );
    path.setAttributeNS( null, 'stroke', color );
    path.setAttributeNS( null, 'stroke-width', 2 );
    path.setAttributeNS( null, 'stroke-linecap', 'round' );
    group.appendChild( path );

    let d = '';

    for( let c = 0; c < data.length; c++ ) {
      const mapped = this._map( data[c], minimum, maximum, 0, size / 2 );
      const x = mapped * Math.sin( slice * c );
      const y = mapped * ( 0 - Math.cos( slice * c ) );

      if( c === 0 ) {
        d = `M ${x} ${y} `;
      } else {
        d = d + `L ${x} ${y} `;
      }

      const circle = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' );
      circle.addEventListener( 'mouseover', ( evt ) => {
        console.log( evt.currentTarget.getAttribute( 'data-value' ) );
        console.log( evt.currentTarget.getAttribute( 'data-angle' ) );
        console.log( evt.currentTarget.getAttribute( 'data-index' ) );                
      } );
      circle.setAttributeNS( null, 'fill', '#ffffff' );
      circle.setAttributeNS( null, 'stroke', color );
      circle.setAttributeNS( null, 'stroke-width', 2 );    
      circle.setAttributeNS( null, 'r', 4 );    
      circle.setAttributeNS( null, 'cx', x );    
      circle.setAttributeNS( null, 'cy', y );       
      circle.setAttribute( 'data-value', data[c] );
      circle.setAttribute( 'data-angle', ( 360 / count ) * c );
      circle.setAttribute( 'data-index', c );
      circle.style.opacity = '0';   
      group.appendChild( circle );  
    }

    path.setAttributeNS( null, 'd', d + 'Z' );
    return group;
  }

  _polygons( count, size ) {
    const group = document.createElementNS( 'http://www.w3.org/2000/svg', 'g' );
    const slice = ( 360 / count ) * ( Math.PI / 180 );
    const levels = ( size / 2 ) / 5;    

    for( let p = 0; p < 5; p++ ) {
      const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );

      path.setAttributeNS( null, 'fill', 'none' );
      path.setAttributeNS( null, 'stroke', '#d1d5db' );

      let d = '';

      for( let c = 0; c < count; c++ ) {
        const x = ( ( size / 2 ) - ( levels * p ) ) * Math.sin( slice * c );
        const y = ( ( size / 2 ) - ( levels * p ) ) * ( 0 - Math.cos( slice * c ) );

        if( c === 0 ) {
          d = `M ${x} ${y} `;
        } else {
          d = d + `L ${x} ${y} `;
        }
      }

      path.setAttributeNS( null, 'd', d + 'Z' );         
      group.appendChild( path );
    }

    return group;
  }

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get title() {
    if( this.hasAttribute( 'title' ) ) {
      return this.getAttribute( 'title' );
    }

    return null;
  }

  set title( value ) {
    if( value !== null ) {
      this.setAttribute( 'title', value );
    } else {
      this.removeAttribute( 'title' );
    }
  }  
}

window.customElements.define( 'rf-polar-chart', RainforestPolarChart );
