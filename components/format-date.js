export default class RFFormatDate extends HTMLElement {
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

        p {
          box-sizing: border-box;
          color: var( --format-color, #000716 );
          cursor: default;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: var( --format-size, 14px );
          font-style: normal;
          font-weight: var( --format-weight, 400 );
          line-height: var( --format-line-height, 20px );
          margin: 0;
          padding: 0;
          text-align: var( --format-text-align, left );
          text-decoration: var( --format-text-decoration, none );
          text-rendering: optimizeLegibility;
          width: 100%;          
        }
      </style>
      <p part="label"></p>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$label = this.shadowRoot.querySelector( 'p' );
  }

  // When things change
  _render() {
    const options = {};

    if( this.weekday !== null ) options.weekday = this.weekday;
    if( this.era !== null ) options.era = this.era;    
    if( this.year !== null ) options.year = this.year;    
    if( this.month !== null ) options.month = this.month;        
    if( this.day !== null ) options.day = this.day;  
    if( this.hour !== null ) options.hour = this.hour;    
    if( this.minute !== null ) options.minute = this.minute;        
    if( this.second !== null ) options.second = this.second;      
    if( this.timeZone !== null ) options.timeZone = this.timeZone;
    if( this.timeZoneName !== null ) options.timeZoneName = this.timeZoneName;
    if( this.hourFormat !== null ) options.hourCycle = `h${this.hourFormat}`;

    const locale = new Intl.Locale( this.lang === null ? navigator.language: this.lang );
    const date = this.date === null ? new Date() : new Date( Date.parse( this.date ) );
    const formatter = new Intl.DateTimeFormat( locale, options );
    this.$label.textContent = formatter.format( date );
  }

  // Properties set before module loaded
  _upgrade( property ) {
    if( this.hasOwnProperty( property ) ) {
      const value = this[property];
      delete this[property];
      this[property] = value;
    }    
  }    

  // Setup
  connectedCallback() {
    this._upgrade( 'date' );                     
    this._upgrade( 'dateAsObject' );                     
    this._upgrade( 'day' );    
    this._upgrade( 'era' );                                                                
    this._upgrade( 'hidden' );                        
    this._upgrade( 'hour' );
    this._upgrade( 'hourFormat' );                                                        
    this._upgrade( 'lang' );                                    
    this._upgrade( 'minute' );                                
    this._upgrade( 'month' );                                
    this._upgrade( 'second' );   
    this._upgrade( 'timeZone' );                                                         
    this._upgrade( 'timeZoneName' );                                
    this._upgrade( 'weekday' );                            
    this._upgrade( 'year' );                                
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'date',
      'day',
      'era',
      'hidden',
      'hour',
      'hour-format',
      'lang',
      'minute',
      'month',
      'second',
      'time-zone',
      'time-zone-name',
      'weekday',
      'year'
    ];
  }

  // Observed tag attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  }

  // Properties
  // Not reflected
  // Array, Date, Object, null
  get dateAsObject() {
    return this.date === null ? null : new Date( Date.parse( this.date ) );
  }
  
  set dateAsObject( value ) {
    this.date = value === null ? null : value.toString();
  }     

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get date() {
    if( this.hasAttribute( 'date' ) ) {
      return this.getAttribute( 'date' );
    }

    return null;
  }

  set date( value ) {
    if( value !== null ) {
      this.setAttribute( 'date', value );
    } else {
      this.removeAttribute( 'date' );
    }
  }     

  get day() {
    if( this.hasAttribute( 'day' ) ) {
      return this.getAttribute( 'day' );
    }

    return null;
  }

  set day( value ) {
    if( value !== null ) {
      this.setAttribute( 'day', value );
    } else {
      this.removeAttribute( 'day' );
    }
  }
  
  get era() {
    if( this.hasAttribute( 'era' ) ) {
      return this.getAttribute( 'era' );
    }

    return null;
  }

  set era( value ) {
    if( value !== null ) {
      this.setAttribute( 'era', value );
    } else {
      this.removeAttribute( 'era' );
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

  get hour() {
    if( this.hasAttribute( 'hour' ) ) {
      return this.getAttribute( 'hour' );
    }

    return null;
  }

  set hour( value ) {
    if( value !== null ) {
      this.setAttribute( 'hour', value );
    } else {
      this.removeAttribute( 'hour' );
    }
  }  
  
  get hourFormat() {
    if( this.hasAttribute( 'hour-format' ) ) {
      return this.getAttribute( 'hour-format' );
    }

    return null;
  }

  set hourFormat( value ) {
    if( value !== null ) {
      this.setAttribute( 'hour-format', value );
    } else {
      this.removeAttribute( 'hour-format' );
    }
  }   

  get lang() {
    if( this.hasAttribute( 'lang' ) ) {
      return this.getAttribute( 'lang' );
    }

    return null;
  }

  set lang( value ) {
    if( value !== null ) {
      this.setAttribute( 'lang', value );
    } else {
      this.removeAttribute( 'lang' );
    }
  }  
  
  get minute() {
    if( this.hasAttribute( 'minute' ) ) {
      return this.getAttribute( 'minute' );
    }

    return null;
  }

  set minute( value ) {
    if( value !== null ) {
      this.setAttribute( 'minute', value );
    } else {
      this.removeAttribute( 'minute' );
    }
  }
  
  get month() {
    if( this.hasAttribute( 'month' ) ) {
      return this.getAttribute( 'month' );
    }

    return null;
  }

  set month( value ) {
    if( value !== null ) {
      this.setAttribute( 'month', value );
    } else {
      this.removeAttribute( 'month' );
    }
  }  

  get second() {
    if( this.hasAttribute( 'second' ) ) {
      return this.getAttribute( 'second' );
    }

    return null;
  }

  set second( value ) {
    if( value !== null ) {
      this.setAttribute( 'second', value );
    } else {
      this.removeAttribute( 'second' );
    }
  }    

  get timeZone() {
    if( this.hasAttribute( 'time-zone' ) ) {
      return this.getAttribute( 'time-zone' );
    }

    return null;
  }

  set timeZone( value ) {
    if( value !== null ) {
      this.setAttribute( 'time-zone', value );
    } else {
      this.removeAttribute( 'time-zone' );
    }
  }

  get timeZoneName() {
    if( this.hasAttribute( 'time-zone-name' ) ) {
      return this.getAttribute( 'time-zone-name' );
    }

    return null;
  }

  set timeZoneName( value ) {
    if( value !== null ) {
      this.setAttribute( 'time-zone-name', value );
    } else {
      this.removeAttribute( 'time-zone-name' );
    }
  }  

  get weekday() {
    if( this.hasAttribute( 'weekday' ) ) {
      return this.getAttribute( 'weekday' );
    }

    return null;
  }

  set weekday( value ) {
    if( value !== null ) {
      this.setAttribute( 'weekday', value );
    } else {
      this.removeAttribute( 'weekday' );
    }
  }  

  get year() {
    if( this.hasAttribute( 'year' ) ) {
      return this.getAttribute( 'year' );
    }

    return null;
  }

  set year( value ) {
    if( value !== null ) {
      this.setAttribute( 'year', value );
    } else {
      this.removeAttribute( 'year' );
    }
  }    
}

window.customElements.define( 'rf-format-date', RFFormatDate );
