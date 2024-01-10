# Tabs

With tabs, users can switch between different categories of information in the same view.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/tabs.js" type="module"></script>
```

## Examples

``` html
<rf-tabs>
  <p data-id="first" data-label="First tab label">First tab content area</p>
  <p data-id="second" data-label="Second tab label">Second tab content area</p>      
  <p data-disabled data-id="third" data-label="Third tab label">Third tab content area</p>            
</rf-tabs>
<rf-tabs variant="container">
  <p data-id="first" data-label="First tab label">First tab content area</p>
  <p data-id="second" data-label="Second tab label">Second tab content area</p>      
  <p data-disabled data-id="third" data-label="Third tab label">Third tab content area</p>            
</rf-tabs>    
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | Specifies the tab content to display. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `active-tab-id` | `string` | The id of the currently active tab. | - | `null` | ✅ |
| `disable-content-paddings` | `boolean` | Determines whether the tab content has padding. | - | `false` | ✅ |
| `variant` | `string` | The possible visual variants of tabs. | `default` \| `container` | `default` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-change` | Called whenever the user selects a different tab. | `{activeTabId: string}` |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `container` | Inner `div` element that contains the entire element. |
| `content` | Inner `div` element where content is placed. |
| `tabs` | Inner `div` element that contains the tab buttons. |

## Dependencies

None
