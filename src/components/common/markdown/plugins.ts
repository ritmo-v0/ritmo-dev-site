import { visit } from "unist-util-visit";
import { toString as mdastToString } from "mdast-util-to-string";

// Types & Interfaces
import type { Root } from "mdast";



export function remarkTextDirective() {
	return (tree: Root) => {
		visit(tree, "textDirective", (node, index, parent) => {
			if (!parent || index === undefined) return;

			const text = mdastToString(node.children);
			parent.children[index] = {
				type: "text",
				value: `:${node.name}${text ? `[${text}]` : ""}`,
			};

			return index + 1;
		});
	};
}

export function remarkLeafDirective() {
	return (tree: Root) => {
		visit(tree, "leafDirective", (node, index, parent) => {
			const id = node.attributes?.id;
			const title = mdastToString(node.children) || undefined;

			if (node.name !== "youtube" || !id || !(/^[\w-]{11}$/).test(id)) {
				if (!parent || index === undefined) return;

				parent.children[index] = {
					type: "paragraph",
					children: [{
						type: "text",
						value: `::${node.name}${title ? `[${title}]` : ""}`,
					}],
				};

				return index + 1;
			}

			node.data ??= {};
			node.data.hName = "iframe";
			node.data.hProperties = {
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

			node.data.hName = "aside";
			node.data.hProperties = { variant: node.name };
		});
	};
}