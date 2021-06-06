export function wait(time: number) {
  let id: NodeJS.Timeout | undefined = undefined;

  const promise = new Promise((resolve) => {
    id = setTimeout(resolve, time);
  });

  return {
    cancel: () => id && clearTimeout(id),
    finish: promise,
  };
}
