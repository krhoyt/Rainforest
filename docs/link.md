# Link

A link component is an anchor tag that defines a hyperlink, which a user can interact with to find out more information about a concept, task, or field.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/link.js" type="module"></script>
```

## Examples

``` html
<rf-link href="#">Secondary link</rf-link>
<rf-link href="#" variant="primary">Primary link</rf-link>
<rf-link external href="https://example.com/">Learn more</rf-link>
<rf-link>Perform action</rf-link>
<rf-link variant="info">Info</rf-link>    
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | The text to render inside the link. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `color` | `string` | Determines the text color of the link and its icon. | `normal` \| `inverted` | `normal` | ✅ |
| `external` | `boolean` | Marks the link as external by adding an icon after the text. | - | `false` | ✅ |
| `font-size` | `string` | Determines the font size and line height. | `body-s` \| `body-m` \| `heading-xs` \| `heading-s` \| `heading-m` \| `heading-l` \| `heading-xl` \| `display-l` | `body-m` | ✅ |
| `href` | `string` | The URL that the link points to. | - | `null` | ✅ |
| `rel` | `string` | Adds a `rel` attribute to the link. | - | `null` | ✅ |
| `target` | `string` | Specifies where to open the linked URL. | - | `null` | ✅ |
| `title` | `string` | Adds a `title` attribute to the link. | - | `null` | ✅ |
| `variant` | `string` | Determines the visual style of the link. | `primary` \| `secondary` \| `info` \| `awsui-value-large` | `secondary` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-follow` | Called when a link is clicked without any modifier keys. | `{external: boolean, href: string, target: string}` |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Sets the browser focus on the anchor element. | - |

## Parts

| Name | Description |
| --- | --- |
| `icon` | Inner `img` element |
| `link` | Inner anchor element |

## Dependencies

None
