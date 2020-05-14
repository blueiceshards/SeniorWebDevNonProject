/* 

LESSON 6: DELIVERY OPTIMIZATIONS

In addition to reducing download size, we can also reduce download frequency. (the traveling deliveryman). reducing the number of components a page requires proportionally reduces the number of HTTP requests it has to make. this does not mean omitting content - it just means structuring your page more efficiently. our traveling deliveryman gets tireds and there is only on eof him. 

with less trips, we are minimizing our files, and also, we are not sending every file down the wire - just the ones that we need. before using bootstrap or foundation or anything that helps with UI and adds new css files - ask yourself if they're really necessary or if you can use flexbox or cssgrid which are superb alternatives. -> dont need to DL massive bootstrap or foundation files. same with JS and JS libraries. they're convenient but not necessary. for example, jquery may not be very useful or relevant now. if you must use a library, use libraries that are lightweight and think twice before you pile on another script or library just for some cool animations. 

don't make your website full of iamges. in the past, we had something like sprites - we had one image and based on CSS positioning, you can  have on that one image multiple images that get only displayed based on the CSS that you use. have less files, and don't make the deliveryman work so hard. 

Can't we just tell the deliveryman to carry all the files at once? -> thanks to HTTP protocol, our browsers will only simultaneously download a set maximum number of files from one domain at a time (from 2-6 depending on your browser). deliveryman also has limits on the total size you can transfer. we want to minimize files and also limit these trips that the delivery man makes (i.e. fewer files). so maybe we can combine our css and js files into one. we will talk about HTTP 2 in an upcoming video and why this process might get improved in the future. 

LESSON 7: NETWORK OPTIMIZATION

Console: disable cache, online -> slow 3G
Minify your code
Look at index/css files and scale down your image size to the stipulated size of the image (e.g. width = 500px)
Minimize number of files, like only have one style.css and only one script.js. This is called bundling -> there are tools like webpack that do this for us. 

LESSON 8: CRITICAL RENDER PATH

Previous lessons were on network optimizations. Now, let's talk about what happens once the file arrives in the browser. How can we optimmize this step? 

1. Client requests a website from the server. 

2. The server returns a HTML file. 

3. Inside of the (client's) browser, the HTML file arrives and the browser starts reading it. As soon as HTML arrives, it starts creating the DOM. When the browser parses or reads the HTML, it incrementally generates this tree model of HTML tags that we need to build for the website (tree model: DOM). This DOM describes the content of the page. 

4. Just as it's about to start doing that, it encounters a style link to grab the CSS, so it asks for the CSS file from the server, which arrives. And it gets back to working on the DOM, creating the structure of the website. 

5. Once the browser starts receiving the CSS, it also starts generating a tree model called CSSOM. this CSS object model has the styling information attached to the tree nodes. this tree describes how the content is styled. 

6. As the tree is being built, all of a sudden it sees a javascript tag and so your browser grabs it from the server and the JS arrives. but it's also going to read the JS file. 

7. The JS file is read by the browser and executes any changes that it might want onto the DOM and the CSS file. once all that's done, the browser combines the DOM and the CSSOM into a render tree. This render tree has both information from HTML and the styling and layout information from CSS. by combining the DOM and the CSSOM, the browser constructs a render tree so it knows exactly what to render on the page. 

8. The browser now uses this render tree to figure out the layout. It's going to forget about all the HTML, CSS, and JS files, and it's going to figure out the layout - where should I position these items, at what location, at what widths and height, and once it's figured that out, it's going to paint all the pixels and at the end of that, we finally have our webpage displaying on the browser. 

9. what about images? this happens to once the browser encounters an image tag. it will start downloading them as soon as it sees it but the neat thing about images is that it's not part of this process; images are just DLed in the background and once they're loaded, they will appear on the screen. 

What we have just learnt is the critical render path, and is one of the most important concepts for optimizing browser performance. 

Critical Render Path: DOM -> CSSOM -> Render Tree -> Layout -> Paint

This path shows what it takes to paint a website on a screen. it's a lot of steps but in real life it happens very quickly. this path can be optimized as well. 

LESSON 9: CRITICAL RENDER PATH PART 1

HTML- 1. Load <style> in <head>, 2. load <script> right before </ body>.

When a browser receives a HTML, it parses it (breaks it down to a vocabulary it understands). After understanding the document, it begins to create a DOM, and while reading, when it sees a tag for an external resource, it begins DLing those as well (usually, stylesheets and scripts take high priority, and other files like images take lower priority). How do we optimize this process, i.e. HTML file, which is step 1? 

The first thing is to load styles, i.e. style.css, as soon as possible, and scripts, that is script.js, as late as possible (with a few exceptions here and there). Why? -> the main principles of CSS performacne is to get the CSS to the browser asap. JS requires HTML and CSS parsing to be finished before they can be run. This way, we give files ample time to create the CSSOM. so if you put JS in the head tag in HTML (at the top), it blocks page rendering. scripts historically block additional resources from being DLed more quickly. By placing JS at the bottom, the styles, media, etc get DLed and rendered more quickly giving the perception of an improved performance. 

Alerts, for e.g. block the rendering of the page because a JS script is running (more on this in later videos). We want to make sure that JS files are at the bottom so that they don't stall CSS/HTML DL/render. 

Exception: Google Analytics which is a script tag and you want that to be executed right away the very first second they're on the website. in that case, you might wanna put the script tag at the top but this may slow your website down. also keep in mind that the styles are being downloaded as soon as possible that's why we put them in the header. 

CSS is render-blocking because in order to construct the render tree and print something on the screen, we are waiting for the CSSOM to complete and combine with the DOM to create the Render tree. with that in mind, we want CSS to be lightweight as possible so that the user sees things asap. 

CSS- 1. only load whatever is needed, 2. incorporate above the fold loading, 3. media attributes, 4. less specificity. 

2: if your website is very long, you don't really need the things below the view to load. the priority is to see what's above the fold (i.e. the main page). if we are able to optimize this and just load what we need above the fold, that would be nice. we only need the CSS that we are using above the fold. This can be incorporated easily using a script tag. 

<script type="text/javascript">
    const loadStyleSheet = src => {
        if(document.createStylesheet) {
            document.createStylesheet(src)
        } else {
            const stylesheet = document.createElement('link');
            stylesheet.href = src;
            stylesheet.type = 'text/css';
            stylesheet.rel = 'stylesheet';
            document.getElementsByTagName('head')[0].appendChild(stylesheet)
        }
    }

    window.onload = function(){
        console.log('window done!');
        loadStyleSheet('./style3.css')
    }

</script>

This creates the stylesheet so we don't need to immport stylesheet in CSS. 

3: media attributes you can do @ media in CSS files, but you can do that for HTML also. For example, if you only need certain media for some HTML screen sizes. e.g. <link rel= "stylesheet" href ="./style.css" media="all"> or <link rel= "stylesheet" href ="./style.css" media="only screen and (min-width:500px)">

4: less specificity e.g.

BAD: .header .nav .item .link a.important { color: pink; }
GOOD: a.important { color:pink; }

because less processing power needs to be expended. 

Not feasible to do inline styles in HTML because of poor reproducability expecially for large files.  

JS probably consumes the most resources and is also parser-blocking (e.g. script tag alert)

JS optimizations -1. loading scripts asynchronously, 2. defer loading of scripts, 3. minimize DOM manipulation, 4. avoid long running JS. 

<script> when the HTML starts reading the file and encounters a script tag, it starts DLing which blocks the HTML parsing, and also needs to get executed, which blocks the HTML parsing, and only after this is done is HTML parsed. 

<script async> Go ahead and DL the JS file with another thread. While I'm working on this HTML parsing, download JS file. JS file is now being DLed on a low priority but doesn't block the page loading. as soon as it's finished DLing, it will execute. that part is still blocking the HTML parsing. can execute at any time. issues: it can execute long after the page actually loads, and if it executes before the page loads, and starts doing DOM manipulation without the actual DOM being there, we might get some errors. with Async for scripts, add them to anything that doesn't affect CSS or DOM. async should be used for all external scripts that have no knowledge of our code and are not really essential to our user experience. 

<script defer> similar to async in that it will not block the loading of our page. however, it will wait to execute until after our HTML has been parsed. will execute in order of appearance. it will wait until HTML is completely parsed and then start executing. really good for scripts that will act on render tree, or the DOM. but they are also not important to loading above the fold content. 

if core functionality requires JS, then async is best. if core functionality does not require JS, then JS should be defrred after the critical render path. 

<script> should be critical scripts, app scripts.
<script async> should be third party scripts that don't affect the DOM. 
<script defer> should be used for third party scripts that aren't taht important and aren't above the fold. 

4. avoid long running JS. e.g. alert tags block everything else -> laggy and janky. 

LESSON 10: KEIKO CORP WEBSITE

2 important websites for testing:
1. PageSpeed Insight by Google developers: you can enter a URL and it'll do some speedtests for us. Tells you optimization suggestions like eliminate render-blocking JS and CSS in above-the-fold content, leverage browser caching, and optimize images. 
2. WebPageTest: You can select the user device as well.

*/