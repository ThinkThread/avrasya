# Avrasya Web Framework

  [![NPM Version][npm-version-image]][npm-url]
  [![NPM Install Size][npm-install-size-image]][npm-install-size-url]
  [![NPM Downloads][npm-downloads-image]][npm-downloads-url]
  [![Known Vulnerabilities](https://snyk.io/test/github/muhtalipdede/avrasya/badge.svg)](https://snyk.io/test/github/muhtalipdede/avrasya)
  [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=ThinkThread_avrasya&metric=bugs)](https://sonarcloud.io/summary/new_code?id=ThinkThread_avrasya)
  [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=ThinkThread_avrasya&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=ThinkThread_avrasya)
  [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=ThinkThread_avrasya&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=ThinkThread_avrasya)
  [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=ThinkThread_avrasya&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=ThinkThread_avrasya)
  [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ThinkThread_avrasya&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=ThinkThread_avrasya)
  [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=ThinkThread_avrasya&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=ThinkThread_avrasya)
  [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=ThinkThread_avrasya&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=ThinkThread_avrasya)
  [![CodeFactor](https://www.codefactor.io/repository/github/muhtalipdede/avrasya/badge)](https://www.codefactor.io/repository/github/muhtalipdede/avrasya)
  [![Codacy Badge](https://app.codacy.com/project/badge/Grade/ff4e1c45beb34681b3b4f9946f369c2b)](https://app.codacy.com/gh/muhtalipdede/avrasya/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
  [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ThinkThread_avrasya&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ThinkThread_avrasya)

  <img src="./images/avrasya.png" alt="drawing" width="200" style="display: block; margin-left: auto; margin-right: auto; margin-bottom: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.5);" alt="Avrasya Logo"/>

  <p align="center">
   • <a href="https://avrasya.fly.dev">Official Website</a> •
  </p>
Avrasya is a fast and unique Node.js web framework designed for building web applications and APIs. Avrasya stands out with its simple usage, performance, and extensibility.

## Features

- Simple and user-friendly API
- Fast and efficient
- Middleware support
- Extensibility
- Open-source and free

## Getting Started

To get started with Avrasya, follow these steps:

1. Add Avrasya to your project:

```bash
npm install avrasya
```

2. Create your web server:

```typescript
import Avrasya from "avrasya";

const avrasya = new Avrasya();

avrasya.router.get("/", (context) => {
    context.send("Hello World");
});

avrasya.use((context, next) => {
    console.log("middleware1");
    console.log(context.req.url + " " + context.req.method);
    next();
})

avrasya.use((context, next) => {
    console.log("middleware2");
    next();
})

avrasya.use((context, next) => {
    console.log("middleware3");
    next();
})

avrasya.listen(3000);
```

##  File Based Routing

```bash
| src
    | index.ts
    | routes
        | get.ts
        | user
            | get.ts
            | [id]
                | get.ts
                | post.ts
```

### get.ts Example Handler

```typescript
import Context from "avrasya/src/context";
const get = (context: Context) => {
    context.send("Hello World");
}

export default get
```

See [Example](./examples/file-based-routes) for more details.

## Installation

To get started with Avrasya, follow these simple installation steps:

1. Clone the Repository:

```bash
git clone https://github.com/muhtalipdede/avrasya.git
```

2. Navigate to the Project Directory:

```bash
cd avrasya
```

3. Install Dependencies:

```bash
npm install
```

4. Start the Application:

```bash
npm run start
```

## Content Type Support

### Serving CSS

```javascript
avrasya.router.get("/css", (context) => {
    const css = `
        body {
            background-color: red;
        }
    `;
    context.css(css);
});
```

### Serving Javascript

```javascript
avrasya.router.get("/js", (context) => {
    const js = `
        console.log("Hello World");
    `;
    context.js(js);
});
```

### Serving HTML

```javascript
avrasya.router.get("/html", (context) => {
    const html = `
        <h1>Hello World</h1>
        <p>Avrasya is a fast and unique Node.js web framework designed for building web applications and APIs. Avrasya stands out with its simple usage, performance, and extensibility.</p>
        <button>Click me</button>
    `;
    context.html(html);
});
```

### Serving JSON

```javascript
avrasya.router.get("/json", (context) => {
    const json = {
        name: "Avrasya",
        version: "1.0.13",
        description: "Avrasya is a fast and unique Node.js web framework designed for building web applications and APIs. Avrasya stands out with its simple usage, performance, and extensibility."
    };
    context.json(json);
});
```

### Serving Plain Text

```javascript
avrasya.router.get("/text", (context) => {
    const text = "Avrasya is a fast and unique Node.js web framework designed for building web applications and APIs. Avrasya stands out with its simple usage, performance, and extensibility.";
    context.text(text);
});
```

### Serving Files

```javascript
avrasya.router.get("/image", (context) => {
    const path = "avrasya.png";
    context.file(path);
});
```

### Redirecting

```javascript
avrasya.router.get("/redirect", (context) => {
    context.redirect("https://www.google.com");
});
```

## Contribution Guidelines

Thank you for considering contributing to this project! [CONTRIBUTING](/CONTRIBUTING.md)

## Contributors

Check out the list of contributors in the [CONTRIBUTORS](/CONTRIBUTORS.md) file.

## Issue Template

If you want to report an issue or request a new feature, please use the following template. [ISSUE_TEMPLATE](/.github/ISSUE_TEMPLATE.md)

## License

This project is licensed under the MIT License. For more information, please refer to the [LICENSE](/LICENSE) File.

[npm-downloads-image]: https://badgen.net/npm/dm/avrasya
[npm-downloads-url]: https://npmcharts.com/compare/avrasya?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/avrasya
[npm-install-size-url]: https://packagephobia.com/result?p=avrasya
[npm-url]: https://npmjs.org/package/avrasya
[npm-version-image]: https://badgen.net/npm/v/avrasya
