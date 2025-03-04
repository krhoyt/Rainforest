# Radio Group

`<rf-radio-group>` | `RFRadioGroup`

Radio group enable users to choose one option from a predefined set.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/radio-group.js" type="module"></script>
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

| Name | Description |
| --- | --- |
| (default) | Radio buttons to display. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `direction` | `string` | Flexbox layout of the radio buttons. | - | `column` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `name` | `string` | Specify a custom name for the radio buttons. | - | `null` | ✅ |
| `toggle` | `boolean` | Allow deselection of radio button by clicking it again. | - | `false` | ✅ |
| `value` | `string` | Sets the value of the selected radio button. | - | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-change` | Called when the user selects a different radio button. | `{value: string}` |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Sets input focus onto the UI control. | - |

## Parts

None

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--radio-group-direction` | Flexbox direction to layout the radio buttons. | `column` |

## Dependencies

- `<rf-radio>`
