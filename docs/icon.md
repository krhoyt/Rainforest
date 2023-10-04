# Icon

Display basic icons that match Cloudscape sizes, colors, and typography.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/controls/icon.js" type="module"></script>
```

``` html
<rf-icon name="settings"></rf-icon>
<rf-icon name="search" variant="subtle"></rf-icon>
<rf-icon name="external" variant="link"></rf-icon>
<rf-icon name="lock-private" size="big" variant="disabled"></rf-icon>
<rf-icon name="status-negative" size="large" variant="error"></rf-icon>
<rf-icon size="large" url="../img/writer.svg"></rf-icon>
```

## Styles

| Name | Value |
| --- | --- |
| `--icon-color` | `#000716` |
| `--icon-cursor` | `default` |
| `--icon-height` | `16px` |
| `--icon-object-fit` | `contain` |
| `--icon-width` | `16px` |
| `--icon-color-disabled` | `#9ba7b6` |
| `--icon-color-subtle` | `#5f6b7a` |
| `--icon-color-error` | `#d91515` |
| `--icon-color-info` | `#0972d3` |
| `--icon-color-inverted` | `#ffffff` |
| `--icon-color-success` | `#037f0c` |

> Icon color is accomplished using CSS Filters. The `filter` first gets `brightness( 0 )` and `saturate( 100% )` to ensure the icon is flat black (`#000000`). Then additional `filter` values are added to shift to desired color. This will work with SVG and GIF icons with transparent backgrounds.

## Slots

None

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `data` | `Object` | Arbitrary data storage |

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `concealed` | `boolean` | Do not show, but leave in DOM flow|      
| `hidden` | `boolean` | Do not show in DOM |      
| `name` | `string` | Name of icon to use |
| `path` | `string` | Any need arbitrary path |
| `size` | `small` \|  `medium` \| `normal` \| `big` \| `large` | Predefined sizes consistent with design system |      
| `url` | `string` | URL to custom icon image to be used |      
| `variant`  | `normal` \| `disabled` \| `error` \| `inverted` \| `link` \| `subtle` \| `success` \| `warning` | Changes icon color to match desing system |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `icon` | Inner image (`img`) element |

## Dependencies

None
