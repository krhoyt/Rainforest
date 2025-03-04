export default class RFCalendar extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: inline-flex;
          flex-direction: column;
          padding: 8px;
          position: relative;
          width: 238px;
        }

        :host( [hidden] ) {
          display: none;
        }

        div[part=controls] {
          align-items: center;
          display: flex;
          flex-direction: row;
        }

        div[part=controls] button {
          align-items: center;
          background: none;
          border: solid 2px transparent;
          cursor: pointer;
          display: flex;
          justify-content: center;
          margin: 0;
          outline: none;
          padding: 4px;
        }

        div[part=controls] button:hover path {
          stroke: #000716;
        }

        div[part=controls] p {
          color: #000716;
          flex-basis: 0;
          flex-grow: 1;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
          margin: 0;
          padding: 0;
          text-align: center;
        }

        div[part=days] {
          display: flex;
          flex-direction: row;
        }

        div[part=days] p {
          color: #5f6b7a;
          flex-basis: 0;
          flex-grow: 1;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
          margin: 0;
          padding: 12px 0 4px 0;
          text-align: center;
        }        

        div[part=calendar] {
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
          grid-template-rows: repeat( auto-fill, 1fr );
          gap: 0px 0px;
        }

        div[part=calendar] button {
          background: none;
          border: solid 2px transparent;
          border-radius: 8px;
          color: #000716;
          cursor: pointer;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin: 0;
          padding: 3px 0 3px 0;
          text-align: center;
        }

        div[part=calendar] button:hover {
          background-color: #f4f4f4;
          border-color: #7d8998;
        }

        div[part=calendar] button.outside {        
          color: #5f6b7a;
        }

        div[part=calendar] button.outside:hover {                
          background-color: transparent;
          border-color: transparent;
        }

        div[part=months] button.today,
        div[part=calendar] button.today {        
          background-color: #f4f4f4;
          border-color: #f4f4f4;
          font-weight: 700;
        }
        
        div[part=months] button.today:hover,
        div[part=calendar] button.today:hover {
          border-color: #7d8998;          
        }        

        div[part=calendar] button.today.outside:hover {
          background-color: #f4f4f4;          
          border-color: transparent;
        }

        div[part=months] button.selected,
        div[part=months] button.selected:hover,
        div[part=calendar] button.selected:hover,
        div[part=calendar] button.selected {        
          background-color: #0972d3;
          border-color: #0972d3;
          color: #ffffff;
          font-weight: 700;
        }        

        div[part=calendar] button[disabled]:not( .today ):hover {
          background-color: transparent;
          border-color: transparent;
        }

        div[part=calendar] button[disabled].today:hover {
          border-color: transparent;
        }        

        div[part=calendar] button[disabled] {
          color: #9ba7b6;
          cursor: not-allowed;
        }        

        div[part=months] {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: repeat( auto-fill, 1fr );
          gap: 9px 12px;
          padding: 8px;
        }

        div[part=months] button {
          background: none;
          border: none;
          border: solid 2px transparent;
          border-radius: 8px;
          box-sizing: border-box;
          color: #000716;
          cursor: pointer;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;
          font-size: 14px;          
          line-height: 20px;
          margin: 0;
          padding: 3px 0 3px 0;
        }

        svg {
          height: 16px;
          min-width: 16px;
          padding: 2px 0 2px 0;
          width: 16px;
        }

        path {
          fill: none;
          stroke: #414d5c;
          stroke-width: 2px;
        }

        :host( [granularity=month] ) div[part=calendar],
        :host( [granularity=month] ) div[part=days] {
          display: none;
        }

        :host( :not( [granularity=month] ) ) div[part=months] {
          display: none;
        }
      </style>
      <div part="controls">
        <button part="left" type="button">
          <svg>
            <path d="M12 1 5 8l7 7"></path>
          </svg>
        </button>
        <p part="label"></p>
        <button part="right" type="button">
          <svg>
            <path d="m4 1 7 7-7 7"></path>
          </svg>
        </button>
      </div>
      <div part="days">
        <p>Sun</p>
        <p>Mon</p>
        <p>Tue</p>
        <p>Wed</p>                        
        <p>Thu</p>        
        <p>Fri</p>        
        <p>Sat</p>        
      </div>
      <div part="calendar"></div>
      <div part="months"></div>
    `;

    // Private
    this._displayed = null;
    this._enabled = null;
    this._selected = null;    

    // Events
    this.onDateClick = this.onDateClick.bind( this );
    this.onMonthClick = this.onMonthClick.bind( this );
    
    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$calendar = this.shadowRoot.querySelector( 'div[part=calendar]' );
    this.$left = this.shadowRoot.querySelector( 'button[part=left]' );
    this.$left.addEventListener( 'click', () => {
      const granularity = this.granularity === null ? 'day' : this.granularity;

      if( granularity === 'day' ) {
        let month = this._displayed.getMonth();
        let year = this._displayed.getFullYear();
    
        year = ( month === 0 ) ? year - 1 : year;
        month = ( month === 0 ) ? 11 : month - 1;
    
        this._displayed = new Date(
          year,
          month,
          this._displayed.getDate()
        );
      } else {
        this._displayed.setFullYear( this._displayed.getFullYear() - 1 );
      }

      this._render();
    } );
    this.$label = this.shadowRoot.querySelector( 'p[part=label]' );   
    this.$months = this.shadowRoot.querySelector( 'div[part=months]' );
    this.$right = this.shadowRoot.querySelector( 'button[part=right]' );     
    this.$right.addEventListener( 'click', () => {
      const granularity = this.granularity === null ? 'day' : this.granularity;

      if( granularity === 'day' ) {
        let month = this._displayed.getMonth();
        let year = this._displayed.getFullYear();
    
        year = ( month === 11 ) ? year + 1 : year;
        month = ( month + 1 ) % 12;
    
        this._displayed = new Date(
          year,
          month,
          this._displayed.getDate()
        );
      } else {
        this._displayed.setFullYear( this._displayed.getFullYear() + 1 )
      }

      this._render();
    } );
  }

  onDateClick( evt ) {
    const selected = new Date(
      parseInt( evt.currentTarget.getAttribute( 'data-year' ) ),
      parseInt( evt.currentTarget.getAttribute( 'data-month' ) ),
      parseInt( evt.currentTarget.getAttribute( 'data-date' ) )
    );

    if( selected.getMonth() !== this._displayed.getMonth() ) {
      this._displayed = new Date( selected.getTime() );
    }

    this._selected = new Date( selected.getTime() );
    this.valueAsDate = this._selected;

    this.dispatchEvent( new CustomEvent( 'rf-change', {
      detail: {
        value: this.value
      }
    } ) );
  }

  onMonthClick( evt ) {
    if( this._selected === null ) {
      this._selected = new Date( 
        this._displayed.getFullYear(), 
        this._displayed.getMonth() 
      );
    }

    const month = parseInt( evt.currentTarget.getAttribute( 'data-month' ) );
    this._selected.setMonth( month );
    
    this.valueAsDate = this._selected;

    this.dispatchEvent( new CustomEvent( 'rf-change', {
      detail: {
        value: this.value
      }
    } ) );    
  }
  
  // When things change
  _render() {
    // Days
    while( this.$calendar.children.length < 42 ) {
      const date = document.createElement( 'button' );
      date.addEventListener( 'click', this.onDateClick );
      this.$calendar.appendChild( date );
    }

    // Months
    while( this.$months.children.length < 12 ) {
      const month = document.createElement( 'button' );
      month.addEventListener( 'click', this.onMonthClick );
      this.$months.appendChild( month );
    }    

    /*
    if( this._selected !== null ) {
      const match = 
        this._selected.getFullYear() + '-' +
        ( this._selected.getMonth() + 1 ).toString( 10 ).padStart( 2, '0' ) + '-' +
        this._selected.getDate().toString( 10 ).padStart( 2, '0' );

      console.log( 'MATCH: ' + match );

      if( this.value !== null ) {
        if( match !== this.value ) {
          this._displayed = new Date( Date.UTC( this.value ) );
          this._selected = new Date( Date.UTC( this.value ) );
        }
      }
    } else {
      if( this.value !== null ) {
        console.log( 'NOT: ' + this.value );
        this._displayed = new Date( this.value );
        this._selected = new Date( this.value );
      }
    }
    */

    let displayed = null;
    let selected = this._selected === null ? null : new Date( this.valueAsDate.getTime() ) ;    
    const today = new Date();  

    if( this.value !== null ) {
      console.log( 'Value: ' + this.value );

      if( this._displayed === null ) {
        this._displayed = this.valueAsDate;
      }

      this._selected = this.valueAsDate;
      selected = new Date( this._selected.getTime() );
    } else {
      this._displayed = new Date();
    }

    displayed = new Date( this._displayed.getTime() );

    console.log( 'Selected: '  + selected );
    console.log( 'Selected UTC: ' + ( selected === null ? 'null' : selected.toUTCString() ) );
    console.log( 'Displayed: ' + displayed );

    let formatted = new Intl.DateTimeFormat( navigator.language, {
      month: this.granularity === 'month' ? undefined : 'long',
      year: 'numeric'
    } ).format( displayed );    
    this.$label.innerText = formatted;

    let calendar = new Date(
      displayed.getFullYear(),
      displayed.getMonth(),
      1
    );
    calendar.setDate( calendar.getDate() - calendar.getDay() );    
    
    for( let d = 0; d < 42; d++ ) {
      this.$calendar.children[d].innerText = calendar.getDate();
      this.$calendar.children[d].setAttribute( 'data-year', calendar.getFullYear() );
      this.$calendar.children[d].setAttribute( 'data-month', calendar.getMonth() );
      this.$calendar.children[d].setAttribute( 'data-date', calendar.getDate() );

      if(
        calendar.getUTCFullYear() === displayed.getUTCFullYear() &&
        calendar.getUTCMonth() === displayed.getUTCMonth()
      ) {
        this.$calendar.children[d].classList.remove( 'outside' );
      } else {
        this.$calendar.children[d].classList.add( 'outside' );
      }

      if(
        calendar.getUTCFullYear() === today.getUTCFullYear() &&
        calendar.getUTCMonth() === today.getUTCMonth() &&
        calendar.getUTCDate() === today.getUTCDate()
      ) {
        this.$calendar.children[d].classList.add( 'today' );
      } else {
        this.$calendar.children[d].classList.remove( 'today' );
      }

      if( selected === null ) {
        this.$calendar.children[d].classList.remove( 'selected' );
      } else {
        if(
          calendar.getUTCFullYear() === selected.getUTCFullYear() &&
          calendar.getUTCMonth() === selected.getUTCMonth() &&
          calendar.getUTCDate() === selected.getUTCDate()
        ) {
          this.$calendar.children[d].classList.add( 'selected' );
        } else {
          this.$calendar.children[d].classList.remove( 'selected' );
        }
      }  
      
      if( this.isDateEnabled === null ) {
        this.$calendar.children[d].disabled = false;
      } else {
        this.$calendar.children[d].disabled = !this.isDateEnabled( calendar );
      }      

      calendar.setDate( calendar.getDate() + 1 );      
    }

    // Months
    formatted = new Intl.DateTimeFormat( navigator.language, {
      month: 'short'
    } );    

    calendar = new Date(
      displayed.getFullYear(),
      0
    );

    for( let m = 0; m < 12; m++ ) {    
      this.$months.children[m].innerText = formatted.format( calendar )
      this.$months.children[m].setAttribute( 'data-year', calendar.getFullYear() );
      this.$months.children[m].setAttribute( 'data-month', calendar.getMonth() );

      if(
        calendar.getFullYear() === today.getFullYear() &&
        calendar.getMonth() === today.getMonth()
      ) {
        this.$months.children[m].classList.add( 'today' );
      } else {
        this.$months.children[m].classList.remove( 'today' );
      }

      if( selected === null ) {
        this.$months.children[m].classList.remove( 'selected' );
      } else {
        if(
          calendar.getFullYear() === selected.getFullYear() &&
          calendar.getMonth() === selected.getMonth()
        ) {
          this.$months.children[m].classList.add( 'selected' );
        } else {
          this.$months.children[m].classList.remove( 'selected' );
        }
      }        

      calendar.setMonth( calendar.getMonth() + 1 );      
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
    this._upgrade( 'granularity' );                    
    this._upgrade( 'hidden' );                
    this._upgrade( 'isDateEnabled' );            
    this._upgrade( 'startOfWeek' );                
    this._upgrade( 'value' );            
    this._upgrade( 'valueAsDate' );                
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'granularity',
      'hidden',
      'start-of-week',
      'value'
    ];
  }

  // Observed tag attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  }

  // Properties
  // Not reflected
  get isDateEnabled() {
    return this._enabled;
  }

  set isDateEnabled( value ) {
    this._enabled = value;
    this._render();
  }

  get valueAsDate() {
    return this.value === null ? null : new Date( this.value );
  }

  set valueAsDate( value ) {  
    if( value === null ) {
      this.value = null;
    } else {
      const iso = value.toISOString();
      const index = iso.indexOf( 'T' );
      this.value = iso.substring( 0, index );
    }
  }

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get granularity() {
    if( this.hasAttribute( 'granularity' ) ) {
      return this.getAttribute( 'granularity' );
    }

    return null;
  }

  set granularity( value ) {
    if( value !== null ) {
      this.setAttribute( 'granularity', value );
    } else {
      this.removeAttribute( 'granularity' );
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

  get startOfWeek() {
    if( this.hasAttribute( 'start-of-week' ) ) {
      return parseInt( this.getAttribute( 'start-of-week' ) );
    }

    return null;
  }

  set startOfWeek( value ) {
    if( value !== null ) {
      this.setAttribute( 'start-of-week', value );
    } else {
      this.removeAttribute( 'start-of-week' );
    }
  }          

  get value() {
    if( this.hasAttribute( 'value' ) ) {
      return this.getAttribute( 'value' );
    }

    return null;
  }

  set value( value ) {
    if( value !== null ) {
      this.setAttribute( 'value', value );
    } else {
      this.removeAttribute( 'value' );
    }
  }  
}

window.customElements.define( 'rf-calendar', RFCalendar );
