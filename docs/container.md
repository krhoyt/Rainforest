# Container

`<rf-container>` | `RFContainer`

With the container, you can present a group of pieces of content, indicating that the items are related. For example, a table is a type of container.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/container.js" type="module"></script>
```

## Examples

### Simple

``` html
<rf-container>
  <rf-header 
    description="Container description" 
    slot="header" 
    title="Container title" 
    variant="h2">
  </rf-header>
  <rf-label text="Container content"></rf-label>
</rf-container>
```

### With footer

``` html
<rf-container>
  <rf-header 
    description="Container description"
    slot="header" 
    title="Container title"
    variant="h2">
  </rf-header>
  <rf-label text="Content content"></rf-label>
  <rf-label slot="footer" text="Container footer"></rf-label>
</rf-container>
```

### With actions

``` html
<rf-container>
  <rf-header 
    description="Container description" 
    slot="header" 
    title="Container title" 
    variant="h2">
    <rf-space-between
      direction="horizontal"
      size="xs"
      slot="actions">
      <rf-button label="Action"></rf-button>
      <rf-button label="Another action"></rf-button>
    </rf-space-between>
  </rf-header>
  <rf-label text="Container content"></rf-label>
</rf-container>     
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Main content of the container. |
| `footer` | Footer of the container. |
| `header` | Heading of the container. |

## Attributes

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `disable-content-paddings` | `boolean` | Determines whether the container content has padding. | - | `false` | ✅ |
| `disable-header-paddings` | `boolean` | Determines whether the container header has padding. | - | `false` | ✅ |
| `hidden` | `boolean` | Remove container from DOM layout. | - | `false` | ✅ |
| `slim-shady` | `boolean` | Adds drop shadow of previous version. Because, why not? | - | `false` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `container` | Inner `div` element for the entire container. |
| `content` | Inner `div` element for the content section. |
| `footer` | Inner `div` element for the footer section. |
| `header` | Inner `div` element for the header section. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--container-border-color` | Color of the container outline. | `#b6bec9` |
| `--container-border-radius` | Radius of the container outline. | `16px` |
| `--container-box-shadow` | Just in case you really want a drop shadow. | `0 0 1px 1px #e9ebed, 0 1px 8px 2px #0007161f` |
| `--container-content-padding` | Padding for slotted content. | `4px 20px 20px 20px` |
| `--container-footer-padding` | Padding for slotted footer content. | `12px 20px 12px 20px` |
| `--container-header-padding` | Padding for slotted header content. | `12px 20px 8px 20px` |

## Dependencies

None
