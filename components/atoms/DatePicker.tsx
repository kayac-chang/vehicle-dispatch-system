import clsx from "clsx";
import { Icon } from "components/atoms";
import {
  DatePicker,
  DatePickerInput,
  DatePickerCalendar,
  DatePickerMonth,
  DatePickerButton,
  DatePickerTable,
} from "@reecelucas/react-datepicker";

function ScreenReaderMsg() {
  return (
    <>
      <p>
        Press the down arrow key to interact with the calendar and select a
        date. The following keyboard shortcuts can be used to change dates.
      </p>
      <ul>
        <li>Enter Key: select the date in focus.</li>
        <li>
          Right and left arrow keys: Move backward (left) and forward (right) by
          one day.
        </li>
        <li>
          Up and down arrow keys: Move backward (up) and forward (down) by one
          week.
        </li>
        <li>Page up and page down keys: Switch months.</li>
        <li>Home and end keys: go to the first or last day of a week.</li>
        <li>Escape key: Return to the date input field.</li>
      </ul>
    </>
  );
}

type ButtonProps = {
  type: "next" | "prev";
};
function Button({ type }: ButtonProps) {
  return (
    <DatePickerButton
      className="w-6"
      updateMonth={({ next, prev }) => {
        type === "prev" && prev();
        type === "next" && next();
      }}
    >
      <span className="sr-only">
        {type === "prev" && "Prev Month"}
        {type === "next" && "Next Month"}
      </span>

      <span>
        {type === "prev" && <Icon.ChevronLeft />}
        {type === "next" && <Icon.ChevronRight />}
      </span>
    </DatePickerButton>
  );
}

function Month() {
  return (
    <DatePickerMonth>
      {(date) => {
        const [month, year] = date.split(",");

        return (
          <div className="px-2">
            <span className="text-lg text-gold-darker">{month}</span>
            <span className="text-lg">{year}</span>
          </div>
        );
      }}
    </DatePickerMonth>
  );
}

type CommonProps = {
  name: string;
  initialDate?: Date;
  dateFormat?: string;
  onChange?: (date: Date) => void;
};

export type DateProps = CommonProps & {
  type: "date";
};
export function _Date({ onChange, dateFormat = "yyyy/MM/dd" }: DateProps) {
  // TODO fix Date Picker Logic

  return (
    <DatePicker
      className="relative"
      onSelect={(date: Date) => onChange?.(date)}
    >
      <div className="flex items-center relative">
        <DatePickerInput
          className="w-full p-2"
          screenReaderMessage={ScreenReaderMsg}
          dateFormat={dateFormat}
          onKeyDown={(event) => {
            [
              event.metaKey,
              ["Backspace", "ArrowLeft", "ArrowRight", "Tab"].includes(
                event.key
              ),
              /[0-9\/]/.test(event.key),
            ].some(Boolean) || event.preventDefault();
          }}
        />

        <span
          className="absolute right-0 mr-2 w-4 pointer-events-none"
          aria-hidden
        >
          <Icon.Calendar />
        </span>
      </div>

      <DatePickerCalendar
        className={clsx(
          "fixed left-0 px-6 w-screen",
          "md:p-0 md:w-72 md:absolute"
        )}
      >
        <div className="bg-white rounded border shadow-2xl h-60 px-2 pt-2 space-y-2">
          <div className="flex justify-between">
            <Month />

            <div className="flex justify-between w-14">
              <Button type="prev" />
              <Button type="next" />
            </div>
          </div>

          <DatePickerTable className="w-full table-auto text-center" />
        </div>
      </DatePickerCalendar>
    </DatePicker>
  );
}

export type DateRangeProps = {
  type: "date-range";
  from: CommonProps;
  to: CommonProps;
};
export function DateRange({ from, to }: DateRangeProps) {
  return (
    <div className="flex items-center bg-white border border-black rounded overflow-hidden">
      <div className="flex-1">
        <_Date type="date" {...from} />
      </div>

      <div className="w-6">
        <Icon.SwapRight />
      </div>

      <div className="flex-1">
        <_Date type="date" {...to} />
      </div>
    </div>
  );
}
