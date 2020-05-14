/* 

1. Look at the HTML file -> realize that there are a ton of stylesheets including bootstrap, transitions, animate, and our main css file. some of these csses are not even minimized. Ask if we really need so many CSS styles. Do we really need them? Do we need animate.css or can we do some of those animations with just css animations and transitions that come native to it? Again, you really want to focus on do we really need this? Don't keep tacking on stuff just because it's easy to do. 

2. Script tags in head -> move all the way down to the bottom of the body. also ask yourself if you really need all these JS libraries. e.g. scrollTo.js is not even working. minimize unminimized JS and also bundle everything into one file to minimze trips over the wire. 

3. add a style tag to your HTML to just load your stylesheets above the fold. 

4. Minimize images, e.g. 1MB image for mobile screen is just ridiculous. definitely can be compressed. also, you have like 48 requests on the webpage which is not great (older websites tend to have lots of requests which is not a good thing).

5. youmightnotneedjquery.com -> don't need to even use the massive jquery library. 

6. as a developer, there are always gonna be things you can optimize. you need to focus on the big ticket items to make your website perform. 

*/