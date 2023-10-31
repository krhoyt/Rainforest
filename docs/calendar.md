# Calendar

With the calendar component, users can select dates.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/calendar.js" type="module"></script>
```

## Examples

``` html
<rf-calendar></rf-calendar>
<rf-calendar value="2018-01-02"></rf-calendar>
```

``` javascript
const calendar = document.querySelector( 'rf-calendar' );
calendar.isDateEnabled = ( value ) => value.getDay() !== 6 && value.getDay() !== 0;
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `isDateEnabled` | `( value: Date ) => boolean` | Defines whether a particular date is enabled in the calendar or not | - | `null` | ❌ |
| `start-of-week` | `number` | Determines the starting day of the week. | - | `null` | ✅ |
| `value` | `string` | The current input value, in YYYY-MM-DD format. | - | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-change` | Called whenever a user changes the input value (by typing, pasting, or selecting a value). | `{value: string}` |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `calendar` | Days of the month |
| `controls` | Left, right, and month label |
| `days` | Days of the week |
| `left` | Internal `button` for left |
| `month` | Internal `p` for month label |
| `right` | Internal `button` for left |

## Dependencies

None
