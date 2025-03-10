# Text area

`<rf-textarea>` | `RFTextarea`

A form element that provides a multi-line, plain-text input control.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/textarea.js" type="module"></script>
```

## Examples

### With placeholder

``` html
<rf-textarea placeholder="This is a placeholder"></rf-textarea>
```

### Hidden placeholder

``` html
<rf-textarea value="Non-empty value: Placeholder should be hidden"></rf-textarea>
```

### Disabled with line wrap

``` html
<rf-textarea disabled value="Long value, enough to line wrap and have scroll bars.  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna. Donec venenatis magna lacus. Sed augue ante, egestas a ultrices condimentum, fringilla in erat. Proin dictum lacus quis metus volutpat viverra. Fusce aliquet leo ut risus venenatis, malesuada pulvinar magna bibendum. Integer pellentesque magna nisl, eget suscipit eros ultrices nec. Proin neque mi, porttitor quis lacinia ut, feugiat nec nulla. Proin sed facilisis leo, quis pharetra massa. Nam congue laoreet eros, eu feugiat metus posuere eget. Quisque accumsan diam a arcu condimentum, ac congue nulla laoreet. Aliquam tempor ligula eu consectetur vehicula. Donec hendrerit purus ligula, ut vulputate enim consectetur eget."></rf-textarea>
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `auto-complete` | `string` | Specifies whether to enable a browser's autocomplete functionality for this input. | - | `true` | ✅ |
| `auto-focus` | `boolean` | Indicates whether the control should be focused as soon as the page loads, which enables the user to start typing without having to manually focus the control. | - | `false` | ✅ |
| `disable-browser-autocorrect` | `boolean` | Specifies whether to disable browser autocorrect and related features. | - | `false` | ✅ |
| `disabled` | `boolean` | Specifies if the control is disabled, which prevents the user from modifying the value and prevents the value from being included in a form submission. | - | `false` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `invalid` | `boolean` | Overrides the invalidation state. Usually the invalid state comes from the parent FormField component, however sometimes you need to override its state when you have more than one input within a single form field. | - | `false` | ✅ |
| `name` | `string` | Specifies the name of the control used in HTML forms. | - | `null` | ✅ |
| `placeholder` | `string` | Specifies the placeholder text rendered when the value is an empty string. | - | `null` | ✅ |
| `read-only` | `boolean` | Specifies if the control is read only, which prevents the user from modifying the value but includes it in a form submission. | - | `false` | ✅ |
| `rows` | `number` | Specifies the number of lines of text to set the height to. | - | `false` | ✅ |
| `spellcheck` | `boolean` | Specifies the value of the spellcheck attribute on the native control. | - | `false` | ✅ |
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
| `area` | Inner `textarea` element. |

## Variables

None

## Dependencies

None
