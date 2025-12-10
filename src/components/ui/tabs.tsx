import { cn } from "@/lib/utils";

// Components & UI
import { Tabs as TabsPrimitive } from "@base-ui-components/react/tabs";



function Tabs({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			className={cn("flex flex-col gap-2", className)}
			{...props}
		/>
	);
}

function TabsList({
	className,
	children,
	...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={cn(
				"[--padding:2px] relative inline-flex items-center justify-center gap-1 w-fit h-9 p-(--padding) bg-muted text-muted-foreground rounded-lg z-0",
				className
			)}
			{...props}
		>
			{children}
			<TabsPrimitive.Indicator
				className={cn(
					"absolute top-1/2 left-0 translate-x-(--active-tab-left) -translate-y-1/2 transition-all duration-200 ease-in-out",
					"w-(--active-tab-width) h-[calc(100%-2*var(--padding))] bg-background dark:bg-input/30 border border-transparent dark:border-input rounded-md shadow-sm -z-1",
				)}
			/>
		</TabsPrimitive.List>
	);
}

function TabsTrigger({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Tab>) {
	return (
		<TabsPrimitive.Tab
			data-slot="tabs-trigger"
			className={cn(
				"flex-1 inline-flex items-center justify-center gap-1.5 h-full px-2 py-1 text-sm font-medium hover:text-foreground data-active:text-foreground rounded-md transition-colors whitespace-nowrap",
				"[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
				"disabled:pointer-events-none disabled:opacity-50",
				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-ring focus-visible:outline-1",
				className
			)}
			{...props}
		/>
	);
}

function TabsContent({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Panel>) {
	return (
		<TabsPrimitive.Panel
			data-slot="tabs-content"
			className={cn("flex-1 outline-none", className)}
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent };