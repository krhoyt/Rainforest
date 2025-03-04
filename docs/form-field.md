# Form field

`<rf-form-field>` | `RFFormField`

With the form field, users can create properly-styled controls in a form.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/form-field.js" type="module"></script>
```

## Examples

### Default

``` html
<rf-form-field 
  description="This is a description." 
  label="Form field label">
  <rf-input></rf-input>
</rf-form-field>
```

### Optional

``` html
<rf-form-field 
  description="This is a description." 
  label="Form field label"
  optional="optional">
  <rf-textarea></rf-textarea>
</rf-form-field>    
```

### With constraint text

``` html
<rf-form-field 
  constraint="Requirements and constraints for the field."
  label="Form field label">
  <rf-input></rf-input>
</rf-form-field>        
```

### With error

``` html
<rf-form-field 
  constraint="Requirements and constraints for the field."
  description="This is a description."
  error="This is an error message."
  label="Form field label">
  <rf-input invalid></rf-input>
</rf-form-field>        
```

### With radio buttons

``` html
<rf-form-field label="Form field label">
  <rf-radio-group>
    <rf-radio label="Set the stretch property to true when using radio buttons or checkboxes in a form-field: their label must stretch to 100% of the field width."></rf-radio>
    <rf-radio label="The same applies to any textual information"></rf-radio>
    <rf-radio label="Third Choice"></rf-radio>
  </rf-radio-group>
</rf-form-field>
```

### With character count

``` html
<rf-form-field 
  constraint="Name must be 1 to 10 characters. Character count: 0/10"
  label="Name"
  optional="optional">
  <rf-input></rf-input>
</rf-form-field>            
```

``` javascript
const field = document.querySelector( 'rf-form-field' );
const input = field.children[0];
input.addEventListener( 'rf-change', () => {
  field.constraint = `Name must be 1 to 10 characters. Character count: ${input.value.trim().length}/10`;

  if( input.value.trim().length > 10 ) {
    input.invalid = true;
    field.error = 'The name has too many characters.';
  } else {
    input.invalid = false;
    field.error = null;
  }
} );
```

### Terms and conditions

``` css
p {
  color: #5f6b7a;
  font-size: 12px;
  line-height: 16px;
  margin: 0;
  padding: 0;        
}      
```

``` html
<rf-form-field label="Terms and conditions">
  <p slot="description">
    Please read through our 
    <rf-link 
      external 
      font-size="body-s" 
      href="#" 
      label="terms and conditions" 
      variant="primary">
    </rf-link> 
    and agree.
  </p>
  <rf-checkbox label="I agree to the terms and conditions"></rf-checkbox>
</rf-form-field>              
```

## Slots

| Name | Description |
| --- | --- |
| (default) | The primary form control (for example, input, textarea, etc.). |
| `description` | Detailed information about the form field that is displayed below the label. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `constraint` | `string` | Constraint text that is displayed below the control. | `-` | `null` | ✅ |
| `count` | `string` | Constraint text that is displayed above the control. | `-` | `null` | ✅ |
| `description` | `string` | Detailed information about the form field that is displayed below the label. | `-` | `null` | ✅ |
| `error` | `string` | Text that displays as a validation message. | `-` | `null` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `label` | `string` | The main label for the form field. | - | `false` | ✅ |
| `optional` | `string` | Optional text to display to the right of the label. | - | `false` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `alternate` | Inner `div` holder for alternate description content. |
| `count` | Inner `p` element the counter text above the control. |
| `constraint` | Inner `p` element the constraint text. |
| `description` | Inner `p` element the description text. |
| `label` | Inner `p` element the label text. |
| `optional` | Inner `p` element the optional text next to the label. |

## Variables

None

## Dependencies

- `<rf-status-indicator>`
