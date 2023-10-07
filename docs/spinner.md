# Spinner

A compact, looped animation giving the user feedback that a process is currently running.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/spinner.js" type="module"></script>
```

``` html
<rf-spinner></rf-spinner>
<rf-spinner size="large"></rf-spinner>
<rf-spinner variant="disabled"></rf-spinner>        
```

## Slots

None

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `data` | `Object` | Arbitrary data storage |

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `concealed` | `boolean` | Do not show, but leave in DOM flow|      
| `hidden` | `boolean` | Do not show in DOM |      
| `size` | `normal` \| `big` \| `large` | Predefined sizes consistent with design system |      
| `variant`  | `normal` \| `disabled` \| `inverted` | Changes color of graphic |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `circle` | Inner `circle` element |
| `vector` | Inner `svg` element |

## Dependencies

None
