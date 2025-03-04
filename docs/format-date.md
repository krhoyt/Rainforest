# Format Date

`<rf-format-date>` | `RFFormatDate`

Formats a date/time using the specified locale and options.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/format-date.js" type="module"></script>
```

## Examples

### Specified date

``` html
<rf-format-date 
  date="2004-06-04T01:17:00-06:00">
</rf-format-date>
```

### Human-readable date

``` html
<rf-format-date
  day="numeric"  
  month="long" 
  year="numeric">
</rf-format-date>
```

### Time

``` html
<rf-format-date 
  hour="numeric" 
  minute="numeric">
</rf-format-date>
```

### Weekday

``` html
<rf-format-date 
  weekday="long">
</rf-format-date> 
```

### Month

``` html
<rf-format-date 
  month="long">
</rf-format-date>
```

### Year

``` html
<rf-format-date 
  year="numeric">
</rf-format-date>
```

### No formatting options

``` html
<rf-format-date></rf-format-date>
```

### Hour formatting

``` html
<rf-format-date 
  hour="numeric" 
  minute="numeric" 
  hour-format="12">
</rf-format-date>

<rf-format-date 
  hour="numeric" 
  minute="numeric" 
  hour-format="24">
</rf-format-date>
```

### Localization

``` html
English: <rf-format-date lang="en"></rf-format-date>

French: <rf-format-date lang="fr"></rf-format-date>

Russian: <rf-format-date lang="ru"></rf-format-date>     
```

## Slots

None

## Attributes

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `date` | `string` | The date/time to format. | - | `null` | ✅ |
| `dateAsObject` | `Date` | The date/time to format. | - | `null` | ❌ |
| `day` | `string` | The format for displaying the day. | `numeric` \| `2-digit` | `null` | ✅ |
| `era` | `string` | The format for displaying the era. | `long` \| `short` \| `narrow` | `null` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `hour` | `string` | The format for displaying the hour. | `numeric` \| `2-digit` | `null` | ✅ |
| `hour-format` | `string` | The format for displaying the hour. | `11` \| `12` \| `23` \| `24` | `null` | ✅ |
| `lang` | `string` | Locale to use. | - | `null` | ✅ |
| `minute` | `string` | The format for displaying the minute. | `numeric` \| `2-digit` | `null` | ✅ |
| `month` | `string` | The format for displaying the month. | `numeric` \| `2-digit` \| `long` \| `short` \| `narrow` | `null` | ✅ |
| `second` | `string` | The format for displaying the second. | `numeric` \| `2-digit` | `null` | ✅ |
| `time-zone` | `string` | The time zone to express the time in. | - | `null` | ✅ |
| `time-zone-name` | `string` | The format for displaying the time. | - | `null` | ✅ |
| `weekday` | `string` | The format for displaying the weekday. | `long` \| `short` \| `narrow` | `null` | ✅ |
| `year` | `string` | The format for displaying the weekday. | `numeric` \| `2-digit` | `null` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `label` | Inner `p` element. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--format-color` | Text content color. | `#000716` |
| `--format-font-size` | Font size of the text content. | `14px` |
| `--format-font-weight` | Weight of the text content. | `400` |
| `--format-line-height` | Line height of the text content. | `20px` |
| `--format-text-align` | Alignment of text content. | `left` |
| `--format-text-decoration` | Apply decoration to text content. | `none` |

## Dependencies

None
