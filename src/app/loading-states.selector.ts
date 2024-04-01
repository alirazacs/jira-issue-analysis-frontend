import { createSelector, select } from "@ngrx/store";
import { AppState, LoadingStates } from "./app-states";
import { pipe } from "rxjs";

const loadingStateSelector = createSelector(
  (state: AppState) => state.loadingStates,
  (loadingStates: LoadingStates) => loadingStates
);


export const selectLoadingStates = pipe(
  select(loadingStateSelector)
);
