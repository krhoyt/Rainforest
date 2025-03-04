# Badge

`<rf-badge>` | `RFBadge`

A small, color-coded visual element that contains letters or numbers, that you can use to label, categorize, or organize items.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/badge.js" type="module"></script>
```

## Examples

### Grey

``` html
<rf-badge>20</rf-badge>
```

### Blue

``` html
<rf-badge color="blue">52430</rf-badge>
```

### Red

``` html
<rf-badge color="red">EC2 key pair</rf-badge>
```

### Green

``` html
<rf-badge color="green">Application</rf-badge>
```

### Critical Severity

``` html
<rf-badge color="severity-critical">Critical</rf-badge>
```

### High Severity

``` html
<rf-badge color="severity-high">High</rf-badge>
```

### Medium Severity

``` html
<rf-badge color="severity-medium">Medium</rf-badge>
```

### Low Severity

``` html
<rf-badge color="severity-low">Low</rf-badge>
```

### Neutral Severity

``` html
<rf-badge color="severity-neutral">Neutral</rf-badge>
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Text displayed inside the badge. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `color` | `string` | Specifies the badge color. | `blue` \| `grey` \| `green` \| `red` | `grey` \| `severity-critical` \| `severity-high` \| `severity-medium` \| `severity-low` \| `severity-neutral` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `label` | Inner `p` element for the text fragment. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--badge-background-color` | The background color of the badge. | `#414d5c` |
| `--badge-border-radius` | The border radius of the badge. | `4px` |
| `--badge-color` | The color of label of the badge. | `#fbfbfb` |
| `--badge-cursor` | Cursor used when mouse is over the badge. | `default` |
| `--badge-font-size` | The font size of the label of the badge. | `12px` |
| `--badge-line-height` | The line height of the label of the badge. | `20px` |
| `--badge-margin` | Margins to be applied to the badge. | `0` |
| `--badge-padding` | Paddings to be applied to the badge. | `0 8px 0 8px` |

## Dependencies

None
