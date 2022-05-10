import React, { useEffect, useRef, useState, createContext } from "react";
import { Mutex, MutexInterface } from "async-mutex";
import { DataURL } from "lib/state";

export type IRunFunction = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) => Promise<DataURL>;

export interface IRendererScheduler {
  runExclusive: (fn: IRunFunction) => Promise<DataURL>;
}

class RendererScheduler implements IRendererScheduler {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  mutex: MutexInterface;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.mutex = new Mutex();
  }

  runExclusive(fn: IRunFunction): Promise<DataURL> {
    return this.mutex.runExclusive(() => {
      return fn(this.canvas, this.ctx);
    });
  }
}

export const RendererSchedulerContext = createContext<IRendererScheduler>(null);

export const HiddenCanvas = React.memo<any>(({ children, ...props }) => {
  console.log("re-render in <HiddenCanvas />");

  const ref = useRef();
  const [state, setState] = useState<IRendererScheduler>(null);

  useEffect(() => {
    console.log("useEffect in <HiddenCanvas />");

    const scheduler = new RendererScheduler(ref.current);
    setState(scheduler);
  }, [ref.current, setState]);

  return (
    <div {...props}>
      <canvas
        aria-hidden
        style={{ display: "none", background: "red" }}
        ref={ref}
      />

      <RendererSchedulerContext.Provider value={state}>
        {children}
      </RendererSchedulerContext.Provider>
    </div>
  );
});
