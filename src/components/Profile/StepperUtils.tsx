import { styled } from "@mui/material/styles";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import { FiCheck } from "react-icons/fi";

// Custom connector for the Stepper component
export const CyanConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#0FB4BB", // Teal color for active steps
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#0FB4BB", // Teal color for completed steps
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0", // Light color for inactive steps
    borderTopWidth: 1,
    borderRadius: 1,
  },
}));

// Custom Dot for the Stepper, representing each step
export const Dot = styled("div")(({ $active, $completed }) => ({
  width: 16,
  height: 16,
  borderRadius: "50%",
  border: `2px solid ${$active || $completed ? "#0FB4BB" : "#ddd"}`, // Teal color for active/completed
  backgroundColor: $completed ? "#0FB4BB" : "#fff", // White background for completed steps
  transition: "all .2s ease",
}));

// Custom Step Icon for the Stepper, showing the dot and optional checkmark
export function DotStepIcon(props) {
  const { active, completed, className } = props;
  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Dot $active={active} $completed={completed} />
      {completed && (
        <FiCheck className="absolute" size={12} color="#fff" style={{ color: "#fff" }} />
      )}
    </span>
  );
}
