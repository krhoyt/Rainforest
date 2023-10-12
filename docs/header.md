# Header

Summarizes the content that's displayed under it and provides a space for optional action buttons.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/header.js" type="module"></script>
```

``` html
<rf-header variant="h1">
  <rf-space-between direction="horizontal" size="xs" slot="actions">
    <rf-button>Secondary button</rf-button>
    <rf-button variant="primary">Primary button</rf-button>
  </rf-space-between>    
  Page title
</rf-header>
<rf-header counter="(3)">
  <rf-space-between direction="horizontal" size="xs" slot="actions">
    <rf-button>Secondary button</rf-button>
    <rf-button variant="primary">Primary button</rf-button>
  </rf-space-between> 
  <rf-link slot="info" variant="info">Info</rf-link>   
  Container title
</rf-header>    
<rf-header variant="h3">
  <rf-button slot="actions">Button</rf-button>
  Section title
</rf-header>        
```

## Slots

| Name | Description |
| --- | --- |
| (`title`) | Used for title content |
| `actions` | Placement of buttons |
| `info` | Content that follows title content |
| `description` | Second line adding contextual content |

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `data` | `Object` | Arbitrary data storage |

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `concealed` | `boolean` | Do not show, but leave in DOM flow |      
| `counter` | `string` | Content typically used to show total units |      
| `description` | `string` | Alternative path to description content |      
| `headertagoverride` | `h1` \| `h2` \| `h3` \| `h4` \| `h5` | Force specific sizing of title content |      
| `hidden` | `boolean` | Do not show in DOM |      
| `info` | `string` | Alternative path to info content |      
| `title` | `string` | Alternative path to title content |      
| `variant`  | `h1` \| `h2` \| `h3` \| `awsui-h1-sticky` | Applies combination of font size and weight to title content |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `header` | Inner `header` element |
| `title` | Inner `rf-box` element |
| `counter` | Inner `span` element |

## Dependencies

- `rf-box`
