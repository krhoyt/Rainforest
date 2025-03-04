# Top Navigation

`<rf-top-navigation>` | `RFTopNavigation`

A global navigation element for services that is consistent and persists across all service pages.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/top-navigation.js" type="module"></script>
```

## Examples

### With utility controls

``` html
<rf-top-navigation 
  href="#"
  logo="/img/logo-small-top-navigation.svg" 
  title="Service">    
  <rf-link external label="Link"></rf-link>      
  <rf-button variant="icon">
    <rf-icon name="notification" slot="prefix"></rf-icon>
  </rf-button>
  <rf-button variant="icon">
    <rf-icon name="settings" slot="prefix"></rf-icon>
  </rf-button>      
  <rf-button caret label="Customer Name">
    <rf-icon name="user-profile" slot="prefix"></rf-icon>
  </rf-button>            
</rf-top-navigation>    
```

### With search

``` html
<rf-top-navigation 
  href="#"
  logo="/img/logo-small-top-navigation.svg" 
  title="Service">    
  <rf-input placeholder="Search" slot="search"></rf-input>  
  <rf-button variant="icon">
    <rf-icon name="notification" slot="prefix"></rf-icon>
  </rf-button>
  <rf-button variant="icon">
    <rf-icon name="settings" slot="prefix"></rf-icon>
  </rf-button>      
  <rf-button caret label="Customer Name">
    <rf-icon name="user-profile" slot="prefix"></rf-icon>
  </rf-button>            
</rf-top-navigation>    
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Utility navigation elements. |
| `search` | Use with an input or other controls for a global search query. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `href` | `string` | Specifies the `href` for the header anchor link. | - | `null` | ✅ |
| `logo` | `string` | Specifies the path to the logo image file for the product. | - | `null` | ✅ |
| `title` | `string` | Specifies the title text. | - | `null` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `identity` | Holder `div` for identity features (link, logo, title). |
| `link` | The `a` element containing the logo and title identity features. |
| `logo` | The `img` element displaying the logo image. |
| `title` | The `p` element displaying the identity text. |
| `utilities` | Holder `div` for any specified utility elements. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--top-navigation-background-color` | The background color of the navigation bar. | `#0f1b2a` |
| `--top-navigation-height` | The height of the navigation bar in CSS units. | `48px` |

## Dependencies

None
