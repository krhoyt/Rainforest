# Header

Summarizes the content that's displayed under it and provides a space for optional action buttons.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/header.js" type="module"></script>
```

## Examples

``` html
<rf-header variant="h1">
  <rf-space-between direction="horizontal" size="xs" slot="actions">
    <rf-button>Secondary button</rf-button>
    <rf-button variant="primary">Primary button</rf-button>
  </rf-space-between>   
  Page title
</rf-header>
<rf-header counter="(3)">
  <rf-space-between direction="horizontal" size="xs" slot="actions">
    <rf-button>Secondary button</rf-button>
    <rf-button variant="primary">Primary button</rf-button>
  </rf-space-between> 
  <rf-link slot="info" variant="info">Info</rf-link>   
  Container title
</rf-header>    
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
| `info` | Area next to the heading to display an Info link. |
| `description` | Supplementary text below the heading. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `counter` | `string` | Specifies secondary text that's displayed to the right of the heading title. | - | `null` | ✅ |
| `header-tag-override` | `string` | Overrides the default HTML heading tag  provided by the variant. | `h1` \| `h2` \| `h3` \| `h4` \| `h5` | `null` | ✅ |
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
| `header` | Inner `header` element. |
| `left` | Inner `div` element holding first part of top line of content. |
| `line` | Inner `div` element holding top line of content. |
| `title` | Inner `div` element for the title content. |

## Dependencies

None
