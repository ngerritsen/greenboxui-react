##Scrumboard Greenbox UI

###Progress
- Fix warning setState()
- Build Controls component (w/ store(s) for parameters)
  * Finish parameter store /w calls
  * Build controls view
  * Somehow dummy hook up controls to parameters, extend control instance object, rename control instance to control?
  * Be able to (fake) set new setpoints
  * Implement read-only/hidden/write-able parameters

###Backlog
- Implement type id and type name pairs instead of just type id as name
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

- [React best practices](http://aeflash.com/2015-02/react-tips-and-best-practices.html)
  - Use purerendermixin
  - Set node env to production on release build
  - Set unrequired props default value