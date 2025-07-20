"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

// SWR
import useSWR from "swr";
import { fetcher } from "@/lib/fetch";

// Components & UI
import { Button } from "@/components/ui/button";
import { Anchor, MarkdownText, Muted } from "@/components/common/typography";
import {
	Message,
	MessageContent,
	MessageGroup,
} from "@/components/ui/message";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { WrapperLayout } from "@/components/common/layouts";

// Types & Interfaces
const LOCALES = ["ja", "zh-TW", "en"] as const;
type SevensRefMessage = {
	role: "player" | "acid";
	content: Record<typeof LOCALES[number], string>;
	timestamp: string;
};

// Constants & Variables
const ACID_AVATAR_URL = "https://3b4o9rg98c.ufs.sh/f/Tv72XolD6hyQltdYqm0qy59sg0zPLQXWFarBZVS14jb2e8vf";
const RITMO_AVATAR_URL = "https://3b4o9rg98c.ufs.sh/f/Tv72XolD6hyQrTxR6l8TJnrEBNZlzcimWfebRjxC0t9DwYS5";



export default function SevensRef4Page() {
	const [locale, setLocale] = useState<typeof LOCALES[number]>("ja");

	const { data } = useSWR("/api/7sref4", fetcher);
	const messages: SevensRefMessage[] = data?.success ? data.data : [];

	return (
		<WrapperLayout className="pb-8" width={960}>
			<div className="sticky top-14 flex items-center mb-4 pt-2 pb-4 bg-background z-1">
				<Muted>
					Description Credit:{` `}
					<Anchor href="https://x.com/NOTmoemoemo/status/1943984923129630856">
						萌々も
					</Anchor>
				</Muted>
				<LocaleSelect
				className="ml-auto"
					defaultValue={locale}
					onValueChange={setLocale}
				/>
			</div>
			<MessageGroup>
				{messages.map((message, index: number) => (
					<SevensRef4Message
						key={index}
						message={message}
						prevMessage={messages[index - 1]}
						locale={locale}
					/>
				))}
			</MessageGroup>
		</WrapperLayout>
	);
}

function SevensRef4Message({
	message,
	prevMessage,
	locale,
}: {
	message: SevensRefMessage,
	prevMessage: SevensRefMessage | undefined,
	locale: typeof LOCALES[number]
}) {
	const content = message.content[locale];
	const matches = [...content.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]);  // [...][...][...]
	const isOption = matches.length > 0 && content.startsWith("[") && content.endsWith("]");

	return (
		<Message
			role={message.role}
			side={message.role === "acid" ? "left" : "right"}
			avatarSrc={message.role === "acid" ? ACID_AVATAR_URL : RITMO_AVATAR_URL}
			showAvatar={message.role !== prevMessage?.role}
			keepAvatarSpace
		>
			{isOption ? (
				<div className="flex flex-wrap items-center gap-4 py-10">
					{matches.map((match, idx) => (
						<Button
							key={idx}
							variant="7sref"
							className="h-auto"
						>
							<MarkdownText>{match}</MarkdownText>
						</Button>
					))}
				</div>
			) : (
				<MessageContent
					variant="bubble"
					className={cn(
						"@2xl/message-group:max-w-3/4",
						message.role === "player" && "bg-primary text-primary-foreground",
					)}
				>
					<MarkdownText>{message.content[locale]}</MarkdownText>
				</MessageContent>
			)}
		</Message>
	);
}

function LocaleSelect({
	className,
	defaultValue,
	onValueChange,
}: React.ComponentProps<typeof SelectTrigger> & {
	defaultValue: typeof LOCALES[number];
	onValueChange: (value: typeof LOCALES[number]) => void;
}) {
	return (
		<Select
			defaultValue={defaultValue}
			onValueChange={onValueChange}
		>
			<SelectTrigger className={cn("w-24", className)}>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{LOCALES.map(locale => (
					<SelectItem key={locale} value={locale}>
						{locale.toUpperCase()}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}