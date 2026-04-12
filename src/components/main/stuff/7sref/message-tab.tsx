"use client";
import { useLocale } from "next-intl";
import { use7sRefStore } from "@/lib/store/7sref";
import { match } from "ts-pattern";
import { cn } from "@/lib/utils";

// Components & UI
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/common/markdown";
import {
	Message,
	MessageContent,
	MessageGroup,
	MessageSeparator,
} from "@/components/ui/message";
import { TabsContent } from "@/components/ui/tabs";

// Types & Interfaces
import type { SevensRefMessage } from "@/lib/7sref/types";
import { Twemoji } from "@/components/common/twemoji";

// Constants & Variables
const MAIMAI_AVATAR_URL = "https://img.ritmo.dev/stuff/7sref/avatar-maimai.jpg";
const ACID_AVATAR_URL = "https://img.ritmo.dev/stuff/7sref/avatar-acid.jpg";
const RITMO_AVATAR_URL = "https://img.ritmo.dev/stuff/7sref/avatar-ritmo.webp";



export function MessageTab({
	value,
	messages
}: { value: string; messages: SevensRefMessage[] }) {
	return (
		<TabsContent value={value}>
			<MessageGroup>
				{messages.map((message, index) => (
					<SRMessage
						id={String(index + 1)}
						key={index}
						message={message}
						showAvatar={message.role !== messages[index - 1]?.role}
					/>
				))}
			</MessageGroup>
		</TabsContent>
	);
}

function SRMessage({
	message,
	...props
}: React.ComponentProps<typeof Message> & { message: SevensRefMessage }) {
	const locale = useLocale();
	const showTranslated = use7sRefStore(state => state.showTranslated);

	const content = message.content[locale]?.trim() && showTranslated
		? message.content[locale]
		: message.content.ja;
	const matches = [...content.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]);  // [...][...][...]
	const isOption = matches.length > 0 && content.startsWith("[") && content.endsWith("]");

	return message.role === "separator" ? (
		<MessageSeparator>
			<span><Twemoji>{content}</Twemoji></span>
		</MessageSeparator>
	) : (
		<Message
			role={message.role}
			className="scroll-mt-10"
			side={message.role === "player" ? "right" : "left"}
			avatarSrc={match(message.role)
				.with("maimai", () => MAIMAI_AVATAR_URL)
				.with("player", () => RITMO_AVATAR_URL)
				.with("acid", () => ACID_AVATAR_URL)
				.exhaustive()
			}
			avatarFallback={message.role.charAt(0).toUpperCase()}
			keepAvatarSpace
			{...props}
		>
			{isOption ? (
				<div className="flex flex-wrap items-center gap-4 py-10 overflow-hidden">
					{matches.map(match => (
						<Button
							key={match}
							variant="nothing"
							className={cn(
								"h-auto px-4 py-2 inset-shadow-[0_-2px_2px_#7893C8]",
								"bg-linear-to-b from-[#F9FAFE] to-[#D5E5FC]",
								"font-bold xs:text-base text-[#446EBA]",
								"will-change-transform active:scale-[0.975]",
								match.includes("\n")
									? "shrink inline-block whitespace-normal"
									: "xs:min-w-60")}
						>
							<Markdown>{match}</Markdown>
						</Button>
					))}
				</div>
			) : (
				<MessageContent
					variant="bubble"
					className={cn(
						"@2xl/message-group:max-w-3/4 [&_rt]:mt-0.5",
						message.role === "player" && "bg-primary text-primary-foreground",
					)}
				>
					<Markdown>{content}</Markdown>
				</MessageContent>
			)}
		</Message>
	);
}