export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/courses/:path*", "/lessons/:path*", "/starred/:path*"],
};
