"use client";
import { useEffect } from "react";
import { motion, useAnimation } from "motion/react";
import { useDoingStore, useLocationStore, useNameStore, useSerialNumberStore } from "./stores";

// Toast
import { useToast } from "@/hooks/use-toast";
import { generateToastObject } from "@/lib/toast-utils";

// Components & UI
import { SectionLayout } from "@/components/common/layouts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Images & Icons
import { Dices } from "lucide-react";

// Constants & Variables
const locationOptions = {
	"categories": [
		{
			"name": "日常活動",
			"options": [
				{ "value": "home", "label": "家" },
				{ "value": "bed", "label": "床上" },
				{ "value": "kitchen", "label": "廚房" },
				{ "value": "bathroom", "label": "浴室" },
				{ "value": "living_room", "label": "客廳" }
			]
		},
		{
			"name": "交通工具",
			"options": [
				{ "value": "car", "label": "車上" },
				{ "value": "bus", "label": "公車上" },
				{ "value": "train", "label": "火車上" },
				{ "value": "subway", "label": "地鐵上" },
				{ "value": "plane", "label": "飛機上" }
			]
			},
		{
			"name": "戶外活動",
			"options": [
				{ "value": "road", "label": "路上" },
				{ "value": "park", "label": "公園" },
				{ "value": "mountain", "label": "山上" },
				{ "value": "beach", "label": "海灘" },
				{ "value": "market", "label": "市場" }
			]
		},
		{
			"name": "工作與學習",
			"options": [
				{ "value": "office", "label": "辦公室" },
				{ "value": "school", "label": "學校" },
				{ "value": "library", "label": "圖書館" },
				{ "value": "meeting_room", "label": "會議室" },
				{ "value": "workshop", "label": "工作坊" }
			]
		}
	]
};

const doingOptions = {
	"categories": [
		{
			"name": "休息活動",
			"options": [
				{ "value": "sleeping", "label": "睡覺" },
				{ "value": "watching_tv", "label": "看電視" },
				{ "value": "reading", "label": "看書" },
				{ "value": "using_phone", "label": "滑手機" },
				{ "value": "playing_games", "label": "玩遊戲" },
				{ "value": "listening_music", "label": "聽音樂" }
			]
		},
		{
			"name": "日常事務",
			"options": [
				{ "value": "eating", "label": "吃飯" },
				{ "value": "cooking", "label": "做飯" },
				{ "value": "cleaning", "label": "打掃" },
				{ "value": "laundry", "label": "洗衣服" },
				{ "value": "shopping", "label": "購物" }
			]
		},
		{
			"name": "工作學習",
			"options": [
				{ "value": "working", "label": "工作" },
				{ "value": "studying", "label": "學習" },
				{ "value": "attending_meeting", "label": "開會" },
				{ "value": "doing_homework", "label": "寫作業" },
				{ "value": "reading_emails", "label": "看郵件" }
			]
		},
		{
			"name": "戶外活動",
			"options": [
				{ "value": "exercising", "label": "運動" },
				{ "value": "walking", "label": "散步" },
				{ "value": "running", "label": "跑步" },
				{ "value": "cycling", "label": "騎車" }
			]
		}
	]
};



export function HellReportInfoSection() {
	const { serialNumber, setSerialNumber } = useSerialNumberStore();
	const { name, setName } = useNameStore();

	return (
		<SectionLayout className="grid auto-rows-min gap-8">
			<div className="grid gap-2">
				<Label><span className="text-destructive">*</span> 掌機號碼</Label>
				<Input
					inputMode="numeric"
					pattern="\d*"
					value={serialNumber}
					onChange={(e) => setSerialNumber(e.target.value)}
				/>
			</div>
			<div className="grid gap-2">
				<Label><span className="text-destructive">*</span> 姓名</Label>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
		</SectionLayout>
	);
}

