# Token Group

`<rf-token-group>` | `RFTokenGroup`

A set of compact representations of an individual item selected from a list.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/token-group.js" type="module"></script>
```

## Examples

### Default

``` html
<rf-token-group>
  <rf-token label="Item 1"></rf-token>
  <rf-token label="Item 2"></rf-token>
  <rf-token label="Item 3"></rf-token>
</rf-token-group>
```

### With vertical alignment

``` html
<rf-token-group alignment="vertical">
  <rf-token label="Item 1"></rf-token>
  <rf-token label="Item 2"></rf-token>
  <rf-token label="Item 3"></rf-token>      
</rf-token-group>
```

### With disabled items

``` html
<rf-token-group>
  <rf-token description="This is a description for item 1" disabled label="Item 1"></rf-token>
  <rf-token description="This is a description for item 2" disabled label="Item 2"></rf-token>
  <rf-token description="This is a description for item 3" disabled label="Item 3"></rf-token>      
</rf-token-group>
```

### With features

``` html
<rf-token-group>
  <rf-token 
    description="This is a description for item 1" 
    icon-name="share"
    label="Item 1"
    label-tag="Label tag 1">
    <option>Tag 1</option>
    <option>Tag 2</option>
  </rf-token>      
  <rf-token 
    description="This is a description for item 2" 
    icon-name="settings"
    label="Item 2"
    label-tag="Label tag 2">
    <option>Tag 1</option>
    <option>Tag 2</option>
  </rf-token>            
  <rf-token 
    description="This is a description for item 3" 
    icon-name="key"
    label="Item 3"
    label-tag="Label tag 3">
    <option>Tag 1</option>
    <option>Tag 2</option>
  </rf-token>            
</rf-token-group>
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Tokens to display. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `alignment` | `string` | Specifies the direction in which tokens are aligned. | `horizontal` \| `vertical` | `horizontal` | ✅ |
| `disable-outer-padding` | `boolean` | Removes any outer padding from the component. | - | `false` | ✅ |
| `disabled` | `boolean` | Disables all of the tokens. | - | `false` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-dismiss` | Called when the user clicks on the dismiss button. | `{itemIndex: number}` |

## Methods

None

## Parts

None

## Variables

None

## Dependencies

- `<rf-token>`
