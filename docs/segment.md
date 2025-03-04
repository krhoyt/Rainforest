# Segment

`<rf-segment>` | `RFSegment`

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

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `disabled` | `boolean` | Determines whether the segment is disabled. | - | `false` | ✅ |
| `icon-name` | `string` | Specifies the name of the icon. | - | `null` | ✅ |
| `icon-url` | `string` | Specifies the URL of a custom icon. | - | `null` | ✅ |
| `selected` | `boolean` | Makes this option the selected option. | - | `false` | ✅ |
| `text` | `string` | Specifies the text of the segment. | - | `null` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `icon` | Inner `img` element. |
| `item` | Inner `li` element. |
| `text` | Inner `p` element. |

## Variables

None

## Dependencies

None
