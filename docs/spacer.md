# Spacer

`<rf-spacer>` | `RFSpacer`

In a CSS Flexbox display, spacer will push elements as far apart as possible. Useful for elements aligned to different sides of the container.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/spacer.js" type="module"></script>
```

## Examples

### Horizontal

``` html
<rf-box direction="horizontal">
  <rf-label text="Title"></rf-label>
  <rf-spacer></rf-spacer>
  <rf-button label="Action"></rf-button>
</rf-box>
```

## Slots

None

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |

## Events

None

## Methods

None

## Parts

None

## Variables

| Name | Description | Default |
| --- | --- | --- |
| `--spacer-height` | Specify pixel height of element (vs grow). | `auto` |
| `--spacer-width` | Specify pixel width of element (vs grow). | `auto` |

## Dependencies

None
