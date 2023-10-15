# Alert

A brief message that provides information or instructs users to take a specific action.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/alert.js" type="module"></script>
```

``` html
<rf-alert header="Known issues/limitations" visible>
  Review the documentation to learn about potential
  compatibility issues with specific database
  versions.      
</rf-alert>
<rf-alert type="success" visible>
  Your instance has been created successfully.
</rf-alert>
<rf-alert header="Your instances could not be stopped" type="error" visible>
  Remove the instance from the load balancer before stopping it.
</rf-alert>
<rf-alert type="warning" visible>
  Changing the configuration might require stopping the instance.
</rf-alert>    
<rf-alert header="Versioning is not enabled" visible>
  Versioning is not enabled for objects in bucket [IAM-user].
  <rf-button slot="action">Enable versioning</rf-button>
</rf-alert>
```

## Slots

| Name | Description |
| --- | --- |
| (`content`) | Used for message content |
| `action` | Holds components associated with alert |

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `data` | `Object` | Arbitrary data storage |

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `buttontext` | `string` | Quick labelf for single button inside alert |      
| `concealed` | `boolean` | Do not show, but leave in DOM flow |      
| `content` | `string` | Message body for alert |      
| `dismissable` | `boolean` | Show button to close the alert manually |      
| `header` | `string` | Content with emphasis explaining the alert |      
| `hidden` | `boolean` | Do not show in DOM |      
| `type` | `error` \| `success` \| `warning` \| `info` | Type of styling to use |

## Events

| Name | Description |
| --- | --- |
| `rf-action` | Click in the internal button (not slotted) |
| `rf-dismiss` | Click on the internal close button |

## Methods

| Name | Description |
| --- | --- |
| `focus()` | Focus on the content within the alert |

## Parts

| Name | Description |
| --- | --- |
| `alert` | The `div` holding the alert content |
| `button` | Inner `button` element |
| `close` | The internal close button |
| `icon` | Inner RainforestIcon (`rf-icon`) element |
| `message` | Header and content areas |

## Dependencies

- `rf-box`
- `rf-button`
- `rf-icon`
