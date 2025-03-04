# Breadcrumb

`<rf-breadcrumb>` | `RFBreadcrumb`

Describes the link hierarchy for the group navigation.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/breadcrumb.js" type="module"></script>
```

## Examples

### Default

``` html
<rf-breadcrumb-group>
  <rf-breadcrumb href="#" text="System"></rf-breadcrumb>
  <rf-breadcrumb href="#components" text="Components"></rf-breadcrumb>
  <rf-breadcrumb href="#components/breadcrumb-group" text="Breadcrumb group"></rf-breadcrumb>      
</rf-breadcrumb-group>
```

### Short example

``` html
<rf-breadcrumb-group>
  <rf-breadcrumb href="#" text="System"></rf-breadcrumb>
  <rf-breadcrumb href="#components" text="Components"></rf-breadcrumb>
</rf-breadcrumb-group>
```

### Long example

``` html
<rf-breadcrumb-group>
  <rf-breadcrumb href="#" text="Service name"></rf-breadcrumb>
  <rf-breadcrumb href="#sub-service" text="Sub-service"></rf-breadcrumb>
  <rf-breadcrumb href="#main-category" text="Main category with a long name"></rf-breadcrumb>
  <rf-breadcrumb href="#secondary-category" text="Secondary category with a long name"></rf-breadcrumb>
  <rf-breadcrumb href="#resource-type" text="Resource type"></rf-breadcrumb>
  <rf-breadcrumb href="#resource-sub-type" text="Resource sub-type"></rf-breadcrumb>      
  <rf-breadcrumb 
    href="#resource-name-7880-l09mdsdnebh-1894398823" 
    text="resource-name-7880-l09mdsdnebh-1894398823">
  </rf-breadcrumb>
</rf-breadcrumb-group>        
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `href` | `string` | Specifies the URL for the link in the breadcrumb item. | - | `null` | ✅ |
| `text` | `string` | Specifies the title text of the breadcrumb item. | - | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-click` | Called when the user clicks on a breadcrumb item. | `{external: boolean, href: string, label: string, target: object}` |
| `rf-follow` | Called when the user clicks on a breadcrumb item with the left mouse button without pressing modifier keys (that is, CTRL, ALT, SHIFT, META). | `{external: boolean, href: string, label: string, target: object}` |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `href` | The `a` element used when a link is provided. |
| `icon` | The icon element used for the separator. |
| `text` | The `p` element used for the last item in the hierarchy. |

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--breadcrumb-color` | Color of the text fragment used for labels. | `#0972d3` |
| `--breadcrumb-cursor` | Cursor used when mouse is over breadcrumb. | `pointer` |
| `--breadcrumb-font-weight` | CSS font weight for a linked breadcrumb. | `400` |
| `--breadcrumb-hover-color` | Color of the text fragment when the mouse is over the label. | `#033160` |
| `--breadcrumb-icon-color` | Color of the separator icon. | `#7d8998` |
| `--breadcrumb-text-color` | Color of the text for an inactive breadcrumb. | `#5f6b7a` |
| `--breadcrumb-text-decoration` | Additional emphasis added to linked breadcrumbs. | `underline` |

## Dependencies

- `<rf-icon-angle-right>`
