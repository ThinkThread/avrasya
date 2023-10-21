import Avrasya from "avrasya";

const avrasya = new Avrasya();

avrasya.router.get("/", (context) => {
    context.send("Hello World!");
});

avrasya.router.get("/hello", (context) => {
    context.send("Hello World!");
})

avrasya.router.get("/hello/:name", (context) => {
    context.send(`Hello ${context.params.name}`);
})

avrasya.router.get("/hello/:name/:age", (context) => {
    context.send(`Hello ${context.params.name} ${context.params.age}`);
})

avrasya.router.get("/hello/:name/:age/:city", (context) => {
    context.send(`Hello ${context.params.name} ${context.params.age} ${context.params.city}`);
})

avrasya.router.get("/hello/:name/:age/:city/:country", (context) => {
    context.send(`Hello ${context.params.name} ${context.params.age} ${context.params.city} ${context.params.country}`);
})

avrasya.listen(3000);