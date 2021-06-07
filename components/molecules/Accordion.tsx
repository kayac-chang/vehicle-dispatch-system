import _Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { ReactNode, useCallback } from "react";

type NormalProps = {
  name: string;
  expanded: boolean;
  onChange: (expanded: boolean) => void;
  icon?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
};
export function Normal({
  name,
  expanded,
  onChange,
  icon,
  title,
  children,
}: NormalProps) {
  const handleChange = useCallback(
    (_, expanded: boolean) => onChange(expanded),
    [onChange]
  );

  return (
    <>
      <_Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          expandIcon={icon}
          aria-controls={`${name}-content`}
          id={`${name}-header`}
        >
          {title}
        </AccordionSummary>

        <AccordionDetails>{children}</AccordionDetails>
      </_Accordion>
    </>
  );
}

const Accordion = {
  Normal,
};

export default Accordion;
