import { cn } from "@/lib/utils";

// Components & UI
import { Slider as SliderPrimitive } from "@base-ui/react/slider";



export function Slider<TValue extends number | readonly number[] = number>({
	className,
	defaultValue,
	value,
	min = 0,
	max = 100,
	...props
}: SliderPrimitive.Root.Props<TValue>) {
	const _values = Array.isArray(value)
		? value
		: Array.isArray(defaultValue)
			? defaultValue
			: [min, max];

	return (
		<SliderPrimitive.Root<TValue>
			className={cn(
				"data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
				className,
			)}
			data-slot="slider"
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			thumbAlignment="edge"
			{...props}
		>
			<SliderPrimitive.Control className={cn(
				"relative flex items-center w-full select-none touch-none",
				"data-[orientation=vertical]:flex-col data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:h-full",
				"data-disabled:opacity-50",
			)}>
				<SliderPrimitive.Track
					data-slot="slider-track"
					className={cn(
						"grow relative bg-input/90 rounded-full overflow-hidden select-none",
						"data-[orientation=horizontal]:w-full data-[orientation=horizontal]:h-2",
						"data-[orientation=vertical]:w-3 data-[orientation=vertical]:h-full",
					)}
				>
					<SliderPrimitive.Indicator
						data-slot="slider-range"
						className="bg-primary select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
					/>
				</SliderPrimitive.Track>
				{Array.from({ length: _values.length }, (_, index) => (
					<SliderPrimitive.Thumb
						key={index}
						data-slot="slider-thumb"
						className={cn(
							"shrink-0 block bg-white not-dark:bg-clip-padding ring-1 ring-black/10 hover:ring-4 hover:ring-ring/30 rounded-full shadow-md transition-[color,box-shadow,background-color] select-none",
							"w-6 h-4 data-vertical:w-4 data-vertical:h-6",
							"focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:outline-hidden",
							"disabled:opacity-50 disabled:pointer-events-none",
						)}
					/>
				))}
			</SliderPrimitive.Control>
		</SliderPrimitive.Root>
	);
}