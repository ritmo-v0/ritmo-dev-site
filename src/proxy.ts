import { type NextRequest, NextResponse } from "next/server";
import { isMarkdownPreferred, rewritePath } from "@/lib/negotiation";

// next-intl
import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";

const i18nMiddleware = createMiddleware(routing);

// Constants & Variables
const ARTICLES_ROUTE = "/articles";
const ARTICLES_CONTENT_ROUTE = "/llms.md/articles";
const { rewrite: rewriteSuffix } = rewritePath(
	`${ARTICLES_ROUTE}/:articleId.md{x}`,
	`${ARTICLES_CONTENT_ROUTE}/:articleId`
);
const { rewrite: rewriteAccept } = rewritePath(
	`${ARTICLES_ROUTE}/:articleId`,
	`${ARTICLES_CONTENT_ROUTE}/:articleId`
);



export default function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	const suffix = rewriteSuffix(pathname);
	if (suffix) return NextResponse.rewrite(new URL(suffix, request.nextUrl));

	if (isMarkdownPreferred(request)) {
		const target = rewriteAccept(pathname);
		if (target) return NextResponse.rewrite(new URL(target, request.nextUrl), {
			headers: { Vary: "Accept" },
		});
	}

	return i18nMiddleware(request);
}

export const config = {
	matcher: [
		"/((?!api|trpc|_next|_vercel|.*\\..*).*)",
		"/articles/:articleId.md",
		"/articles/:articleId.mdx",
	],
};