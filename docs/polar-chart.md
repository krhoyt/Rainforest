# Polar Chart

The polar chart is similar to a usual pie chart, except sectors have equal angles and differ rather in how far each sector extends from the center of the circle.

> This is not a standard part of Cloudscape. It is a derivative of the Cloudscape Area Chart style, applied for a specific purpose.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/polar-chart.js" type="module"></script>
```

## Examples

``` html
<rf-polar-chart 
  height="300"
  maximum="5">
  <rf-box color="text-status-inactive" font-weight="bold" slot="empty">
    No data available
  </rf-box>
  <rf-box color="text-status-inactive" slot="empty">
    There is no data available
  </rf-box>
</rf-polar-chart>
```

``` javascript
const chart = document.querySelector( 'rf-polar-chart' );
chart.categories = [
  "General Security",
  "Data Protection", 
  "Infrastructure Security",
  "IAM",
  "Detective Controls",
  "Incident Response",
  "AWS Services"
];
chart.series = [
  {title: 'Data (C:)', data: [2.5, 3, 3.5, 3, 3.25, 2, 3.5]}
];
```

## Slots

| Name | Description |
| --- | --- |
| `empty` | Content that is displayed when the data passed to the component is empty. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `categories` | `array<string>` | The labels to use for each of the sections | - | `null` | ✅ |
| `height` | `number` | An optional pixel value number that fixes the height of the chart area. | - | `500` | ✅ |
| `hide-labels` | `boolean` | When set to true, the labels on the outside of the chart are not displayed. | - | `false` | ✅ |
| `hide-levels` | `boolean` | When set to true, the concentric value shapes chart are not displayed. | - | `false` | ✅ |
| `hide-metrics` | `boolean` | When set to true, the labels displaying values are not displayed. | - | `false` | ✅ |
| `maximum` | `number` | The value to consider as maximum for the chart. Will be calculated from series if not present. | - | `null` | ✅ |
| `series` | `array<{title: string, data: array<number>}>` | Array that represents the source of data for the displayed chart. | - | `null` | ❌ |
| `use-circles` | `boolean` | When set to true, the concentric values are displayed as circles. | - | `false` | ✅ |

## Events

None

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

None
