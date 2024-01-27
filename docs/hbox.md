# HBox

Flex box in the house.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/hbox.js" type="module"></script>
```

## Examples

``` html
<rf-hbox gap="16">
  <p>One</p>
  <p>Two</p>
  <p>Three</p>            
</rf-hbox>
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | Content of the box. |

## Attributes

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `direction` | `string` | Relative to CSS `flex-direction`. | `column` \| `column-reverse` \| `row` \| `row-reverse` | `null` | ✅ |
| `gap` | `number` | Pixels between. | - | `0` | ✅ |
| `hidden` | `boolean` | Hides that nonsense. | `true` \| `false` | `false` | ✅ |

## Events

None

## Methods

None

## Parts

None

## Dependencies

None
