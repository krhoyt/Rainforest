# Link

A link component is an anchor tag that defines a hyperlink, which a user can interact with to find out more information about a concept, task, or field.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/link.js" type="module"></script>
```

``` html
<rf-link>Secondary link</rf-link>
<rf-link variant="primary">Primary link</rf-link>
<rf-link external>Learn more</rf-link>
<rf-link variant="info">Info</rf-link>    
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | Link content |

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `data` | `Object` | Arbitrary data storage |

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `color` | `normal` \| `inverted` | Color of the text in the paragraph element |
| `concealed` | `boolean` | Do not show, but leave in DOM flow |      
| `external` | `boolean` | Show icon for external link |
| `font-size` | `body-s` \| `body-m` \| `heading-xs` \| `heading-s` \| `heading-m` \| `heading-l` \| `heading-xl` \| `display-l` | Font size of the span element |
| `hidden` | `boolean` | Do not show in DOM |      
| `href` | `string` | Link destination URL |      
| `rel` | `string` | Link relation |
| `target` | `string` | Browser window or tab for content |
| `variant` | `primary` \| `secondary` \| `info` \| `awsui-value-large` | Applies combination of font size and weight to span element |

## Events

| Name | Description |
| --- | --- |
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
| `span` | Inner button label |

## Dependencies

- `rf-icon`
