import { ComponentProps } from "react";
import { render } from "react-dom";
import { useLoom } from "../src";

type Size = "small" | "medium" | "large";

interface Props extends ComponentProps<"button"> {
  size?: Size;
}

function LoomSVG({ size }: { size: Size }) {
  switch (size) {
    case "small":
      return (
        <svg
          style={{ marginRight: 6 }}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 6.22153H9.90622L13.4517 4.17458L12.673 2.82562L9.12757 4.87256L11.1741 1.32742L9.82515 0.548359L7.77865 4.0935V0H6.22135V4.09389L4.17407 0.548359L2.82554 1.32703L4.87243 4.87217L1.32699 2.82562L0.548344 4.17419L4.09378 6.22113H0V7.77847H4.09339L0.548344 9.82542L1.32699 11.1744L4.87203 9.12783L2.82515 12.673L4.17407 13.4516L6.22096 9.90611V14H7.77826V9.9065L9.82475 13.4516L11.1737 12.673L9.12679 9.12744L12.6722 11.1744L13.4509 9.82542L9.90583 7.77887H13.9992V6.22153H14ZM7 9.11804C5.82576 9.11804 4.87399 8.16624 4.87399 6.99197C4.87399 5.8177 5.82576 4.8659 7 4.8659C8.17424 4.8659 9.12601 5.8177 9.12601 6.99197C9.12601 8.16624 8.17424 9.11804 7 9.11804Z"
            fill="#F7F7F8"
          />
        </svg>
      );
    case "medium":
      return (
        <svg
          style={{ marginRight: 6 }}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 7.11032H11.3214L15.3733 4.77095L14.4834 3.22928L10.4315 5.56864L12.7704 1.51705L11.2287 0.626696L8.88988 4.67829V0H7.11012V4.67873L4.77037 0.626696L3.22919 1.5166L5.56849 5.5682L1.51656 3.22928L0.626679 4.7705L4.6786 7.10987H0V8.88968H4.67816L0.626679 11.2291L1.51656 12.7707L5.56804 10.4318L3.22874 14.4834L4.77037 15.3733L7.10967 11.3213V16H8.88944V11.3217L11.2283 15.3733L12.7699 14.4834L10.4306 10.4314L14.4825 12.7707L15.3724 11.2291L11.3209 8.89013H15.9991V7.11032H16ZM8 10.4206C6.65801 10.4206 5.57028 9.33285 5.57028 7.99082C5.57028 6.6488 6.65801 5.56103 8 5.56103C9.34199 5.56103 10.4297 6.6488 10.4297 7.99082C10.4297 9.33285 9.34199 10.4206 8 10.4206Z"
            fill="#F7F7F8"
          />
        </svg>
      );
    case "large":
      return (
        <svg
          style={{ marginRight: 8 }}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 7.9991H12.7366L17.295 5.36732L16.2939 3.63294L11.7355 6.26472L14.3667 1.70668L12.6323 0.705033L10.0011 5.26307V0H7.99888V5.26358L5.36666 0.705033L3.63283 1.70618L6.26455 6.26422L1.70613 3.63294L0.705013 5.36681L5.26343 7.9986H0V10.0009H5.26293L0.705013 12.6327L1.70613 14.3671L6.26404 11.7358L3.63233 16.2938L5.36666 17.295L7.99838 12.7364V18H10.0006V12.7369L12.6318 17.295L14.3662 16.2938L11.7344 11.7353L16.2929 14.3671L17.294 12.6327L12.7361 10.0014H17.999V7.9991H18ZM9 11.7232C7.49026 11.7232 6.26656 10.4995 6.26656 8.98968C6.26656 7.4799 7.49026 6.25616 9 6.25616C10.5097 6.25616 11.7334 7.4799 11.7334 8.98968C11.7334 10.4995 10.5097 11.7232 9 11.7232Z"
            fill="#F7F7F8"
          />
        </svg>
      );
  }
}

function LoomButton({ size = "medium", ...props }: Props) {
  const [buttonRef, supported] = useLoom("YOUR-API-KEY");
  let padding = "7px 15px";
  let fontSize = 14;
  let lineHeight = "22px";

  switch (size) {
    case "small":
      padding = "7px 12px";
      fontSize = 12;
      lineHeight = "18px";
      break;
    case "large":
      padding = "15px 20px";
      fontSize = 18;
      lineHeight = "26px";
      break;
    case "medium":
      // defined above
      break;
  }

  return (
    <button
      {...props}
      ref={buttonRef}
      disabled={!supported}
      style={{
        border: "none",
        background: "#615CF5",
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: 6,
        padding,
        fontSize,
        lineHeight,
      }}
    >
      <LoomSVG size={size} />
      Record
    </button>
  );
}

render(<LoomButton />, document.getElementById("root")!);
