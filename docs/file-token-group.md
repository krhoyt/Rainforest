# File Token Group

`<rf-file-token-group>` | `RFFileTokenGroup`

A collection of uploaded files displayed as tokens.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/file-token-group.js" type="module"></script>
```

## Examples

### Button variant

``` html
<rf-file-input>Choose file</rf-file-input>
```

### Icon variant

``` html
<rf-file-input variant="icon"></rf-file-input>
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `alignment` | `string` | Specifies the direction in which tokens are aligned. | `horizontal` \| `vertical` | `null` | ✅ |
| `hidden` | `boolean` | Remove from DOM layout. | - | `false` | ✅ |
| `items` | `object` | An array of objects representing token items. | `{file: File, loading: boolean, errorText: string, warningText: string}` | `null` | ❌ |
| `limit` | `number` | Specifies the maximum number of displayed tokens. | - | `null` | ✅ |
| `read-only` | `boolean` | Specifies if the control is read-only, which prevents the user from modifying the value. | - | `false` | ✅ |
| `show-file-last-modified` | `boolean` | Show file last modified timestamp in the token. | - | `false` | ✅ |
| `show-file-size` | `boolean` | Show file size in the token. | - | `false` | ✅ |
| `show-file-thumbnail` | `boolean` | Show file thumbnail in the token. | - | `false` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-dismiss` | Called when the user clicks on the dismiss button. | `{fileIndex: number}` |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `list` | Inner `ul` for dismissing the list of the tokens. |

## Variables

None

## Dependencies

- `<rf-file-token>`
