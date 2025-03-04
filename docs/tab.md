# Tab

`<rf-tab>` | `RFTab`

With tabs, users can switch between different categories of information in the same view.

> The `rf-tab` component is used internally by `rf-tab-group`. You should not create instances directly.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/tab.js" type="module"></script>
```

## Examples

### Default

``` html
<rf-tab-group>
  <rf-tab-panel label="First tab label" name="first">
    <rf-label text="First tab content area"></rf-label>
  </rf-tab-panel>
  <rf-tab-panel label="Second tab label" name="second">
    <rf-label text="Second tab content area"></rf-label>
  </rf-tab-panel>
  <rf-tab-panel disabled label="Third tab label" name="third">
    <rf-label text="Third tab content area"></rf-label>
  </rf-tab-panel>            
</rf-tab-group>
```

### With container

``` html
<rf-tab-group variant="container">
  <rf-tab-panel label="First tab label" name="first">
    <rf-label text="First tab content area"></rf-label>
  </rf-tab-panel>
  <rf-tab-panel label="Second tab label" name="second">
    <rf-label text="Second tab content area"></rf-label>
  </rf-tab-panel>
  <rf-tab-panel disabled label="Third tab label" name="third">
    <rf-label text="Third tab content area"></rf-label>
  </rf-tab-panel>            
</rf-tab-group>    
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `disabled` | `boolean` | Disable corresponding tab. | - | `false` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `label` | `string` | Text to use on the corresponding tab. | - | `null` | ✅ |
| `name` | `string` | Identifier used for this specific tab/panel pairing. | - | `null` | ✅ |
| `selected` | `boolean` | Indicates the tab button is selected. | - | `false` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-change` | Called whenever the user selects this tab. | `{name: string}` |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `button` | The `button` element representing the tab. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--tab-color` | Color of the text in the label. | `#414d5c` |
| `--tab-disabled-color` | Color of the text in the label when disabled. | `#9ba7b6` |
| `--tab-hover-color` | Color of the text in the label when the mouse is over the element. | `#9ba7b6` |
| `--tab-selected-color` | Color of the text in the label when this tab is selected. | `#0972d3` |

## Dependencies

None
