# Breadcrumb Group

`<rf-breadcrumb-group>` | `RFBreadcrumbGroup`

Displays a series of navigational links in a hierarchical list.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/breadcrumb-group.js" type="module"></script>
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

| Name | Description |
| --- | --- |
| (default) | Series of `rf-breadcrumb` elements defining the trail. |
| `prefix` | Optional area for decorative elements such as an icon. |
| `suffix` | Optional area for decorative elements such as an icon. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `items` | `array` | An array of breadcrumb items that describes the link hierarchy for this navigation. | - | `null` | - |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-click` | Called when the user clicks on a breadcrumb item. | `{external: boolean, href: string, label: string}` |
| `rf-follow` | Called when the user clicks on a breadcrumb item with the left mouse button without pressing modifier keys (that is, CTRL, ALT, SHIFT, META). | `{external: boolean, href: string, label: string}` |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `list` | Container for the `rf-breadcrumb` elements. |

## Variables

None

## Dependencies

- `<rf-breadcrumb>`
