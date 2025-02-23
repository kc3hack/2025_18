import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server"; 

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)"
]);

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const { userId } = await auth(); // 👈 `await` して `userId` を取得！

  if (!isPublicRoute(request)) {
    await auth.protect(); // `await` をつける

    // 未ログインユーザーが `/` にアクセスしたら `/sign-in` にリダイレクト
    if (!userId && request.nextUrl.pathname === "/") {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
