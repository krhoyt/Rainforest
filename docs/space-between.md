# Space Between

`<rf-space-between>` | `RFSpaceBetween`

A helper component that helps you add consistent spacing between elements on your page.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/space-between.js" type="module"></script>
```

## Examples

### With buttons

``` html
<rf-space-between direction="horizontal" size="xs">
  <rf-button label="Edit"></rf-button>
  <rf-button label="Delete"></rf-button>      
  <rf-button label="Create distribution" variant="primary"></rf-button>      
</rf-space-between>
```

### With containers

``` html
<rf-space-between size="l">
  <rf-container>
    <rf-header slot="header" title="Distribution settings" variant="h2"></rf-header>
    <rf-label text="Container content"></rf-label>
  </rf-container>
  <rf-container>
    <rf-header slot="header" title="Cache behaviour settings" variant="h2"></rf-header>
    <rf-label text="Container content"></rf-label>
  </rf-container>      
  <rf-container>
    <rf-header slot="header" title="Container title" variant="h2"></rf-header>
    <rf-label text="Container content"></rf-label>
  </rf-container>            
</rf-space-between>
```

### With form fields

``` html
<rf-space-between size="l">
  <rf-form-field 
    description="The Amazon S3 bucket that you want CloudFront to store your access logs in." 
    label="S3 bucket for logs">
    <rf-input placeholder="Choose an S3 bucket"></rf-input>
  </rf-form-field>
  <rf-form-field
    description="Specify the date and time when the certificate should expire."
    label="Certificate expiry">
    <rf-space-between direction="horizontal" size="s">
      <rf-form-field>
        <rf-input placeholder="YYYY/MM/DD"></rf-input>  
      </rf-form-field>
      <rf-form-field constraint="Use 24-hour format.">
        <rf-input placeholder="hh:mm:ss"></rf-input>
      </rf-form-field>
    </rf-space-between>
  </rf-form-field>
</rf-space-between>
```

### Nested

``` html
<rf-space-between direction="horizontal" size="l">
  <rf-space-between size="xs">
    <rf-label text="Content one"></rf-label>
    <rf-label text="Content two"></rf-label>
    <rf-label text="Content three"></rf-label>        
  </rf-space-between>
  <rf-space-between size="s">
    <rf-label text="Content four"></rf-label>
    <rf-label text="Content five"></rf-label>        
  </rf-space-between>      
  <rf-space-between size="m">
    <rf-label text="Content six"></rf-label>
    <rf-label text="Content seven"></rf-label>
    <rf-label text="Content eight"></rf-label>        
  </rf-space-between>      
</rf-space-between>
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Content of this component. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `align-items` | `string` | Determines how the child elements will be aligned based on the [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) property of the CSS Flexbox. | `start` \| `center` \| `end` | `null` | ✅ |
| `direction` | `string` | Defines the direction in which the content is laid out. | `horizontal` \| `horizontal-reverse` \| `row` \| `row-reverse` \| `vertical` \| `vertical-reverse` \| `column` \| `column-reverse` | `vertical` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `size` | `string` | Defines the spacing between the individual items of the content. | `xxxs` \| `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` \| `xxxl` | `null` | ✅ |

## Events

None

## Methods

None

## Parts

None

## Variables

None

## Dependencies

None
