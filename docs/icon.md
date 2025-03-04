---
cloudscape: true
development: false
implemented: true
name: Icon
permalink: components/icon.html
planned: false
tbd: false
---

# Icon

`<rf-icon>` | `RFIcon`

With an icon, you can display basic icons that match Cloudscape sizes, colors, and typography.

> Icon color is accomplished using CSS Filters. The `filter` first gets `brightness( 0 )` and `saturate( 100% )` to ensure the icon is flat black (`#000000`). Then additional `filter` values are added to shift to desired color. This will work with SVG and raster icons with transparent backgrounds.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/icon.js" type="module"></script>
```

## Examples

### Settings

``` html
<rf-icon name="settings"></rf-icon>
```

### Subtle search

``` html
<rf-icon name="search" variant="subtle"></rf-icon>
```

### External link

``` html
<rf-icon name="external" variant="link"></rf-icon>
```

### Big disabled lock

``` html
<rf-icon name="lock-private" size="big" variant="disabled"></rf-icon>
```

### Large status error

``` html
<rf-icon name="status-negative" size="large" variant="error"></rf-icon>
```

### With custom SVG icon

``` html
<rf-icon>
  <svg height="16" slot="svg" stroke-width="2" width="16">
    <g>
      <line x1="5.5" y1="12" x2="5.5" y2="15" />
      <line x1="0.5" y1="15" x2="10.5" y2="15" />
      <rect x="1" y="5" width="9" height="7" />
      <polyline points="5 4 5 1 14 1 14 8 10 8" />
    </g>
  </svg>      
</rf-icon>
```

## Slots

| Name | Description |
| --- | --- |
| `svg` | Specifies the SVG of a custom icon. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `hidden` | `boolean` | Remove from DOM layout. | - | `false` | ✅ |
| `name` | `string` | Specifies the icon to be displayed. | Icon names. | `null` | ✅ |
| `path` | `string` | Any needed arbitrary path information. | - | `null` | ✅ |
| `size` | `string` | Specifies the size of the icon. | `small` \|  `medium` \| `normal` \| `big` \| `large` | `normal` | ✅ |
| `url` | `string` | Specifies the URL of a custom icon. | - | `null` | ✅ |
| `variant` | `string` | Specifies the color variant of the icon. | `normal` \| `disabled` \| `error` \| `inverted` \| `link` \| `subtle` \| `success` \| `warning` | `normal` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `icon` | Inner `img` element. |
| `vector` | Slot wrapper `div` element. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--icon-cursor` | Cursor used when mouse is over icon. | `default` |
| `--icon-filter` | Apply a custom color to the icon. | `brightness( 0 ) saturate( 100% ) invert( 4% ) sepia( 24% ) saturate( 4129% ) hue-rotate( 186deg ) brightness( 102% ) contrast( 107% )` |
| `--icon-height` | Height of the icon. | `16px` |
| `--icon-object-fit` | Used for placing the icon in an `img` element. | `contain` |
| `--icon-width` | Width of the icon. | `16px` |

## Dependencies

None
