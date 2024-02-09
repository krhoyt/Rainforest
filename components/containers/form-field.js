import RainforestHBox from "./hbox.js";
import RainforestVBox from "./vbox.js";

import RainforestLabel from "../controls/label.js";
import RainforestStatusIndicator from "../controls/status-indicator.js";

export default class RainforestFormField extends HTMLElement {
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

        rf-label[part=constraint] {
          padding: 4px 0 0 0;
        }

        rf-label[part=count] {
          align-self: flex-end;
          padding: 0 0 4px 0;
        }

        rf-label[part=description] {
          padding: 0 0 4px 0;
        }

        rf-label[part=optional]::part( label ) {
          font-style: italic;
          margin: 0 0 0 4px;
          text-transform: lowercase;
        }

        rf-status-indicator {
          padding: 4px 0 0 0;
        }

        rf-label[part=count]::part( label ),
        rf-status-indicator::part( p ) {
          font-size: 12px;
        }        

        rf-vbox {
          flex-basis: 0;
          flex-grow: 1;
        }

        ::slotted( rf-link ) {
          margin: 0 0 0 8px;
        }

        :host( :not( [constraint] ) ) rf-label[part=constraint] { display: none; }                
        :host( :not( [description] ) ) rf-label[part=description] { display: none; }        
        :host( :not( [description] ) ) rf-label[part=label] { padding: 0 0 4px 0; }
        :host( :not( [error] ) ) rf-status-indicator { display: none; }
        :host( :not( [label] ) ) rf-label[part=label] { display: none; }        
        :host( :not( [optional] ) ) rf-label[part=optional] { display: none; }                        
      </style>
      <rf-hbox>
        <rf-vbox>
          <rf-hbox>
            <rf-label exportparts="label: label-p" font-weight="bold" part="label"></rf-label>
            <rf-label exportparts="label: optional-p" font-weight="bold" part="optional"></rf-label>
            <slot name="info"></slot>
          </rf-hbox>
          <rf-label color="text-status-inactive" exportparts="label: description-p" font-size="body-s" part="description"></rf-label>
        </rf-vbox>
        <rf-label color="text-status-inactive" exportparts="label: count-p" font-size="body-s" part="count"></rf-label>        
      </rf-hbox>
      <slot></slot>
      <rf-status-indicator type="error"></rf-status-indicator>
      <rf-label color="text-status-inactive" exportparts="label: constraint-p" font-size="body-s" part="constraint"></rf-label>
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$constraint = this.shadowRoot.querySelector( 'rf-label[part=constraint]' );
    this.$count = this.shadowRoot.querySelector( 'rf-label[part=count]' );
    this.$description = this.shadowRoot.querySelector( 'rf-label[part=description]' );
    this.$error = this.shadowRoot.querySelector( 'rf-status-indicator' );
    this.$label = this.shadowRoot.querySelector( 'rf-label[part=label]' );
    this.$optional = this.shadowRoot.querySelector( 'rf-label[part=optional]' );
  }

  // When things change
  _render() {
    this.$label.text = this.label;
    this.$optional.text = '- ' + this.optional;
    this.$description.text = this.description;
    this.$count.text = this.count;
    this.$error.label = this.error;
    this.$constraint.text = this.constraint;
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

window.customElements.define( 'rf-form-field', RainforestFormField );
