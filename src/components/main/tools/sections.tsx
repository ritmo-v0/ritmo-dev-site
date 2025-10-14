"use client";

// Components & UI
import { motion } from "motion/react";
import { ToolCard } from "./tool-card";
import { Section } from "@/components/common/typography";

// Constants & Variables
import { TOOLS } from "@/app/tools/tools";
import { TRANSITION_200_25, getContainerVariants } from "@/lib/transitions";
// const ALPHABETS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const CONTAINER_VARIANTS = getContainerVariants(0.1);
const CHILDREN_VARIANTS = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: TRANSITION_200_25 },
};



export function ToolListSection() {
	return (
		<Section>
			<motion.div
				className="grid @2xl:grid-cols-2 @6xl:grid-cols-3 gap-x-4 gap-y-6"
				variants={CONTAINER_VARIANTS}
				initial="hidden"
				animate="visible"
			>
				{Object.entries(TOOLS).map(([_, tool]) => (
					<motion.div
						key={tool.id}
						variants={CHILDREN_VARIANTS}
					>
						<ToolCard {...tool} />
					</motion.div>
				))}
			</motion.div>
		</Section>
	);
}