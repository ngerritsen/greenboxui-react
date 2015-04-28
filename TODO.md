##Scrumboard Greenbox UI

###Progressgit
- Build Controls component (w/ store(s) for parameters)
  * Finish parameter store /w calls
  * Build controls view
  * Somehow dummy hook up controls to parameters
  * Be able to (fake) set new setpoints
  * Implement read-only/hidden/write-able parameters
- Think about naming conventions (for instance, on-prefix for action handlers)

###Backlog
- Immutable for shared components, actions?
- Build Report component
- Build Log component
- Make graph with actual data
- Modularize Settings
- Hook up to real greenbox
- Experiment /w aria

###Bugs:
- Pagination does not refresh on search

###Attention Points
- Think about modularization of edit fields/switches/selections for reusability
- Check if routing dev experience remains good
- Gzip js/css on server
- Fix warning proptype checker

- [React best practices](http://aeflash.com/2015-02/react-tips-and-best-practices.html)
  - Use purerendermixin
  - Set node env to production on release build
  - Set unrequired props default value