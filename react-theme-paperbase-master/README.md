## react-theme-paperbase ##
This project extends [Create React App](https://github.com/facebook/create-react-app). We add routing and styling to everyone's favorite React bootstrapper, making launching a new app even easier.

* Paperbase handles styling
* React-Router handles routing

**Paperbase** is a React theme curated by the folks at [Material-UI](https://material-ui.com/premium-themes/).

 * [Paperbase demo](https://material-ui.com/premium-themes/paperbase/) at Material-UI.
 * [Paperbase source](https://github.com/mui-org/material-ui/tree/master/docs/src/pages/premium-themes/paperbase) at git

**React Router** is the standard routing library for React.

 * [React Router](https://reacttraining.com/react-router)

### Getting Started ###

Open a BASH prompt.

1. Browse to the location where you project will live.
2. Clone this project to your new folder.

  `git clone https://github.com/ckriewall/react-theme-paperbase.git`

3. Navigate to the project root.

 `cd react-theme-paperbase`

4. Install dependencies

 `yarn install`

3. Start the App

  `yarn start`

### File Structure ###

 * `src\components`: React components containing the app content
 * `src\theme`: MUI components providing site structure and styles
 * `src\theme\Content`: default content provided by Paperbase
 * `src\theme\Header`: top navbar
 * `src\theme\Navigator`: collapsing left navbar
 * `src\theme\Paperbase`: parent container of Paperbase theme. Calls `Header` and `Navigator` components

### Routing ###
Routing is implemented in `src\theme\Navigator`. The `categories` variable contains two **Link Categories**. Customize links by providing values to any object in `categories.children`:

 * **id**: link text (e.g. "New Page")
 * **icon**: any imported [Material-UI icon](https://material.io/icons/)
 * **targetUrl**: path of the new route (e.g. "/newpage")

```javascript
{
  id: "Links Category 2",
  children: [
    { id: "Analytics", icon: <SettingsIcon />, targetUrl: "/analytics" },
    { id: "Performance", icon: <TimerIcon />, targetUrl: "/performance" },
    { id: "Test Lab", icon: <PhonelinkSetupIcon />, targetUrl: "/testlab" }
  ]
}
```

Finally, handle component rendering in `src\theme\Paperbase`. Specify the component to load for each link defined in the navigation.

```javascript
<main className={classes.mainContent}>
  <Content />
  <Route path="/eventsapi" component={Component1} />
  <Route path="/component2" component={Component2} />
</main>
```
### Component Layout ###

 ![layout](https://i.imgur.com/1B2ii5A.png)
