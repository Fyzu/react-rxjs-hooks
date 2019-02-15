import { useMemo, useEffect, useState } from 'react'
import { Observable, BehaviorSubject } from 'rxjs'

export function useSubject<Value>(value: Value): Observable<Value> {
  const subject$ = useMemo(() => new BehaviorSubject(value), [])

  useEffect(() => {
    subject$.next(value)
  }, [value])

  useEffect(() => {
    return () => {
      subject$.complete()
    }
  }, [])

  return subject$
}

export function useObservable<Value>(value$: Observable<Value>): Value | null

export function useObservable<Value>(value$: Observable<Value>, initialValue: Value): Value

export function useObservable<Value>(
  value$: Observable<Value>,
  initialValue?: Value
): Value | null {
  const [value, setValue] = useState(typeof initialValue !== 'undefined' ? initialValue : null)

  useEffect(() => {
    const subscription = value$.subscribe(value => {
      setValue(value)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [value$])

  return value
}
