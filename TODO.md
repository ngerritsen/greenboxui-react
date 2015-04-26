##Scrumboard Greenbox UI

###Progress
- Translation functionality
  * find solution for translating in-code strings

###Backlog
- Build Controls component (w/ store(s) for parameters)
- Immutable for shared components, actions?
- Build Report component
- Build Log component
- Make graph with actual data
- Modularize Settings
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