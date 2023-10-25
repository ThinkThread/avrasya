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