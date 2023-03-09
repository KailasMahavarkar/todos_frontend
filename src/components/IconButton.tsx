import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
	FontAwesomeIcon,
	FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon: IconDefinition;
	children?: React.ReactNode;
	iconClassName?: string;
	buttonClassName?: string;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const IconButton = ({
	children,
	icon,
	size,
	buttonClassName,
	iconClassName,
	...props
}: IButtonProps) => {
	if (!size) {
		size = "xs";
	}
	return (
		<button {...props} className={`btn btn-${size} ${buttonClassName}`}>
			{/* adds react node as child -> preferred non-nested child */}
			{children}
			<FontAwesomeIcon
				className={`w-3 h-3 ml-1 ${iconClassName}`}
				icon={icon}
			/>
		</button>
	);
};

export default IconButton;
