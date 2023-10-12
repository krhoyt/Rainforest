# Status Indicator

A status indicator communicates the state of a resource — either in its entirety or a particular facet of a resource — in a compact form that is easily embedded in a card, table, list, or header view.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/status-indicator.js" type="module"></script>
```

``` html
<rf-spinner></rf-spinner>
<rf-spinner size="large"></rf-spinner>
<rf-spinner variant="disabled"></rf-spinner>        
```

## Slots

| Name | Description |
| --- | --- |
| (`content`) | Used for text content |

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `data` | `Object` | Arbitrary data storage |

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `coloroverride` | `blue` \| `grey` \| `green` \| `red` | Force content color despite type |      
| `concealed` | `boolean` | Do not show, but leave in DOM flow |      
| `content` | `string` | Alternative path to the label |      
| `hidden` | `boolean` | Do not show in DOM |      
| `type`  | `error` \| `warning` \| `success` \| `info` \| `stopped` \| `pending` \| `in-progress` \| `loading` | Icon and color styling to use |
| `wraptext` | `boolean` | Multiline support |      

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `box` | Inner `rf-box` element |
| `icon` | Inner `rf-icon` element |
| `spinner` | Inner `rf-spinner` element |

## Dependencies

- `rf-box`
- `rf-icon`
- `rf-spinner`
