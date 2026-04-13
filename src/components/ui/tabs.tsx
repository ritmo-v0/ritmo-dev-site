import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";



function Tabs({
	className,
	orientation = "horizontal",
	...props
}: TabsPrimitive.Root.Props) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			orientation={orientation}
			className={cn(
				"group/tabs flex gap-4 data-[orientation=horizontal]:flex-col",
				className,
			)}
			{...props}
		/>
	);
}

const tabsListVariants = cva(
	[
		"group/tabs-list relative inline-flex items-center justify-center w-fit text-muted-foreground isolate",
		"data-[orientation=horizontal]:h-9 data-[orientation=vertical]:flex-col data-[orientation=vertical]:h-fit",
	],
	{
		variants: {
			variant: {
				default: [
					"[--padding:4px] p-(--padding) bg-muted",
					"data-[orientation=horizontal]:rounded-full data-[orientation=vertical]:rounded-2xl",
				],
				line: [
					"gap-1 p-0 bg-transparent rounded-none",
					"data-[orientation=horizontal]:border-b data-[orientation=vertical]:border-r",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

const tabsIndicatorVariants = cva(
	[
		"absolute transition-all ease-out-expo",
		"data-[orientation=horizontal]:left-0 data-[orientation=horizontal]:translate-x-(--active-tab-left)",
		"data-[orientation=vertical]:top-0 data-[orientation=vertical]:translate-y-(--active-tab-top)",
		"data-[orientation=horizontal]:w-(--active-tab-width) data-[orientation=vertical]:h-(--active-tab-height)",
	],
	{
		variants: {
			variant: {
				default: [
					"bg-background dark:bg-foreground/10 shadow-xs rounded-full",
					"data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:-translate-y-1/2",
					"data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2",
					"data-[orientation=horizontal]:h-[calc(100%-2*var(--padding))] data-[orientation=vertical]:w-(--active-tab-width)",
				],
				line: [
					"bg-primary data-[orientation=horizontal]:rounded-t-full data-[orientation=vertical]:rounded-l-full",
					"data-[orientation=horizontal]:-bottom-px data-[orientation=vertical]:-right-px",
					"data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1",
				],
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function TabsList({
	className,
	children,
	variant = "default",
	activateOnFocus = true,
	...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			data-variant={variant}
			className={cn(tabsListVariants({ variant }), className)}
			activateOnFocus={activateOnFocus}
			{...props}
		>
			{children}
			<TabsPrimitive.Indicator className={cn(tabsIndicatorVariants({ variant }))} />
		</TabsPrimitive.List>
	);
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
	return (
		<TabsPrimitive.Tab
			data-slot="tabs-trigger"
			className={cn(
				"flex-1 inline-flex items-center justify-center gap-1.5 min-h-7 px-3 py-1 font-medium text-sm rounded-full transition-colors select-none whitespace-nowrap z-1",
				"text-foreground/60 dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground data-active:text-foreground dark:data-active:text-foreground",
				"group-data-[variant=line]/tabs-list:data-[orientation=horizontal]:rounded-b-none group-data-[variant=line]/tabs-list:data-[orientation=vertical]:rounded-e-none",
				"data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
				"data-[orientation=vertical]:px-3 data-[orientation=vertical]:py-1.5",
				"has-data-[icon=inline-start]:ps-2 has-data-[icon=inline-end]:pe-2",
				"focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-1 focus-visible:outline-ring",
				"disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none",
				"[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
	return (
		<TabsPrimitive.Panel
			data-slot="tabs-content"
			className={cn("flex-1 outline-none", className)}
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent };