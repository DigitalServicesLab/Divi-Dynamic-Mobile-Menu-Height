/**
 * Dynamic Divi Mobile Menu Height 1.0.0
 * Dynamically adds max-height property to a defined Mobile Menu allowing for address bars and tool bars in iOS. 
 * https://github.com/DigitalServicesLab/Divi-Dynamic-Mobile-Menu-Height
 *
 * Released under the MIT License
 *
 * Released on: July 4th, 2023
 */

(function() {

    //Set Header Section and Menu Module CSS ID's
    const cssIDs = {
        'headerSectionID' : 'header-section',
        'menuModuleID'    : 'menu-module',
    };

    //Begin observer after DOM load
    window.addEventListener("DOMContentLoaded", () => {

        //get the menu for which Divi will add a 'mobile menu' child element
        let mainMenu = document.getElementById(cssIDs.menuModuleID);

        // Configure pptions for the observer
        const config = { attributes: false, childList: true, subtree: true };

        // Create MutatioinObserver instance linked to the callback 
        const observer = new MutationObserver((mutationList, observer) => {
            monitorMobileMenuAdd(mutationList, observer);
        });

        // Start observing the main menu for mutations. 
        observer.observe(mainMenu, config);
    });

    
    /**
    * Handles observed mutations to the primary menu. i.e. the mobile menu being added by Divi script ('divi-custom-script')
    * 
    * @param {array} mutationList Array of MutationRecord objects
    * @param {MutationObserver} observer The Mutation Observer
    */
    function monitorMobileMenuAdd(mutationList, observer) {
        //loop the mutatons
        for (const mutation of mutationList) {
            
            if (mutation.type === "childList" ) {

                //if nodes have been added, we need to do stuff
                if (mutation.addedNodes.length > 0) {

                    //loop the added nodes
                    for (const node of mutation.addedNodes ) {

                        //check if the node added is our mobile menu
                        if (node.classList.contains('et_mobile_menu')) {

                            //setup initial CSS values on page load
                            let headerHeight = document.getElementById(cssIDs.headerSectionID).offsetHeight;
                            node.style.maxHeight = 'calc(100dvh - ' + headerHeight + 'px)';
                            node.style.overflow = 'scroll';

                            //add 'resize' event listener
                            window.addEventListener("resize", debounceCreateHander(resizeHandler, 200, node));
                        }
    
                    }
                } 

            }
        }
    };

    /**
    * Handles resize events, calculating the current height of the header section and subtracting that from the total required height of the menu in dvh
    * 
    * @param {string} menuUL The menu node
    */
    function resizeHandler(menuUL) {
  
        // Dynamically set CSS values
        let headerHeight = document.getElementById(cssIDs.headerSectionID).offsetHeight;

        menuUL.style.maxHeight = 'calc(100dvh - ' + headerHeight + 'px)';
    }

    /**
    * Debounces the event handler and encloses required variables. 
    * 
    * @param {string} menuUL The menu element
    * @return {function} closure containing event handler and required variables
    */
    function debounceCreateHander(func, time, node){
        var time = time || 100; // 100 by default if no param
        var timer;
        return function(event){
            //if still within the delay windowr clear and start again. 
            if(timer) clearTimeout(timer);
            timer = setTimeout(func, time, node, event);
        };
    }
    



})()
