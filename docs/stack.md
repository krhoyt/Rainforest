# Stack

`<rf-stack>` | `RFStack`

Shows a single child at a time.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/stack.js" type="module"></script>
```

## Examples

### Default

``` html
<rf-stack>
  <rf-label text="One"></rf-label>
  <rf-label text="Two"></rf-label>
  <rf-label text="Three"></rf-label>
</rf-stack>
```

### With selected index

``` html
<rf-stack selected-index="1">
  <rf-label text="One"></rf-label>
  <rf-label text="Two"></rf-label>
  <rf-label text="Three"></rf-label>
</rf-stack>    
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Children elements to be stacked. |

## Attributes

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `selected-index` | `number` | Index of child element to show. | - | `0` | ✅ |

## Events

None

## Methods

None

## Parts

None

## Variables

None

## Dependencies

None
