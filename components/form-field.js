import RFStatusIndicator from "./status-indicator.js";

export default class RFFormField extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement( 'template' )
    template.innerHTML = /* template */ `
      <style>
        :host {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        :host( [hidden] ) { display: none; }

        div[part=alternate] {
          padding: 0 0 4px 0;
        }

        p {
          box-sizing: border-box;
          color: #000716;
          cursor: default;
          display: block;
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

        p[part=constraint] {
          color: #5f6b7a;
          font-size: 12px;
          line-height: 16px;
          padding: 4px 0 0 0;
        }

        p[part=count] {
          align-self: flex-end;
          font-size: 12px;          
          padding: 0 0 4px 0;
          white-space: nowrap;
        }

        p[part=description] {
          color: #5f6b7a;
          font-size: 12px;
          line-height: 16px;
          padding: 0 0 4px 0;
        }

        p[part=label] {
          font-weight: 700;
        }

        p[part=optional] {
          font-style: italic;
          font-weight: 700;
          margin: 0 0 0 4px;
          text-transform: lowercase;
        }

        rf-status-indicator {
          padding: 4px 0 0 0;
        }

        rf-status-indicator {
          --status-indicator-font-size: 12px;
        }        

        .horizontal {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          width: 100%;
        }

        .vertical {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        ::slotted( rf-link ) {
          margin: 0 0 0 8px;
        }

        :host( :not( [description] ) ) p[part=label] { padding: 0 0 4px 0; }
        :host( :has( [slot=description] ) ) p[part=label] { padding: 0; }
        :host( :not( :has( [slot=description] ) ) ) div[part=alternate] { display: none; }
        :host( :not( [constraint] ) ) p[part=constraint] { display: none; }                
        :host( :not( [description] ) ) p[part=description] { display: none; }        
        :host( :not( [error] ) ) rf-status-indicator { display: none; }
        :host( :not( [label] ) ) p[part=label] { display: none; }        
        :host( :not( [optional] ) ) p[part=optional] { display: none; }                        
      </style>
      <div class="horizontal">
        <div class="vertical">
          <div class="horizontal">
            <p part="label"></p>
            <p part="optional"></p>
            <slot name="info"></slot>
          </div>
          <div part="alternate">
            <slot name="description"></slot>
          </div>
          <p part="description"></p>
        </div>
        <p part="count"></p>        
      </div>
      <slot></slot>
      <rf-status-indicator color="red" type="warning"></rf-status-indicator>
      <p part="constraint"></p>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$constraint = this.shadowRoot.querySelector( 'p[part=constraint]' );
    this.$count = this.shadowRoot.querySelector( 'p[part=count]' );
    this.$description = this.shadowRoot.querySelector( 'p[part=description]' );
    this.$error = this.shadowRoot.querySelector( 'rf-status-indicator' );
    this.$label = this.shadowRoot.querySelector( 'p[part=label]' );
    this.$optional = this.shadowRoot.querySelector( 'p[part=optional]' );
  }

  // When things change
  _render() {
    this.$label.innerText = this.label;
    this.$optional.innerText = '- ' + this.optional;
    this.$description.innerText = this.description;
    this.$count.innerText = this.count;
    this.$error.label = this.error;
    this.$constraint.innerText = this.constraint === null ? '' : this.constraint;
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
    this._upgrade( 'constraint' );                        
    this._upgrade( 'count' );                        
    this._upgrade( 'description' );                    
    this._upgrade( 'error' );                    
    this._upgrade( 'hidden' );                
    this._upgrade( 'label' );                
    this._upgrade( 'optional' );                 
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [
      'constraint',
      'count',
      'description',
      'error',
      'hidden',
      'label',
      'optional'
    ];
  }

  // Observed tag attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  }

  // Attributes
  // Reflected
  // Boolean, Number, String, null
  get constraint() {
    if( this.hasAttribute( 'constraint' ) ) {
      return this.getAttribute( 'constraint' );
    }

    return null;
  }

  set constraint( value ) {
    if( value !== null ) {
      this.setAttribute( 'constraint', value );
    } else {
      this.removeAttribute( 'constraint' );
    }
  }   

  get count() {
    if( this.hasAttribute( 'count' ) ) {
      return this.getAttribute( 'count' );
    }

    return null;
  }

  set count( value ) {
    if( value !== null ) {
      this.setAttribute( 'count', value );
    } else {
      this.removeAttribute( 'count' );
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
  
  get error() {
    if( this.hasAttribute( 'error' ) ) {
      return this.getAttribute( 'error' );
    }

    return null;
  }

  set error( value ) {
    if( value !== null ) {
      this.setAttribute( 'error', value );
    } else {
      this.removeAttribute( 'error' );
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

  get optional() {
    if( this.hasAttribute( 'optional' ) ) {
      return this.getAttribute( 'optional' );
    }

    return null;
  }

  set optional( value ) {
    if( value !== null ) {
      this.setAttribute( 'optional', value );
    } else {
      this.removeAttribute( 'optional' );
    }
  }     
}

window.customElements.define( 'rf-form-field', RFFormField );
