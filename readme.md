# Rainforest Components

Set of standards-based web components following the [Cloudscape Design System](https://cloudscape.design).

## Why?

When I started at Amazon Web Services (AWS), I had ideas for projects I wanted to build. This is in fact a core operational behavior at Amazon called "mechanisms". In order to build a UI for my projects, I wanted to leverage the corporate design system, Cloudscape (previously Polaris). The design system is based on React, which as a web standards purist was a bridge I was just not willing to cross.

I asked the Cloudscape team if they had a web components version planned and if I could contribute to such a project. The response I got was "Why would we ever consider web components?" This is a direct quote, and this response blows my mind. Why would we ever use web standards? 

Why would you ever consider React?

> Trying desperately to avoid a flame war. 🔥

Okay, so the answer was a clear "No". Well, I guess I will just have to do it myself. And here we are. If your skill level includes some HTML and some JavaScript, Rainforest can help you build a Cloudscape-themed application. Or at the very least, get you a bad ass proof of concept. 💥

I have used the Rainforest components to build AWS-internal applications. They work well in the "real world". Where feasible the project aims for feature/API parity (with the occassional exceptions).

## Wait. Why?

- Web standards
- Minimal barrier to entry
- Easy to get started
- Easy to use
- No framework required
- No build required
- Works with frameworks

> This is a personal passion project. ❤️ It is not sponsored by Amazon. It is not sanctioned by Amazon. It is not affiliated with Amazon. I just happen to be an Amazon employee that wanted a web components version of the Cloudscape components for his internal projects.

## Getting Started

You need two parts. First is a CSS file for fonts (Amazon Ember) and a few styles that are used across multiple compoonents. Second is the components themselves. You can load the components in two ways: all at once or a la carte.

### CSS

``` html
<link href="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.css" rel="stylesheet">
```

### All At Once

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/rainforest.js" type="module"></script>
```

### A La Carte

When loading a la carte, component dependencies are loaded by the components themselves.

``` html
<script src="https://cdn.jsdelivr.net/npm/rainforest-web-components@latest/components/button.js" type="module"></script>
```

That is it! Nope, there is no builder required. Nope, you do not install NPM anything. No cloning any repositories. No command line tools to setup the directories and dependencies in just the right way. All you need is an HTML page; add two tags and you are done. Welcome to web standards. 🤯

## Components

- Badge
- [Box](./docs/box.md)
- [Button](./docs/button.md)
- [Icon](./docs/icon.md)
- [Input](./docs/input.md)
- [Link](./docs/link.md)
- [Space Between](./docs/space-between.md)
- [Spinner](./docs/spinner.md)
- [Status Indicator](./docs/status-indicator.md)
- [Text Content](./docs/text-content.md)

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

Attributes are the name/value pairs used in HTML (i.e. `<img src="">`). When an HTML element is accessed from JavaScript however, attributes are properties on that object instance (i.e. `image.src = ""`). HTML attributes have a limited set of data types that are supported. These are `string`, `float`, `integer`, `boolean` and `null`. JavaScript properties by comparison can be whatever data type you need; an `array` of `objects` is a common pattern.

With web components, for values within the finite set of data types, attributes are "reflected" as properties. Properties exist on the object instances for values where the data type is not appropriate for an attribute (i.e. `array`). These properties are not exposed as attributes.

### Slots

Cloudscape/React exposes slots as properties on any given component. With web components, you label composed elements with the `slot` attribute to specify where the content belongs.

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
  variant="h1">
  <!-- Note the slot name (actions) attribute -->
  <rf-space-between 
    direction="horizontal" 
    size="xs"
    slot="actions">
    <rf-button>Secondary button</rf-button>
    <rf-button variant="primary">
      Primary button
    </rf-button>
  </rf-space-between>
  Page title
<rf-header>
```

### LOL, Text Content

In a React world, where JSX is rendered into the DOM, I suppose having a component such as Text Content is necessary. If you are writing HTML however, and you want to have a chunk of HTML that gets styled appropriately, you write the HTML and let CSS do its thing. Text Content has been included for compatibility, but other than providing a block for content (like `div`, `article`, etc.), there is no functionality provided by the component itself. 

> Box is included for similar reasons. If you want a paragraph element (`p`), then consider using the element directly unless there is other need to wrap it in Box or Text Content.
