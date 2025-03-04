# Alert

`<rf-alert>` | `RFAlert`

A brief message that provides information or instructs users to take a specific action.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/alert.js" type="module"></script>
```

## Examples

### Info

``` html
<rf-alert header="Known issues/limitations">
  Review the documentation to learn about potential compatibility issues with specific database versions.  
</rf-alert>
```

### Success

``` html
<rf-alert dismissable type="success">
  Your instance has been created successfully.  
</rf-alert>
```

### Error

``` html
<rf-alert 
  header="Your instances could not be stopped" 
  type="error">
  Remove the instance from the load balancer before stopping it.  
</rf-alert>
```

### Warning

``` html
<rf-alert type="warning">
  Changing the configuration might require stopping the instance.  
</rf-alert>    
```

### With button

``` html
<rf-alert header="Versioning is not enabled">
  Versioning is not enabled for objects in bucket [IAM-user].  
  <rf-button 
    label="Enable versioning" 
    slot="action">
  </rf-button>
</rf-alert>    
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Primary text displayed in the element. |
| `action` | Specifies an action for the alert message. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `dismissable` | `boolean` | Adds a close button to the alert when set to `true`. | - | `false` | ✅ |
| `header` | `string` | Heading text. | - | `null` | ✅ |
| `hidden` | `boolean` | Remove element from DOM layout. | - | `false` | ✅ |
| `type` | `string` | Specifies the type of message you want to display. | `error` \| `success` \| `warning` \| `info` | `info` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-dismiss` | Fired when the user clicks the close icon that is displayed when the `dismissible` property is set to `true`. | - |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Sets focus on the alert content. | - |

## Parts

| Name | Description |
| --- | --- |
| `alert` | The `div` representing the whole alert. |
| `close` | The `button` when `dismissable`. |
| `content` | The `p` element holding the alert content. |
| `header` | The `p` element holding the alert title. |
| `icons` | The `div` holding the icon components. |
| `message` | The `div` holding the title and content. |
| `vector` | The `svg` element holding the alert icon. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--alert-background-color` | The background color of the alert. | `#f2f8fd` |
| `--alert-border-color` | The border color of the alert. | `#0972d3` |
| `--alert-color` | Color of the text content. | `#000716` |
| `--alert-header-color` | Color of the title content. | `#000716` |

## Dependencies

- `<rf-icon-close>`
- `<rf-icon-status-info>`
- `<rf-icon-status-negative>`
- `<rf-icon-status-positive>`
- `<rf-icon-status-warning>`
