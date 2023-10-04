# Rainforest Components

Set of standards-based web components following the [Cloudscape Design System](https://cloudscape.design).

## Why?

When I started at Amazon Web Services (AWS), I had ideas for projects I wanted to build. This is in fact a core operational behavior at Amazon called "mechanisms". In order to build a UI for my projects, I wanted to leverage the corporate design system, Cloudscape (previously Polaris). The design system is based on React, which as a web standards purist was a bridge I was just not willing to cross.

I asked the Cloudscape team if they had a web components version in planned and if I could contribute to such a project. The response I got was "Why would we ever consider web components?" This is a direct quote, and this response blows my mind. Why would we ever use web standards? 

Why would you ever consider React?

> Trying desperately to avoid a flame war.

Okay, so the answer was a clear "No". Well, I guess I will just have to do it myself. And here we are. If your skill level includes some HTML and some JavaScript, Rainforest can help you build a Cloudscape-themed application. 

I have used the Rainforest components to build AWS-internal applications. They work well in the "real world". Where feasible the project aims for feature/API parity (with a few exceptions).

## Wait. Why?

- Web standards
- No framework required
- Works with frameworks
- Minimal barrier to entry
- No build required
- Easy to get started
- Easy to use

> This is a personal passion project. It is not sponsored by Amazon. It is not sanctioned by Amazon. It is not affiliated with Amazon. I just happen to be an Amazon employee that wanted a web components version of the Cloudscape components for his internal projects.

## Containers

- [Space Between](./docs/space-between.md)

## Controls

- Badge
- [Box](./docs/box.md)
- [Button](./docs/button.md)
- Icon
- Link

## Some Differences to Consider

Cloudscape uses the React framework. There are ideomatic ways in which React is used. Some of these constructs do not suit web standards well. Where those differences are significant is discussed in the following sections. Otherwise Rainforest tries for feature/API parity.

### A Dash of Prefix

Web components are required to have a prefix to avoid collision in naming. You might use a `Button` web component from one project, and then a `Calendar` component from another, where the `Calendar` uses a `Button` as well - a button from its own project. Which `Button` should be used where? Prefixing avoids this collision. 

The prefix for Rainforest is `rf-`. Open and close tags are required for web components.

``` html
<rf-button>Button</rf-button> <!-- HTML -->
<Button>Button</Button> <!-- Cloudscape/React -->
```

### Controls vs Containers vs Components  

Composition is an important concept for web components. The ability of one component to hold other components, and potentially change how they are rendered. This concept surfaces in React and thus in Cloudscape as well. Within Rainforest, there are two groupings of **components**; there are **controls** and there are **containers**. Controls are elements the user interacts with directly, while containers are responsible for layout.

> When a components are not differentiated, there is often a "comp" or "components" directory with the project structure. Web components are often used as building blocks in components for custom applications. Those application components oten need a directory structure all their own. Differentiating between "control" and "container" frees up the "components" directory to contain pieces pertinent to that application implmentation.

### Box vs Label

Cloudscape has a component called `Box`. The `Box` component can contain *text content or other elements*. The primary way in which it does this is through the `variant` attribute. The `variant` attribute allows an element to be specified that will be rendered by Reacy. An example might be `p` or `h1` both of which are possible values for the `variant` attribute, which generate a `p` or `h1` element respectively when rendered. 

Web components do not have the same virtual DOM rendering concept as React. An `rf-box` element will always be an `rf-box` element. Specifying a `variant` attribute can instruct the `rf-box` element to alter the shadow DOM (what is rendered inside of it), but the `rf-box` is still an `rf-box` in the DOM. If you want a `p` element, then use the `p` element, not the `rf-box` element.

Still, one understands the need in a design system to use components to provide consistency. To that end, Rainforest offers `rf-box`, `rf-hbox`, and `rf-vbox` containers that enforce Cloudscape styles and apply CSS Flex Box rendering options. There is also a `rf-label` control for text content which applies the Cloudscape styles.
