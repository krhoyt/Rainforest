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
- [Calendar](./docs/calendar.md)
- [Container](./docs/container.md)
- Content Layout ✈️
- Date Picker ❓
- [Expandable Section](./docs/expandable-section.md)
- Flashbar 📆
- Form Field ✈️
- Header ✈️
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

✅ Implemented (18)   
✈️ In-flight/progress (3)  
📆 Planned  (3)   
❓ To be determined (8)  
⚠️ Not part of Cloudscape (3)

## Some Differences to Consider

Cloudscape uses the React framework. Rainforest uses web components, and is not a framework. There are ideomatic ways in which each is used. 

### Tag Prefix

Web components are required to have a prefix to avoid collision in naming. The prefix for Rainforest is `rf-`. Open and close tags are required for web components.

``` html
<rf-button>Button</rf-button> <!-- HTML -->
<Button>Button</Button> <!-- Cloudscape/React -->
```

### Reflection

Attributes are the name/value pairs used in HTML (i.e. `<img src="">`). When an HTML element is accessed from JavaScript however, attributes are properties on that object instance (i.e. `image.src = ""`). Being able to use `src` in both situations is called, reflection. The reflected data types are `string`, `float`, `integer`, `boolean` and `null`. Other types such as `array`, `date`, and `function` are available only as properties.

### Composition

Slots allow pieces of content to be placed in specific parts of a web component. When there are multiple slots, they will be named. This allows for "composition" of content. In order to specify the slot name, a tag must be used. In the case of a component where there are multiple strings to specify, a `span` element can be used. Content without slot names are placed in the "default" slot.

``` html
<rf-form-field>
  <rf-input></rf-input> <!-- No slot name === default slot -->  
  Form field label <!-- Where does this go? -->
  This is a description <!-- Where does this go? -->
</rf-form-field>
```

``` html
<rf-form-field>
  <rf-input></rf-input> <!-- Default -->
  <span slot="label">Form field label</span> <!-- Label -->
  <span slot="description">This is a description</span> <!-- Description -->
</rf-form-field>
```

> When the Cloudscape API calls something a slot, it is implmented as such in Rainforest. It cannot be accessed as a property or attribute as in React.

### Icons

Cloudscape has many icons available to it. These icons are in SVG format. The same icon set is available in Rainforest. Icon color in Cloudscape is accomplished by parsing the SVG file, and altering it at runtime. Icon color in Rainforest is accomplished through CSS Filters. This means that Rainforest supports **any SVG file from any source**. It even works with transparent raster files such as **GIF and PNG**.

> This approach generally yields an output color *very close* to the original, but not necessarily an exact match. Close enough to where the human eye will not likely notice the difference in practice. A [color utility](./demo/color.html) is included for testing.

### Renderers

There are places in Cloudscape where the API prefers setting an `items` array over composition. This pattern is common in enterprise components. In some of those instances, for example with `Breadcrumb Group` that the `items` can be an array of any object type. This is useful when an API result needs to populate a component and there may be more properties in the response than are needed to populate the component.

There are other areas in the Cloudscape API however, where there is preference given to a specific data type. An example here is `Radio Group` where the `items` property expects an array of `RadioButtonDefinition` which has specific properties needed to build the radio buttons that populate the group. In these instances, Rainforest uses item renderers. The data passed to `items` is still an array of whatever data type is prescribed by the Cloudscape API (not that JavaScript cares), and populating the group still works the same, with the difference being that the renderer is exposed to the developer for further customization if needed.

An item renderer in Rainforest takes a data property, which is of type `Object`. The implementation of that renderer then can in turn place the pieces of data on that `Object` wherever it is needed. There are default item renderers provided by Rainforest which mirror the Cloudscape design patterns. There is also an `itemrenderer` property on these components where you can specify your own implementation.

> Think of the pain scale you may have seen in medical settings. There is an emoji face next to each value. The higher up on the pain scale you go, the more anguished the face appears. You could write a custom item renderer to show a similar graphical representation, and use it in the `RadioGroup` component.
