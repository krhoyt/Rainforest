import RainforestStatusIndicator from "../components/status-indicator.js";

export default class RainforestUsageChart extends HTMLElement {
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

        div[part=chart] {
          box-sizing: border-box;          
          display: flex;
          flex-direction: row;
          gap: 12px;
        }

        div[part=group] {
          box-sizing: border-box;                    
          display: flex;
          flex-direction: column;
          justify-content: center;
        }        

        div[part=legend] {
          display: flex;
          flex-direction: row;
          gap: 12px;
          padding: 12px 0 0 0;
        }

        div[part=legend] div {        
          align-items: center;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          transition: opacity 0.60s;
        }

        div[part=legend] div div {        
          border-radius: 4px;
          box-sizing: border-box;          
          height: 14px;
          margin: 0 4px 0 0;
          width: 14px;          
        }        

        div[part=legend] p {
          color: #000716;
          font-size: 14px;
          line-height: 20px;
        }

        div[part=empty],
        div[part=error],
        div[part=loading] {
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 40px 0 40px 0;
        }

        div[part=series] {
          display: flex;
          flex-direction: row;
          gap: 3px;
        }

        div[part=series] div {
          box-sizing: border-box;                    
          border-radius: 4px;
          transition: opacity 0.60s;
        }

        div[part=usage] {
          box-sizing: border-box;
          display: flex;
          flex-basis: 0;
          flex-direction: column;
          flex-grow: 1;
        }

