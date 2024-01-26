import RainforestSelectOption from "./select-option.js";

export default class RainforestSelect extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
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

        button {
          align-items: center;
          background: none;
          background-color: #ffffff;
          border: none;
          border: solid 2px #7d8998;
          border-radius: 8px;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          margin: 0;
          min-height: 32px;
          min-width: 0;
          padding: 0;
          position: relative;
          width: 100%;
        }

        button:focus {
          border: solid 2px #0972d3;          
        }

        img {
          cursor: pointer;
          height: 16px;
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 34% )
            sepia( 90% )
            saturate( 4589% )
            hue-rotate( 195deg )
            brightness( 94% )
            contrast( 93% );
          padding: 0;
          margin: 0 8px 0 8px;
          transition: transform 150ms ease-out;
          width: 16px;          
        }

        img.open {
          transform: rotate( 180deg );
        }

        button:hover img {
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 15% )
            sepia( 77% )
            saturate( 1807% )
            hue-rotate( 192deg )
            brightness( 85% )
            contrast( 102% );
        }

        rf-select-option {
          flex-basis: 0;
          flex-grow: 1;
        }

        rf-select-option::part( check ) {
          display: none;
        }

        rf-select-option::part( item ) {
          padding: 2px 0 2px 12px;          
        }
        
        rf-select-option::part( item ):hover {
          background: none;
          border: solid 2px transparent;
        }

        p {
          box-sizing: border-box;
          color: #000716;          
          cursor: pointer;
          display: inline-block;
          flex-basis: 0;
          flex-grow: 1;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          line-height: 20px;
          margin: 0;
          overflow: hidden;
          padding: 0 0 0 12px;
          text-align: left;
          text-rendering: optimizeLegibility;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }

        p[part=placeholder] {
          color: #5f6b7a;                    
          font-style: italic;   
        }

        :host( [disabled] ) button {
          background-color: #e9ebed;
          border: solid 2px #e9ebed;
          cursor: not-allowed;
        }

        :host( [disabled] ) img[part=caret] {
          cursor: not-allowed;
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 71% )
            sepia( 16% )
            saturate( 277% )
            hue-rotate( 173deg )
            brightness( 92% )
            contrast( 85% );
        }

        :host( [disabled] ) p {
          cursor: not-allowed;
        }

        :host( [invalid] ) button {
          border-color: #d91515;
          border-left-width: 8px;
        }        

        :host( [invalid] ) p[part=value] {
          color: #d91515;
          padding: 0 0 0 7px;
        }                

        :host( [invalid] ) rf-select-option::part( item ) {
          padding: 2px 0 2px 4px;
        }                

        :host( [selected-index] ) p[part=placeholder],
        :host( :not( [placeholder] ) ) p[part=placeholder] {
          display: none;
        }


        :host( [placeholder]:not( [selected-index] ) ) p[part=value],
        :host( [placeholder]:not( [selected-index] ) ) rf-select-option {
          display: none;
        }

        :host( :not( [placeholder] ):not( [selected-index] ) ) rf-select-option {
          visibility: hidden;
        }

        :host( [selected-index] ) rf-select-option {
          visibility: visible;
        }

        :host( [trigger-variant=option] ) p[part=value] {
          display: none;
        }        
        :host( [trigger-variant=option] ) rf-select-option {
          display: flex;
        }
        :host( [trigger-variant=label] ) rf-select-option,
        :host( :not( [trigger-variant] ) ) rf-select-option {
          display: none;
        }
      </style>
      <button part="select" type="button">
        <p part="placeholder"></p>
        <p part="value"></p>
        <rf-select-option></rf-select-option>
        <img part="caret" src="../icons/caret-down-filled.svg" />
      </button>
    `;

    // Private
    this._list = null;
    this._options = [];    

    // Events
    this.onItemClick = this.onItemClick.bind( this );

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$caret = this.shadowRoot.querySelector( 'img[part=caret]' );
    this.$placeholder = this.shadowRoot.querySelector( 'p' );
    this.$select = this.shadowRoot.querySelector( 'button' );
    /*
    document.addEventListener( 'click', ( evt ) => {      
      if( evt.target !== this && evt.target.parentElement !== this._list ) {
        this._list.style.display = 'none';
        this.$caret.classList.remove( 'open' );
      }
    } );
    */
    this.$select.addEventListener( 'click', () => {
      if( this.disabled ) return;

      if( this._list.style.display === 'none' || this._list.style.display === '' ) {
        const bounds = this.$select.getBoundingClientRect();
        this._list.style.display = 'inline-block';

        if( ( bounds.top + bounds.height + this._list.clientHeight ) > window.innerHeight ) {
          this._list.style.top = `${bounds.top - this._list.clientHeight - 6}px`;
        } else {
          this._list.style.top = `${bounds.top + bounds.height + 2}px`;  
        }

        this._list.style.width = `${bounds.width - 4}px`;        
        this._list.style.left = `${bounds.x}px`;
        this.$caret.classList.add( 'open' );        
      } else {
        this._list.style.display = 'none';
        this.$caret.classList.remove( 'open' );        
      }
    } );
    this.$option = this.shadowRoot.querySelector( 'rf-select-option' );
    this.$value = this.shadowRoot.querySelector( 'p[part=value]' );
  }

  blur() {
    this.$select.blur();
    this._list.style.display = 'none';
  }

  focus() {
    this.$select.focus();
  }

  onItemClick( evt ) {
    this._list.style.display = 'none';
    this.$caret.classList.remove( 'open' );

    const index = parseInt( evt.currentTarget.getAttribute( 'data-index' ) );
    
    if( this.toggle ) {
      this.selectedIndex = this.selectedIndex === index ? null : index;
    } else {
      this.selectedIndex = index;
    }

    this.focus();
    this.dispatchEvent( new CustomEvent( 'rf-change', {
      detail: {
        selectedOption: this.selectedIndex === null ? null : this._options[this.selectedIndex]
      }
    } ) );
  }

  // When things change
  _render() {
    this.$placeholder.innerText = this.placeholder === null ? '' : this.placeholder;

    this.$value.disabled = this.disabled;
    this.$value.invalid = this.invalid;

    this.$option.disabled = this.disabled;
    this.$option.invalid = this.invalid;    

    if( this.selectedIndex === null ) {
      this.$value.innerText = '';
      this.$option.iconName = null;
      this.$option.label = null;
      this.$option.labelTag = null;
      this.$option.description = null;
      this.$option.value = null;
      this.$option.tags = null;
    } else {
      this.$value.innerText = this._options[this.selectedIndex].hasOwnProperty( 'label' ) ? this._options[this.selectedIndex].label: '';
      this.$option.iconName = this._options[this.selectedIndex].hasOwnProperty( 'iconName' ) ? this._options[this.selectedIndex].iconName : null;      
      this.$option.label = this._options[this.selectedIndex].hasOwnProperty( 'label' ) ? this._options[this.selectedIndex].label : null;
      this.$option.labelTag = this._options[this.selectedIndex].hasOwnProperty( 'labelTag' ) ? this._options[this.selectedIndex].labelTag : null;
      this.$option.description = this._options[this.selectedIndex].hasOwnProperty( 'description' ) ? this._options[this.selectedIndex].description : null;      
      this.$option.value = this._options[this.selectedIndex].hasOwnProperty( 'value' ) ? this._options[this.selectedIndex].value : null;      
      this.$option.tags = this._options[this.selectedIndex].hasOwnProperty( 'tags' ) ? this._options[this.selectedIndex].tags : null;
    }   
    
    if( this._list !== null ) {
      for( let c = 0; c < this._list.children[0].children.length; c++ ) {
        this._list.children[0].children[c].selected = c === this.selectedIndex ? true : false;      
      }    
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
    if( this._list === null ) {
      this._list = document.createElement( 'div' );
      this._list.classList.add( 'select' );
      const items = document.createElement( 'ul' );
      this._list.appendChild( items );
      document.body.appendChild( this._list ); 
    }

    this._upgrade( 'disabled' );
    this._upgrade( 'hidden' );    
    this._upgrade( 'invalid' );
    this._upgrade( 'options' );
    this._upgrade( 'placeholder' ); 
    this._upgrade( 'selectedIndex' );  
    this._upgrade( 'selectedOption' );  
    this._upgrade( 'toggle' );      
    this._upgrade( 'triggerVariant' );  
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'disabled',
      'hidden',
      'invalid',
      'placeholder',
      'selected-index',
      'toggle',
      'trigger-variant'
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
  get options() {
    return this._options.length === 0 ? null : this._options;
  }

  set options( value ) {
    this._options = value === null ? [] : [... value];

    while( this._list.children[0].children.length > this._options.length ) {
      this._list.children[0].children[0].removeEventListener( 'click', this.onItemClick );
      this._list.children[0].children[0].remove();
    }

    while( this._list.children[0].children.length < this._options.length ) {
      const item = document.createElement( 'rf-select-option' );
      item.addEventListener( 'click', this.onItemClick );
      this._list.children[0].appendChild( item );
    }    

    for( let c = 0; c < this._list.children[0].children.length; c++ ) {
      this._list.children[0].children[c].setAttribute( 'data-index', c );
      this._list.children[0].children[c].iconName = this._options[c].hasOwnProperty( 'iconName' ) ? this._options[c].iconName : null;      
      this._list.children[0].children[c].label = this._options[c].hasOwnProperty( 'label' ) ? this._options[c].label : null;
      this._list.children[0].children[c].labelTag = this._options[c].hasOwnProperty( 'labelTag' ) ? this._options[c].labelTag : null;
      this._list.children[0].children[c].description = this._options[c].hasOwnProperty( 'description' ) ? this._options[c].description : null;      
      this._list.children[0].children[c].value = this._options[c].hasOwnProperty( 'value' ) ? this._options[c].value : null;      
      this._list.children[0].children[c].tags = this._options[c].hasOwnProperty( 'tags' ) ? this._options[c].tags : null;      
    }
  }  

  get selectedOption() {
    return this.selectedIndex === null ? null : this._options[this.selectedIndex];
  }

  set selectedOption( value ) {
    if( value === null ) {
      this.selectedIndex = null;
    } if( this._options.length === 0 ) {
      this.selectedIndex = null;
    } else {
      const keys1 = Object.keys( value );

      for( let i = 0; i < this._options.length; i++ ) {
        const keys2 = Object.keys( this._options[i] );        
        if( this.shallowEqual( keys1, keys2, true ) ) {
          this.selectedIndex = i;
          break;
        } 
      }
    }
  }

  // ATTRIBUTION: https://dmitripavlutin.com/how-to-compare-objects-in-javascript/
  shallowEqual( object1, object2, keys = false ) {
    let keys1 = null;
    let keys2 = null;

    if( keys ) {
      keys1 = object1;
      keys2 = object2;
    } else {
      keys1 = Object.keys( object1 );
      keys2 = Object.keys( object2 );
    }
  
    for( const k of keys1 ) if( !keys2.includes( k ) ) return false;
    for( const k of keys2 ) if( !keys1.includes( k ) ) return false;
    for( const key of keys1 ) if( object1[key] !== object2[key] ) return false;
  
    return true;
  }  

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get disabled() {
    return this.hasAttribute( 'disabled' );
  }

  set disabled( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'disabled' );
      } else {
        this.setAttribute( 'disabled', '' );
      }
    } else {
      this.removeAttribute( 'disabled' );
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

  get invalid() {
    return this.hasAttribute( 'invalid' );
  }

  set invalid( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'invalid' );
      } else {
        this.setAttribute( 'invalid', '' );
      }
    } else {
      this.removeAttribute( 'invalid' );
    }
  }    

  get placeholder() {
    if( this.hasAttribute( 'placeholder' ) ) {
      return this.getAttribute( 'placeholder' );
    }

    return null;
  }

  set placeholder( value ) {
    if( value !== null ) {
      this.setAttribute( 'placeholder', value );
    } else {
      this.removeAttribute( 'placeholder' );
    }
  }  

  get selectedIndex() {
    if( this.hasAttribute( 'selected-index' ) ) {
      return parseInt( this.getAttribute( 'selected-index' ) );
    }

    return null;
  }

  set selectedIndex( value ) {
    if( value !== null ) {
      this.setAttribute( 'selected-index', value );
    } else {
      this.removeAttribute( 'selected-index' );
    }
  }  

  get toggle() {
    return this.hasAttribute( 'toggle' );
  }

  set toggle( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'toggle' );
      } else {
        this.setAttribute( 'toggle', '' );
      }
    } else {
      this.removeAttribute( 'toggle' );
    }
  }  

  get triggerVariant() {
    if( this.hasAttribute( 'trigger-variant' ) ) {
      return this.getAttribute( 'trigger-variant' );
    }

    return null;
  }

  set triggerVariant( value ) {
    if( value !== null ) {
      this.setAttribute( 'trigger-variant', value );
    } else {
      this.removeAttribute( 'trigger-variant' );
    }
  }    
}

window.customElements.define( 'rf-select', RainforestSelect );
