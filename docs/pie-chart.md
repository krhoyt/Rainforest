# Pie Chart

`<rf-pie-chart>` | `RFPieChart`

Pie and donut charts visualize the relationship or correlation between data metrics in a dataset.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/pie-chart.js" type="module"></script>
```

## Examples

### Pie chart

``` html
<rf-pie-chart>
  <rf-object title="Running" value="60"></rf-object>
  <rf-object title="Failed" value="30"></rf-object>      
  <rf-object title="In-progress" value="10"></rf-object>
  <rf-object title="Pending" value="0"></rf-object>
</rf-pie-chart>
```

### Donut chart

``` html
<rf-pie-chart
  inner-description="total units"
  inner-value="100"
  size="large"
  variant="donut">
  <rf-object title="Item A" value="40"></rf-object>
  <rf-object title="Item B" value="25"></rf-object>      
  <rf-object title="Item C" value="20"></rf-object>            
  <rf-object title="Item D" value="10"></rf-object>                  
  <rf-object title="Item E" value="5"></rf-object>                        
</rf-pie-chart>    
```

### Small donut chart

``` html
<rf-pie-chart
  hide-legend
  inner-value="80%"
  size="small"
  variant="donut">
  <rf-object title="Complete" value="160"></rf-object>
  <rf-object title="Incomplete" value="40"></rf-object>      
</rf-pie-chart>        
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Populated with `rf-object` elements to represent the dataset. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `data` | `array<{title: string, value: number}>` | An array that represents the source of data for the displayed segments. | - | `null` | ❌ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `hide-legend` | `boolean` | Hides legend beneath the chart when set to `true`. | - | `false` | ✅ |
| `inner-description` | `string` | Additional description that is displayed in the center of the chart below `inner-value` if `variant` is set to `donut`. | - | `null` | ✅ |
| `inner-value` | `string` | Additional metric number that is displayed in the center of the chart if `variant` is set to `donut`. | - | `null` | ✅ |
| `size` | `string` | Specifies the size of the pie or donut chart. | `small` \| `medium` \| `large` | `medium` | ✅ |
| `status` | `string` | Specifies the current status of loading data. | `loading` \| `finished` \| `error` | `finished` | ✅ |
| `variant` | `string` | Visual variant of the pie chart. | `pie` \| `donut` | `pie` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `chart` | Inner `g` element that groups the parts of the chart rendering. |
| `data` | Inner `div` where `rf-object` elements reside to populate the dataset. |
| `donut` | Inner `g` element that holds the center metrics. |
| `empty` | Inner `div` element that holds the content to render when no data is present. |
| `inner-description` | Inner `text` element that holds metric description. |
| `inner-value` | Inner `text` element that holds metric value. |
| `labels` | Inner `g` element that holds the rendered labels. |
| `legend` | Inner `div` where the legend is built based on `title` attributes. |
| `status` | Inner `rf-status-indicator` used for loading state and text. |
| `vector` | Inner `svg` element for rendering the chart. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--pie-chart-height` | Height of the SVG element containing the chart. | `312px` |

## Dependencies

- `<rf-object>`
- `<rf-status-indicator>`
