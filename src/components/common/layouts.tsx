import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

// Components & UI
import { H1, H2, H3, H4, H5, H6 } from "./typography";

// Constants & Variables
const sectionVariants = cva(
	"",
	{
		variants: {
			titleAs: {
				h1: "py-8",
				h2: "py-6",
				h3: "py-3",
				h4: "py-2",
				h5: "py-1",
				h6: "py-1",
			},
		},
		defaultVariants: {
			titleAs: "h2",
		},
	}
);

const HEADING_MAP = {
	h1: H1,
	h2: H2,
	h3: H3,
	h4: H4,
	h5: H5,
	h6: H6,
} as const;

// Types & Interfaces
interface WrapperLayoutProps {
	children: React.ReactNode;
	className?: string;
	width?: number;
}

interface SectionLayoutProps {
	children: React.ReactNode;
	className?: string;
	title?: string;
	titleAs?: keyof typeof HEADING_MAP;
}



export const WrapperLayout: React.FC<WrapperLayoutProps> = ({
	children,
	className,
	width = 1400,
}) => {
	return (
		<div
			style={{ "--wrapper-width": `${width}px` } as React.CSSProperties}
			className={cn(
				"@container mx-auto [--wrapper-padding:_2rem] sm:[--wrapper-padding:_4rem] w-[min(calc(100%_-_var(--wrapper-padding)),_var(--wrapper-width))]",
				className
			)}
		>
			{children}
		</div>
	);
};


export const SectionLayout: React.FC<SectionLayoutProps> = ({
	children,
	className,
	title = "",
	titleAs = "h2",
}) => {
	const TitleTag = HEADING_MAP[titleAs] || H2;

	return (
		<section className={cn(sectionVariants({ titleAs, className }))}>
			{title && <TitleTag>{title}</TitleTag>}
			{children}
		</section>
	);
};