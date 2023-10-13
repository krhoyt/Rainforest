# Icon

With an icon, you can display basic icons that match Cloudscape sizes, colors, and typography.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
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
| `color` | `string` | Hexidecimal color override |      
| `concealed` | `boolean` | Do not show, but leave in DOM flow |      
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
