"use client";
import { match } from "ts-pattern";
import { cn } from "@/lib/utils";

// Components & UI
import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/common/typography";
import { Message, MessageContent, MessageGroup } from "@/components/ui/message";
import { TabsContent } from "@/components/ui/tabs";

// Types & Interfaces
import type { Locale, SevensRefMessage } from "@/types/7sref";

// Constants & Variables
import { LOCALES } from "@/types/7sref";
const MAIMAI_AVATAR_URL = "https://3b4o9rg98c.ufs.sh/f/Tv72XolD6hyQHq5MdZSkseSjTQcCutJRGYVBfAwKMo8h67Xx";
const ACID_AVATAR_URL = "https://3b4o9rg98c.ufs.sh/f/Tv72XolD6hyQltdYqm0qy59sg0zPLQXWFarBZVS14jb2e8vf";
const RITMO_AVATAR_URL = "https://3b4o9rg98c.ufs.sh/f/Tv72XolD6hyQrTxR6l8TJnrEBNZlzcimWfebRjxC0t9DwYS5";



export function MessagesTabsContent({ value, locale, messages }: {
	value: string,
	locale: Locale,
	messages: SevensRefMessage[],
}) {
	return (
		<TabsContent value={value}>
			<MessageGroup>
				{messages.map((message, index: number) => (
					<SRMessage
						id={index}
						key={index}
						message={message}
						prevMessage={messages[index - 1]}
						locale={locale}
					/>
				))}
			</MessageGroup>
		</TabsContent>
	);
}

function SRMessage({
	id,
	message,
	prevMessage,
	locale,
}: {
	id: string | number,
	message: SevensRefMessage,
	prevMessage: SevensRefMessage | undefined,
	locale: typeof LOCALES[number]
}) {
	const localizedContent = message.content[locale];
	const content = localizedContent.trim()
		? message.content[locale]
		: message.content[LOCALES[0]];
	const matches = [...content.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]);  // [...][...][...]
	const isOption = matches.length > 0 && content.startsWith("[") && content.endsWith("]");

	return (
		<Message
			id={String(id)}
			role={message.role}
			className="scroll-m-12"
			side={message.role !== "player" ? "left" : "right"}
			avatarSrc={match(message.role)
				.with("maimai", () => MAIMAI_AVATAR_URL)
				.with("player", () => RITMO_AVATAR_URL)
				.with("acid", () => ACID_AVATAR_URL)
				.exhaustive()
			}
			avatarFallback={message.role.charAt(0).toUpperCase()}
			showAvatar={message.role !== prevMessage?.role}
			keepAvatarSpace
		>
			{isOption ? (
				<div className="flex flex-wrap items-center gap-4 py-10 overflow-hidden">
					{matches.map((match, idx) => (
						// TODO: P won't shrink
						<Button
							key={idx}
							variant="7sref"
							className="shrink h-auto"
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
					<MarkdownText>{content}</MarkdownText>
				</MessageContent>
			)}
		</Message>
	);
}