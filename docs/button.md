# Button

Initiate actions in the user interface.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/controls/button.js" type="module"></script>
```

``` html
<rf-button variant="primary">Button</rf-button><br>        
<rf-button>Button</rf-button><br> 
<rf-button variant="link">Button</rf-button><br>
<rf-button variant="inline-link">Download</rf-button><br>  
<rf-button icon-name="settings" variant="icon"></rf-button><br>  
<rf-button icon-name="copy" variant="inline-icon"></rf-button><br>  
<rf-button 
  href="https://example.com" 
  icon-align="right" 
  icon-name="external" 
  target="_blank">
  Report a bug
</rf-button>
```

## Styles

None

## Slots

| Name | Description |
| --- | --- |
| (`default`) | Used for text content |

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `data` | `Object` | Arbitrary data storage |

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `concealed` | `boolean` | Do not show, but leave in DOM flow|      
| `disabled` | `boolean` | Show as disabled by altering the color |
| `download` | `boolean` \| `string` | Provides download file name, or specifies link to be downloaded |
| `hidden` | `boolean` | Do not show in DOM |      
| `href` | `string` | Link destination URL |      
| `icon-align` | `left` \| `right` | Placement of icon before or after the label |
| `icon-name` | `string` | Name of icon to use |
| `loading` | `boolean` | Display a spinning loading icon |
| `rel` | `string` | Link relation |
| `target` | `string` | Browser window or tab for content |
| `variant` | `normal` \| `primary` \| `link` \| `icon` \| `inline-icon` \| `inline-link` | Type of styling to use |

## Events

| Name | Description |
| --- | --- |
| `rf-click` | Click even from inner `button` with added properties |
| `rf-follow` | Click on `button` element designated as a link |

## Methods

| Name | Description |
| --- | --- |
| `focus()` | Focus on inner `button` element |

## Parts

| Name | Description |
| --- | --- |
| `button` | Inner `button` element |
| `icon` | Inner RainforestIcon (`rf-icon`) element |
| `loading` | Loading RainforestIcon (`rf-icon`) element |

## Dependencies

- `rf-icon`
