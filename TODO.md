##Scrumboard Greenbox UI

###Progressgit
- Build Controls component (w/ store(s) for parameters)
  * Be able to (fake) set new setpoints
  * Implement read-only/hidden/write-able parameters

###Backlog
- Think about more 'utility' or 'intermediate' stores
  * what? stores that process data from base stores to pre-formatted data for views
  * example: store that gets all unique control type's so that the views can use that (control-type-store)
  * why? prevent lot of (duplicate) logic in views, improving solid-ness, clean code and performance in views, WIN-WIN!
- Think about unmounting views in unit tests
- Make graph with actual data
- Immutable for shared components, grid, actions?
- Build Log component
- Hook up to real greenbox
- Experiment /w aria

###Bugs:
- Pagination does not refresh on search
- Fix warning proptype checker