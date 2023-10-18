# Box

With the box component, you can display and style basic elements and containers in compliance with Cloudscape's typography and spacing strategy.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/box.js" type="module"></script>
```

## Examples

``` html
<rf-box variant="p">
  When you launch an instance, the instance class that you specify determines the hardware of the host computer used for your instance. Each instance class offers different compute, memory, and storage capabilities. Choose an instance class based on the requirements of the application or software that you plan to run on your instance.  
</rf-box>
<rf-box color="text-body-secondary">Secondary text</rf-box>
<rf-box variant="h1">Distribution settings</rf-box>
<rf-box variant="code">database:instance:application-db</rf-box>
<rf-box font-size="display-l" font-weight="bold">Large and bold text</rf-box>
<rf-box variant="awsui-key-label">Key label</rf-box>
<rf-box text-align="center">Centered text</rf-box>
<rf-box float="right">
  <rf-space-between direction="horizontal" size="xs">
    <rf-button>Edit</rf-button>
    <rf-button>Delete</rf-button>
    <rf-button variant="primary">
      Create distribution
    </rf-button>
  </rf-space-between>
</rf-box>
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | Content of the box. |

## Attributes

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `color` | `string` | Overrides the text color. | `text-label` \| `text-body-secondary` \| `text-status-error` \| `text-status-success` \| `text-status-info` \| `text-status-inactive` \| `text-status-warning` | `null` | ✅ |
| `display` | `string` | Overrides the display of the element. | `block` \| `inline` \| `inline-block` \| `none` | `null` | ✅ |
| `float` | `string` | Defines the floating behavior. | `left` \| `right` | `null` | ✅ |
| `font-size` | `string` | Overrides the font size and line height. | `body-s` \| `body-m` \| `heading-xs` \| `heading-s` \| `heading-m` \| `heading-l` \| `heading-xl` \| `display-l` | `null` | ✅ |
| `font-weight` | `string` | Overrides the font weight. | `light` \| `normal` \| `bold` \| `heavy` | `null` | ✅ |
| `text-align` | `string` | Defines the text alignment within the element. | `left` \| `center` \| `right` | `null` | ✅ |
| `variant`  | `string` | Defines the style of element to display. | `div` \| `span` \| `h1` \| `h2` \| `h3` \| `h4` \| `h5` \| `p` \| `strong` \| `small` \| `code` \| `pre` \| `samp` \| `awsui-key-label` \| `awsui-value-large` | `div` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `box` | Inner `div` element. |

## Dependencies

None
