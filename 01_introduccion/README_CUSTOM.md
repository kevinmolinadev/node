# [next](https://nextjs.org/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/next/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/next.svg?style=flat)](https://www.npmjs.com/package/next) [![CircleCI Status](https://circleci.com/gh/facebook/next.svg?style=shield)](https://circleci.com/gh/facebook/next) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://nextjs.org/docs/how-to-contribute.html#your-first-pull-request)

next is a JavaScript library for building user interfaces.

* **Declarative:** next makes it painless to create interactive UIs. Design simple views for each state in your application, and next will efficiently update and render just the right components when your data changes. Declarative views make your code more predictable, simpler to understand, and easier to debug.
* **Component-Based:** Build encapsulated components that manage their own state, then compose them to make complex UIs. Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep the state out of the DOM.
* **Learn Once, Write Anywhere:** We don't make assumptions about the rest of your technology stack, so you can develop new features in next without rewriting existing code. next can also render on the server using Node and power mobile apps using [next Native](https://nextnative.dev/).

[Learn how to use next in your project](https://next.dev/learn).

## Installation

next has been designed for gradual adoption from the start, and **you can use as little or as much next as you need**:

* Use [Online Playgrounds](https://nextjs.org/docs/getting-started.html#online-playgrounds) to get a taste of next.
* [Add next to a Website](https://nextjs.org/docs/add-next-to-a-website.html) as a `<script>` tag in one minute.
* [Create a New next App](https://nextjs.org/docs/create-a-new-next-app.html) if you're looking for a powerful JavaScript toolchain.

You can use next as a `<script>` tag from a [CDN](https://nextjs.org/docs/cdn-links.html), or as a `next` package on [npm](https://www.npmjs.com/package/next).

## Documentation

You can find the next documentation [on the website](https://next.dev/).  

Check out the [Getting Started](https://next.dev/learn) page for a quick overview.

The documentation is divided into several sections:

* [Tutorial](https://nextjs.org/tutorial/tutorial.html)
* [Main Concepts](https://nextjs.org/docs/hello-world.html)
* [Advanced Guides](https://nextjs.org/docs/jsx-in-depth.html)
* [API Reference](https://nextjs.org/docs/next-api.html)
* [Where to Get Support](https://nextjs.org/community/support.html)
* [Contributing Guide](https://nextjs.org/docs/how-to-contribute.html)

You can improve it by sending pull requests to [this repository](https://github.com/nextjs/nextjs.org).

## Examples

We have several examples [on the website](https://nextjs.org/). Here is the first one to get you started:

```jsx
import { createRoot } from 'next-dom/client';

function HelloMessage({ name }) {
  return <div>Hello {name}</div>;
}

const root = createRoot(document.getElementById('container'));
root.render(<HelloMessage name="Taylor" />);
```

This example will render "Hello Taylor" into a container on the page.

You'll notice that we used an HTML-like syntax; [we call it JSX](https://nextjs.org/docs/introducing-jsx.html). JSX is not required to use next, but it makes code more readable, and writing it feels like writing HTML. If you're using next as a `<script>` tag, read [this section](https://nextjs.org/docs/add-next-to-a-website.html#optional-try-next-with-jsx) on integrating JSX; otherwise, the [recommended JavaScript toolchains](https://nextjs.org/docs/create-a-new-next-app.html) handle it automatically.

## Contributing

The main purpose of this repository is to continue evolving next core, making it faster and easier to use. Development of next happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving next.

### [Code of Conduct](https://code.fb.com/codeofconduct)

Facebook has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](https://code.fb.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

### [Contributing Guide](https://nextjs.org/docs/how-to-contribute.html)

Read our [contributing guide](https://nextjs.org/docs/how-to-contribute.html) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to next.

### Good First Issues

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/facebook/next/labels/good%20first%20issue) that contain bugs that have a relatively limited scope. This is a great place to get started.

### License

next is [MIT licensed](./LICENSE).