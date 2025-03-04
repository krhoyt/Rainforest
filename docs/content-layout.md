# Content Layout

`<rf-content-layout>` | `RFContentLayout`

Provides the basic layout for the header and content of a page.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/content-layout.js" type="module"></script>
```

## Examples

### Default

``` html
<rf-content-layout>
  <rf-header 
    description="This is a generic description used in the header." 
    slot="header" 
    title="Header" 
    variant="h1">
    <rf-link label="Info" slot="info"></rf-link>          
    <rf-button label="Button" slot="actions" variant="primary"></rf-button>          
  </rf-header>
  <rf-alert content="This is a generic alert." slot="header"></rf-alert>
  <rf-container>
    <rf-header 
      description="Container description" 
      slot="header" 
      title="Container header" 
      variant="h2">
    </rf-header>
    <rf-label text="Container content"></rf-label>
  </rf-container>
</rf-content-layout>
```

### Disable overlap

``` html
<rf-content-layout disable-overlap>
  <rf-header 
    description="This is a generic description used in the header." 
    slot="header" 
    title="Header" 
    variant="h1">
    <rf-link label="Info" slot="info"></rf-link>          
    <rf-button label="Button" slot="actions" variant="primary"></rf-button>          
  </rf-header>
  <rf-alert content="This is a generic alert." slot="header"></rf-alert>
  <rf-container>
    <rf-header 
      description="Container description" 
      slot="header" 
      title="Container header" 
      variant="h2">
    </rf-header>
    <rf-label text="Container content"></rf-label>
  </rf-container>
</rf-content-layout>    
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Use this slot to render the main content of the layout below the header. |
| `header` | Use this slot to render the header content for the layout. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `disable-overlap` | `boolean` | Determines whether the layout has an overlap between the header and content. | - | `false` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `header` | Inner `div` element for the header section. |

## Variables

None

## Dependencies

None
