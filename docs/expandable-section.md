# Expandable Section

With expandable selection, users can expand or collapse a section. Use expandable sections when you have multiple sections on a page, and you want to allow users to see one or more sections at a time. Expandable sections are collapsed by default.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/expandable-section.js" type="module"></script>
```

## Examples

``` html
<rf-expandable-section header-description="Test">
  <span slot="header-text">Static website hosting</span>
  After you enable your S3 bucket for static website
  hosting, web browsers can access your content
  through the Amazon S3 website endpoint for the
  bucket.
</rf-expandable-section>
<rf-expandable-section variant="footer">
  <span slot="header-text">Versioning</span>
  Versioning provides an additional level of
  protection by providing a way to recover from
  accidental overwrites or expirations.
</rf-expandable-section>
<rf-expandable-section variant="container">
  <span slot="header-text">Additional configuration</span>
  Verify or edit the settings below.
</rf-expandable-section>    
<rf-expandable-section variant="container">
  <rf-button slot="header-actions">Edit</rf-button>
  <rf-link slot="header-info" variant="info">Info</rf-link>
  <span slot="header-text">Additional configuration</span>
  See your custom configuration here.
</rf-expandable-section>        
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | Primary content displayed in the expandable section element. |
| `header-actions` | Actions for the header. |
| `header-info` | The area next to the heading, used to display an Info link. Use with the container variant. |
| `header-text` | The heading text. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `default-expanded` | `boolean` | Determines whether the component initially displays in expanded state (that is, with content visible). | - | `false` | ✅ |
| `expanded` | `boolean` | Determines whether the component is in the expanded state (that is, with content visible). | - | `false` | ✅ |
| `header-counter` | `string` | Specifies secondary text that's displayed to the right of the heading title. | - | `null` | ✅ |
| `header-description` | `string` | Supplementary text below the heading. | - | `null` | ✅ |
| `heading-tag-override` | `string` | Overrides the default HTML heading tag. | `h1` \| `h2` \| `h3` \| `h4` \| `h5` | `null` | ✅ |
| `variant` | `string` | The possible variants of an expandable section. | `default` \| `footer` \| `container` \| `navigation` \| `stacked` | `default` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-change` | Called when the state changes (that is, when the user expands or collapses the component). | `{expanded: boolean}` |

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
