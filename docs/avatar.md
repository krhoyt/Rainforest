# Avatar

`<rf-avatar>` | `RFAvatar`

Visual representation of a user or generative AI entity.

## Importing

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/avatar.js" type="module"></script>
```

## Examples

### Default

``` html
<rf-avatar></rf-avatar>
```

### With User Initials

``` html
<rf-avatar initials="JD"></rf-avatar>
```

### Generative AI Avatar

``` html
<rf-avatar color="gen-ai"></rf-avatar>
```

## Slots

| Name | Description |
| --- | --- |
| (default) | Specifies a custom `rf-icon`. |

## Properties

| Name | Type | Description | Values | Default | Reflects |
| --- | --- | --- | --- | --- | --- |
| `initials` | `string` | The text content shown directly in the avatar's body. | - | `null` | ✅ |
| `hidden` | `boolean` | Removes element from DOM layout. | - | `false` | ✅ |
| `loading` | `boolean` | Show loading indicator in avatar. | - | `false` | ✅ |

## Events

None

## Methods

None

## Parts

| Name | Description |
| --- | --- |
| `ai` | Generative AI icon. |
| `icon` | Inner `div` element for custom icon. |
| `initials` | Inner `p` element for the initials. |
| `loading` | Inner `div` for loading animation. |
| `profile` | User profile icon. |

## Variables

None

## Dependencies

- `<rf-icon-gen-ai>`
- `<rf-icon-user-profile>`
