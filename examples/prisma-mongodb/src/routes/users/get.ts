import Context from "avrasya/src/context";
import prisma from "../../lib/prisma";

const get = async (context: Context) => {
    const users = await prisma.user.findMany();
    context.send(users);
}

export default get;