        p {
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 20px;
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;
        }
        p[part=domain] { color: #414d5c; }
        p[part=description] { color: #000716; }        
        p[part=legend-title],
        p[part=title] {
          color: #000716;
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
          margin: 0 0 20px 0;
        }
        p[part=legend-title] {
          margin: 0;
          padding: 6px 0 0 0;
        }        

        .empty {
          display: none !important;
        }

        :host( [hide-legend] ) div[part=legend] { display: none; }
        :host( :not( [legend-title] ) ) p[part=legend-title] { display: none; }
        :host( :not( [description] ) ) p[part=description] { display: none; }        
        :host( :not( [domain] ) ) p[part=domain] { display: none; }
        :host( :not( [title] ) ) p[part=title] { display: none; }
        :host( :not( [status-type=loading] ) ) div[part=loading] { display: none; }
        :host( :not( [status-type=error] ) ) div[part=error] { display: none; }
        :host( [status-type=error] ) div[part=chart],
        :host( [status-type=error] ) div[part=empty],
        :host( [status-type=error] ) div[part=loading],
        :host( [status-type=error] ) div[part=legend],
        :host( [status-type=error] ) p[part=title],
        :host( [status-type=loading] ) div[part=chart],
        :host( [status-type=loading] ) div[part=empty],        
        :host( [status-type=loading] ) div[part=error],
        :host( [status-type=loading] ) div[part=legend],
        :host( [status-type=loading] ) p[part=title],
        :host( [status-type=loading] ) p[part=legend-title] {
          display: none;
        }
      </style>
      <p part="title"></p>
      <div part="chart">
        <div part="group">
          <p part="domain"></p>
          <p part="description"></p>        
        </div>
        <div part="usage">
          <div part="series"></div>
        </div>
      </div>
      <p part="legend-title"></p>
      <div part="legend"></div>
      <div part="loading">
        <rf-status-indicator type="loading"></rf-status-indicator>
      </div>  
      <div part="error">
        <rf-status-indicator type="error"></rf-status-indicator>
      </div>        
      <div part="empty">
        <slot name="empty"></slot>
      </div>       
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
    this._legend = null;
    this._series = [];

    // Events
    this.onLegendOver = this.onLegendOver.bind( this );
    this.onLegendOut = this.onLegendOut.bind( this );
    this.onSeriesOver = this.onSeriesOver.bind( this );
    this.onSeriesOut = this.onSeriesOut.bind( this );

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$chart = this.shadowRoot.querySelector( 'div[part=chart]' );
    this.$description = this.shadowRoot.querySelector( 'p[part=description]' );    
    this.$domain = this.shadowRoot.querySelector( 'p[part=domain]' );
    this.$empty = this.shadowRoot.querySelector( 'div[part=empty]' );
    this.$error = this.shadowRoot.querySelector( 'rf-status-indicator[type=error]' );
    this.$errorPart = this.shadowRoot.querySelector( 'div[part=error]' );
    this.$legend = this.shadowRoot.querySelector( 'div[part=legend]' );        
    this.$legendTitle = this.shadowRoot.querySelector( 'p[part=legend-title]' );
    this.$loading = this.shadowRoot.querySelector( 'rf-status-indicator[type=loading]' );            
    this.$loadingPart = this.shadowRoot.querySelector( 'div[part=loading]' );                
    this.$series = this.shadowRoot.querySelector( 'div[part=series]' ); 
    this.$series.addEventListener( 'mouseover', this.doSeriesOver );
    this.$series.addEventListener( 'mouseout', this.doSeriesOut );
    this.$title = this.shadowRoot.querySelector( 'p[part=title]' );
  }

  onLegendOver( evt ) {
    const index = parseInt( evt.currentTarget.getAttribute( 'data-index' ) );

    for( let s = 0; s < this.$series.children.length; s++ ) {
      const highlighted = parseInt( this.$series.children[s].getAttribute( 'data-index' ) );
      if( highlighted === index ) {
        this.$series.children[s].style.opacity = '1.0';
        this.$legend.children[s].style.opacity = '1.0';
      } else {
        this.$series.children[s].style.opacity = '0.20';
        this.$legend.children[s].style.opacity = '0.20';
      }
    }

    this.dispatchEvent( new CustomEvent( 'rf-highlight-change', {
      detail: {
        highlightedSeries: this._series[index]
      }
    } ) );
  }

  onLegendOut() {
    for( let s = 0; s < this.$series.children.length; s++ ) {
      this.$series.children[s].style.opacity = '1.0';
      this.$legend.children[s].style.opacity = '1.0';      
    }
  }

  onSeriesOver() {;}
  onSeriesOut() {;}  

  // When attributes change
  _render() {
    this.$title.innerText = this.title === null ? '' : this.title;
    this.$domain.innerText = this.domain === null ? '' : this.domain;
    this.$description.innerText = this.description === null ? '' : this.description;
    this.$legendTitle.innerText = this.legendTitle === null ? '' : this.legendTitle;
    this.$loadingPart.style.height = this.height === null ? '60px' : `${this.height}px`;
    this.$loading.innerText = this.loadingText === null ? 'Loading chart' : this.loadingText;
    this.$errorPart.style.height = this.height === null ? '60px' : `${this.height}px`;
    this.$error.innerText = this.errorText === null ? 'The data couldn\'t be fetched. Try again later.' : this.errorText;

    if( this._series.length === 0 ) {
      this.$empty.classList.remove( 'empty' );
      this.$chart.classList.add( 'empty' );
      this.$errorPart.classList.add( 'empty' );
      this.$legend.classList.add( 'empty' );
      this.$legendTitle.classList.add( 'empty' );
      this.$title.classList.add( 'empty' );
    } else {
      this.$empty.classList.add( 'empty' );
      this.$chart.classList.remove( 'empty' );
      this.$errorPart.classList.remove( 'empty' );
      this.$legend.classList.remove( 'empty' );
      this.$legendTitle.classList.remove( 'empty' );
      this.$title.classList.remove( 'empty' );      
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
    this._upgrade( 'description' );                           
    this._upgrade( 'domain' );
    this._upgrade( 'errorText' );
    this._upgrade( 'height' );
    this._upgrade( 'hideLegend' );
    this._upgrade( 'legendFormatter' );                               
    this._upgrade( 'legendTitle' );                                   
    this._upgrade( 'loadingText' );    
    this._upgrade( 'series' );                               
    this._upgrade( 'statusType' );                               
    this._upgrade( 'title' );                                   
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'description',
      'domain',
      'error-text',
      'height',
      'hide-legend',
      'legend-title',
      'loading-text',
      'status-type',
      'title'
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
  get legendFormatter() {
    return this._legend;
  }

  set legendFormatter( value ) {
    this._legend = value;
  }

  get series() {
    return this._series.length === 0 ? [] : this._series;
  }

  set series( value ) {
    this._series = value === null ? [] : [... value];

    while( this.$series.children.length > this._series.length ) {
      this.$series.children[0].remove();
      this.$legend.children[0].removeEventListener( 'mouseover', this.onLegendOver );
      this.$legend.children[0].removeEventListener( 'mouseout', this.onLegendOut );      
      this.$legend.children[0].remove();
    }

    while( this.$series.children.length < this._series.length ) {
      const series = document.createElement( 'div' );
      series.style.height = this.height === null ? '60px' : `${this.height}px`;
      this.$series.appendChild( series );

      const legend = document.createElement( 'div' );
      const color = document.createElement( 'div' );
      const label = document.createElement( 'p' );
      legend.addEventListener( 'mouseover', this.onLegendOver );
      legend.addEventListener( 'mouseout', this.onLegendOut );
      legend.appendChild( color );
      legend.appendChild( label );      
      this.$legend.appendChild( legend );      
    }

    const total = this._series.reduce( ( previous, current ) => {
      if( current.hasOwnProperty( 'data' ) ) {
        previous = previous + current.data;
      }
      
      return previous;
    }, 0 );

    for( let s = 0; s < this._series.length; s++ ) {
      const percent = this._series[s].hasOwnProperty( 'data' ) ? ( ( this._series[s].data / total ) * 100 ) : 0;
      this.$series.children[s].setAttribute( 'data-index', s );
      this.$series.children[s].style.backgroundColor = this._colors[s % this._colors.length];
      this.$series.children[s].style.width = `${percent}%`;
      this.$legend.children[s].setAttribute( 'data-index', s );
      this.$legend.children[s].children[0].style.backgroundColor = this._colors[s % this._colors.length];
      this.$legend.children[s].children[1].innerText = this._legend === null ? this._series[s].title : this._legend( this._series[s], total );      
    }
  }

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get description() {
    if( this.hasAttribute( 'description' ) ) {
      return this.getAttribute( 'description' );
    }

    return null;
  }

  set description( value ) {
    if( value !== null ) {
      this.setAttribute( 'description', value );
    } else {
      this.removeAttribute( 'description' );
    }
  }

  get domain() {
    if( this.hasAttribute( 'domain' ) ) {
      return this.getAttribute( 'domain' );
    }

    return null;
  }

  set domain( value ) {
    if( value !== null ) {
      this.setAttribute( 'domain', value );
    } else {
      this.removeAttribute( 'domain' );
    }
  }

  get dismissable() {
    return this.hasAttribute( 'dismissable' );
  }

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

  get legendTitle() {
    if( this.hasAttribute( 'legend-title' ) ) {
      return this.getAttribute( 'legend-title' );
    }

    return null;
  }

  set legendTitle( value ) {
    if( value !== null ) {
      this.setAttribute( 'legend-title', value );
    } else {
      this.removeAttribute( 'legend-title' );
    }
  }
  
  get loadingText() {
    if( this.hasAttribute( 'loading-text' ) ) {
      return this.getAttribute( 'loading-text' );
    }

    return null;
  }

  set loadingText( value ) {
    if( value !== null ) {
      this.setAttribute( 'loading-text', value );
    } else {
      this.removeAttribute( 'loading-text' );
    }
  }  

  get statusType() {
    if( this.hasAttribute( 'status-type' ) ) {
      return this.getAttribute( 'status-type' );
    }

    return null;
  }

  set statusType( value ) {
    if( value !== null ) {
      this.setAttribute( 'status-type', value );
    } else {
      this.removeAttribute( 'status-type' );
    }
  }    

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

window.customElements.define( 'rf-usage-chart', RainforestUsageChart );
