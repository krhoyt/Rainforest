# Toggle

Toggles enable users to turn an option on or off, and can result in an immediate change.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/toggle.js" type="module"></script>
```

## Examples

``` html
<rf-toggle>Toggle</rf-toggle>
<rf-toggle checked></rf-toggle>
<rf-toggle checked disabled>This toggle is disabled</rf-toggle>
<rf-toggle disabled>This toggle is also disabled</rf-toggle>
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | The control's label that's displayed next to the toggle. |
| `description` | Description that appears below the label. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `checked` | `boolean` | Specifies if the component is selected. | - | `false` | ✅ |
| `disabled` | `boolean` | Specifies if the control is disabled, which prevents the user from modifying the value and prevents the value from being included in a form submission. | - | `false` | ✅ |
| `name` | `string` | Specifies the name of the control used in HTML forms. | - | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-blur` | Called when input focus is removed from the UI control. | - |
| `rf-change` | Called when the user changes the component state. | `{checked: boolean}` |
| `rf-focus` | Called when input focus is moved to the UI control. | - |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Sets input focus onto the UI control. | - |

## Parts

| Name | Description |
| --- | --- |
| `check` | Line representing the check mark |
| `description` | Holder for description content |
| `input` | Internal `input` element |
| `label` | Holder for label content |
| `toggle` | Rectangle representing the box |

## Dependencies

None
