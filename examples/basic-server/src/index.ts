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