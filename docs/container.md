# Container

With the container, you can present a group of pieces of content, indicating that the items are related. For example, a table is a type of container.

## Importing

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/container.js" type="module"></script>
```

## Examples

``` html
<rf-box variant="p">
  When you launch an instance, the instance class that you specify determines the hardware of the host computer used for your instance. Each instance class offers different compute, memory, and storage capabilities. Choose an instance class based on the requirements of the application or software that you plan to run on your instance.  
</rf-box>
<rf-box color="text-body-secondary">Secondary text</rf-box>
<rf-box variant="h1">Distribution settings</rf-box>
<rf-box variant="code">database:instance:application-db</rf-box>
<rf-box font-size="display-l" font-weight="bold">Large and bold text</rf-box>
<rf-box variant="awsui-key-label">Key label</rf-box>
<rf-box text-align="center">Centered text</rf-box>
<rf-box float="right">
  <rf-space-between direction="horizontal" size="xs">
    <rf-button>Edit</rf-button>
    <rf-button>Delete</rf-button>
    <rf-button variant="primary">
      Create distribution
    </rf-button>
  </rf-space-between>
</rf-box>
```

## Slots

| Name | Description |
| --- | --- |
| (`default`) | Main content of the container. |
| `footer` | Footer of the container. |
| `header` | Heading element of the container. |

## Attributes

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `disable-content-paddings` | `boolean` | Determines whether the container content has padding. | - | `false` | ✅ |
| `disable-header-paddings` | `boolean` | Determines whether the container header has padding. | - | `false` | ✅ |
| `hidden` | `boolean` | Remove container from DOM rendering. Equivalent of `display: none`. | - | `false` | ✅ |
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

## Dependencies

None
