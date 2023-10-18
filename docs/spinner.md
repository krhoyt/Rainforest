# Spinner

A compact, looped animation giving the user feedback that a process is currently running.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/spinner.js" type="module"></script>
```

## Examples

``` html
<rf-spinner></rf-spinner>
<rf-spinner size="large"></rf-spinner>
<rf-spinner variant="disabled"></rf-spinner>        
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `size` | `string` | Specifies the size of the spinner. | `normal` \| `big` \| `large` | `normal` | ✅ |
| `variant`  | `string` | Specifies the color variant of the spinner. | `normal` \| `disabled` \| `inverted` | `normal` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `circle` | Inner `circle` element. |
| `vector` | Inner `svg` element. |

## Dependencies

None
