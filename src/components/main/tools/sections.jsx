"use client";
import { motion } from "motion/react";

// Components & UI
import { SectionLayout } from "@/components/common/layouts";
import { ToolCard } from "./tool-card";

// Constants & Variables
import { TOOLS } from "@/app/tools/tools";
const ALPHABETS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const CONTAINER_VARIANTS = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.1 } },
};
const TOOL_CARD_VARIANTS = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 25 } },
};



export function ToolListSection({ ...props }) {
	return (
		<SectionLayout {...props}>
			<motion.div
				className="grid @2xl:grid-cols-2 @6xl:grid-cols-3 gap-x-4 gap-y-6"
				variants={CONTAINER_VARIANTS}
				initial="hidden"
				animate="visible"
			>
				{ALPHABETS.map((letter) => {
					const tool = TOOLS[letter];
					return tool && (
						<motion.div
							key={tool.id}
							variants={TOOL_CARD_VARIANTS}
						>
							<ToolCard className="h-full" {...tool} />
						</motion.div>
					);
				})}
			</motion.div>
		</SectionLayout>
	);
}