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

			match(node.name)
				.with("abbr", "b", "i", "br", (hName) => {
					Object.assign(data, {
						hName,
						hProperties: node.attributes,
					});
				})
				.otherwise((nodeName) => {
					const children = mdastToString(node);

					Object.assign(node, {
						type: "text",
						value: `:${nodeName}${children ? `[${children}]` : ""}`,
					});
				});
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
			const title = mdastToString(node) || undefined;

			if (!id) return;

			Object.assign(data, {
				hName: "iframe",
				hProperties: {
					src: `https://www.youtube-nocookie.com/embed/${id}`,
					title,
				},
			});
		});
	};
}

export function remarkContainerDirective() {
	return (tree: Root) => {
		visit(tree, "containerDirective", (node) => {
			node.data ??= {};
			const data = node.data;

			Object.assign(data, {
				hName: "aside",
				hProperties: {
					...(node.attributes || {}),
					variant: node.name,
				},
			});
		});
	};
}