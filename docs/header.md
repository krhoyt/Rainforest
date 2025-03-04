---
permalink: "/header.html"
---

# Header

Summarizes the content that's displayed under it and provides a space for optional action buttons.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/header.js" type="module"></script>
```

## Examples

### Page Header

``` html
<rf-header variant="h1">
  <rf-space-between direction="horizontal" size="xs" slot="actions">
    <rf-button>Secondary button</rf-button>
    <rf-button variant="primary">Primary button</rf-button>
  </rf-space-between>   
  Page title
</rf-header>
```

### With Info Link and Counter

``` html
<rf-header counter="(3)">
  <rf-space-between direction="horizontal" size="xs" slot="actions">
    <rf-button>Secondary button</rf-button>
    <rf-button variant="primary">Primary button</rf-button>
  </rf-space-between> 
  <rf-link slot="info" variant="info">Info</rf-link>   
  Container title
</rf-header>
```

### Section Header with Actions

``` html
<rf-header variant="h3">
  <rf-button slot="actions">Button</rf-button>
  Section title
</rf-header>        
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | The heading text. |
| `actions` | Actions for the container. |
| `description` | Supplementary text below the heading. |
| `info` | Area next to the heading to display an Info link. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `counter` | `string` | Specifies secondary text that's displayed to the right of the heading title. | - | `null` | ✅ |
| `description` | `string` | Supplementary text below the heading. | - | `null` | ✅ |
| `header-tag-override` | `string` | Overrides the default HTML heading tag  provided by the variant. | `h1` \| `h2` \| `h3` \| `h4` \| `h5` | `null` | ✅ |
| `hidden` | `boolean` | Remove from DOM layout. | - | `false` | ✅ |
| `variant`  | `string` | Specifies the variant of the header. | `h1` \| `h2` \| `h3` \| `awsui-h1-sticky` | `h2` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `actions` | Inner `div` element holder action content. |
| `counter` | Inner `p` element for counter content. |
| `description` | Inner `p` element for description content. |
| `header` | Inner `header` element. |
| `left` | Inner `div` element holding first part of top line of content. |
| `line` | Inner `div` element holding top line of content. |
| `title` | Inner `div` element for the title content. |

## Dependencies

None
