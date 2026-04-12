"use client";
import { cn } from "@/lib/utils";

// Components & UI
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Button } from "@/components/ui/button";

// Icons & Images
import { XIcon } from "@phosphor-icons/react";



function Dialog({ ...props }: DialogPrimitive.Root.Props) {
	return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
	return (
		<DialogPrimitive.Backdrop
			data-slot="dialog-overlay"
			className={cn(
				"fixed inset-0 bg-black/40 supports-backdrop-filter:backdrop-blur-md",
				"transition-opacity data-starting-style:opacity-0 data-ending-style:opacity-0",
				className,
			)}
			{...props}
		/>
	);
}

function DialogContent({
	className,
	children,
	showCloseButton = true,
	closeLabel = "Close",
	...props
}: DialogPrimitive.Popup.Props & {
	showCloseButton?: boolean;
	closeLabel?: string;
}) {
	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Popup
				data-slot="dialog-content"
				className={cn(
					"fixed top-1/2 inset-s-1/2 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2",
					"group/dialog-content grid gap-6 w-full p-6 bg-popover text-sm text-popover-foreground ring-1 ring-foreground/5 dark:ring-foreground/10 outline-none rounded-4xl shadow-xl",
					"max-w-[calc(100%-2rem)] sm:max-w-md",
					"transition-[transform,scale,opacity] ease-in-out",
					"data-starting-style:scale-90 data-starting-style:opacity-0",
					"data-ending-style:scale-90 data-ending-style:opacity-0",
					className,
				)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						render={
							<Button
								variant="ghost"
								size="icon-sm"
								className="absolute top-4 inset-e-4 bg-secondary"
							/>
						}
					>
						<XIcon />
						<span className="sr-only">{closeLabel}</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Popup>
		</DialogPortal>
	);
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn("flex flex-col gap-1.5", className)}
			{...props}
		/>
	);
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={cn("font-heading font-semibold text-base/tight", className)}
			{...props}
		/>
	);
}

function DialogDescription({
	className,
	...props
}: DialogPrimitive.Description.Props) {
	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={cn(
				"text-sm text-muted-foreground",
				"*:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

function DialogFooter({
	className,
	children,
	showCloseButton = true,
	closeLabel = "Close",
	...props
}: React.ComponentProps<"div"> & {
	showCloseButton?: boolean;
	closeLabel?: string;
}) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn(
				"flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
				className,
			)}
			{...props}
		>
			{showCloseButton && (
				<DialogPrimitive.Close render={<Button variant="outline" />}>
					{closeLabel}
				</DialogPrimitive.Close>
			)}
			{children}
		</div>
	);
}

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};