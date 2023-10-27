import Avrasya from "avrasya";

const avrasya = new Avrasya();

avrasya.router.get("/css", (context) => {
    const css = `
        body {
            background-color: red;
        }
    `;
    context.css(css);
});

avrasya.router.get("/js", (context) => {
    const js = `
        console.log("Hello World");
    `;
    context.js(js);
})

avrasya.router.get("/html", (context) => {
    const html = `
        <h1>Hello World</h1>
        <p>Avrasya is a fast and unique Node.js web framework designed for building web applications and APIs. Avrasya stands out with its simple usage, performance, and extensibility.</p>
        <button>Click me</button>
    `;
    context.html(html);
});

avrasya.router.get("/json", (context) => {
    const json = {
        name: "Avrasya",
        version: "1.0.13",
        description: "Avrasya is a fast and unique Node.js web framework designed for building web applications and APIs. Avrasya stands out with its simple usage, performance, and extensibility."
    };
    context.json(json);
})

avrasya.router.get("/text", (context) => {
    const text = "Avrasya is a fast and unique Node.js web framework designed for building web applications and APIs. Avrasya stands out with its simple usage, performance, and extensibility.";
    context.text(text);
})

avrasya.router.get("/file", (context) => {
    const path = "index.html";
    context.file(path);
})

avrasya.router.get("/image", (context) => {
    const path = "avrasya.png";
    context.file(path);
})

avrasya.router.get("/redirect", (context) => {
    context.redirect("https://www.google.com");
})

avrasya.listen(3000);