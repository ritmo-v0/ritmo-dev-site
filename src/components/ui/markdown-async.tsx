import { MarkdownAsync as BaseMarkdownAsync } from "@ritmo-v0/markdown/server";

// Components & UI
import { MARKDOWN_COMPONENTS } from "./markdown";



export function MarkdownAsync({
	components,
	...props
}: React.ComponentProps<typeof BaseMarkdownAsync>) {
	return (
		<BaseMarkdownAsync
			components={components
				? { ...MARKDOWN_COMPONENTS, ...components }
				: MARKDOWN_COMPONENTS}
			{...props}
		/>
	);
}