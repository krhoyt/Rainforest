# Alert

A brief message that provides information or instructs users to take a specific action.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/alert.js" type="module"></script>
```

## Examples

``` html
<rf-alert>
  <span slot="header">Known issues/limitations</span>
  Review the documentation to learn about potential
  compatibility issues with specific database
  versions.      
</rf-alert>
<rf-alert dismissable type="success">
  Your instance has been created successfully.
</rf-alert>
<rf-alert type="error">
  <span slot="header">Your instances could not be stopped</span>
  Remove the instance from the load balancer before stopping it.
</rf-alert>
<rf-alert type="warning">
  Changing the configuration might require stopping the instance.
</rf-alert>    
<rf-alert>
  <span slot="header">Versioning is not enabled</span>
  Versioning is not enabled for objects in bucket [IAM-user].
  <rf-button slot="action">Enable versioning</rf-button>
</rf-alert>    
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | Primary text displayed in the element. |
| `action` | Specifies an action for the alert message. |
| `header` | Heading text. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `dismissable` | `boolean` | Adds a close button to the alert when set to `true`. | - | `false` | ✅ |
| `type` | `string` | Specifies the type of message you want to display. | `error` \| `success` \| `warning` \| `info` | `info` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-dismiss` | Fired when the user clicks the close icon that is displayed when the `dismissible` property is set to `true`. | - |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | FSets focus on the alert content. | - |

## Parts

| Name | Description |
| --- | --- |
| `alert` | The `div` representing the whole alert. |
| `close` | The `rf-button` when `dismissable`. |
| `content` | The `div` holding the alert content. |
| `header` | This `div` holding the header content. |
| `icon` | Inner `img` element for alert icon |
| `message` | The `div` holding the header and content. |

## Dependencies

- `rf-button`
