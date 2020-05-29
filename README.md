#scroll-position-manager

```
npm i -S @bruqui/scroll-position-manager
```

Store and set a scroll position on components that unmount then mount again. This is useful for cases where components are used in something like a Route component from react-router or a scrolling nav bar that changes pages in a library like Gatsby or NextJS. By using a React hook and context, the component will set it's scroll position in the React provider when it unmounts. If the component remounts, it will go back to its saved scroll position. The provider component must be rendered at a higher level in the application where it will not be unmounted.
