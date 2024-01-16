# Select

Selects enable users to choose a single item from a list of items.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/select.js" type="module"></script>
```

## Examples

``` html
<rf-select></rf-select>
<rf-select></rf-select>
<rf-select></rf-select>
<rf-select trigger-variant="option"></rf-select>
```

``` javascript
const selects = document.querySelectorAll( 'rf-select' );

selects[0].options = [
  {label: 'Option 1', value: 1},
  {label: 'Option 2', value: 2},
  {label: 'Option 3', value: 3},
  {label: 'Option 4', value: 4},
  {label: 'Option 5', value: 5}                               
];
selects[1].options = [
  {label: 'Option 1', value: 1, iconName: 'settings'},
  {label: 'Option 2', value: 1, iconName: 'unlock'},
  {label: 'Option 3', value: 1, iconName: 'share'}
];      
selects[2].options = [
  {label: 'Option 1', value: 1, tags: ['OptionTag1', 'Tag2', 'Tag3']},
  {label: 'Option 2', value: 1, tags: ['OptionTag1', 'Tag2', 'Tag3']}
];
selects[3].options = [
  {label: 'Option 1', value: 1, labelTag: '128Gb', iconName: 'settings', description: 'sub value', tags: ['CPU-v2', '2Gb RAM']},
  {label: 'Option 2', value: 2, labelTag: '128Gb', iconName: 'settings', description: 'sub value', tags: ['CPU-v2', '2Gb RAM']},
  {label: 'Option 3', value: 3, labelTag: '128Gb', iconName: 'settings', description: 'sub value', tags: ['CPU-v2', '2Gb RAM']}
];

selects[0].selectedOption = {label: 'Option 1', value: 1};
selects[1].selectedOption = {label: 'Option 1', value: 1, iconName: 'settings'};
selects[2].selectedOption = {label: 'Option 1', value: 1, tags: ['OptionTag1', 'Tag2', 'Tag3']};
selects[3].selectedOption = {label: 'Option 1', value: 1, labelTag: '128Gb', iconName: 'settings', description: 'sub value', tags: ['CPU-v2', '2Gb RAM']};
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `disabled` | `boolean` | Determines whether the whole select component is disabled. | - | `false` | ✅ |
| `invalid` | `boolean` | Overrides the invalidation state. | - | `false` | ✅ |
| `options` | `array<{value: string, label: string, description: string, disabled: boolean, labelTag: string, tags: [string], iconName: string}>` | Specifies an array of options that are displayed to the user as a dropdown list.  | - | `null` | ❌ |
| `placeholder` | `string` | Specifies the hint text that's displayed in the field when no option has been selected. | - | `null` | ✅ |
| `selected-index` | `number` | Index of the selected option. | - | `null` | ✅ |
| `selected-option` | `object` | Specifies the currently selected option. | - | `null` | ❌ |
| `trigger-variant` | `string` | Defines the variant of the trigger. | `label` \| `option` | `label` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-change` | Called when the user selects an option. | `{selectedOption: object}` |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Sets focus on the element without opening the dropdown or showing a visual focus indicator. | - |

## Parts

| Name | Description |
| --- | --- |
| `caret` | Icon indicating open state on right side of control. |
| `placeholder` | Inner `p` element for placeholder content when nothing is selected. |
| `select` | Inner `button` element that acts as the trigger to change state. |
| `value` | Inner `p` element for displaying the selected value. |

## Dependencies

- `rf-select-option`
