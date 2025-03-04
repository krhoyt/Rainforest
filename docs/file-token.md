# File Token

`<rf-file-token>` | `RFFileToken`

Represents tokens in a file token group. Not generally used directly.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/file-token.js" type="module"></script>
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
| `error-text` | `string` | Text that displays as a validation error message. | - | `null` | ✅ |
| `file` | `object<File>` | File value. | - | `null` | ❌ |
| `loading` | `boolean` | Determine whether the token is loading. | - | `false` | ✅ |
| `show-file-last-modified` | `boolean` | Show file last modified timestamp in the token. | - | `false` | ✅ |
| `show-file-size` | `boolean` | Show file size in the token. | - | `false` | ✅ |
| `show-file-thumbnail` | `boolean` | Show file thumbnail in the token. | - | `false` | ✅ |
| `warning-text` | `string` | Text that displays as a validation warning message. | - | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-dismiss` | Called when the user clicks on the dismiss button. | - |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `formatBytes()` | Formatting of byte values. | - |

## Parts

| Name | Description |
| --- | --- |
| `button` | Inner `button` for dismissing (close, clear?) the token. |
| `container` | Inner `div` for the enclosed portion of the token. |
| `labels` | Inner `div` for the labels of the token. |
| `modified` | Inner `p` for the last modified value of the token. |
| `name` | Inner `p` for the name value of the token. |
| `size` | Inner `p` for the size value of the token. |
| `suffix` | Inner `div` for dismiss button and loading indicator. |

## Variables

None

## Dependencies

- `<rf-status-indicator>`
- `<rf-spinner>`
