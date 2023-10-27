# Button

Allows users to initiate actions in the user interface.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/button.js" type="module"></script>
```

<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/button.js" type="module"></script>
<rf-button variant="primary">Button</rf-button>

## Examples

``` html
<rf-button variant="primary">Button</rf-button>
<rf-button>Button</rf-button>
<rf-button variant="link">Button</rf-button>
<rf-button variant="inline-link">Download</rf-button>  
<rf-button icon-name="settings" variant="icon"></rf-button>
<rf-button icon-name="copy" variant="inline-icon"></rf-button>
<rf-button 
  href="https://example.com" 
  icon-align="right" 
  icon-name="external" 
  target="_blank">
  Report a bug
</rf-button>
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | Text displayed in the button element. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `disabled` | `boolean` | Renders the button as disabled and prevents clicks. | - | `false` | ✅ |
| `download` | `boolean` \| `string` | Specifies whether the linked URL, when selected, will prompt the user to download instead of navigate. | - | `null` | ✅ |
| `href` | `string` | Applies button styling to a link. | - | `null` | ✅ | 
| `icon-align` | `string` | Specifies the alignment of the icon. | `left` \| `right` | `left` | ✅ | 
| `icon-name` | `string` | Displays an icon next to the text. | Icon names. | `null` | ✅ | 
| `loading` | `boolean` | Renders the button as being in a loading state. | - | `false` | ✅ |
| `rel` | `string` | Adds a rel attribute to the link. | - | `null` | ✅ |
| `target` | `string` | Specifies where to open the linked URL (for example, to open in a new browser window or tab use _blank). | - | `null` | ✅ |
| `variant` | `string` | Determines the general styling of the button. | `normal` \| `primary` \| `link` \| `icon` \| `inline-icon` \| `inline-link` | `normal` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-click` | Called when the user clicks on the button and the button is not disabled or in loading state. | - |
| `rf-follow` | Called when the user clicks on the button with the left mouse button without pressing modifier keys (that is, CTRL, ALT, SHIFT, META), and the button has an href set. | `{external: boolean, href: string, target: string}` |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Focuses the underlying native button. | - |

## Parts

| Name | Description |
| --- | --- |
| `button` | Inner `button` element |
| `icon` | Inner `img` element |
| `loading` | Inner `rf-spinner` element |

## Dependencies

- `rf-spinner`
