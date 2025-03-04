export default class RFPolarChart extends HTMLElement {
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

        g[part=series] circle {
          transition:
            fill 0.60s,
            opacity 0.60s
        }

        g[part=shapes] circle {
          display: none;
        }

        svg {
          width: 100%;
        }

        text {
          color: #414d5c;
          cursor: pointer;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 12px;
          line-height: 20px;
          text-rendering: optimizeLegibility;
        }

        :host( [hide-labels] ) text.label {
          display: none;
        }

        :host( [hide-spokes] ) g.spokes {
          display: none;
        }

        :host( [use-circles] ) g[part=shapes] circle {
          display: block;
        }        
        :host( [use-circles] ) g[part=shapes] path {
          display: none;
        }        

        :host( [hide-metrics] ) g[part=metrics],
        :host( [hide-levels] ) g[part=shapes] circle,
        :host( [hide-levels] ) g[part=shapes] path {
          display: none;
        } 
      </style>
      <svg height="500" part="vector">
        <g part="chart">
          <g part="spokes"></g>
          <g part="shapes"></g>
          <g part="metrics"></g>
          <g part="labels"></g>          
          <g part="series"></g>
        </g>
      </svg>
      <div part="empty">
        <slot name="empty"></slot>
      </div>             
    `;

    // Private
    this._catagories = [];
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

    // Events
    this.onLabelOver = this.onLabelOver.bind( this );
    this.onLabelOut = this.onLabelOut.bind( this );            
    this.onPointOver = this.onPointOver.bind( this );
    this.onPointOut = this.onPointOut.bind( this );        
    this.onSeriesOver = this.onSeriesOver.bind( this );
    this.onSeriesOut = this.onSeriesOut.bind( this );    

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$chart = this.shadowRoot.querySelector( 'g[part=chart]' );
    this.$empty = this.shadowRoot.querySelector( 'div[part=empty]' );    
    this.$labels = this.shadowRoot.querySelector( 'g[part=labels]' );    
    this.$metrics = this.shadowRoot.querySelector( 'g[part=metrics]' );
    this.$series = this.shadowRoot.querySelector( 'g[part=series]' );
    this.$shapes = this.shadowRoot.querySelector( 'g[part=shapes]' );    
    this.$spokes = this.shadowRoot.querySelector( 'g[part=spokes]' );    
    this.$vector = this.shadowRoot.querySelector( 'svg' );    
  }

  onLabelOut( evt ) {
    const index = parseInt( evt.currentTarget.getAttribute( 'data-index' ) );
    for( let s = 0; s < this.$series.children.length; s++ ) {
      this.$series.children[s].children[index + 1].style.opacity = '0';
    }
  }

  onLabelOver( evt ) {
    const index = parseInt( evt.currentTarget.getAttribute( 'data-index' ) );
    for( let s = 0; s < this.$series.children.length; s++ ) {
      this.$series.children[s].children[index + 1].style.opacity = '1.0';
    }
  }

  onPointOut( evt ) {
    evt.currentTarget.setAttributeNS( null, 'fill', '#ffffff' );
  }

  onPointOver( evt ) {
    console.log( 'Value: ' + evt.currentTarget.getAttribute( 'data-value' ) );
    console.log( 'Angle: ' + evt.currentTarget.getAttribute( 'data-angle' ) );
    console.log( 'Index: ' + evt.currentTarget.getAttribute( 'data-index' ) );  
    
    evt.currentTarget.setAttributeNS( null, 'fill', evt.currentTarget.getAttribute( 'stroke' ) );
  }

  onSeriesOut( evt ) {
    for( let c = 0; c < evt.currentTarget.children.length; c++ ) {
      if( evt.currentTarget.children[c].tagName === 'circle' ) {
        evt.currentTarget.children[c].style.opacity = '0';
      }
    }
  }

  onSeriesOver( evt ) {
    const index = parseInt( evt.currentTarget.getAttribute( 'data-series' ) );
    console.log( 'Series: ' + this._series[index].title );

    for( let c = 0; c < evt.currentTarget.children.length; c++ ) {
      if( evt.currentTarget.children[c].tagName === 'circle' ) {
        evt.currentTarget.children[c].style.opacity = '1.0';
      }
    }
  }

  _area( radius, count, minimum, maximum, data, color ) {
    const slice = ( 360 / count ) * ( Math.PI / 180 );

    while( this.$series.children.length > 0 ) {
      this.$series.children[0].removeEventListener( 'mouseover', this.onSeriesOver );
      this.$series.children[0].removeEventListener( 'mouseout', this.onSeriesOut );

      while( this.$series.children[0].children.length > 0 ) {
        if( this.$series.children[0].children[0].tagName === 'circle' ) {
          this.$series.children[0].children[0].removeEventListener( 'mouseover', this.onPointOver );
          this.$series.children[0].children[0].removeEventListener( 'mouseout', this.onPointOut );                
        }

        this.$series.children[0].children[0].remove();
      }

      this.$series.children[0].remove();
    }

    const group = document.createElementNS( 'http://www.w3.org/2000/svg', 'g' );
    group.style.cursor = 'pointer';
    group.addEventListener( 'mouseover', this.onSeriesOver );
    group.addEventListener( 'mouseout', this.onSeriesOut );   

    const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
    path.setAttributeNS( null, 'fill', `${color}66` );
    path.setAttributeNS( null, 'stroke', color );
    path.setAttributeNS( null, 'stroke-width', 2 );
    path.setAttributeNS( null, 'stroke-linecap', 'round' );
    group.appendChild( path );

    let d = '';

    for( let c = 0; c < data.length; c++ ) {
      const mapped = this._map( data[c], 0, maximum, 0, radius );
      const x = mapped * Math.sin( slice * c );
      const y = mapped * ( 0 - Math.cos( slice * c ) );

      if( c === 0 ) {
        d = `M ${x} ${y} `;
      } else {
        d = d + `L ${x} ${y} `;
      }

      const circle = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' );
      circle.addEventListener( 'mouseover', this.onPointOver );
      circle.addEventListener( 'mouseout', this.onPointOut );      
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

  _labels( categories, radius ) {
    while( this.$labels.children.length > 0 ) 
      this.$labels.children[0].remove();

    // TODO: Magic number?
    radius = radius + 8;
    const slice = ( 360 / categories.length ) * ( Math.PI / 180 );

    for( let c = 0; c < categories.length; c++ ) {
      const x = radius * Math.sin( slice * c );
      let y = radius * ( 0 - Math.cos( slice * c ) );

      if( c === 0 && !this.hideMetrics )
        y = y - 8;

      let anchor = 'middle'
      let baseline = 'auto';
      const degrees = ( slice * c ) * ( 180 / Math.PI );

      if( degrees === 0 ) {
        anchor = 'middle';
        baseline = 'auto';        
      } else if( degrees > 0 && degrees < 90 ) {
        anchor = 'start';
        baseline = 'auto';        
      } else if( degrees > 90 && degrees < 180 ) {
        anchor = 'start';
        baseline = 'hanging';        
      } else if( degrees === 180 ) {
        anchor = 'middle';
        baseline = 'hanging';                
      } else if( degrees > 180 && degrees < 270 ) {
        anchor = 'end';
        baseline = 'hanging';                        
      } else {
        anchor = 'end';
        baseline = 'auto';                                
      }

      const label = document.createElementNS( 'http://www.w3.org/2000/svg', 'text' );
      label.addEventListener( 'mouseover', this.onLabelOver );
      label.addEventListener( 'mouseout', this.onLabelOut );
      label.classList.add( 'label' );
      label.setAttribute( 'data-index', c );
      label.setAttributeNS( null, 'dominant-baseline', baseline );      
      label.setAttributeNS( null, 'text-anchor', anchor );
      label.setAttributeNS( null, 'x', x );
      label.setAttributeNS( null, 'y', y );      
      label.textContent = categories[c];
      this.$labels.appendChild( label );
    }
  }

  _map( x, in_min, in_max, out_min, out_max ) {
    return ( x - in_min ) * ( out_max - out_min ) / ( in_max - in_min ) + out_min;
  }  

  _metrics( radius, stops, minimum, maximum ) {
    for( let p = 0; p < stops; p++ ) {
      const y = 0 - ( ( radius / stops ) * ( p + 1 ) );
      const mapped = ( maximum / stops ) * ( p + 1 );

      const metrics = document.createElementNS( 'http://www.w3.org/2000/svg', 'text' );
      metrics.setAttributeNS( null, 'dominant-baseline', 'middle' );
      metrics.setAttributeNS( null, 'text-anchor', 'middle' );
      metrics.textContent = Math.round( mapped ) - mapped === 0 ? mapped : mapped.toFixed( 2 );
      metrics.setAttributeNS( null, 'y', y );
      this.$metrics.appendChild( metrics ); 
    }
  }

  _shapes( count, radius, stops ) {
    while( this.$shapes.children.length > 0 )
      this.$shapes.children[0].remove();

    const slice = ( 360 / count ) * ( Math.PI / 180 );
    const levels = radius / stops;    

    for( let p = 0; p < 5; p++ ) {
      const circle = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' );
      circle.setAttributeNS( null, 'fill', 'none' );
      circle.setAttributeNS( null, 'stroke', '#d1d5db' );
      circle.setAttributeNS( null, 'r', radius - ( levels * p ) );
      this.$shapes.appendChild( circle );

      const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
      path.setAttributeNS( null, 'fill', 'none' );
      path.setAttributeNS( null, 'stroke', '#d1d5db' );

      let d = '';

      for( let c = 0; c < count; c++ ) {
        const x = ( radius - ( levels * p ) ) * Math.sin( slice * c );
        const y = ( radius - ( levels * p ) ) * ( 0 - Math.cos( slice * c ) );

        if( c === 0 ) {
          d = `M ${x} ${y} `;
        } else {
          d = d + `L ${x} ${y} `;
        }
      }

      path.setAttributeNS( null, 'd', d + 'Z' );         
      this.$shapes.appendChild( path );
    }
  }  

  _spokes( count, radius ) {
    while( this.$spokes.children.length > 0 )
      this.$spokes.children[0].remove();

    for( let c = 0; c < count; c++ ) {
      const line = document.createElementNS( 'http://www.w3.org/2000/svg', 'rect' );      
  
      line.setAttributeNS( null, 'fill', '#d1d5db' );
      line.setAttributeNS( null, 'width', 1 );
      line.setAttributeNS( null, 'height', radius );        
      line.setAttributeNS( null, 'x', -0.50 );
      line.setAttributeNS( null, 'y', 0 - radius );
      line.setAttributeNS( null, 'transform', `rotate( ${( 360 / count ) * c} )` );

      this.$spokes.appendChild( line );      
    }
  }  

  // When attributes change
  _render() {
    if( this._series.length > 0 ) {
      this.$vector.setAttribute( 'height', this.height === null ? 500 : this.height );
      const count = this._categories.length === 0 ? this._series[0].data.length : this._categories.length;

      let maximum = this.maximum;
      if( maximum === null ) {
        maximum = this._series.reduce( ( value, current ) => {
          const inner = current.data.reduce( ( previous, current ) => current > previous ? current : previous );
          return inner > value ? inner : value;
        }, 0 );
      }
      const minimum = this._series.reduce( ( value, current ) => {
        const inner = current.data.reduce( ( previous, current ) => current < previous ? current : previous );
        return inner < value ? inner : value;
      }, maximum );

      const size = Math.min( this.$vector.clientWidth, this.$vector.clientHeight );
      let radius = this.hideLabels ? ( size / 2 ) : ( size / 2 ) - 28;
      radius = this.hideMetrics ? radius : radius - 8;
      radius = this.useCircles ? radius - 8 : radius;

      this._spokes( count, radius );
      this._shapes( count, radius, 5 );
      this._metrics( radius, 5, minimum, maximum );
      this._labels( this._categories, radius );
  
      for( let s = 0; s < this._series.length; s++ ) {
        const area = this._area( radius, count, 0, maximum, this._series[s].data, this._colors[s] );
        area.setAttribute( 'data-series', s );
        this.$series.appendChild( area );
      }
  
      this.$chart.setAttributeNS( null, 'transform', `translate( ${this.$vector.clientWidth / 2} ${this.$vector.clientHeight / 2} )` );      
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
    this._upgrade( 'categories' );                                           
    this._upgrade( 'height' );
    this._upgrade( 'hideLevels' );                                           
    this._upgrade( 'hideMetrics' );                                            
    this._upgrade( 'hideSpokes' );                           
    this._upgrade( 'maximum' );                                           
    this._upgrade( 'series' );                               
    this._upgrade( 'useCircles' );                                   
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'height',
      'hide-levels',
      'hide-metrics',
      'hide-spokes',
      'maximum',
      'use-circles'
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
  get categories() {
    return this._categories.length === 0 ? [] : this._categories;
  }

  set categories( value ) {
    this._categories = value === null ? [] : [... value];
    this._render();
  }

  get series() {
    return this._series.length === 0 ? [] : this._series;
  }

  set series( value ) {
    this._series = value === null ? [] : [... value];
    this._render();
  }

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get height() {
    if( this.hasAttribute( 'height' ) ) {
      return parseInt( this.getAttribute( 'height' ) );
    }

    return null;
  }

  set height( value ) {
    if( value !== null ) {
      this.setAttribute( 'height', value );
    } else {
      this.removeAttribute( 'height' );
    }
  }

  get hideLabels() {
    return this.hasAttribute( 'hide-labels' );
  }

  set hideLabels( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'hide-labels' );
      } else {
        this.setAttribute( 'hide-labels', '' );
      }
    } else {
      this.removeAttribute( 'hide-labels' );
    }
  }

  get hideLevels() {
    return this.hasAttribute( 'hide-levels' );
  }

  set hideLevels( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'hide-levels' );
      } else {
        this.setAttribute( 'hide-levels', '' );
      }
    } else {
      this.removeAttribute( 'hide-levels' );
    }
  }

  get hideMetrics() {
    return this.hasAttribute( 'hide-metrics' );
  }

  set hideMetrics( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'hide-metrics' );
      } else {
        this.setAttribute( 'hide-metrics', '' );
      }
    } else {
      this.removeAttribute( 'hide-metrics' );
    }
  }

  get hideSpokes() {
    return this.hasAttribute( 'hide-spokes' );
  }

  set hideSpokes( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'hide-spokes' );
      } else {
        this.setAttribute( 'hide-spokes', '' );
      }
    } else {
      this.removeAttribute( 'hide-spokes' );
    }
  }

  get maximum() {
    if( this.hasAttribute( 'maximum' ) ) {
      return parseInt( this.getAttribute( 'maximum' ) );
    }

    return null;
  }

  set maximum( value ) {
    if( value !== null ) {
      this.setAttribute( 'maximum', value );
    } else {
      this.removeAttribute( 'maximum' );
    }
  }

  get useCircles() {
    return this.hasAttribute( 'use-circles' );
  }

  set useCircles( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'use-circles' );
      } else {
        this.setAttribute( 'use-circles', '' );
      }
    } else {
      this.removeAttribute( 'use-circles' );
    }
  }  
}

window.customElements.define( 'rf-polar-chart', RFPolarChart );
