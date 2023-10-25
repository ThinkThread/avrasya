# Avrasya Web Framework

  [![NPM Version][npm-version-image]][npm-url]
  [![NPM Install Size][npm-install-size-image]][npm-install-size-url]
  [![NPM Downloads][npm-downloads-image]][npm-downloads-url]

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

avrasya.middleware.add((context) => {
    console.log("middleware");
    console.log(context.req.url + " " + context.req.method);
})

avrasya.listen(3000);
```

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

## Contribution Guidelines

Thank you for considering contributing to this project! [CONTRIBUTING](/CONTRIBUTING.md)

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