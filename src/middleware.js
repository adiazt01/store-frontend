import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
	const jwt = req.cookies.get("token");

	if (!jwt) {
		console.log("No JWT token found");
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	try {
		const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
		const payload = await jwtVerify(jwt.value, secretKey);
		console.log("JWT payload:", payload);
	} catch (error) {
		console.log("JWT verification error:", error);
	}
}

export const config = {
	matcher: ["/dashboard", "/dashboard/:path*"],
};
