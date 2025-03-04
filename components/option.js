export default class RFOption extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' );
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: block;
          overflow: hidden;      
          position: relative;
        }

        div[part=tags] {
          gap: 16px;
        }

        div.hbox {
          display: flex;
          flex-direction: row;
        }

        div.vbox {
          display: flex;
          flex-basis: 0;
          flex-direction: column;
          flex-grow: 1;
          min-width: 0;
        }        

        img {
          cursor: pointer;
          height: 16px;
          padding: 0;
          margin: 0;
          width: 16px;
        }

        img[part=icon] {
          align-self: flex-start;          
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 4% )
            sepia( 18% )
            saturate( 6831% )
            hue-rotate( 197deg )
            brightness( 91% )
            contrast( 104% );
          height: 32px;
          padding: 0 8px 0 0;
          width: 32px;
        }

        img[part=check] {
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 34% )
            sepia( 90% )
            saturate( 4589% )
            hue-rotate( 195deg )
            brightness( 94% )
            contrast( 93% );
          margin: 0 8px 0 8px;
          visibility: hidden;
        }

        li {
          align-items: center;
          border: solid 2px transparent;
          border-radius: 6px;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          flex-direction: row;
          margin: 0;
          padding: 3px 0 2px 12px;
        }

        li:hover {
          background-color: #f4f4f5;          
          border: solid 2px #7c889c;
        }

        p {
          color: #000716;
          cursor: pointer;
          font-family: 'Open Sans', sans-serif;
          font-size: 14px;
          line-height: 20px;
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;
          white-space: nowrap;
        }

        p[part=label] {
          flex-basis: 0;
          flex-grow: 1;
          overflow: hidden;
          text-align: left;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        div[part=tags] p,
        p[part=description] {
          color: #5f6b7a;
          font-size: 12px;
          line-height: 16px;
          text-align: left;
        }

        :host( [invalid] ) img {
          filter: 
            brightness( 0 )
            saturate( 100% )
            invert( 16% )
            sepia( 60% )
            saturate( 6464% )
            hue-rotate( 357deg )
            brightness( 89% )
            contrast( 90% );         
        }
        :host( [invalid] ) p[part=label],
        :host( [invalid] ) p[part=tag] {
          color: #d91515;
        }

        :host( [selected] ) li {
          background-color: #f1f8ff;
          border: solid 2px #0972d3;
        }

        :host( [selected] ) li img {        
          visibility: visible;
        } 

        :host( :not( [label-tag] ) ) p[part=tag],
        :host( :not( [description] ) ) p[part=description],
        :host( :not( [icon-name] ) ) img[part=icon] { display: none; }

        :host( [icon-name]:not( [description] ) ) img[part=icon] {
          align-self: center;
          height: 16px;
          width: 16px;
        }

        :host( [disabled] ) img {
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
        :host( [disabled] ) li {
          cursor: not-allowed;
        }
        :host( [disabled] ) p[part=label],
        :host( [disabled] ) p[part=tag],
        :host( [disabled] ) p[part=description],
        :host( [disabled] ) div[part=tags] p {
          color: #9ba7b6;
          cursor: not-allowed;
        }
      </style>
      <li part="item">
        <img part="icon" />
        <div class="vbox">
          <div class="hbox">
            <p part="label"></p>          
            <p part="tag"></p>
          </div>
          <p part="description"></p>
          <div class="hbox" part="tags"></div>
        </div>
        <img part="check" src="../icons/check.svg" />        
      </li>
    `;

    // Private
    this._tags = [];

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$description = this.shadowRoot.querySelector( 'p[part=description]' );    
    this.$icon = this.shadowRoot.querySelector( 'img[part=icon]' );
    this.$label = this.shadowRoot.querySelector( 'p[part=label]' );
    this.$tag = this.shadowRoot.querySelector( 'p[part=tag]' );
    this.$tags = this.shadowRoot.querySelector( 'div[part=tags]' );
  }

  // When things change
  _render() {
    this.$icon.src = this.iconName === null ? '' : `../icons/${this.iconName}.svg`;     
    this.$label.innerText = this.label === null ? '' : this.label;    
    this.$tag.innerText = this.labelTag === null ? '' : this.labelTag;   
    this.$description.innerText = this.description === null ? '' : this.description;
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
    this._upgrade( 'disabled' );
    this._upgrade( 'iconName' );               
    this._upgrade( 'invalid' );               
    this._upgrade( 'label' );      
    this._upgrade( 'labelTag' );      
    this._upgrade( 'selected' );               
    this._upgrade( 'tags' );                
    this._upgrade( 'value' );               
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'description',
      'disabled',
      'icon-name',
      'invalid',
      'label',
      'label-tag',
      'selected',
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
  // Array, Date, Object, null 
  get tags() {
    return this._tags.length === 0 ? null : this._tags;
  }

  set tags( value ) {
    this._tags = value === null ? [] : [... value];

    this.$tags.style.display = this._tags.length === 0 ? 'none' : 'flex';

    while( this.$tags.children.length > this._tags.length ) {
      this.$tags.children[0].remove();
    }

    while( this.$tags.children.length < this._tags.length ) {
      const paragraph = document.createElement( 'p' );
      this.$tags.appendChild( paragraph );
    }

    for( let t = 0; t < this._tags.length; t++ ) {
      this.$tags.children[t].innerText = this._tags[t];
    }
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

  get iconName() {
    if( this.hasAttribute( 'icon-name' ) ) {
      return this.getAttribute( 'icon-name' );
    }

    return null;
  }

  set iconName( value ) {
    if( value !== null ) {
      this.setAttribute( 'icon-name', value );
    } else {
      this.removeAttribute( 'icon-name' );
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

  get label() {
    if( this.hasAttribute( 'label' ) ) {
      return this.getAttribute( 'label' );
    }

    return null;
  }

  set label( value ) {
    if( value !== null ) {
      this.setAttribute( 'label', value );
    } else {
      this.removeAttribute( 'label' );
    }
  }     
  
  get labelTag() {
    if( this.hasAttribute( 'label-tag' ) ) {
      return this.getAttribute( 'label-tag' );
    }

    return null;
  }

  set labelTag( value ) {
    if( value !== null ) {
      this.setAttribute( 'label-tag', value );
    } else {
      this.removeAttribute( 'label-tag' );
    }
  }       

  get selected() {
    return this.hasAttribute( 'selected' );
  }

  set selected( value ) {
    if( value !== null ) {
      if( typeof value === 'boolean' ) {
        value = value.toString();
      }

      if( value === 'false' ) {
        this.removeAttribute( 'selected' );
      } else {
        this.setAttribute( 'selected', '' );
      }
    } else {
      this.removeAttribute( 'selected' );
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

window.customElements.define( 'rf-option', RFOption );
