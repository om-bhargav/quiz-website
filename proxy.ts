import { NextRequest, NextResponse, userAgent } from "next/server";
import { checkAdmin, checkUser } from "./lib/checkAuth";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/404") return NextResponse.next();

  const { device } = userAgent(req);
  const isMobile = device.type === "mobile";
  const isDesktop = !isMobile;

  const isLoggedIn = !!(await checkUser());
  const isAdmin = await checkAdmin();

  const redirect = (path: string) => {
    if (pathname !== path) {
      return NextResponse.redirect(new URL(path, req.url));
    }
    return NextResponse.next();
  };

  const publicMobileRoutes = ["/mobile/login", "/mobile/signup","/mobile/forgot-password"];
  const publicDesktopRoutes = ["/admin/login", "/"];

  const isMobileRoute = pathname.startsWith("/mobile");
  const isAdminRoute = pathname.startsWith("/admin");
  if (isDesktop) {
    if (!isAdminRoute) {
      return redirect("/404");
    }
    if (isLoggedIn) {
      if (isAdmin) {
        if (publicDesktopRoutes.includes(pathname)) {
          return redirect("/admin");
        } else {
          return NextResponse.next();
        }
      }else{
        return redirect("/");
      }
    } else {
      if(publicDesktopRoutes.includes(pathname)){
        return NextResponse.next();
      }
      return redirect("/admin/login");
    }
  }

  if (isMobile) {
    if (!isMobileRoute) {
      return redirect("/404");
    }
    if (isLoggedIn) {
      if (publicMobileRoutes.includes(pathname)) {
        return redirect("/mobile");
      } else {
        return NextResponse.next();
      }
    } else {
      if(publicMobileRoutes.includes(pathname)){
        return NextResponse.next();
      }
      return redirect("/mobile/login");
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/admin/:path*", "/mobile/:path*"],
};
