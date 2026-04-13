"use client";
import { cn } from "@/lib/utils";

// Components & UI
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

// Icons & Images
import { CaretLeftIcon } from "@phosphor-icons/react";



function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			className={cn("flex flex-col w-full rounded-2xl border overflow-hidden", className)}
			{...props}
		/>
	);
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn("not-last:border-b", className)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: AccordionPrimitive.Trigger.Props) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"group/accordion-trigger relative flex-1 flex items-center justify-between gap-6 p-4 font-medium text-left text-sm border border-transparent outline-none transition-all",
					"disabled:opacity-50 disabled:pointer-events-none",
					"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
					className,
				)}
				{...props}
			>
				{children}
				<CaretLeftIcon
					data-slot="accordion-trigger-icon"
					className={cn(
						"shrink-0 ml-auto size-3.5 text-muted-foreground",
						"transition-transform group-data-panel-open/accordion-trigger:-rotate-90",
					)}
				/>
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: AccordionPrimitive.Panel.Props) {
	return (
		<AccordionPrimitive.Panel
			data-slot="accordion-content"
			className={cn(
				"h-(--accordion-panel-height) text-sm overflow-hidden",
				"transition-[height] data-starting-style:ease-in-out data-ending-style:ease-out",
				"data-starting-style:h-0 data-ending-style:h-0",
			)}
			{...props}
		>
			<div className={cn("p-4 pt-0", className)}>
				{children}
			</div>
		</AccordionPrimitive.Panel>
	);
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };