import { useState } from "react";
import clsx from "clsx";
import Layout from "components/templates";
import { Icon } from "components/atoms";
import { Accordion } from "components/molecules";
import { loadJSON } from "functions/load";
import { InferGetStaticPropsType as Infer } from "next";
import { QNA as Type } from "types";

export async function getStaticProps() {
  return {
    props: {
      posts: await loadJSON<Type[]>("static/qna.json"),
    },
  };
}

const content = {
  title: "常見問題",
};

type Props = Infer<typeof getStaticProps>;
export default function QNA({ posts }: Props) {
  const [expanded, setExpanded] = useState(posts[0].name);

  return (
    <Layout.Normal title={content.title}>
      <div className="-mx-6 sm:mx-0 pb-8">
        <ul>
          {posts.map(({ name, title, description }) => (
            <li
              key={title}
              className={clsx(
                "border-b",
                name === expanded && "border-gold-light"
              )}
            >
              <Accordion.Normal
                name={name}
                expanded={name === expanded}
                onChange={() => setExpanded(name)}
                icon={
                  <span className="w-4 lg:w-6">
                    {name === expanded ? <Icon.Minus /> : <Icon.Plus />}
                  </span>
                }
                title={
                  <div
                    className={clsx(
                      "flex items-center space-x-2",
                      "text-sm lg:text-lg",
                      name === expanded && "text-gold-darker"
                    )}
                  >
                    <span>Q</span>

                    <h2>{title}</h2>
                  </div>
                }
              >
                <p
                  className={clsx(
                    "bg-gold-lightest px-8 py-4",
                    "text-xs lg:text-base"
                  )}
                >
                  {description}
                </p>
              </Accordion.Normal>
            </li>
          ))}
        </ul>
      </div>
    </Layout.Normal>
  );
}
