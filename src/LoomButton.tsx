import { ComponentProps, ReactNode } from "react";
import { Hooks } from "@loomhq/loom-sdk";
import { useLoom } from "../src";

export type LoomButtonSize = "small" | "medium" | "large";

export interface LoomButtonProps extends ComponentProps<"button">, Hooks {
  apiKey: string;
  /**
   * Render only the button, with no styling.
   */
  noStyle?: boolean;
  size?: LoomButtonSize;
  children: ReactNode;
}

const SIZE_TO_ICON_PX = {
  small: 14,
  medium: 16,
  large: 18,
};

const SIZE_TO_STYLES = {
  small: {
    padding: "7px 12px",
    lineHeight: "18px",
    fontSize: 12,
  },
  medium: {
    padding: "7px 15px",
    lineHeight: "22px",
    fontSize: 14,
  },
  large: {
    padding: "15px 20px",
    lineHeight: "26px",
    fontSize: 18,
  },
};

// The Loom SDK attempts to invoke a hook if it is provided at all (even if it is not a function).
// To work around this, we default the values into this NOOP.
function hookNoop() {}

export function LoomButton({
  apiKey,
  size = "medium",
  noStyle,
  children,
  // Loom SDK hooks:
  onLifecycleUpdate = hookNoop,
  onStart = hookNoop,
  onCancel = hookNoop,
  onAnalyticsEvent = hookNoop,
  onComplete = hookNoop,
  onRecordingStarted = hookNoop,
  onInsertClicked = hookNoop,
  ...props
}: LoomButtonProps) {
  if (!["small", "medium", "large"].includes(size)) {
    throw new Error(`Unknown size prop value: "${size}"`);
  }

  const [buttonRef, supported] = useLoom(apiKey, {
    onLifecycleUpdate,
    onStart,
    onCancel,
    onAnalyticsEvent,
    onComplete,
    onRecordingStarted,
    onInsertClicked,
  });

  return (
    <button
      {...props}
      ref={buttonRef}
      disabled={!supported || props.disabled}
      style={
        noStyle
          ? props.style
          : {
              border: "none",
              background: "#615CF5",
              color: "#ffffff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 6,
              ...SIZE_TO_STYLES[size],
              ...props.style,
            }
      }
    >
      <svg
        style={{ marginRight: 6 }}
        width={SIZE_TO_ICON_PX[size]}
        height={SIZE_TO_ICON_PX[size]}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 7.9991H12.7366L17.295 5.36732L16.2939 3.63294L11.7355 6.26472L14.3667 1.70668L12.6323 0.705033L10.0011 5.26307V0H7.99888V5.26358L5.36666 0.705033L3.63283 1.70618L6.26455 6.26422L1.70613 3.63294L0.705013 5.36681L5.26343 7.9986H0V10.0009H5.26293L0.705013 12.6327L1.70613 14.3671L6.26404 11.7358L3.63233 16.2938L5.36666 17.295L7.99838 12.7364V18H10.0006V12.7369L12.6318 17.295L14.3662 16.2938L11.7344 11.7353L16.2929 14.3671L17.294 12.6327L12.7361 10.0014H17.999V7.9991H18ZM9 11.7232C7.49026 11.7232 6.26656 10.4995 6.26656 8.98968C6.26656 7.4799 7.49026 6.25616 9 6.25616C10.5097 6.25616 11.7334 7.4799 11.7334 8.98968C11.7334 10.4995 10.5097 11.7232 9 11.7232Z"
          fill="#F7F7F8"
        />
      </svg>
      {children}
    </button>
  );
}
