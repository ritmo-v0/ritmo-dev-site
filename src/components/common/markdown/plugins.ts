import { visit } from "unist-util-visit";
import { toString as mdastToString } from "mdast-util-to-string";
import { match } from "ts-pattern";

// Types & Interfaces
import type { Root } from "mdast";



export function remarkTextDirective() {
	return (tree: Root) => {
		visit(tree, "textDirective", (node) => {
			node.data ??= {};
			const data = node.data;

			data.hName = match(node.name)
				.with("abbr", () => "abbr")
				.with("b", () => "strong")
				.with("i", () => "em")
				.with("br", () => "br")
				.otherwise(() => "span");
			data.hProperties = {
				...(node.attributes || {}),
				dataName: node.name,
			};
		});
	};
}

export function remarkLeafDirective() {
	return (tree: Root) => {
		visit(tree, "leafDirective", (node) => {
			if (node.name !== "youtube") return;

			node.data ??= {};
			const data = node.data;
			const id = node.attributes?.id;
			const title = mdastToString(node.children) || undefined;

			if (!id) return;

			data.hName = "iframe";
			data.hProperties = {
				src: `https://www.youtube-nocookie.com/embed/${id}`,
				title,
			};
		});
	};
}

export function remarkContainerDirective() {
	return (tree: Root) => {
		visit(tree, "containerDirective", (node) => {
			node.data ??= {};
			const data = node.data;

			data.hName = "aside";
			data.hProperties = {
				...(node.attributes || {}),
				variant: node.name,
			};
		});
	};
}