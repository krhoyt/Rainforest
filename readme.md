# Rainforest Components

Set of standards-based web components following the [Cloudscape Design System](https://cloudscape.design).

> Each component is lovingly crafted and maintained by hand from scratch. No code from Cloudscape is part of this project.

## Why?

- Web standards
- Minimal barrier to entry
- Easy to get started
- Easy to use
- No framework required
- No build required
- Works with frameworks
- Highly customizable

> This is a personal passion project. ❤️ It is not sponsored by Amazon. It is not sanctioned by Amazon. It is not affiliated with Amazon. I just happen to be an Amazon employee that wanted a standards-based version of the Cloudscape components for my own projects.

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

> Most components offer feature parity with their Cloudscape counterparts, but will surface those features in ways most ideomatic to web standards.

- ✅ [Alert](./docs/alert.md)
- ✅ [Avatar](./docs/avatar.md)
- ✅ [Badge](./docs/badge.md)
- ✅ [Box](./docs/box.md)
- ✅ [Breadcrumb](./docs/breadcrumb.md)
- ✅ [Breadcrumb Group](./docs/breadcrumb-group.md)
- ✅ [Button](./docs/button.md)
- ❓ Button Dropdown
- ❓ Button Group
- ✅ [Calendar](./docs/calendar.md)
- ✅ [Cats](./docs/cats.md) 🐈 ⚠️
- ✅ [Chat Bubble](./docs/chat-bubble.md)
- ✅ [Checkbox](./docs/checkbox.md)
- ✅ [Container](./docs/container.md)
- ✅ [Content Layout](./docs/content-layout.md)
- ✅ [Copy to Clipboard](./docs/copy-to-clipboard.md)
- ✈️ Date Picker
- ✅ [Expandable Section](./docs/expandable-section.md)
- ✅ [Flashbar](./docs/flashbar.md)
- ✅ [File Dropzone](./docs/file-dropzone.md)
- ✅ [File Input](./docs/file-input.md)
- ✅ [File Token](./docs/file-token.md)
- ✅ [File Token Group](./docs/file-token-group.md)
- ✅ [File Upload](./docs/file-upload.md)
- ✅ [Form Field](./docs/form-field.md)
- ✅ [Format Date](./docs/format-date.md) ⚠️
- ✅ [Header](./docs/header.md)
- ✅ [Icon](./docs/icon.md)
- ✅ [Input](./docs/input.md)
- ✅ [Label](./docs/label.md) ⚠️
- ✅ [Link](./docs/link.md)
- ❓ Multiselect
- ✅ [Object](./docs/object.md) ⚠️
- ✅ [Option](./docs/option.md) ⚠️
- ✅ [Pagination](./docs/pagination.md)
- ✈️ [Pie and Donut Charts](./docs/pie-chart.md)
- ✅ [Polar Chart](./docs/polar-chart.md) ⚠️
- ❓ Popover
- ❓ Rating ⚠️
- ✅ [Radio](./docs/radio.md) ⚠️
- ✅ [Radio Group](./docs/radio-group.md)
- ✅ [Segment](./docs/segment.md) ⚠️
- ✅ [Segmented Control](./docs/segmented-control.md)
- ✅ [Select](./docs/select.md)
- ✅ [Space Between](./docs/space-between.md)
- ✅ [Spacer](./docs/spacer.md) ⚠️
- ✅ [Spinner](./docs/spinner.md)
- ✅ [Stack](./docs/stack.md) ⚠️
- ✅ [Status Indicator](./docs/status-indicator.md)
- ✈️ Table
- ✈️ Table Column
- ✅ [Tab](./docs/tab.md) ⚠️
- ✅ [Tab Group](./docs/tab-group.md)
- ✅ [Tab Panel](./docs/tab-panel.md) ⚠️
- ✅ [Text Area](./docs/textarea.md)
- ✅ [Text Content](./docs/text-content.md)
- ✅ [Toggle](./docs/toggle.md)
- ✅ [Token](./docs/token.md) ⚠️
- ✅ [Token Group](./docs/token-group.md)
- ✅ [Top Navigation](./docs/top-navigation.md)
- ✅ [Usage Chart](./docs/usage-chart.md) ⚠️

✅ Implemented (35)   
✈️ In-flight/progress (3)  
📆 Planned  (1)   
❓ To be determined (4)  
⚠️ Not part of Cloudscape (11)

## Some Differences to Consider

Cloudscape uses the React framework. Rainforest uses web standards, and is not a framework. There are ideomatic ways in which each is used. 

### Tag Prefix

Web components are required to have a prefix to avoid collision in naming. The prefix for Rainforest is `rf-`. Open and close tags are required for web components.

``` html
<rf-button label="Button"></rf-button> <!-- HTML -->
<Button>Button</Button> <!-- Cloudscape/React -->
```

### Reflection

Attributes are the name/value pairs used in HTML (i.e. `<img src="">`). When an HTML element is accessed from JavaScript however, attributes are properties on that object instance (i.e. `image.src = ""`). Being able to use `src` in both situations is called, reflection. The reflected data types are `string`, `float`, `integer`, `boolean` and `null`. Other types such as `array`, `date`, and `function` are available only as properties.

``` html
<rf-icon name="settings"></rf-icon>
```

Is the same as...

``` javascript
const icon = new RFIcon();
icon.name = 'settings';
document.body.appendChild( icon );
```

Is the same as...

``` javascript
const icon = document.createElement( 'rf-icon' );
icon.name = 'settings';
document.body.appendChild( icon );
```

### Composition

Slots allow pieces of content to be placed in specific parts of a web component. When there are multiple slots, they need to be named. This allows for "composition" of content. In order to specify the slot name, a tag must be used. Content without slot names are placed in the "default" slot.

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
  <rf-label 
    text="This is a description" 
    slot="description">
  </rf-label> <!-- Description -->
</rf-form-field>
```

> Rainforest emphasizes attributes over composition wherever strings are the content that is being slotted. 

### Styling

Styling web components can take a few different forms. CSS Parts allows a component to expose elements that are internal to CSS styling. CSS Variables expose component-specific styles. These are prefixed with the name of the component. Some styles are exposed as attributes on a component and use common notation to specify the value. 

``` css
rf-label::part( label ) {
  font-size: 2em;
}
```

``` css
rf-label {
  --label-font-size: 2em;
}

``` html
<rf-label font-size="xl" text="Hello world!"></rf-label>
```

### Icons

The icons included with Cloudscape are all present in Rainforest. If you need to use the icons, then you have two choices. 

The first option is to use an `img` element and specify the path to the desired icon as the `src` attribute. Depending on what content is being served up from what domain, this can cause problems with loading. The get around this, the `rf-icon` element includes a `cdn` attribute, which tells the component to always pull from the absolute URL for the CDN hosting the Rainforest project. The `rf-icon` element also includes a `path` attribute should you want to specify a specific location to use for the icon SVG files.

The second option is to use MOAR web components. Every one of the SVG icons included with Cloudscape, are also included in Rainforest as self-contained web components. The naming scheme here follows `rf-` and then the file name of the desired SVG icon without the file extension. As an example, the `user-profile.svg` icon becomes `<rf-icon-user-profile></rf-icon-user-profile>`. This is how the Rainforest components load any necessary icons.
