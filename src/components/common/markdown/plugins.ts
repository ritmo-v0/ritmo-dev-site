import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";

// Types & Interfaces
import type { Root } from "mdast";



export function remarkTextDirective() {
	return (tree: Root) => {
		visit(tree, "textDirective", (node, index, parent) => {
			if (
				!parent || !index ||
				node.children.length > 0 ||
				(node.attributes && Object.keys(node.attributes).length > 0)
			) return;

			parent.children[index] = { type: "text", value: `:${node.name}` };
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
			const title = toString(node.children) || undefined;

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