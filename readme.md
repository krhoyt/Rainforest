# Rainforest Components

Set of standards-based web components following the [Cloudscape Design System](https://cloudscape.design).

## Why?

- Web standards
- Minimal barrier to entry
- Easy to get started
- Easy to use
- No framework required
- No build required
- Works with frameworks
- Highly customizable

> This is a personal passion project. ❤️ It is not sponsored by Amazon. It is not sanctioned by Amazon. It is not affiliated with Amazon. I just happen to be an Amazon employee that wanted a web components version of the Cloudscape components for his internal projects.

## Getting Started

You need two parts. First is a CSS file for fonts (Open Sans) and a few styles that are used across multiple compoonents. Second is the components themselves. You can load the components in two ways: all at once or a la carte.

### CSS

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
```

### All At Once

While the overall size of the entire set of components is relatively small compared to most modern web sites, you should be cautious about using this approach. Everything will be loaded. This is great for development, or if you are using a majority of the components. It is not so great if you are only using a few components.

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.js" type="module"></script>
```

> Rainforest components aim to be as atomic as possible. There are cases where components depend on other components, but this is the exception, not the rule.

### A La Carte

When loading a la carte, component dependencies are loaded by the components themselves.

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/button.js" type="module"></script>
```

That is it! Nope, there is no builder required. Nope, you do not `npm install` anything. No `git clone` of any repositories. No command line tools to setup the directories and dependencies in just the right way. All you need is an HTML page; add two tags and you are done. Welcome to web standards. 🤯

## Components

- [Alert](./docs/alert.md)
- Avatar ❓⚠️
- [Badge](./docs/badge.md)
- [Box](./docs/box.md)
- [Breadcrumb Group](./docs/breadcrumb-group.md)
- [Button](./docs/button.md)
- [Checkbox](./docs/checkbox.md)
- Calendar ❓
- [Container](./docs/container.md)
- Content Layout ✈️
- Date Picker ❓
- [Expandable Section](./docs/expandable-section.md)
- Flashbar 📆
- Form Field ✈️
- [Header](./docs/header.md)
- [Icon](./docs/icon.md)
- [Input](./docs/input.md)
- [Link](./docs/link.md)
- Multiselect ❓
- Popover 📆
- Rating ❓⚠️
- Radio Group ❓
- Select ❓
- [Space Between](./docs/space-between.md)
- [Spinner](./docs/spinner.md)
- [Status Indicator](./docs/status-indicator.md)
- Table ❓
- Tabs ❓
- Text Area 📆
- [Text Content](./docs/text-content.md)
- [Toggle](./docs/toggle.md)
- [Usage Chart](./docs/usage-chart.md) ⚠️

✈️ In-flight/progress  
📆 Planned  
❓ To be determined (TBD)  
⚠️ Not part of Cloudscape

## Some Differences to Consider

Cloudscape uses the React framework. There are ideomatic ways in which React is used. Some of these constructs do not suit web standards well. There are ideomatic ways that web components are used as well. Where those differences are significant is discussed in the following sections. Otherwise Rainforest aims for feature/API parity.

### A Dash of Prefix

Web components are required to have a prefix to avoid collision in naming. You might use a `Button` web component from one project, and then a `Calendar` component from another, where the `Calendar` uses a `Button` as well - a button from its own project. Which `Button` should be used where? Prefixing avoids this collision. 

The prefix for Rainforest is `rf-`. Open and close tags are required for web components.

``` html
<rf-button>Button</rf-button> <!-- HTML -->
<Button>Button</Button> <!-- Cloudscape/React -->
```

### Attributes vs Properties

Attributes are the name/value pairs used in HTML (i.e. `<img src="">`). When an HTML element is accessed from JavaScript however, attributes are properties on that object instance (i.e. `image.src = ""`). HTML attributes have a limited set of data types that are supported. These are `string`, `float`, `integer`, `boolean` and `null`. JavaScript properties by comparison can be whatever data type you need. An `array` of `objects` is a common pattern.

With web components, for values within the finite set of data types, attributes are "reflected" as properties. Properties exist on the object instances for values where the data type is not appropriate for an attribute (i.e. `array`). These properties are not exposed as attributes.

### Slots

Cloudscape/React exposes slots as properties on any given component. This means that you can supply an inline string such as `footer="This is footer content"` or the structure of an entire component such as `footer="<ExpandableSection ...`. These are two very different things in web components.

Rainforest tries to find a happy middle. The preferred usage is named slots, inline with standards-based web components, for more complex composition. Additionally, slot names are also available as attributes. These attributes take a string value and assign that value to the content of an internal `Box` element.

#### Cloudscape/React

``` JavaScript
export default () => {
  return (
    <Header
      variant="h1"
      actions={
        <SpaceBetween 
          direction="horizontal" 
          size="xs">
          <Button>Secondary button</Button>
          <Button variant="primary">
            Primary button
          </Button>
        </SpaceBetween>
      }
    >
      Page title
    </Header>
  );
}
```

#### Web Components

``` html
<rf-header 
  title="Page title"
  variant="h1">
  <rf-space-between 
    direction="horizontal" 
    size="xs"
    slot="actions">
    <rf-button>Secondary button</rf-button>
    <rf-button variant="primary">
      Primary button
    </rf-button>
  </rf-space-between>
  <!-- Title could also go here -->
<rf-header>
```

### Icons

Cloudscape has many icons available to it. These icons are in SVG format. When the `icon-name` attribute is set on the `Icon` component, that SVG file is loaded, parsed, modified if needed, and placed into the DOM as SVG. This is a common approach for many component libraries due in part for the need to ship only one icon file, but be able to change the icon color to whatever is needed at runtime.

Rainforest takes a different approach by using CSS Filters to change the color of an icon. When the `icon-name` attribute is set on the `RainforestIcon` component, that SVG file is assigned to the `src` attribute of an `Image` element. The image element loads and sizes the file as it would any other SVG file. When the `variant` property is set, a filter is added via CSS to match the color specified in the design system.

This means that Rainforest can support and color **any single color SVG file from any source**. This technique also works on image file format that support a transparent background. The Cloudscape `Icon.svg` slot, and other SVG-related slots, are not necessary with this approach, and not support in Rainforest.

> This approach generally yields an output color *very close* to the original, but not necessarily an exact match. Close enough to where the human eye will not likely notice the difference in practice. A [color utility](./demo/color.html) is included for testing.

### Item Renderers

There are places in Cloudscape where the API prefers setting an `items` array over composition. This pattern is common in enterprise components. In some of those instances, for example with `Breadcrumb Group` that the `items` can be an array of any object type. This is useful when an API result needs to populate a component and there may be more properties in the response than are needed to populate the component.

There are other areas in the Cloudscape API however, where there is preference given to a specific data type. An example here is `Radio Group` where the `items` property expects an array of `RadioButtonDefinition` which has specific properties needed to build the radio buttons that populate the group. In these instances, Rainforest uses item renderers. The data passed to `items` is still an array of whatever data type is prescribed by the Cloudscape API (not that JavaScript cares), and populating the group still works the same, with the difference being that the renderer is exposed to the developer for further customization if needed.

An item renderer in Rainforest takes a data property, which is of type `Object`. The implementation of that renderer then can in turn place the pieces of data on that `Object` wherever it is needed. There are default item renderers provided by Rainforest which mirror the Cloudscape design patterns. There is also an `itemrenderer` property on these components where you can specify your own implementation.

> Think of the pain scale you may have seen in medical settings. There is an emoji face next to each value. The higher up on the pain scale you go, the more anguished the face appears. You could write a custom item renderer to show a similar graphical representation, and use it in the `RadioGroup` component.
