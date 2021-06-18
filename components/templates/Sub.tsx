import { BaseProps, Base } from "./Base";
import { Button } from "components/atoms";

export function Sub({ title, children, prev }: BaseProps & { prev: string }) {
  return (
    <Base title={title} footer>
      <div className="container mx-auto py-4 px-6 md:px-0">
        <div className="py-4 w-24">
          <Button.Outline
            className="bg-white text-gold-darker"
            type="anchor"
            href={prev}
          >
            回列表
          </Button.Outline>
        </div>

        {children}
      </div>
    </Base>
  );
}
