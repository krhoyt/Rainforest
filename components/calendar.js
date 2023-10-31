export default class RainforestCalendar extends HTMLElement {
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

        div[part=controls] button img {     
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 28% )
            sepia( 2% )
            saturate( 4631% )
            hue-rotate( 174deg )
            brightness( 98% )
            contrast( 91% );    
          height: 20px; 
          object-fit: contain;    
          width: 16px;
        }

        div[part=controls] button:hover img {     
          filter: 
            brightness( 0 ) 
            saturate( 100% ) 
            invert( 6% ) 
            sepia( 15% ) 
            saturate( 2967% ) 
            hue-rotate( 174deg ) 
            brightness( 92% ) 
            contrast( 109% );
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

        div[part=calendar] button.today {        
          background-color: #f4f4f4;
          border-color: #f4f4f4;
          font-weight: 700;
        }
        
        div[part=calendar] button.today:hover {
          border-color: #7d8998;          
        }        

        div[part=calendar] button.today.outside:hover {
          background-color: #f4f4f4;          
          border-color: transparent;
        }

        div[part=calendar] button.selected:hover,
        div[part=calendar] button.selected {        
          background-color: #0972d3;
          border-color: #0972d3;
          color: #ffffff;
          font-weight: 700;
        }        

        div[part=calendar] button[disabled]:hover {
          background-color: transparent;
          border-color: transparent;
        }

        div[part=calendar] button[disabled] {
          color: #9ba7b6;
          cursor: not-allowed;
        }        
      </style>
      <div part="controls">
        <button part="left" type="button">
          <img src="../icons/angle-left.svg" />
        </button>
        <p part="month"></p>
        <button part="right" type="button">
          <img src="../icons/angle-right.svg" />        
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
    `;

    // Private
    this._displayed = new Date();
    this._enabled = null;
    this._selected = null;    

    // Events
    this.onDateClick = this.onDateClick.bind( this );
    
    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$calendar = this.shadowRoot.querySelector( 'div[part=calendar]' );
    this.$left = this.shadowRoot.querySelector( 'button[part=left]' );
    this.$left.addEventListener( 'click', () => {
      let month = this._displayed.getMonth();
      let year = this._displayed.getFullYear();
  
      year = ( month === 0 ) ? year - 1 : year;
      month = ( month === 0 ) ? 11 : month - 1;
  
      this._displayed = new Date(
        year,
        month,
        this._displayed.getDate()
      );
      this._render();
    } );
    this.$month = this.shadowRoot.querySelector( 'p[part=month]' );   
    this.$right = this.shadowRoot.querySelector( 'button[part=right]' );     
    this.$right.addEventListener( 'click', () => {
      let month = this._displayed.getMonth();
      let year = this._displayed.getFullYear();
  
      year = ( month === 11 ) ? year + 1 : year;
      month = ( month + 1 ) % 12;
  
      this._displayed = new Date(
        year,
        month,
        this._displayed.getDate()
      );
      this._render();
    } );
  }

  onDateClick( evt ) {
    const selected = new Date(
      evt.currentTarget.getAttribute( 'data-year' ),
      evt.currentTarget.getAttribute( 'data-month' ),
      evt.currentTarget.getAttribute( 'data-date' )
    );

    if( selected.getMonth() !== this._displayed.getMonth() ) {
      this._displayed = new Date( selected.getTime() );
    }

    this._selected = new Date( selected.getTime() );
    this.value = 
      this._selected.getFullYear() + '-' +
      ( this._selected.getMonth() + 1 ).toString( 10 ).padStart( 2, '0' ) + '-' +
      this._selected.getDate().toString( 10 ).padStart( 2, '0' );      

    this.dispatchEvent( new CustomEvent( 'rf-change', {
      detail: {
        value: this.value
      }
    } ) );
  }
  
  // When things change
  _render() {
    while( this.$calendar.children.length < 42 ) {
      const date = document.createElement( 'button' );
      date.addEventListener( 'click', this.onDateClick );
      this.$calendar.appendChild( date );
    }


    if( this._selected !== null ) {
      const match = 
        this._selected.getFullYear() + '-' +
        ( this._selected.getMonth() + 1 ).toString( 10 ).padStart( 2, '0' ) + '-' +
        this._selected.getDate().toString( 10 ).padStart( 2, '0' );

      if( this.value !== null ) {
        if( match !== this.value ) {
          this._displayed = new Date( Date.UTC( this.value ) );
          this._selected = new Date( Date.UTC( this.value ) );
        }
      }
    } else {
      if( this.value !== null ) {
        this._displayed = new Date( this.value );
        this._selected = new Date( this.value );
      }
    }

    console.log( this._selected );

    const displayed = this._displayed === null ? new Date() : new Date( this._displayed );
    const selected = this._selected === null ? null : new Date( this._selected.getTime() );
    const today = new Date();

    /*
    let displayed = this._displayed === null ? new Date() : new Date( this._displayed );
    if( this.value !== null ) {
      this._displayed = new Date( this.value );
      displayed = new Date( this.value );
    }

    const selected = this.value === null ? null : new Date( this.value );
    console.log( selected );
    const today = new Date();    
    */

    const formatted = new Intl.DateTimeFormat( navigator.language, {
      month: 'long',
      year: 'numeric'
    } ).format( displayed );    
    this.$month.innerText = formatted;

    const calendar = new Date(
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
        calendar.getFullYear() === displayed.getFullYear() &&
        calendar.getMonth() === displayed.getMonth()
      ) {
        this.$calendar.children[d].classList.remove( 'outside' );
      } else {
        this.$calendar.children[d].classList.add( 'outside' );
      }

      if(
        calendar.getFullYear() === today.getFullYear() &&
        calendar.getMonth() === today.getMonth() &&
        calendar.getDate() === today.getDate()
      ) {
        this.$calendar.children[d].classList.add( 'today' );
      } else {
        this.$calendar.children[d].classList.remove( 'today' );
      }

      if( selected === null ) {
        this.$calendar.children[d].classList.remove( 'selected' );
      } else {
        if(
          calendar.getFullYear() === selected.getFullYear() &&
          calendar.getMonth() === selected.getMonth() &&
          calendar.getDate() === selected.getDate()
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
    this._upgrade( 'isDateEnabled' );            
    this._upgrade( 'startOfWeek' );                
    this._upgrade( 'value' );            
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
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

  // Attributes
  // Reflected
  // Boolean, Number, String, null
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

window.customElements.define( 'rf-calendar', RainforestCalendar );
