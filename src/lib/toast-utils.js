// Components & UI
import { MarkdownText } from "@/components/common/typography";

// Constants & Variables
export const ToastTitles = Object.freeze({
	info: "特此通知📢",
	success: "✌️",
	warning: "おや？🤔",
	error: "發生了一點🤏🌌小問題",
})



export function generateToastObject(level, description) {
	return {
		variant: level || "default",
		title: <MarkdownText>{ToastTitles[level] || ToastTitles.info}</MarkdownText>,
		description: <MarkdownText>{description}</MarkdownText>,
	}
}

export function generateErrorToastObject(description) {
	return generateToastObject("error", description);
}