# Radio

`<rf-radio>` | `RFRadio`

Radio group enable users to choose one option from a predefined set.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/radio.js" type="module"></script>
```

## Examples

### Default

``` html
<rf-radio-group>
  <rf-radio label="First choice"></rf-radio>
  <rf-radio checked label="Second choice"></rf-radio>
  <rf-radio label="Third choice"></rf-radio>
</rf-radio-group>
```

### With labels and descriptions

``` html
<rf-radio-group>
  <rf-radio description="This is the first option" label="First choice"></rf-radio>
  <rf-radio checked description="This is the second option" label="Second choice"></rf-radio>
  <rf-radio description="This is the third option" label="Third choice"></rf-radio>
</rf-radio-group>
```

### Disabled

``` html
<rf-radio-group>
  <rf-radio description="This option is disabled" disabled label="First choice"></rf-radio>
  <rf-radio checked label="Second choice"></rf-radio>
  <rf-radio label="Third choice"></rf-radio>
</rf-radio-group>
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `checked` | `boolean` | Specifies if this radio button is selected. | - | `false` | ✅ |
| `description` | `string` | Specifies descriptive text that appears below the label. | - | `null` | ✅ |
| `disabled` | `boolean` | Disable this specific radio button. | - | `false` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `label` | `string` | Specifies a label for the radio button. | - | `null` | ✅ |
| `name` | `string` | Specify a custom name for the radio buttons. | - | `null` | ✅ |
| `toggle` | `boolean` | Allow deselection of radio button by clicking it again. | - | `false` | ✅ |
| `value` | `string` | Sets the value of the selected radio button. | - | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-change` | Called when the user selects this specific radio button. | `{checked: boolean, value: string}` |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Sets input focus onto this specific radio button. | - |

## Parts

| Name | Description |
| --- | --- |
| `description` | The `p` element used to render the description. |
| `input` | Hidden `input` element used for focus. |
| `label` | The `p` element used to render the label. |
| `vector` | The `svg` element used for the icon. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--radio-color` | The color of label of the radio button. | `#000716` |
| `--radio-cursor` | Cursor used when mouse is over the radio button label. | `default` |
| `--radio-disabled-color` | Color used for radion button label when disabled. | `#9ba7b6` |
| `--radio-font-size` | The font size of the label of the radio button. | `14px` |
| `--radio-font-style` | The font style of the label of the radio button. | - |
| `--radio-font-weight` | The font weight of the label of the radio button. | `400` |
| `--radio-line-height` | The line height of the label of the radio button. | `20px` |
| `--radio-margin` | Margins to be applied to the radio button. | `0` |
| `--radio-padding` | Paddings to be applied to the radio button. | `0` |
| `--radio-text-align` | Text alignment to be applied to the radio button. | `left` |
| `--radio-text-decoration` | Text decoration to be applied to the radio button. | `none` |

## Dependencies

None
