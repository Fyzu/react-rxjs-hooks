import { useMemo } from 'react'
import { BehaviorSubject, Observable } from 'rxjs'

type UsePlanReturnType<Input, Result = Input> = [
  Result extends Input ? Observable<Input> : Observable<Result>,
  (input: Input) => void
]

export function usePlan<Input, Result = Input>(
  piping?: (
    input$: Observable<Input>
  ) => Result extends Input ? Observable<Input> : Observable<Result>
): UsePlanReturnType<Input, Result> {
  return useMemo(() => {
    const inputSubject = new BehaviorSubject<Input>(undefined as any)

    const input$ = inputSubject.asObservable()
    const result$ = piping ? piping(input$) : input$

    const next = (input: Input) => inputSubject.next(input)

    return [result$, next]
  }, []) as UsePlanReturnType<Input, Result>
}
