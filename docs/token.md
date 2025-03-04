# Token

`<rf-token>` | `RFToken`

A set of compact representations of an individual item selected from a list.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/token.js" type="module"></script>
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
| (default) | Tags to display using the `option` tag. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `description` | `string` | Further information about the token that appears below the label. | - | `null` | ✅ |
| `disabled` | `boolean` | Disables this specific token. | - | `false` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `icon-name` | `string` | Specifies the name of an icon to display in the token. | - | `null` | ✅ |
| `label` | `string` | Title text of the token. | - | `null` | ✅ |
| `label-tag` | `string` | A label tag that provides additional guidance, shown next to the label. | - | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-dismiss` | Called when the user clicks on the dismiss button. | - |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `button` | Inner `button` that displays the dismiss icon. |
| `description` | Inner `p` that displays the token description. |
| `image` | Inner `img` that displays the icon. |
| `label` | Inner `p` that displays the token label. |
| `label-tag` | Inner `p` that displays the token label tag. |
| `list` | Inner `ul` that displays the tag list. |
| `options` | Hidden `div` for the children tokens. |
| `token` | Inner `div` containing the token details. |
| `vector` | Inner `svg` containing the dismiss icon. |

## Variables

None

## Dependencies

None