export function HellReportDetailSection() {
	const { location, setLocation } = useLocationStore();
	const { doing, setDoing } = useDoingStore();

	useEffect(() => {
		const { location: randomLocation, doing: randomDoing } = generateRandomDetails();
		setLocation(randomLocation);
		setDoing(randomDoing);
	}, []);

	return (
		<SectionLayout className="grid auto-rows-min gap-8">
			<div className="grid gap-2">
				<Label>在哪裡</Label>
				<Select value={location} onValueChange={value => setLocation(value)}>
					<SelectTrigger>
						<SelectValue placeholder="請選擇你在哪裡" />
					</SelectTrigger>
					<SelectContent>
						{locationOptions.categories.map(category => (
							<SelectGroup key={category.name}>
								<SelectLabel className="text-muted-foreground">{category.name}</SelectLabel>
								{category.options.map(option => (
									<SelectItem
										key={option.value}
										value={option.value}
									>
										在{option.label}
									</SelectItem>
								))}
							</SelectGroup>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="grid gap-2">
				<Label>在幹嘛</Label>
				<Select value={doing} onValueChange={value => setDoing(value)}>
					<SelectTrigger>
						<SelectValue placeholder="請選擇你在幹嘛" />
					</SelectTrigger>
					<SelectContent>
						{doingOptions.categories.map(category => (
							<SelectGroup key={category.name}>
								<SelectLabel className="text-muted-foreground">{category.name}</SelectLabel>
								{category.options.map(option => (
									<SelectItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</SelectItem>
								))}
							</SelectGroup>
						))}
					</SelectContent>
				</Select>
			</div>
		</SectionLayout>
	);
}

export function HellReportActionsSection() {
	return (
		<SectionLayout className="flex items-center justify-center gap-4">
			<RandomButton />
			<CopyButton />
		</SectionLayout>
	);
}

function generateRandomDetails() {
	const allLocations = locationOptions.categories.flatMap((category) => category.options);
	const randomLocation = allLocations[Math.floor(Math.random() * allLocations.length)];

	const allDoings = doingOptions.categories.flatMap((category) => category.options);
	const randomDoing = allDoings[Math.floor(Math.random() * allDoings.length)];

	return {
		location: randomLocation.value,
		doing: randomDoing.value,
	};
}

function RandomButton() {
	const setLocation = useLocationStore(state => state.setLocation);
	const setDoing = useDoingStore(state => state.setDoing);

	function handleClick() {
		const { location: randomLocation, doing: randomDoing } = generateRandomDetails();
		setLocation(randomLocation);
		setDoing(randomDoing);
	}

	return (
		<Button
			variant="outline"
			size="icon" onClick={handleClick}
		>
			<Dices />
		</Button>
	);
}

function CopyButton() {
	const { toast } = useToast();
	const serialNumber = useSerialNumberStore(state => state.serialNumber);
	const name = useNameStore(state => state.name);
	const locationValue = useLocationStore(state => state.location);
	const doingValue = useDoingStore(state => state.doing);

	// Motion
	const controls = useAnimation();
	const defaultTransition = {
		type: "spring",
		stiffness: 160,
		damping: 17,
		mass: 1,
	};

	async function handleClick() {
		try {
			const location = locationOptions.categories.flatMap((category) => category.options).find(option => option.value === locationValue).label;
			const doing = doingOptions.categories.flatMap((category) => category.options).find(option => option.value === doingValue).label;
			await navigator.clipboard.writeText(`${serialNumber} ${name} 在${location}${doing}`);
			toast(generateToastObject("info", "已複製到剪貼簿。"));
		} catch (error) {
			toast(generateToastObject("error", error.message));
		}
	}

	return (
		<Button
			onClick={handleClick}
			onMouseEnter={() => controls.start("animate")}
			onMouseLeave={() => controls.start("normal")}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="28"
				height="28"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<motion.rect
					width="14"
					height="14"
					x="8"
					y="8"
					rx="2"
					ry="2"
					variants={{
						normal: { translateY: 0, translateX: 0 },
						animate: { translateY: -3, translateX: -3 },
					}}
					animate={controls}
					transition={defaultTransition}
				/>
				<motion.path
					d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
					variants={{
						normal: { x: 0, y: 0 },
						animate: { x: 3, y: 3 },
					}}
					transition={defaultTransition}
					animate={controls}
				/>
			</svg>
			複製
		</Button>
	);
}