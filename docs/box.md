# Box

`<rf-box>` | `RFBox`

Flexbox container for elements spacing and alignment.

> Rainforest breaks up the Cloudscape `Box` component into two components; one component `RFBox` as a container for other elements, and `RFLabel` for text fragments.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/box.js" type="module"></script>
```

## Examples

### Gap

``` html
<rf-box gap="m">
  <p>One</p>
  <p>Two</p>
  <p>Three</p>            
</rf-box>
```

### Direction

``` html
<rf-box direction="horizontal">
  <p>One</p>
  <p>Two</p>
  <p>Three</p>            
</rf-box>    
```

### Margins and paddings - all sides

``` html
<rf-box margin="xxl" padding="xxl">
  <p>One</p>
  <p>Two</p>
  <p>Three</p>            
</rf-box>    
```

### Margins and paddings - one side

``` html
<rf-box style="margin: 0 0 0 32px; padding: 0 0 0 32px;">
  <p>One</p>
  <p>Two</p>
  <p>Three</p>            
</rf-box>    
```

### Float right

``` html
<rf-box float="right">
  <p>One</p>
  <p>Two</p>
  <p>Three</p>            
</rf-box>
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Elements to layout in specified direction. |

## Attributes

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `align-items` | `string` | Determines how the child elements will be aligned. | `center` \| `end` \| `start` | `null` | ✅ |
| `direction` | `string` | CSS value specifying layout. | `column` \| `column-reverse` \| `horizontal` \| `horizontal-reverse` \| `row` \| `row-reverse` \| `vertical` \| `vertical-reverse` | `vertical` | ✅ |
| `float` | `string` | Defines the floating behavior. | `left` \| `right` | `null` | ✅ |
| `gap` | `string` | Distance in pixels between contained elements. | `n` \| `xxxs` \| `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` \| `xxxl`  | `null` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `margin` | `string` | Adds margins to the element. | `n` \| `xxxs` \| `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` \| `xxxl` | `null` | ✅ |
| `padding` | `string` | Adds paddings to the element. | `n` \| `xxxs` \| `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` \| `xxxl` | `null` | ✅ |
| `size` | `string` | Distance in pixels between contained elements. | `n` \| `xxxs` \| `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` \| `xxxl`  | `null` | ✅ |

## Events

None

## Methods

None

## Parts

None

## Variables

None

## Dependencies

None
