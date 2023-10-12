# Text Content

Use to style chunks of HTML by applying default typographical styles to the content.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/text-content.js" type="module"></script>
```

``` html
<rf-text-content>
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <h3>Heading 3</h3>
  <h4>Heading 4</h4>
  <h5>Heading 5</h5>
  <p>Paragraph</p>
  <p><strong>Strong text</strong></p>
  <p><small>Small text with a <a href="">link</a></small></p>
  <p><a href="">Link</a></p>
  <p><code>Code</code></p>
  <ul>
    <li>item of unordered list</li>
    <li>item of unordered list</li>
  </ul>
  <ol>
    <li>item of ordered list</li>
    <li>item of ordered list</li>      
  </ol>      
</rf-text-content>
```

## Slots

| Name | Description |
| --- | --- |
| (`content`) | Used for text content |

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `data` | `Object` | Arbitrary data storage |

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `concealed` | `boolean` | Do not show, but leave in DOM flow |      
| `hidden` | `boolean` | Do not show in DOM |      

## Events

None

## Methods

None

## Parts

None

## Dependencies

None
