# Flashbar

`<rf-flashbar>` | `RFFlashbar`

Displays one or more page-level flash notifications to communicate the status of a user’s action, such as success, failed, and so on.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/flashbar.js" type="module"></script>
```

## Examples

### Info

``` html
<rf-flashbar dismissable>
  <p>
    This is an info flash message. It contains
    <rf-link href="#" label="a link to another page"></rf-link>.
  </p>
</rf-flashbar>
```

### Success

``` html
<rf-flashbar dismissable type="success">
  <rf-label text="This is a success flash message."></rf-label>
  <rf-button label="View instance" slot="action"></rf-button>
</rf-flashbar>
```

### Error

``` html
<rf-flashbar dismissable header="Failed to update 4 instances" type="error">
  <rf-label text="This is a dismissible error message."></rf-label>
</rf-flashbar>
```

### Warning

``` html
<rf-flashbar dismissable type="warning">
  <rf-label text="This is a wanring flash message."></rf-label>
</rf-flashbar>    
```

### Loading state

``` html
<rf-flashbar dismissable loading type="info">
  <rf-label text="This is an in progress flash message."></rf-label>
</rf-flashbar>
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Specifies the primary text displayed in the flash element. |
| `action` | Specifies an action for the flash message. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `dismissable` | `boolean` | Determines whether the component includes a close button icon. | `true` \| `false` | `false` | ✅ |
| `header` | `string` | Title text used in the flash element. | - | `null` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `loading` | `boolean` | Replaces the status icon with a spinner and forces the type to info. | `true` \| `false` | `false` | ✅ |
| `type` | `string` | ndicates the type of the message to be displayed. | `success` \| `error` \| `warning` \| `info` | `info` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-dismiss` | Called when the user clicks on the dissmiss button. | - |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `action` | Slot wrapper `div` element for action elements. |
| `button` | Internal `button` used to dismiss flash element. |
| `content` | Slot wrapper `div` element for content elements. |
| `flash` | Wrapper `div` element for flash element. |
| `header` | Internal `p` element used for header text. |
| `message` | Internal `div` for center column of header and content elements. |
| `status` | Internal `rf-status-indicator` used for icons. |
| `vector` | Internal `svg` used for dismiss icon. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--flashbar-background-color` | Background color for the flash element. | `#0972d3` |

## Dependencies

- `<rf-status-indicator>`
