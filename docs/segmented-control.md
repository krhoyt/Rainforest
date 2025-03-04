# Segmented Control

`<rf-segmented-control>` | `RFSegmentedControl`

With a segmented control, users can toggle between different ways of formatting a piece of content or data.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/segmented-control.js" type="module"></script>
```

## Examples

### Default

``` html
<rf-segmented-control>
  <rf-segment id="seg-1" text="Segment 1"></rf-segment>
  <rf-segment id="seg-2" text="Segment 2"></rf-segment>
  <rf-segment id="seg-3" text="Segment 3"></rf-segment>            
</rf-segmented-control>
```

### With a disabled segment

``` html
<rf-segmented-control selected-id="seg-1">
  <rf-segment id="seg-1" text="Segment 1"></rf-segment>
  <rf-segment disabled id="seg-2" text="Segment 2"></rf-segment>
  <rf-segment id="seg-3" text="Segment 3"></rf-segment>            
</rf-segmented-control>
```

### With icons and text

``` html
<rf-segmented-control selected-id="seg-1">
  <rf-segment icon-name="view-full" id="seg-1" text="Segment 1"></rf-segment>
  <rf-segment icon-name="view-horizontal" id="seg-2" text="Segment 2"></rf-segment>
  <rf-segment icon-name="view-vertical" id="seg-3" text="Segment 3"></rf-segment>            
</rf-segmented-control>
```

### With icons only

``` html
<rf-segmented-control selected-id="seg-1">
  <rf-segment icon-name="view-full" id="seg-1"></rf-segment>
  <rf-segment icon-name="view-horizontal" id="seg-2"></rf-segment>
  <rf-segment icon-name="view-vertical" id="seg-3"></rf-segment>            
</rf-segmented-control>
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Segmented options to display. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `label` | `string` | Defines the label of the entire segmented control. | - | `null` | ✅ |
| `selected-id` | `string` | ID of the selected option. | - | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-change` | Called when the user selects a different segment. | `{selectedId: boolean}` |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `control` | Inner `ul` element. |

## Variables

None

## Dependencies

- `<rf-segment>`
