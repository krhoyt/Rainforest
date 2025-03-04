# Pagination

`<rf-pagination>` | `RFPagination`

Provides horizontal navigation between pages of a collection.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/pagination.js" type="module"></script>
```

## Examples

### Simple

``` html
<rf-pagination 
  current-page-index="1" 
  pages-count="5">
</rf-pagination>
```

### Open end

``` html
<rf-pagination 
  current-page-index="1" 
  open-end pages-count="5">
</rf-pagination>
```

### Disabled

``` html
<rf-pagination 
  current-page-index="1" 
  disabled 
  pages-count="5">
</rf-pagination>
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `current-page-index` | `number` | Index of the current page. | - | `1` | ✅ |
| `disabled` | `boolean` | If set to true, the pagination links will be disabled. | - | `false` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `open-end` | `boolean` | Sets the pagination variant. | - | `false` | ✅ |
| `pages-count` | `number` | Sets the total number of pages. | - | `null` | ✅ |

## Events

| Name | Description | Detail |
| --- | --- | --- |
| `rf-change` | Called when a user interaction causes a pagination change. | `{currentPageIndex: number}` |
| `rf-next` | Called when the next page arrow is clicked. | `{currentPageIndex: number, requestedPageIndex: number}` |
| `rf-previous` | Called when the previous page arrow is clicked. | `{currentPageIndex: number, requestedPageIndex: number}` |

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `list` | Inner `ul` element for the page list. |
| `open` | Inner `p` element for open end ellipsis. |
| `next` | Inner `button` element for the next action. |
| `previous` | Inner `button` element for the previous action. |

## Variables

None

## Dependencies

None
