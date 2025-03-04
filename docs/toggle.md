# Toggle

`<rf-toggle>` | `RFToggle`

Toggles enable users to turn an option on or off, and can result in an immediate change.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/toggle.js" type="module"></script>
```

## Examples

### Unchecked with label

``` html
<rf-toggle label="Toggle"></rf-toggle>
```

### Checked without label

``` html
<rf-toggle checked></rf-toggle>
```

### Checked disabled

``` html
<rf-toggle checked disabled label="This toggle is disabled"></rf-toggle>
```

### Unchecked disabled

``` html
<rf-toggle disabled label="This toggle is also disabled"></rf-toggle>
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `checked` | `boolean` | Specifies if the component is selected. | - | `false` | ✅ |
| `description` | `string` | Additional line of text below the main label. | - | `null` | ✅ |
| `disabled` | `boolean` | Specifies if the control is disabled, which prevents the user from modifying the value and prevents the value from being included in a form submission. | - | `false` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `label` | `string` | The main label for the toggle. | - | `null` | ✅ |
| `name` | `string` | Specifies the name of the control used in HTML forms. | - | `null` | ✅ |
| `value` | `string` | Specifies a value for the control used in HTML forms. | - | `null` | ✅ |

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

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--toggle-color` | Color of the text in the label. | `#000716` |
| `--toggle-cursor` | Cursor used when the mouse is over the element. | `default` |
| `--toggle-font-size` | Font size of the text in the label. | `14px` |
| `--toggle-font-style` | Font style of the text in the label. | - |
| `--toggle-font-weight` | Font weight of the text in the label. | `400` |
| `--toggle-handle-background-color` | Color of the handle for the toggle. | `#ffffff` |
| `--toggle-line-height` | Line height of the text in the label. | `20px` |
| `--toggle-margin` | Margins to be used on the label of the toggle. | `0` |
| `--toggle-padding` | Paddings to be used on the label of the toggle. | `0 0 0 8px` |
| `--toggle-text-align` | Alignment of the text in the label of the toggle. | `left` |
| `--toggle-text-decoration` | Decoration such as underline for the text in the label. | `none` |
| `--toggle-track-background-color` | Color of the track for the toggle. | `#414d5c` |
| `--toggle-track-checked-background-color` | Color of the track for the toggle when checked. | `#0972d3` |
| `--toggle-track-disabled-background-color` | Color of the track for the toggle when disabled. | `#d1d5db` |
| `--toggle-disabled-color` | Color of the text in the label when disabled. | `#9ba7b6` |

## Dependencies

None
