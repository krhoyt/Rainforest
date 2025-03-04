# Checkbox

`<rf-checkbox>` | `RFCheckbox`

Checkboxes enable users to turn an option on or off.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/checkbox.js" type="module"></script>
```

## Examples

### Unchecked

``` html
<rf-checkbox>Expire</rf-checkbox>
```

### Checked

``` html
<rf-checkbox checked>Transition to standard access storage class</rf-checkbox>
```

### Disabled

``` html
<rf-checkbox disabled>Delete</rf-checkbox>
```

### Checked and disabled

``` html
<rf-checkbox checked disabled>Archive to the Glacier Storage Class</rf-checkbox>
```

## Slots

| Name | Description |
| --- | --- |
| (default) | The control's label that's displayed next to the checkbox. |
| `description` | Description that appears below the label. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `checked` | `boolean` | Specifies if the component is selected. | - | `false` | ✅ |
| `disabled` | `boolean` | Specifies if the control is disabled, which prevents the user from modifying the value and prevents the value from being included in a form submission. | - | `false` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `indeterminate` | `boolean` | Specifies that the component is in an indeterminate state. | - | `false` | ✅ |
| `name` | `string` | Specifies the name of the control used in HTML forms. | - | `null` | ✅ |
| `read-only` | `boolean` | Specifies if the control is read-only, which prevents the user from modifying the value. | - | `false` | ✅ |
| `value` | `string` | Specifies an alternative value to be used in HTML forms. | - | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-blur` | Called when input focus is removed from the UI control. | - |
| `rf-change` | Called when the user changes the component state. | `{checked: boolean, indeterminate: false}` |
| `rf-focus` | Called when input focus is moved to the UI control. | - |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Sets input focus onto the UI control. | - |

## Parts

| Name | Description |
| --- | --- |
| `box` | SVG `rect` representing the box. |
| `check` | SVG `polyline` representing the check mark. |
| `input` | Internal `input` element used for focus. |
| `interdeterminate` | SVG `polyline` representing unknown state |
| `label` | A `p` element that holds the label content. |
| `vector` | The `svg` element used for drawing state. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--checkbox-color` | Color of the label content. | `#000716` |
| `--checkbox-cursor` | Cursor used when the mouse is over the element. | `default` |
| `--checkbox-font-size` | Font size used for the label content. | `14px` |
| `--checkbox-font-style` | Font style used for the label and description content. | - |
| `--checkbox-weight` | Font weight used for the label and description content. | `400` |
| `--checkbox-line-height` | Line height used for the label content. | `20px` |
| `--checkbox-margin` | Margins used for the label content. | `0` |
| `--checkbox-padding` | Paddings used for the label content. | `0` |
| `--checkbox-text-align` | Text alignment used for the label and description content. | `left` |
| `--checkbox-text-decoration` | Text decoration used for label content. | `none` |

## Dependencies

None
