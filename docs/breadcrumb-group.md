# Breadcrumb Group

Displays a series of navigational links in a hierarchical list.

## Usage

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/breadcrumb-group.js" type="module"></script>
```

``` html
<rf-breadcrumb-group></rf-breadcrumb-group>
```

``` javascript
const group = document.querySelector( 'rf-breadcrumb-group' );
group.items = [
  {text: 'System', href: '#'},
  {text: 'Components', href: '#components'},
  {text: 'Breadcrumb group', href: '#components/breadcrumb-group'}
];
```

## Slots

None

## Properties

| Name | Type | Description |
| --- | --- | --- |
| `data` | `Object` | Arbitrary data storage |
| `items` | `Array` | Collection of items representing breadcrumbs |

## Attributes

| Name | Type | Description |
| --- | --- | --- |
| `concealed` | `boolean` | Do not show, but leave in DOM flow |      
| `hidden` | `boolean` | Do not show in DOM |

## Events

| Name | Description |
| --- | --- |
| `rf-click` | Clicked on a breadcrumb |
| `rf-follow` | Clicked on a breadcrumb with modifier |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `list` | Inner `ol` element |

## Dependencies

- `rf-box`
- `rf-icon`
- `rf-link`
