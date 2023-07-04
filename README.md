# Divi Dynamic Mobile Menu Height

This script helps to make Divi's mobile menu more 'mobile friendly. 
By default the mobile menu is not scrollable, so on short pages the menu can become hidden below the bottom of the window, making some of the links inaccessible to users. 

This can be overcome simply by adding a fixed height such as `max-height: 75vh`(or any other value) to the mobile menu, however while this works for most situations, there are three issues with this approach that I was not happy with:
1. It doesn't maximise the usable screen realesate
1. It doesn't account for varying height in your header as screen sizes change
1. It doesn't account for dynamic UI elements such as iOS Safari address bar

To get around all three of these issues, we need to
- Update the height dynamically with javascript as the screen resizes
- Subtract the height of the header (assuming the menu expands from the bottom of the header)
- Use a the Dynamic Viewport unit: `dvh` to enable full use of all available screen realestate as UI elements are added or removed

As the mobile menu is added after DOM had loaded via a script Divi runs, we need to use a mutation observer to achieve this which makes this fairly simple task, slightly more convoluted, but still pretty simple. 

## Installation

### Using A Child Theme

1. Download the divi-mobile-menu-size-helper.js file
1. Save it in the root of your Child Theme, or in a subdirectory
1. Update line 15 & 16 to in include the CSS ID's of your specific environment 
```    
const cssIDs = {
        'headerSectionID' : 'header-section',
        'menuModuleID'    : 'menu-module',
};
```
4. Enqueue it
```
function enqueue_divi_menu-size-helper() {

    wp_register_script( 'divi-mobile-menu-size-helper', get_stylesheet_directory_uri() . '/js/divi-mobile-menu-size-helper.js', array(), null, true );
    wp_enqueue_script('divi-mobile-menu-size-helper');

}
add_action( 'wp_enqueue_scripts', 'enqueue_divi_menu-size-helper' );
```

### Using Divi Theme Options

1. Copy the script
1. Navigate to Divi > Theme Options > Integration
1. Paste the script into the "Body" field and wrap it in `<script type="text/javascript">`...`</script>` tags 
1. Update line 15 & 16 to in include the CSS ID's of your specific environment 
```    
const cssIDs = {
        'headerSectionID' : 'header-section',
        'menuModuleID'    : 'menu-module',
};
```

## Configuring The Script

For this script to work, it needs to know the CSS ID's of your header element that contains your menu and the Menu Module that contains the menu. 

1. Go to Divi > Theme Builder
1. Edit the containing Section and give it CSS ID
1. Edit the Menu Module and give it a CSS ID
1. Update the script replacing `header-section` and `menu-module` on line 15 and 16, with the CSS ID's you just created for the Section and Module

That's all. 

## Fallback CSS

If you wish to add some fall back css to your stylesheet, you can also add

```
.et_mobile_menu {
    max-height: calc(80vh - 80px); /* fallback for a couple of mobile broswers that don't yet support 'dvh' units */
    max-height: calc(100dvh - 80px); /* 80px = expected max height of header - update for your use case */
    overflow: scroll !important;
}
```
**Note** 
If you have a statically sized header that doesn't change height as screen width decreases, then you can simply add the CSS and forget the entire Javascript component  :-) 