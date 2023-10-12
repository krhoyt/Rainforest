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
| (`content`) | Used to hold other elements. Can be nested. |

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `data` | `Object` | Arbitrary data storage |

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `alignitems` | `start` \| `center` \| `end` | Controls the `align-items` CSS Flex Box property |
| `concealed` | `boolean` | Do not show, but leave in DOM flow |       
| `direction` | `horizontal` \| `vertical` | Controls the `flex-direction` CSS Flex Box property |
| `hidden` | `boolean` | Do not show in DOM |      
| `size` | `xxxs` \| `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` | Size of the `gap` inline with design system values |      

## Events

None

## Methods

None

## Parts

None

## Dependencies

None
