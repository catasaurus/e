import NextAuth from "next-auth";
import { authOptions } from "e/server/auth";

export default NextAuth(authOptions);
