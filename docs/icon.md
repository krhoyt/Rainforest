# Icon

With an icon, you can display basic icons that match Cloudscape sizes, colors, and typography.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/icon.js" type="module"></script>
```

## Examples

``` html
<rf-icon name="settings"></rf-icon>
<rf-icon name="search" variant="subtle"></rf-icon>
<rf-icon name="external" variant="link"></rf-icon>
<rf-icon name="lock-private" size="big" variant="disabled"></rf-icon>
<rf-icon name="status-negative" size="large" variant="error"></rf-icon>
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

> Icon color is accomplished using CSS Filters. The `filter` first gets `brightness( 0 )` and `saturate( 100% )` to ensure the icon is flat black (`#000000`). Then additional `filter` values are added to shift to desired color. This will work with SVG and raster icons with transparent backgrounds.

## Slots

| Name | Description |
| --- | --- |
| `svg` | Specifies the SVG of a custom icon. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `name` | `string` | Specifies the icon to be displayed. | Icon names. | `null` | ✅ |
| `path` | `string` | Any need arbitrary path. | - | `null` | ✅ |
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

## Dependencies

None
