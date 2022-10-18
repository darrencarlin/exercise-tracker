export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/add",
    "/delete",
    "/exercise",
    "/exercises",
    "/profile",
    "/progress",
    "/workout",
    "/",
  ],
};
