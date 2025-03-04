# Object

`<rf-object>` | `RFObject`

Non-visual element that represents a JavaScript object. Has some properties common to rendering use-cases, but can be assigned to represent any data.

> Not part of Cloudscape. Used to provide a declarative alternative to programmatically assigning the dataset.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/object.js" type="module"></script>
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

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `data` | `any` | Can be programmatically assigned any valid value. | - | `null` | ❌ |
| `label` | `string` | Common property value. | - | `null` | ✅ |
| `title` | `string` | Common property value used for series title in `rf-pie-chart`. | - | `null` | ✅ |
| `value` | `string` | Common property value used for series value in `rf-pie-chart`. | - | `null` | ✅ |
| `valueAsFloat` | `number` | Value property specifically parsed as float. | - | `null` | ✅ |
| `valueAsInt` | `number` | Value property specifically parsed as integer. | - | `null` | ✅ |

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
