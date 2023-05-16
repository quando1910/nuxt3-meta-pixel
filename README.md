# Nuxt plugin for Facebook pixel (Nuxt 3)

> A Nuxt 3 module thats injects Meta Pixel (Facebook Pixel) 

## Table of Contents

* [Requirements](#requirements)
* [Install](#install)
* [Getting Started](#getting-started)
* [License](#license)

## Requirements

* npm or yarn
* NuxtJS
* NodeJS

## Install

```bash
$ npm install --save nuxt3-meta-pixel
// or
$ yarn add nuxt3-meta-pixel
```

## Getting Started

Add `nnuxt3-meta-pixel` to `modules` section of `nuxt.config.js`.

```js
{
  modules: [
    'nuxt3-meta-pixel',
  ],
  facebook: {
    /* module options */
    track: 'PageView',
    pixelId: 'FACEBOOK_PIXEL_ID',
    autoPageView: true,
    disabled: false
  },
}
```

## Automatically track PageView

By default, the module won't trigger any tracking event on route change. To enable this behaviour, you must specify the `autoPageView` option and set to `true` in the Nuxt module options.

```js
{
  modules: [
    'nuxt3-meta-pixel',
  ],
  facebook: {
    /* module options */
    pixelId: 'FACEBOOK_PIXEL_ID',
    autoPageView: true
  },
}
```

## Disabling the pixel (for GDPR)

If you'd like to install the pixel disabled, and enable it later after the user has consented to its use, you can do so by setting `disabled: true` in the pixel configuration:

```js
{
  modules: [
    'nuxt3-meta-pixel',
  ],
  facebook: {
    ...
    disabled: true
  },
}
```
How to access $fb ?
```
import { useNuxtApp } from '#app';
const nuxtApp = useNuxtApp()
console.log(nuxtApp.$fb)
```

Now, in your component, you can call the following in order to start the pixel and track the current page.

```js
nuxtApp.$fb.enable()
```

The pixel can be disabled again later on by using the `.disable()` method.

## Multiple pixel codes according to route

It's possible to use multiple pixel codes according to the user's route. This can be made through the `pixels` property.
The `pixels` property expects an array of options.

```js
{
  modules: [
    'nuxt3-meta-pixel',
  ],
  facebook: {
    pixelId: 'DEFAULT_PIXEL_ID',
  },
}
```

Per this example, whenever the user is on the `/my-custom-route`, it will use the `FACEBOOK_PIXEL_ID` instead of the `DEFAULT_PIXEL_ID`. For all the other routes, it will use the default one.

Note : Since the `pixels` property is an array of options, any other valid option (`track`, `manualMode`, ...) can be passed.

# Advanced Matching
To send custom user data when initializing the FB Pixel you'll have to disable the plugin in your Nuxt config file and enable it once you've set the user data.

Run the following from your Vue component once you've access to the user data:
```javascript
nuxtApp.$fb.setUserData({ external_id: 32323, fn: 'John' })
nuxtApp.$fb.enable()
```

Read more about [Advanced Matching](https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching).

## Module options

List of possible options in the module:

| Option   | Default  | Required | Description                                                                               |
|----------|----------|----------|-------------------------------------------------------------------------------------------|
| pixelId  | null     | true     | The unique pixel identifier provided by Facebook.                                         |
| track    | PageView | false    | Default tracking event.                                                                   |
| version  | 2.0      | false    | Tracking version.                                                                         |
| disabled | false    | false    | Disable the Pixel by default when initialized. Can be enabled later through `$fb.enable()` and disabled again with `$fb.disable()`.
| debug | false    | false    | By default, tracking in development mode is disabled. By specifying `true`, you manually allow tracking in development mode.
| manualMode | false    | false    | By default, Facebook will trigger button click and page metadata. Set to `true` to disable this behaviour. [See more informations](https://developers.facebook.com/docs/facebook-pixel/advanced/#automatic-configuration)
| autoPageView | false    | false    | If set to `true`, automatically triggers a `PageView` track event on every page change.

## Facebook pixel instance

The tracking pixel instance is available on all vue component instances as $fb. It has the following methods:

| Method            | Purpose                                                                                                  | Equivalent to                  |
|-------------------|----------------------------------------------------------------------------------------------------------|--------------------------------|
| enable()          | If you had previously set `disabled: true` in config, enables the pixel and tracks the current page view | $fb.init(), $fb.track()        |
| disable()          | Disables the pixel again |         |
| setPixelId()            | Change the default pixelId & trigger an init it                                                                                    | |
| setUserData(userData) | Used to set user data that'll be used once the `fbq` init function is called. See [Advanced Matching](https://developers.facebook.com/docs/facebook-pixel/advanced/advanced-matching). | |
| init()            | Initialises the pixel                                                                                    | fbq('init', <options.pixelId>) |
| track(event, parameters)           | Sends a track event with optional `parameters`. It's `PageView` by default if the `event` is not defined.                                                                                      | fbq('track', <options.track>, parameters)  |
| query(key, value, parameters) | Call the underlying fbq instance with anything else. The `parameters` attribute is optional.                                                      | fbq(key, value, parameters)                |

## License

[MIT License](./LICENSE)
