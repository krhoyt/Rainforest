# Label

Preformatted paragraph element.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/controls/label.js" type="module"></script>
```

## Examples

``` html
<rf-label text="I can haz content."></rf-label>
```

## Slots

None

## Attributes

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `balanced` | `boolean` | Controls text wrapping. | `true` \| `false` | `false` | ✅ |
| `color` | `string` | Overrides the text color. | `text-label` \| `text-body-secondary` \| `text-status-error` \| `text-status-success` \| `text-status-info` \| `text-status-inactive` \| `text-status-warning` | `null` | ✅ |
| `disabled` | `boolean` | Marks content by changing content. | `true` \| `false` | `false` | ✅ |
| `font-size` | `string` | Overrides the font size and line height. | `body-s` \| `body-m` \| `heading-xs` \| `heading-s` \| `heading-m` \| `heading-l` \| `heading-xl` \| `display-l` | `null` | ✅ |
| `font-weight` | `string` | Overrides the font weight. | `light` \| `normal` \| `bold` \| `heavy` | `null` | ✅ |
| `hidden` | `boolean` | Hides that nonsense. | `true` \| `false` | `false` | ✅ |
| `monospace` | `boolean` | Render text using a monospace font. | `true` \| `false` | `false` | ✅ |
| `text` | `string` | Content to display. | - | `null` | ✅ |
| `truncate` | `boolean` | Truncate text with ellipsis. | `true` \| `false` | `false` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `label` | Inner `p` element. |

## Dependencies

None
