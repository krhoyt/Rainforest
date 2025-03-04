# Button

`<rf-button>` | `RFButton`

Allows users to initiate actions in the user interface.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/button.js" type="module"></script>
```

## Examples

### Primary button

``` html
<rf-button variant="primary">Button</rf-button>
```

### Normal button

``` html
<rf-button>Button</rf-button>
```

### Link button

``` html
<rf-button variant="link">Button</rf-button>
```

### Inline link button

``` html
<rf-button variant="inline-link">Download</rf-button>  
```

### Icon button

``` html
<rf-button variant="icon">
  <rf-icon name="settings" slot="icon"></rf-icon>
</rf-button>
```

### Inline icon button

``` html
<rf-button variant="inline-icon">
  <rf-icon name="copy" slot="icon"></rf-icon>  
</rf-button>
```

### External link button

``` html
<rf-button 
  external
  href="https://example.com" 
  target="_blank">
  Report a bug
</rf-button>
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Text displayed in the button element. |
| `icon` | Specifies a custom icon. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `disabled` | `boolean` | Renders the button as disabled and prevents clicks. | - | `false` | ✅ |
| `download` | `boolean` \| `string` | Specifies whether the linked URL, when selected, will prompt the user to download instead of navigate. | - | `null` | ✅ |
| `hidden` | `boolean` | Hides element from DOM. | - | `false` | ✅ |
| `href` | `string` | Applies button styling to a link. | - | `null` | ✅ | 
| `icon-align` | `string` | Specifies the alignment of the icon. | `left` \| `right` | `left` | ✅ | 
| `loading` | `boolean` | Renders the button as being in a loading state. | - | `false` | ✅ |
| `rel` | `string` | Adds a rel attribute to the link. | - | `null` | ✅ |
| `target` | `string` | Specifies where to open the linked URL (for example, to open in a new browser window or tab use _blank). | - | `null` | ✅ |
| `variant` | `string` | Determines the general styling of the button. | `normal` \| `primary` \| `link` \| `icon` \| `inline-icon` \| `inline-link` | `normal` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-click` | Called when the user clicks on the button and the button is not disabled or in loading state. | `{altKey: boolean, ctrlKey: boolean, metaKey: boolean, shiftKey: boolean}` |
| `rf-follow` | Called when the user clicks on the button with the left mouse button without pressing modifier keys (that is, CTRL, ALT, SHIFT, META), and the button has an href set. | `{href: string, target: string}` |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Focuses the underlying native button. | - |

## Parts

| Name | Description |
| --- | --- |
| `button` | Inner `button` element. |
| `external` | SVG containing external icon. |
| `label` | Inner `span` element used for the label. |
| `spinner` | Inner `rf-spinner` element used for loading indicator. |
| `svg` | The `svg` use for the icon of the inner `rf-spinner` element. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--button-background-color` | The background color of the enclosed button. | `none` |
| `--button-border-color` | Color of the button border. | `#0972d3` |
| `--button-border-radius` | Corner radius of the button border. | `20px` |
| `--button-border-style` | How to draw the button border. | `solid` |
| `--button-border-width` | The width of the button border. | `2px` |
| `--button-color` | Color of the label used for the button. | `#0972d3` |
| `--button-cursor` | Style of cursor to use when mouse is over button. | `pointer` |
| `--button-font-size` | Size of the label used on the button. | `14px` |
| `--button-font-weight` | Weight of the label used on the button. | `700` |
| `--button-height` | Height of the button. | `32px` |
| `--button-hover-background-color` | Background color used when the mouse is over the button. | `#f2f8fd` |
| `--button-hover-border-color` | Border color used when the mouse is over the button. | `#033160` |
| `--button-hover-color` | Color for the label when the mouse is over the button. | `#033160` |
| `--button-line-height` | Line height of the label used on the button. | `20px` |
| `--button-margin` | Margins to be applied to the button. | `0` |
| `--button-padding` | Padding to be applied to the button. | `4px 20px 4px 20px` |

## Dependencies

- `<rf-spinner>`
