# Checkbox

Checkboxes enable users to turn an option on or off.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/checkbox.js" type="module"></script>
```

``` html
<rf-checkbox>Expire</rf-checkbox>
<rf-checkbox checked>Transition to standard access storage class</rf-checkbox>
<rf-checkbox disabled>Delete</rf-checkbox>
<rf-checkbox checked disabled>Archive to the Glacier Storage Class</rf-checkbox>
```

## Slots

| Name | Description |
| --- | --- |
| (`label`) | Used for custom label content |
| `description` | Used for custom description content |

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `data` | `Object` | Arbitrary data storage |

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `checked` | `boolean` | Toggle the selected state |      
| `concealed` | `boolean` | Do not show, but leave in DOM flow |      
| `description` | `string` | Alternative path to description content |
| `disabled` | `boolean` | Not available for input |      
| `hidden` | `boolean` | Do not show in DOM |      
| `indeterminate` | `boolean` | Unclear as to the state |      
| `label` | `string` | Alternative path to label content |
| `name` | `string` | For use in form submission |

## Events

| Name | Description |
| --- | --- |
| `rf-blur` | Focus removed from content |
| `rf-change` | When user changes state |
| `rf-focus` | Content has focus |

## Methods

| Name | Description |
| --- | --- |
| `focus()` | Focus on inner `input` element |

## Parts

| Name | Description |
| --- | --- |
| `box` | Rectangle representing the box |
| `check` | Line representing the check mark |
| `description` | Holder for description content |
| `interdeterminate` | Line representing unknown state |
| `label` | Holder for label content |
| `vector` | SVG area for drawing state |

## Dependencies

- `rf-box`
