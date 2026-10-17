"use client";
import { useTranslations } from "next-intl";
import { useTempusStore } from "@/lib/tempus/store";
import { cn } from "cn";

// Components & UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";



export function ControlsCard({ className }: React.ComponentProps<typeof Card>) {
	const t = useTranslations("tools.tempus.controls");

	return (
		<Card className={cn("@container/card", className)}>
			<CardHeader>
				<CardTitle>{t("title")}</CardTitle>
			</CardHeader>
			<CardContent className="grid auto-rows-min grid-cols-1 @xs/card:grid-cols-2 gap-8">
				<div className="flex flex-col gap-4">
					<AutoResetControl />
					<AutoResetDurationControl />
				</div>
			</CardContent>
		</Card>
	);
}

function AutoResetControl() {
	const t = useTranslations("tools.tempus.controls");
	const useAutoReset = useTempusStore(state => state.useAutoReset);
	const toggleAutoReset = useTempusStore(state => state.toggleAutoReset);

	return (
		<div className="flex items-center justify-between">
			<Label htmlFor="tempus-ar">{t("auto_reset")}</Label>
			<Switch
				id="tempus-ar"
				className="ml-auto"
				checked={useAutoReset}
				onCheckedChange={toggleAutoReset}
			/>
		</div>
	);
}

function AutoResetDurationControl() {
	const t = useTranslations("tools.tempus.controls");
	const useAutoReset = useTempusStore(state => state.useAutoReset);
	const autoResetDuration = useTempusStore(state => state.autoResetDuration);
	const setAutoResetDuration = useTempusStore(state => state.setAutoResetDuration);

	return (
		<div className="flex flex-col gap-3">
			<Label htmlFor="tempus-ard">{t("auto_reset_duration")}</Label>
			<div className="flex items-center justify-between gap-4">
				<Slider
					id="tempus-ard"
					value={autoResetDuration}
					min={1}
					max={5}
					step={1}
					onValueChange={setAutoResetDuration}
					disabled={!useAutoReset}
				/>
				<span className={cn(
					"text-sm transition-opacity tabular-nums",
					!useAutoReset && "opacity-50",
				)}>
					{autoResetDuration}s
				</span>
			</div>
		</div>
	);
}