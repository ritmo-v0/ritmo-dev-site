"use client";
import { useTranslations } from "next-intl";

// Components & UI
import { motion } from "motion/react";
import { ToolCard } from "./tool-card";

// Constants & Variables
import { TOOLS } from "@/lib/tools";
import {
	TRANSITION_200_25,
	getContainerVariants,
	getChildVariants
} from "@/lib/transitions";
const CONTAINER_VARIANTS = getContainerVariants(0.1);
const CHILDREN_VARIANTS = getChildVariants(
	{ opacity: 0, y: 20 },
	{ opacity: 1, y: 0, transition: TRANSITION_200_25 },
);



export function ToolList() {
	const t = useTranslations("tools");

	return (
		<motion.div
			className="grid @2xl:grid-cols-2 @6xl:grid-cols-3 gap-x-4 gap-y-6"
			variants={CONTAINER_VARIANTS}
			initial="hidden"
			animate="visible"
		>
			{Object
				.values(TOOLS)
				.filter(tool => tool !== null)
				.map(tool => (
					<motion.div
						key={tool.id}
						variants={CHILDREN_VARIANTS}
					>
						<ToolCard
							title={t(`${tool.id}.title`)}
							description={t(`${tool.id}.description`)}
							url={`/tools/${tool.id}`}
							imageUrl={`https://img.ritmo.dev/tools/${tool.id}/thumbnail.webp`}
							{...tool}
						/>
					</motion.div>
				))}
		</motion.div>
	);
}