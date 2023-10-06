# Box

Display and style text content in compliance with the Cloudscape typography and spacing strategy.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/controls/box.js" type="module"></script>
```

``` html
<rf-box variant="p">Paragraph text</rb-box>
<rf-box color="text-body-secondary">Secondary text</rf-box>
<rf-box variant="h1">H1 text</rf-box>
<rf-box variant="code">Code text</rf-box>
<rf-box font-size="display-l" font-weight="bold">Large and bold text</rf-box>
<rf-box variant="awsui-key-label">Key label text</rf-box>
```

## Styles

| Name | Value |
| --- | --- |
| `--box-color` | `#000716` |
| `--box-cursor` | `default` |
| `--box-disabled-color` | `#9ba7b6` |
| `--box-font-size` | `14px` |
| `--box-font-weight` | `400` |
| `--box-line-height` | `20px` |
| `--box-margin` | `0` |
| `--box-padding` | `0` |
| `--box-text-align` | `left` |
| `--box-text-decoration` | `none` |
| `--box-color-secondary` | `#414d5c` |
| `--box-color-error` | `#d91515` |
| `--box-color-success` | `#037f0c` |
| `--box-color-info` | `#0972d3` |
| `--box-color-inactive` | `#5f6b7a` |
| `--box-color-warning` | `#8d6605` |

## Slots

| Name | Description |
| --- | --- |
| (`default`) | Used for box content |

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `data` | `Object` | Arbitrary data storage |

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `color` | `text-label` \| `text-body-secondary` \| `text-status-error` \| `text-status-success` \| `text-status-info` \| `text-status-inactive` \| `text-status-warning` | Color of the text in the paragraph element |
| `concealed` | `boolean` | Do not show, but leave in DOM flow|      
| `disabled` | `boolean` | Show as disabled by altering the color |
| `float` | `left` \| `right` | Float the container accordingly (not the inner paragraph element) |      
| `font-size` | `body-s` \| `body-m` \| `heading-xs` \| `heading-s` \| `heading-m` \| `heading-l` \| `heading-xl` \| `display-l` | Font size of the paragraph element |
| `font-weight` | `light` \| `normal` \| `bold` \| `heavy` | Font weight of the paragraph element |
| `hidden` | `boolean` | Do not show in DOM |      
| `text` | `string` | Can be used for label content |
| `text-align` | `left` \| `center` \| `right` | Alignment of text in the paragraph element |
| `truncate` | `boolean` | Add styling to allow paragraph element to trim content |      
| `variant`  | `div` \| `span` \| `h1` \| `h2` \| `h3` \| `h4` \| `h5` \| `p` \| `strong` \| `small` \| `code` \| `pre` \| `samp` \| `awsui-key-label` \| `awsui-value-large` | Applies combination of font size and weight to paragraph element |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `box` | Inner paragraph element |

## Dependencies

None