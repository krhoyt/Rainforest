# Segmented Control

With a segmented control, users can toggle between different ways of formatting a piece of content or data.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/segmented-control.js" type="module"></script>
```

## Examples

``` html
<rf-segmented-control selected-id="seg-1"></rf-segmented-control>
<rf-segmented-control selected-id="seg-1"></rf-segmented-control>    
<rf-segmented-control selected-id="seg-1"></rf-segmented-control>       
<rf-segmented-control selected-id="seg-1"></rf-segmented-control>            
```

``` javascript
const controls = document.querySelectorAll( 'rf-segmented-control' );
controls[0].options = [
  {text: 'Segment 1', id: 'seg-1'},
  {text: 'Segment 2', id: 'seg-2'},
  {text: 'Segment 3', id: 'seg-3'}
];
controls[1].options = [
  {text: 'Segment 1', id: 'seg-1'},
  {disabled: true, text: 'Segment 2', id: 'seg-2'},
  {text: 'Segment 3', id: 'seg-3'}
];      
controls[2].options = [
  {iconName: 'view-full', text: 'Segment 1', id: 'seg-1'},
  {iconName: 'view-horizontal', text: 'Segment 2', id: 'seg-2'},
  {iconName: 'view-vertical', text: 'Segment 3', id: 'seg-3'}
];            
controls[3].options = [
  {iconName: 'view-full', iconAlt: 'Segment 1', id: 'seg-1'},
  {iconName: 'view-horizontal', iconAlt: 'Segment 2', id: 'seg-2'},
  {iconName: 'view-vertical', iconAlt: 'Segment 3', id: 'seg-3'}
];                  
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `options` | `array<{id: string, disabled: boolean, iconName: string, iconAlt: string, iconUrl: string, text: string>` | An array of objects representing options. | - | `null` | ❌ |
| `selected-id`  | `string` | ID of the selected option. | - | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-change` | Called when the user selects a different segment. | `{selectedId: boolean}` |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `list` | Inner `ul` element. |

## Dependencies

- `cf-segmented-control-option`
