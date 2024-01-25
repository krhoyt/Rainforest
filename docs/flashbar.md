# Flashbar

Displays one or more page-level flash notifications to communicate the status of a user’s action, such as success, failed, and so on.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/flashbar.js" type="module"></script>
```

## Examples

``` html
<rf-flashbar name="settings"></rf-flashbar>
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | Specifies the primary text displayed in the flash element. |
| `action` | Specifies an action for the flash message. |
| `header` | Specifies the heading text. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `dismissable` | `boolean` | Determines whether the component includes a close button icon. | `true` \| `false` | `false` | ✅ |
| `loading` | `boolean` | eplaces the status icon with a spinner and forces the type to info. | `true` \| `false` | `false` | ✅ |
| `type` | `string` | ndicates the type of the message to be displayed. | `success` \| `error` \| `warning` \| `info` | `info` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `content` | Slot wrapper `div` element. |
| `flash` | Wrapper `div` element for alert box. |
| `header` | Slot wrapper `div` element. |

## Dependencies

- rf-status-indicator
- rf-icon
