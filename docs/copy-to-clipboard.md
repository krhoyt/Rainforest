# Copy to Clipboard

`<rf-copy-to-clipboard>` | `RFCopyToClipboard`

With copy to clipboard, users can copy content to their clipboard.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/copy-to-clipboard.js" type="module"></script>
```

## Examples

### Button Variant

``` html
<rf-copy-to-clipboard 
  copy-button-text="Copy" 
  text-to-copy="SLCCSMWOHOFUY0">
</rf-copy-to-clipboard>
```

### Inline Variant

``` html
<rf-copy-to-clipboard   
  text-to-copy="SLCCSMWOHOFUY0"
  variant="inline">
</rf-copy-to-clipboard>
```

### Icon Variant

``` html
<rf-copy-to-clipboard   
  text-to-copy="SLCCSMWOHOFUY0"
  variant="icon">
</rf-copy-to-clipboard>        
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `copy-button-text` | `string` | The text of the copy button (for variant="button"). | - | `null` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `text-to-copy` | `string` | The text content to be copied (for variant="inline"). | - | `null` | ✅ |
| `variant` | `string` | Determines the general styling of the copy button. | `button` \| `icon` \| `inline` | `null` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `button` | Inner `button` element. |
| `inline` | Inner `p` element for the inline text fragment. |
| `label` | Inner `span` element for text fragment inside `button`. |
| `vector` | Inner `svg` element for the copy icon. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--copy-button-border-color` | The border color used for the button. | `#006ce0` |
| `--copy-button-border-radius` | The border radius used for the button. | `20px` |
| `--copy-button-border-style` | The border style used for the button. | `solid` |
| `--copy-button-border-width` | The border width used for the button. | `2px` |

## Dependencies

None
