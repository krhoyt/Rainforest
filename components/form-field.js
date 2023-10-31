export default class RainforestFormField extends HTMLElement {
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

        div[part=label] {
          color: #000716;
          display: none;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;          
          font-size: 14px;
          font-weight: 700;
          line-height: 20px;
          margin: 0 8px 0 0;
          padding: 0;
          text-rendering: optimizeLegibility;
        }

        div[part=description] {
          color: #5f6b7a;
          display: none;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;          
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
          margin: 0;
          padding: 0;
          text-rendering: optimizeLegibility;
        }        

        div[part=info] {
          border-left: solid 2px #e9ebed;
          color: #000716;
          display: none;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;          
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin: 0;
          padding: 0 0 0 8px;
          text-rendering: optimizeLegibility;
        }                

        div[part=constraint] {
          color: #5f6b7a;
          display: none;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;          
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
          margin: 0;
          padding: 4px 0 0 0;
          text-rendering: optimizeLegibility;
        }

        div[part=content] {
          padding: 4px 0 0 0;
        }

        div[part=error] {
          align-items: center;
          display: none;
          flex-direction: row;
          padding: 4px 0 0 0;
        }

        div[part=error] div {
          color: #d91515;
          display: inline-block;
          font-family: 'Open Sans', 'Helvetica Neue', Roboto, Arial, sans-serif;          
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;
          margin: 0 0 0 4px;
          padding: 0;
          text-rendering: optimizeLegibility;          
        }

        div[part=secondary] {
          display: none;
          padding: 20px 0 0 0;
        }

        img {
          display: inline-block;
          filter: 
            brightness( 0 ) 
            saturate( 100% ) 
            invert( 13% ) 
            sepia( 71% ) 
            saturate( 5970% ) 
            hue-rotate( 356deg ) 
            brightness( 98% ) 
            contrast( 93% );
          height: 16px;
          width: 16px;
        }

        .empty {
          display: none;
        }
      </style>
      <div part="summary">
        <div part="label">
          <slot name="label"></slot>        
        </div>
        <div part="info">
          <slot name="info"></slot>
        </div>
      </div>
  
      <div part="description">
        <slot name="description"></slot>
      </div>

      <div part="content">
        <slot></slot>
      </div>

      <div part="error">
        <img src="../icons/status-warning.svg" />      
        <div>
          <slot name="error-text"></slot>
        </div>
      </div>

      <div part="constraint">
        <slot name="constraint-text"></slot>
      </div>

      <div part="secondary">
        <slot name="secondary-control"></slot>
      </div>      
    `;

    // Root
    this.attachShadow( {mode: 'open'} );
    this.shadowRoot.appendChild( template.content.cloneNode( true ) );

    // Elements
    this.$constraintPart = this.shadowRoot.querySelector( 'div[part=constraint]' );
    this.$constraint = this.shadowRoot.querySelector( 'slot[name=constraint-text]' );
    this.$constraint.addEventListener( 'slotchange', ( evt ) => {
      this.$constraintPart.style.display = evt.target.assignedNodes().length === 0 ? 'none' : 'inline-block';
    } );    
    
    this.$descriptionPart = this.shadowRoot.querySelector( 'div[part=description]' );
    this.$description = this.shadowRoot.querySelector( 'slot[name=description]' );
    this.$description.addEventListener( 'slotchange', ( evt ) => {
      this.$descriptionPart.style.display = evt.target.assignedNodes().length === 0 ? 'none' : 'inline-block';
    } );    
    
    this.$infoPart = this.shadowRoot.querySelector( 'div[part=info]' );
    this.$info = this.shadowRoot.querySelector( 'slot[name=info]' );
    this.$info.addEventListener( 'slotchange', ( evt ) => {
      this.$infoPart.style.display = evt.target.assignedNodes().length === 0 ? 'none' : 'inline-block';
    } );    
    
    this.$labelPart = this.shadowRoot.querySelector( 'div[part=label]' );
    this.$label = this.shadowRoot.querySelector( 'slot[name=label]' );
    this.$label.addEventListener( 'slotchange', ( evt ) => {
      this.$labelPart.style.display = evt.target.assignedNodes().length === 0 ? 'none' : 'inline-block';
    } );        

    this.$errorPart = this.shadowRoot.querySelector( 'div[part=error]' );
    this.$error = this.shadowRoot.querySelector( 'slot[name=error-text]' );
    this.$error.addEventListener( 'slotchange', ( evt ) => {
      this.$errorPart.style.display = evt.target.assignedNodes().length === 0 ? 'none' : 'flex';
    } );

    this.$secondaryPart = this.shadowRoot.querySelector( 'div[part=secondary]' );
    this.$secondary = this.shadowRoot.querySelector( 'slot[name=secondary-control]' );
    this.$secondary.addEventListener( 'slotchange', ( evt ) => {
      this.$secondaryPart.style.display = evt.target.assignedNodes().length === 0 ? 'none' : 'block';
    } );    
  }

  // When things change
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
    // this._upgrade( 'label' );                
    this._render();
  }

  // Watched attributes
  static get observedAttributes() {
    return [];
  }

  // Observed tag attribute has changed
  // Update render
  attributeChangedCallback( name, old, value ) {
    this._render();
  }
}

window.customElements.define( 'rf-form-field', RainforestFormField );
