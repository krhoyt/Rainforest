# Tab Group

`<rf-tab-group>` | `RFTabGroup`

With tabs, users can switch between different categories of information in the same view.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/tab-group.js" type="module"></script>
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
| (default) | Specifies the tab content to display. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `active-tab-name` | `string` | The `name` of the currently active tab. | - | `null` | ✅ |
| `disable-content-paddings` | `boolean` | Determines whether the tab content has padding. | - | `false` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `variant` | `string` | The possible visual variants of tabs. | `default` \| `container` | `default` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-change` | Called whenever the user selects a different tab. | `{activeTabName: string}` |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `container` | Inner `div` element that contains the entire grouping. |
| `content` | Inner `div` element where content elements are placed. |
| `tabs` | Inner `div` element that contains the tab buttons. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--tab-group-content-padding` | Padding for the content elements. | `12px 20px 20px 20px` |

## Dependencies

- `<rf-tab>`
- `<rf-tab-panel>`
