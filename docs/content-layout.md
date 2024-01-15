# Content Layout

Provides the basic layout for the header and content of a page.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/content-layout.js" type="module"></script>
```

## Examples

``` html
<rf-content-layout>
  <rf-space-between size="m" slot="header">
    <rf-header variant="h1">
      Header          
      <rf-link slot="info">Info</rf-link>          
      <rf-button slot="actions" variant="primary">Button</rf-button>          
      <span slot="description">This is a generic description used in the header.</span>
    </rf-header>
    <rf-alert>This is a generic alert.</rf-alert>
  </rf-space-between>
  <rf-container>
    <rf-header slot="header" variant="h2">
      Container header
      <span slot="description">Container description</span>
    </rf-header>
    Container content
  </rf-container>
</rf-content-layout>
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | Use this slot to render the main content of the layout below the header. |
| `header` | Use this slot to render the header content for the layout. |

## Attributes

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `disable-overlap` | `boolean` | Determines whether the layout has an overlap between the header and content. | - | `false` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `header` | Inner `div` element for the header section. |

## Dependencies

None
