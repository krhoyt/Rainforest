# Spinner

`<rf-spinner>` | `RFSpinner`

A compact, looped animation giving the user feedback that a process is currently running.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/spinner.js" type="module"></script>
```

## Examples

### Default

``` html
<rf-spinner></rf-spinner>
```

### Large

``` html
<rf-spinner size="large"></rf-spinner>
```

### Disabled

``` html
<rf-spinner disabled></rf-spinner>        
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `disabled` | `boolean` | Show spinner as disabled (still animates). | - | `false` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `inverted` | `boolean` | Display animation in white (useful on colored elements). | - | `false` | ✅ |
| `size` | `string` | Specifies the size of the spinner. | `normal` \| `big` \| `large` | `normal` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `vector` | Inner `svg` element. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--spinner-indicator-color` | Color for the part of the track that is generally visible. | `#000716` |
| `--spinner-speed` | Duration of the animation. | `2s` |
| `--spinner-track-color` | Color for the part of track that is not generally visible | `transparent` |
| `--spinner-track-width` | Thickness of the track. | `2px` |

## Dependencies

None
