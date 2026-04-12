import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Components & UI
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";



function Avatar({
	className,
	size = "default",
	...props
}: AvatarPrimitive.Root.Props & {
	size?: "default" | "sm" | "lg";
}) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			data-size={size}
			className={cn(
				"group/avatar shrink-0 relative flex size-8 rounded-full select-none",
				"data-[size=sm]:size-6 data-[size=lg]:size-10",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn(
				"size-full rounded-full aspect-square object-cover pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}

const avatarFallbackVariants = cva(
	"flex items-center justify-center size-full text-sm group-data-[size=sm]/avatar:text-xs rounded-full",
	{
		variants: {
			variant: {
				default: "bg-muted text-muted-foreground",
				primary: "bg-primary text-primary-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function AvatarFallback({
	className,
	variant,
	...props
}: AvatarPrimitive.Fallback.Props &
	VariantProps<typeof avatarFallbackVariants>) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(avatarFallbackVariants({ variant, className }))}
			{...props}
		/>
	);
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="avatar-badge"
			className={cn(
				"absolute inset-e-0 bottom-0 inline-flex items-center justify-center bg-primary text-primary-foreground bg-blend-color ring-2 ring-background rounded-full select-none z-10",
				"group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
				"group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
				"group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
				className
			)}
			{...props}
		/>
	)
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="avatar-group"
			className={cn(
				"group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarGroupCount({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="avatar-group-count"
			className={cn(
				"relative shrink-0 flex items-center justify-center size-8 rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background",
				"group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
				"group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5",
				"[&>svg]:shrink-0 [&>svg]:size-4 [&>svg]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Avatar,
	AvatarImage,
	AvatarFallback,
	AvatarBadge,
	AvatarGroup,
	AvatarGroupCount,
};