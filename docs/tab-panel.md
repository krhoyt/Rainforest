# Tab Panel

`<rf-tab-panel>` | `RFTabPanel`

With tabs, users can switch between different categories of information in the same view.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/tab-panel.js" type="module"></script>
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

| Name | Description |
| --- | --- |
| (default) | Specifies the content to display in this panel. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `disabled` | `boolean` | Disable corresponding tab. | - | `false` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `label` | `string` | Text to use on the corresponding tab. | - | `null` | ✅ |
| `name` | `string` | Identifier used for this specific tab/panel pairing. | - | `null` | ✅ |

## Events

None

## Methods

None

## Parts

None

## Variables

None

## Dependencies

None
