# Space Between

A helper component that helps you add consistent spacing between elements on your page.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/space-between.js" type="module"></script>
```

``` html
<rf-space-between direction="horizontal" size="xs">
  <rf-button>Edit</rf-button>
  <rf-button>Delete</rf-button>      
  <rf-button variant="primary">Create distribution</rf-button>      
</rf-space-between>

<rf-space-between direction="vertical" size="l">
  <rf-space-between size="xs">
    <div>Content one</div>
    <div>Content two</div>
    <div>Content three</div>                
  </rf-space-between>
  <rf-space-between size="s">
    <div>Content four</div>
    <div>Content five</div>
  </rf-space-between>      
  <rf-space-between size="m">
    <div>Content six</div>
    <div>Content seven</div>
    <div>Content eight</div>                
  </rf-space-between>      
</rf-space-between>
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | Content of this component. |

## Properties

None

## Attributes

| Name | Type | Description | Values | Default | Required |
| --- | --- | --- | --- | --- | --- |
| `align-items` | `string` | Determines how the child elements will be aligned based on the [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)  property of the CSS Flexbox. | `start` \| `center` \| `end` | `null` | `false` |
| `direction` | `string` | Defines the direction in which the content is laid out. | `horizontal` \| `horizontal-reverse` \| `row` \| `row-reverse` \| `vertical` \| `vertical-reverse` \| `column` \| `column-reverse` | `vertical` | `false` |
| `size` | `string` | Defines the spacing between the individual items of the content. | `xxxs` \| `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` \| `xxxl` | `null` | `true` |

## Events

None

## Methods

None

## Parts

None

## Dependencies

None
