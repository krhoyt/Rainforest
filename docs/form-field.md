# Form field

With the form field, users can create properly-styled controls in a form.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/form-field.js" type="module"></script>
```

## Examples

``` html
<rf-form-field>
  <span slot="label">Form field label</span>      
  <span slot="description">This is a description</span>
  <rf-input></rf-input>
</rf-form-field>
<rf-form-field>
  <span slot="label">Form field label <i>- optional</i></span>      
  <span slot="description">This is a description</span>
  <rf-input></rf-input>
</rf-form-field>
<rf-form-field>
  <span slot="label">Form field label</i></span>      
  <span slot="constraint-text">Requirements and constraints for the field.</span>
  <rf-input></rf-input>
</rf-form-field>
<rf-form-field>
  <span slot="label">Form field label</span>      
  <span slot="description">This is a description</span>
  <span slot="error-text">This is an error message.</span>
  <span slot="constraint-text">Requirements and constraints for the field.</span>      
  <rf-input invalid></rf-input>
</rf-form-field>
<rf-form-field id="field">
  <span slot="label">Name <i>- optional</i></span>      
  <span id="constraint" slot="constraint-text">The name must have 1 to 10 characters. Character count: 0/10</span>      
  <rf-input id="count"></rf-input>
</rf-form-field>    
<rf-form-field>
  <span slot="label">Form Field label</span>      
  <span slot="constraint-text">Requirements and constraints for the field.</span>
  <rf-input></rf-input>
</rf-form-field>
<rf-form-field>
  <span slot="label">Security group</span>      
  <rf-button icon-name="refresh" slot="secondary-control"></rf-button>
  <rf-input></rf-input>
</rf-form-field>
<rf-form-field>
  <span slot="label">Terms and conditions</span>
  <span slot="description">
    Please read through our
    <rf-link
      href="#"
      external="true"
      variant="primary"
      font-size="body-s">
      terms and conditions
    </rf-link>
    and agree.
  </span>
  <rf-checkbox>I agree to the terms and conditions</rf-checkbox>
</rf-form-field>
```

``` javascript
let error = null;

function createError( message ) {
  const element = document.createElement( 'span' );
  element.innerText = message;
  element.slot = 'error';
  return element;
}

const constraint = document.querySelector( '#constraint' );      
const field = document.querySelector( '#field' );
const input = document.querySelector( '#count' );
input.addEventListener( 'rf-change', ( evt ) => {
  const count = evt.detail.value.length;

  constraint.innerText = `The name must have 1 to 10 characters. Character count: ${count}/10`;
  input.invalid = count > 10 ? true : false;

  if( count > 10 ) {
    if( error === null ) {
      error = createError( 'The name has too many characters.' );
    }
    field.appendChild( error );
  } else {
    if( error !== null ) {
      error.remove();
      error = null;
    }
  }
} );
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | The primary form control (for example, input, textarea, etc.). |
| `constraint-text` | Constraint text that's displayed below the control. |
| `description` | Detailed information about the form field that's displayed below the label. |
| `error-text` | Text that displays as a validation message. |
| `info` | Use to display an 'Info' link next to the label. |
| `label` | The main label for the form field. |
| `secondary-control` | A secondary control. |

## Properties

None

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `constraint` | Inner `div` element holder for constraint slot. |
| `content` | Inner `div` element holder for content/default slot. |
| `description` | Inner `div` element holder for description slot. |
| `error` | Inner `div` element holder for error slot. |
| `info` | Inner `div` element holder for info slot. |
| `label` | Inner `div` element holder for label slot. |
| `secondary` | Inner `div` element holder for secondary control slot. |
| `summary` | Inner `div` element holder for label and info slots. |

## Dependencies

None
