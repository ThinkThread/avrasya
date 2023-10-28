import Context from "avrasya/src/context";
const get = (context: Context) => {
    context.send("Hello World");
}

export default get
