import clsx from "clsx";
import { ReactNode } from "react";
import { Icon } from "components/atoms";
import { Paper } from "@material-ui/core";

type PanelProps = {
  className?: string;
  title: ReactNode;
  children?: ReactNode;
};
function Panel({ children, title, className }: PanelProps) {
  return (
    <section className={clsx("overflow-hidden shadow-xl", className)}>
      <header
        className={clsx("py-4 px-6", "bg-gold-darker", "flex items-center")}
      >
        {title}
      </header>

      <div className="p-4 bg-white">{children}</div>
    </section>
  );
}

type PaperProps = {
  className?: string;
  title?: string;
  children?: ReactNode;
  icon?: "fill" | "hole";
};
function PaperCard({ className, title, children, icon }: PaperProps) {
  return (
    <div className={clsx("flex flex-col", className)}>
      {title && (
        <div className="flex space-x-1 py-2">
          {icon && (
            <span className="w-5 text-gold-darker">
              {icon === "fill" && <Icon.EllipseFill />}
              {icon === "hole" && <Icon.EllipseHole />}
            </span>
          )}

          <span className="text-sm">{title}</span>
        </div>
      )}

      <Paper elevation={3} className="flex flex-col p-4 space-y-4">
        {children}
      </Paper>
    </div>
  );
}

const Card = {
  Panel,
  Paper: PaperCard,
};

export default Card;
