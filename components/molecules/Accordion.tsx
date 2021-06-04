import _Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { Collapse } from "@material-ui/core";
import { ReactNode, cloneElement, isValidElement, useCallback } from "react";
import { Icon } from "components/atoms";

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

type FieldsetProps = {
  id: string;
  title: ReactNode;
  children?: ReactNode;
};
function Fieldset({ id, title, children }: FieldsetProps) {
  return (
    <fieldset>
      <legend className="w-full py-1 border-b-2 border-gray-600">
        <button
          type="button"
          className="flex items-center space-x-2"
          aria-expanded
          aria-controls={id}
        >
          <span className="text-lg">{title}</span>

          <span className="w-4 text-gold-darker">
            <Icon.Minus />
          </span>
        </button>
      </legend>

      <Collapse in={true} timeout="auto" unmountOnExit>
        <div id={id}>{children}</div>
      </Collapse>
    </fieldset>
  );
}

const Accordion = {
  Normal,
  Fieldset,
};

export default Accordion;
