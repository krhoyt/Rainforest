# File Input

`<rf-file-input>` | `RFFileInput`

A trigger that allows users to select one or more files to upload.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/file-input.js" type="module"></script>
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

| Name | Description |
| --- | --- |
| (default) | Text displayed in the file input component. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `accept` | `string` | Specifies the native file input accept. | - | `null` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `invalid` | `boolean` | Overrides the invalidation state. | - | `false` | ✅ |
| `multiple` | `boolean` | Specifies the native file input multiple attribute to allow users entering more than one file. | - | `null` | ✅ |
| `value` | `array<File>` | Specifies the currently selected file(s). | - | `null` | ❌ |
| `variant` | `string` | Variant of the file input. | `button` \| `icon` | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-change` | Called when the user selects new file(s), or removes a file. | `{value: array<File>}` |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Focuses the underlying native button. | - |

## Parts

| Name | Description |
| --- | --- |
| `button` | Inner action `button`. |
| `icon` | Inner `svg` element holding the icon. |
| `label` | Inner `span` element for the action `button`. |

## Variables

None

## Dependencies

None
