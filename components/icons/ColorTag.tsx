import { ColorTagProp } from "@/types/types";

export const ColorTag = ({ color }: ColorTagProp) => {
  const cssVarName = color ? `var(--color-${color})` : undefined;

  return (
    <div className={`text-${color}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={cssVarName}
        className="size-6"
      >
        <path
          fillRule="evenodd"
          d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};
