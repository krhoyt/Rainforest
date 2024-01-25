# Status Indicator

A status indicator communicates the state of a resource — either in its entirety or a particular facet of a resource — in a compact form that is easily embedded in a card, table, list, or header view.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/status-indicator.js" type="module"></script>
```

## Usage

``` html
<rf-status-indicator type="error">Error</rf-status-indicator>
<rf-status-indicator type="warning">Warning</rf-status-indicator>
<rf-status-indicator>Success</rf-status-indicator>    
<rf-status-indicator type="info">Info</rf-status-indicator>    
<rf-status-indicator type="stopped">Stopped</rf-status-indicator>        
<rf-status-indicator type="pending">Pending</rf-status-indicator>            
<rf-status-indicator type="in-progress">In progress</rf-status-indicator>                
<rf-status-indicator type="loading">Loading</rf-status-indicator>              
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | A text fragment that communicates the status. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `color-override` | `string` | Specifies an override for the status indicator color. | `blue` \| `grey` \| `green` \| `red` \| `white` | `null` | X |
| `type`  | `string` | Specifies the status type. | `error` \| `warning` \| `success` \| `info` \| `stopped` \| `pending` \| `in-progress` \| `loading` | `success` | X |
| `wrap-text` | `boolean` | Specifies if the text content should wrap. | - | `true` | X |      

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `c` | SVG `circle` element inside the `rf-spinner` |
| `content` | Wrapper `div` element for default slot |
| `icon` | Inner `img` element |
| `spinner` | Inner `rf-spinner` element |
| `v` | `svg` element inside the `rf-spinner` |

## Dependencies

- `rf-spinner`
