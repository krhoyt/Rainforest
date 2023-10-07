# Input

With the input control, users can input a single line of text.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/input.js" type="module"></script>
```

``` html
<rf-input value="Hello World!"></rf-input><br>
<rf-input placeholder="Enter resource policy"></rf-input><br>
<rf-input type="password" value="pswerd1234"></rf-input><br>
<rf-input disabled placeholder="Search" type="search"></rf-input>    
```

## Slots

None

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `data` | `Object` | Arbitrary data storage |

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `auto-complete` | `string` | Sets input autocomplete value |
| `auto-focus` | `boolean` | Attempt to set focus to this input when page loads |      
| `concealed` | `boolean` | Do not show, but leave in DOM flow |      
| `disabled` | `boolean` | Disable the input field |
| `disable-browser-autocorrect` | `boolean` | Disable input autocorrect; will disable other features |
| `hidden` | `boolean` | Do not show in DOM |      
| `input-mode` | `none` \| `text` \| `decimal` \|   `numeric` \| `tell` \| `search` \| `email` \| `url` | Suggest keyboard mode for relevant devices |     
| `invalid` | `boolean` | Colored border to show error |      
| `name` | `string` | Name of icon to use |
| `placeholder` | `string` | Content of the field before value set |
| `read-only` | `boolean` | Prevent input, but still show content clearly |      
| `spellcheck` | `boolean` | Enable input/OS-level spellcheck |     
| `step` | `string` | Invrement value when input is range |     
| `type` | `text` \|  `password` \| `search` \| `number` \| `email` \| `url` | Type of input to be captured |      
| `value` | `string` | The contents of the input field |      

## Events

| Name | Description |
| --- | --- |
| `rf-change` | Content of input has changed |

## Methods

| Name | Description |
| --- | --- |
| `focus()` | Focus on inner `input` element |
| `select()` | Select all the text in the inner `input` element |

## Parts

| Name | Description |
| --- | --- |
| `input` | Inner `input` element |

## Dependencies

None
