# Calendar

`<rf-calendar>` | `RFCalendar`

With the calendar component, users can select dates.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/calendar.js" type="module"></script>
```

## Examples

### Default

``` html
<rf-calendar></rf-calendar>
```

### With default value

``` html
<rf-calendar value="2018-01-02"></rf-calendar>
```

### With disabled weekends

``` html
<rf-calendar></rf-calendar>
```

``` javascript
const calendar = document.querySelector( 'rf-calendar' );
calendar.isDateEnabled = ( value ) => value.getDay() !== 6 && value.getDay() !== 0;
```

### With month granularity

``` html
<rf-calendar granularity="month"></rf-calendar>
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `granularity` | `string` | Specifies the granularity at which users will be able to select a date. | `day` \| `month` | `day` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `isDateEnabled` | `( value: Date ) => boolean` | Defines whether a particular date is enabled in the calendar or not. | - | `null` | ❌ |
| `value` | `string` | The current input value, in YYYY-MM-DD format. | - | `null` | ✅ |
| `valueAsDate` | `date` | The current input value, as a `Date` object. | - | `null` | ❌ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-change` | Called whenever a user changes the input value (by typing, pasting, or selecting a value). | `{value: string}` |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `calendar` | The `div` containing the days of the month. |
| `controls` | The `div` element containing left, right, and month label. |
| `days` | The `div` for the days of the week. |
| `label` | Internal `p` to display the month and year. |
| `left` | Internal `button` for left (previous). |
| `months` | Internal `div` for month granularity. |
| `right` | Internal `button` for right (next). |

## Variables

None

## Dependencies

None
