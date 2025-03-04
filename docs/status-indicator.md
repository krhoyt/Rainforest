# Status Indicator

`<rf-status-indicator>` | `RFStatusIndicator`

A status indicator communicates the state of a resource — either in its entirety or a particular facet of a resource — in a compact form that is easily embedded in a card, table, list, or header view.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/status-indicator.js" type="module"></script>
```

## Examples

### Error 

``` html
<rf-status-indicator label="Error" type="error">Error</rf-status-indicator>
```

### Warning

``` html
<rf-status-indicator type="warning">Warning</rf-status-indicator>
```

### Success

``` html
<rf-status-indicator>Success</rf-status-indicator>
```

### Info

``` html
<rf-status-indicator type="info">Info</rf-status-indicator>
```

### Stopped

``` html
<rf-status-indicator type="stopped">Stopped</rf-status-indicator>
```

### Pending

``` html
<rf-status-indicator type="pending">Pending</rf-status-indicator>
```

### In progress

``` html
<rf-status-indicator type="in-progress">In progress</rf-status-indicator>
```

### Loading

``` html
<rf-status-indicator type="loading">Loading</rf-status-indicator>
```

## Slots

| Name | Description |
| --- | --- |
| (default) | A text fragment that communicates the status. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `color` | `string` | Specifies an override for the status indicator color. | `blue` \| `grey` \| `green` \| `red` \| `yellow` \| `black` \| `inverted` | `null` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `type`  | `string` | Specifies the status type. | `error` \| `warning` \| `success` \| `info` \| `stopped` \| `pending` \| `in-progress` \| `loading` | `success` | ✅ |
| `truncate` | `boolean` | Truncates text to elipsis when content goes beyond box size. | - | `false` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `error` | The `g` element containing the error icon. |
| `info` | The `g` element containing the info icon. |
| `label` | The `p` element containing the text fragment. |
| `pending` | The `g` element containing the pending icon. |
| `progress` | The `g` element containing the progress icon. |
| `spinner` | The `rf-spinner` element used for loading type. |
| `stopped` | The `g` element containing the stopped icon. |
| `success` | The `g` element containing the success icon. |
| `vector` | The `svg` element of the contained `rf-spinner` element. |
| `warning` | The `g` element containing the warning icon. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--status-indicator-color` | Color of the enclosed text fragment. | `#037f0c` |
| `--status-indicator-cursor` | Cursor used for the enclosed text fragment. | `default` |
| `--status-indicator-font-size` | Font size used for the enclosed text fragment. | `14px` |
| `--status-indicator-font-style` | Font style used for the enclosed text fragment. | - |
| `--status-indicator-font-weight` | Font weight used for the enclosed text fragment. | `400` |
| `--status-indicator-line-height` | Line height used for the enclosed text fragment. | `20px` |
| `--status-indicator-margin` | Margins used for the enclosed text fragment. | `0` |
| `--status-indicator-padding` | Paddings used for the enclosed text fragment. | `0` |
| `--status-indicator-stroke` | Stroke color used for the icons. | `#037f0c` |
| `--status-indicator-stroke-width` | Stroke width used for the icons. | `2px` |
| `--status-indicator-text-align` | Text alignment used for the enclosed text fragment. | `left` |
| `--status-indicator-text-decoration` | Text decoration used for the enclosed text fragment. | `none` |

## Dependencies

- `<rf-spinner>`
