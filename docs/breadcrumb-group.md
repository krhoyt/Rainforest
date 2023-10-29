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

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `items` | `Array<{text: string, href: string}>` | Collection of items representing breadcrumbs | - | `null` | X |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-click` | Called when the user clicks on a breadcrumb item. | `{external: boolean, href: string, item: object, target: string, text: string}` |
| `rf-follow` | Called when the user clicks on a breadcrumb item with the left mouse button without pressing modifier keys (that is, CTRL, ALT, SHIFT, META). | `{external: boolean, href: string, item: object, target: string, text: string}` |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `list` | Inner `ol` element |

## Dependencies

None
