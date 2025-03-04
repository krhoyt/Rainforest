# Label

`<rf-label>` | `RFLabel`

Preformatted paragraph element.

> Rainforest breaks up the Cloudscape `Box` component into two components; one component `RFBox` as a container for other elements, and `RFLabel` for text fragments.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/label.js" type="module"></script>
```

## Examples

### Paragraph text

``` html
<rf-label variant="p">
  When you launch an instance, the instance class that you specify determines the hardware of the host computer used for your instance. Each instance class offers different compute, memory, and storage capabilities. Choose an instance class based on the requirements of the application or software that you plan to run on your instance.  
</rf-label>      
```

### Secondary text

``` html
<rf-label color="text-body-secondary">Secondary text</rf-label>
```

### H1 text

``` html
<rf-label variant="h1">Distribution settings</rf-label>
```

### Code

``` html
<rf-label variant="code">database:instance:application-db</rf-label>
```

### Large bold text

``` html
<rf-label font-size="display-l" font-weight="bold">Large and bold text</rf-label>
```

### Key label text

``` html
<rf-label variant="key-label">Key label</rf-label>
```

### Centered text

``` html
<rf-label text-align="center" style="width: 100%;">Centered text</rf-label>
```

### Margins and paddings - all sides

``` html
<rf-label margin="xxl" padding="xxl">All sides</rf-label>
```

### Margins and paddings - one side

``` html
<rf-label style="margin: 0 0 0 32px; padding: 0 0 0 32px;">One side</rf-label>
```

### Float right

``` html
<rf-label float="right">Float right</rf-label>
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Content to display. |

## Attributes

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `balanced` | `boolean` | Controls text wrapping. | - | `false` | ✅ |
| `color` | `string` | Overrides the text color. | `text-label` \| `text-body-secondary` \| `text-status-error` \| `text-status-success` \| `text-status-info` \| `text-status-inactive` \| `text-status-warning` | `null` | ✅ |
| `disabled` | `boolean` | Marks content as disabled. | - | `false` | ✅ |
| `display` | `string` | Overrides the display of the element. | `block` \| `inline` \| `inline-block` \| `none` | `null` | ✅ |
| `float` | `string` | Defines the floating behavior. | `left` \| `right` | `null` | ✅ |
| `font-size` | `string` | Overrides the font size and line height. | `body-s` \| `body-m` \| `heading-xs` \| `heading-s` \| `heading-m` \| `heading-l` \| `heading-xl` \| `display-l` | `null` | ✅ |
| `font-weight` | `string` | Overrides the font weight. | `light` \| `normal` \| `bold` \| `heavy` | `null` | ✅ |
| `hidden` | `boolean` | Hides that nonsense. | - | `false` | ✅ |
| `margin` | `string` | Adds margins to the element. | `n` \| `xxxs` \| `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` \| `xxxl` | `null` | ✅ |
| `monospace` | `boolean` | Render text using a monospace font. | - | `false` | ✅ |
| `padding` | `string` | Adds paddings to the element. | `n` \| `xxxs` \| `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` \| `xxxl` | `null` | ✅ |
| `text-align` | `string` | Defines the text alignment within the element. | `left` \| `center` \| `right` | `null` | ✅ |
| `truncate` | `boolean` | Truncate text with ellipsis. | - | `false` | ✅ |
| `variant` | `string` | Defines the style of element to display. | `div` \| `span` \| `h1` \| `h2` \| `h3` \| `h4` \| `h5` \| `p` \| `strong` \| `small` \| `code` \| `pre` \| `samp` \| `key-label` \| `value-large` \| `div` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `label` | Inner `p` element. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--label-color` | Text content color. | `#000716` |
| `--label-cursor` | Cursor to use when over the text content. | `default` |
| `--label-font-size` | Font size of the text content. | `14px` |
| `--label-font-weight` | Weight of the text content. | `400` |
| `--label-line-height` | Line height of the text content. | `20px` |
| `--label-margin` | Specify margins for the text content. | `0` |
| `--label-padding` | Specify paddings for the text content. | `0` |
| `--label-text-align` | Alignment of text content. | `left` |
| `--label-text-decoration` | Apply decoration to text content. | `none` |
| `--label-disabled-color` | Color of the text content when disabled. | `#9ba7b6` |

## Dependencies

None
