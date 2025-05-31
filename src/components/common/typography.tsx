import { cn } from "@/lib/utils";
import Link from "next/link";

// Types & Interfaces
interface TypographyProps {
	className?: string;
	children: React.ReactNode;
}

interface AnchorProps extends TypographyProps {
	href: string;
}

// Markdown
// import dynamic from "next/dynamic";
// import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// const Twemoji = dynamic(() => import("react-twemoji"));



// export function MarkdownText({ className, children }: TypographyProps) {
// 	return (
// 		<Markdown
// 			className={className}
// 			remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
// 			components={{
//                 p: ({ ...props }) => (
// 					<Twemoji options={{ className: "twemoji" }}>
// 						{props.children}
// 					</Twemoji>
// 				),
//             }}
// 		>
// 			{children}
// 		</Markdown>
// 	);
// }

export const H1: React.FC<TypographyProps> = ({ className, children }) => (
	<h1 className={cn("scroll-m-20 font-heading text-3xl font-bold tracking-tight lg:text-4xl", className)}>
		{children}
	</h1>
);

export const H2: React.FC<TypographyProps> = ({ className, children }) => (
	<h2 className={cn("scroll-m-20 font-heading border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0", className)}>
		{children}
	</h2>
);

export const H3: React.FC<TypographyProps> = ({ className, children }) => (
	<h3 className={cn("scroll-m-20 font-heading text-xl font-semibold tracking-tight", className)}>
		{children}
	</h3>
);

export const H4: React.FC<TypographyProps> = ({ className, children }) => (
	<h4 className={cn("scroll-m-20 font-heading text-lg font-semibold tracking-tight", className)}>
		{children}
	</h4>
);

export const H5: React.FC<TypographyProps> = ({ className, children }) => (
	<h5 className={cn("scroll-m-20 font-heading text-base font-medium tracking-tight", className)}>
		{children}
	</h5>
);

export const H6: React.FC<TypographyProps> = ({ className, children }) => (
	<h6 className={cn("scroll-m-20 font-heading text-sm font-medium tracking-tight", className)}>
		{children}
	</h6>
);

export const P: React.FC<TypographyProps> = ({ className, children }) => (
	<p className={cn("leading-7 [&:not(:first-child)]:mt-4", className)}>
		{children}
	</p>
);

export const Muted: React.FC<TypographyProps> = ({ className, children }) => (
	<p className={cn("text-sm text-muted-foreground", className)}>
		{children}
	</p>
);

export const Anchor: React.FC<AnchorProps> = ({ className, children, href }) => (
	<Link href={href} className={cn("font-medium text-primary underline underline-offset-4", className)}>
		{children}
	</Link>
);