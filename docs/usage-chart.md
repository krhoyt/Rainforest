# Usage Chart

Visualizes one series of data, with an emphasis on the total amount of each data point.

> This is not a standard part of Cloudscape. It is a derivative of the Cloudscape Bar Chart style, applied for a specific purpose.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/usage-chart.js" type="module"></script>
```

## Examples

``` html
<rf-usage-chart 
  description="10 GiB"
  domain="Total Volume size" 
  height="60"
  title="Volume ID: vol-0faa6deaa256cd275 (name tag)">
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
| `options` | `array<{id: string, disabled: boolean, iconName: string, iconAlt: string, iconUrl: string, text: string>` | An array of objects representing options. | - | `null` | ❌ |
| `selected-id`  | `string` | ID of the selected option. | - | `null` | ✅ |

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
