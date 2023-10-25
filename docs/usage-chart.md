# Usage Chart

Visualizes one series of data, with an emphasis on the total amount of each data point.

> This is not a standard part of Cloudscape. It is a derivative of the Cloudscape Bar Chart style, applied for a specific purpose.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/usage-chart.js" type="module"></script>
```

## Examples

``` html
<rf-usage-chart 
  description="10 GiB"
  domain="Total Volume size" 
  height="60"
  title="Volume ID: vol-0faa6deaa256cd275 (name tag)">
  <rf-box color="text-status-inactive" font-weight="bold" slot="empty">
    No data available
  </rf-box>
  <rf-box color="text-status-inactive" slot="empty">
    There is no data available
  </rf-box>
</rf-usage-chart>
```

``` javascript
const series = [
  {title: 'Data (C:)', data: 2},
  {title: 'Image (D:)', data: 1},
  {title: 'Video (D:)', data: 7},
  {title: 'Unallocated', data: 0}
];
const chart = document.querySelector( 'rf-usage-chart' );
chart.legendFormatter = ( series, total ) => series.title + ' ' + series.data + ' GiB';
chart.series = series;
chart.addEventListener( 
  'rf-highlight-change', 
  ( evt ) => console.log( evt.detail.highlightedSeries ) 
);
```

## Slots

| Name | Description |
| --- | --- |
| `empty` | Content that is displayed when the data passed to the component is empty. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `description` | `string` | Further description of the domain title if needed. | - | `null` | ✅ |
| `domain` | `string` | Determines the domain of the x-axis, i.e. the range of values that will be visible in the chart. | - | `null` | ✅ |
| `error-text` | `string` | Text that is displayed when the chart is in error state, i.e. when statusType is set to "error". | - | `null` | ✅ |
| `height` | `number` | An optional pixel value number that fixes the height of the chart area. | - | `60` | ✅ |
| `hide-legend` | `boolean` | When set to true, the legend beneath the chart is not displayed. | - | `false` | ✅ |
| `legend-formatter` | `function( object, number )` | Custom formatting of the legend labels. | - | `null` | ❌ |
| `legend-title` | `string` | Optional title for the legend. | - | `null` | ✅ |
| `loading-text` | `string` | Text that is displayed when the chart is loading, i.e. when statusType is set to "loading". | - | `null` | ✅ |
| `series` | `array<title: string, data: number>` | Array that represents the source of data for the displayed chart. | - | `null` | ❌ |
| `status-type` | `string` | Specifies the current status of loading data. | `loading` \| `finished` \| `error` | `finished` | ✅ |
| `title` | `string` | The title of chart. | - | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-highlight-change` | Called when the highlighted series has changed because of user interaction. | `{highlightedSeries: object}` |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `chart` | Inner `div` element holding the chart content. |
| `description` | Inner `p` element representing the chart description. |
| `domain` | Inner `p` element representing the domain title. |
| `empty` | Inner `div` element holding the empty content. |
| `error` | Inner `div` element holding the error indicator. |
| `group` | Inner `div` element holding the title parts. |
| `legend` | Inner `div` element holding the legend description. |
| `legend-title` | Inner `p` element representing the legend title. |
| `loading` | Inner `div` element holding the loading indicator. |
| `series` | Inner `div` element representing the series data. |
| `title` | Inner `p` element representing the chart title. |
| `usage` | Inner `div` element representing the series chart. |

## Dependencies

- `rf-status-indicator`
