# Input

With the input control, users can input a single line of text.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/input.js" type="module"></script>
```

## Examples

``` html
<rf-input value="Hello World!"></rf-input><br>
<rf-input placeholder="Enter resource policy"></rf-input><br>
<rf-input type="password" value="pswerd1234"></rf-input><br>
<rf-input disabled placeholder="Search" type="search"></rf-input>    
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `auto-complete` | `string` | Specifies whether to enable a browser's autocomplete functionality for this input. | - | `true` | ✅ |
| `auto-focus` | `boolean` | Indicates whether the control should be focused as soon as the page loads, which enables the user to start typing without having to manually focus the control. | - | `false` | ✅ |
| `disabled` | `boolean` | Specifies if the control is disabled, which prevents the user from modifying the value and prevents the value from being included in a form submission. | - | `false` | ✅ |
| `disable-browser-autocorrect` | `boolean` | Specifies whether to disable browser autocorrect and related features. | - | `false` | ✅ |
| `input-mode` | `string` | Suggest keyboard mode for relevant devices | `none` \| `text` \| `decimal` \|   `numeric` \| `tell` \| `search` \| `email` \| `url` | `text` | ✅ |
| `invalid` | `boolean` | Overrides the invalidation state. Usually the invalid state comes from the parent FormFieldcomponent, however sometimes you need to override its state when you have more than one input within a single form field. | - | `false` | ✅ |
| `name` | `string` | Specifies the name of the control used in HTML forms. | - | `null` | ✅ |
| `placeholder` | `string` | Specifies the placeholder text rendered when the value is an empty string. | - | `null` | ✅ |
| `read-only` | `boolean` | Specifies if the control is read only, which prevents the user from modifying the value but includes it in a form submission. | - | `false` | ✅ |
| `spellcheck` | `boolean` | Specifies the value of the spellcheck attribute on the native control. | - | `false` | ✅ |
| `step` | `number` \| `string` | The step attribute is a number that specifies the granularity that the value must adhere to or the keyword "any". | `number` \| `any` | `null` | ✅ | 
| `type` | `string` | Specifies the type of control to render. | `text` \|  `password` \| `search` \| `number` \| `email` \| `url` | `text` | ✅ | 
| `value` | `string` | Specifies the text entered into the form element. | - | `null` | ✅ | 

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-blur` | Called when input focus is removed from the UI control. | - |
| `rf-change` | Called whenever a user changes the input value (by typing or pasting). | `{value: string}` |
| `rf-focus` | Called when input focus is moved to the UI control. | - |

## Methods

| Name | Description | Arguments |
| --- | --- | --- |
| `focus()` | Sets input focus onto the UI control. | - |
| `select()` | Selects all text in the input control. | - |

## Parts

| Name | Description |
| --- | --- |
| `input` | Inner `input` element |

## Dependencies

None
