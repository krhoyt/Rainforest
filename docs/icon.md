# Icon

With an icon, you can display basic icons that match Cloudscape sizes, colors, and typography.

## Usage

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/icon.js" type="module"></script>
```

``` html
<rf-icon name="settings"></rf-icon>
<rf-icon name="search" variant="subtle"></rf-icon>
<rf-icon name="external" variant="link"></rf-icon>
<rf-icon name="lock-private" size="big" variant="disabled"></rf-icon>
<rf-icon name="status-negative" size="large" variant="error"></rf-icon>
<rf-icon size="large" url="../img/writer.svg"></rf-icon>
```

> Icon color is accomplished using CSS Filters. The `filter` first gets `brightness( 0 )` and `saturate( 100% )` to ensure the icon is flat black (`#000000`). Then additional `filter` values are added to shift to desired color. This will work with SVG and raster icons with transparent backgrounds.

## Slots

None

## Properties

None

## Attributes

| Name | Type | Description | Values | Default | Required |
| --- | --- | --- | --- | --- | --- |
| `name` | `string` | Specifies the icon to be displayed. | Icon names. | `null` | `false` |
| `path` | `string` | Any need arbitrary path. | - | `null` | `false` |
| `size` | `string` | Specifies the size of the icon. | `small` \|  `medium` \| `normal` \| `big` \| `large` | `normal` | `false` |
| `url` | `string` | Specifies the URL of a custom icon. | - | `null` | `false` |
| `variant` | `string` | Specifies the color variant of the icon. | `normal` \| `disabled` \| `error` \| `inverted` \| `link` \| `subtle` \| `success` \| `warning` | `normal` | `false` |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `icon` | Inner `img` element. |

## Dependencies

None
