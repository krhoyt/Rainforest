# Checkbox

Checkboxes enable users to turn an option on or off.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/checkbox.js" type="module"></script>
```

## Examples

``` html
<rf-checkbox>Expire</rf-checkbox>
<rf-checkbox checked>Transition to standard access storage class</rf-checkbox>
<rf-checkbox disabled>Delete</rf-checkbox>
<rf-checkbox checked disabled>Archive to the Glacier Storage Class</rf-checkbox>
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | The control's label that's displayed next to the checkbox. |
| `description` | Description that appears below the label. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `checked` | `boolean` | Specifies if the component is selected. | - | `false` | ✅ |
| `disabled` | `boolean` | Specifies if the control is disabled, which prevents the user from modifying the value and prevents the value from being included in a form submission. | - | `false` | ✅ |
| `indeterminate` | `boolean` | Specifies that the component is in an indeterminate state. | - | `false` | ✅ |
| `name` | `string` | Specifies the name of the control used in HTML forms. | - | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-blur` | Called when input focus is removed from the UI control. | - |
| `rf-change` | Called when the user changes the component state. | `{checked: boolean, indeterminate: false}` |
| `rf-focus` | Called when input focus is moved to the UI control. |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Sets input focus onto the UI control. | - |

## Parts

| Name | Description |
| --- | --- |
| `box` | Rectangle representing the box |
| `check` | Line representing the check mark |
| `description` | Holder for description content |
| `input` | Internal `input` element |
| `interdeterminate` | Line representing unknown state |
| `label` | Holder for label content |
| `vector` | SVG area for drawing state |

## Dependencies

None
