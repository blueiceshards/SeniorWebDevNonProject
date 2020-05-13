/* Performance Part 1

LESSON 1: INTRODUCTION TO PERFORMANCE PART 1 

For big companies, page load speeds affect revenues by a lot. 

LESSON 2: KEYS TO PERFORMANCE

there are 3 ways to improve the speed of your website. (1) improve what happens on the client side i.e. front end, because the front end device needs time to render the page on the screen. (2) improve the transfer of our files over the wire. network latency, which is the time it takes for request to travel from the client to the server, and back. This becomes even more essential when we consider that an average website needs more than a hundred requests to load completely. (3) improve the processing done on the backend, i.e. back end processing. the web server needs time to load data, maybe from the database, and maybe even assemble a website before it sends it over. for our website to be as fast as possible, we can improve something in all 3 of these sections. there are infinite ways to optimize our website for our app. but one thing to keep in mind is that we want to think like a senior developer -> focus on a problem and find a solution to solve the problem in the most efficient and valuable way. if you are optimizing the site but don't know what is slwoing it down, and don't have comparison numbers or benchmarks to see if your optimizations have actually improved your speed, then you're just wastingg your time. 

In this course, we will focus on the big ticket items, the main performance improvements that will improve 90% of your website speeds, and how to implement them in your code. For Part 1, we will focus on the network transfer, and the critical render path. Part 2, we will write optimized code and progressive web apps. For Part 3, we will cover backend things to improve performance and scale. 

LESSON 3: NETWORK PERFORMANCE

1. Honey I shrunk the files
2. The travelling deliveryman

To view a webpage, your computer has to DL all the related files to display them in the browser. The more kbs a user needs to DL, the longer it takes to load websites. we also have to carry these files across the internet. the less work we involve here, the better the website performance. 

How to reduce the size of the files? Minimize text, minimize images (smaller images if your site is built on a smaller screen size). less data we need to transfer over the wires. Put your website on a cleansing diet to make sure everything is nice and small. 

Minimise text (html, js, css) can be simply minified by taking the code that you have and usign something like uglify JS. removes white space and makes it a lot smaller. you can do this for HTML and CSS too. We can use uglify JS because machines are readnig the code and don't care about indentations or good names in functions. by removing whitespace you remove bytes and make files smaller. but nowadays, when app is ready for production, people use build functions (webpack) to minify this stuff and make it smaller. 

LESSON 4: IMAGE FILE FORMATS

The primary way to change an image size is to change the file format and pick the file format that is the best for the job. 4 main image formats used on the web: SVG, GIF, PNG, JPG with their own specific use cases. 

JPGs - used for photos, images, and things with many colors, e.g. photographs. downside - don't allow for transparency. for complex images with a lot of colors. tend to be a little bit big in file size.

GIFs - usually look grainy and oddly colored because there is a limit to number of total colors that can be used in a gif, usually somewhere between 2-256. reducing the color count reduces file size and it's really good for small animations. 

PNG - usually limit the number of colors htat you can use and tend to be a lot smaller than JPGs because of that. they are used a lot on the web for things like logos since there are only a few sets of colors that you need. the cool thing about PNG is that you can add transparency to them, which you can't do in JPG. 

SVG - in a completely different category from the other 3 file formats above. they're something called vector graphics. these are files that designers usually work with on adobe, illustrator, or sketch. what you can do on SVG is thtat you can expand an SVG to several times its size and it'll be just as clear and just as sharp as what the original was. also, they have to be incredibly small for what they do and they're really good for retina displays or 4K displays, and you can also customize them using CSS. but they're not perfect. they usually tend to be very simplistic, visual things with few colors. 

there are many more things to go to regarding images, e.g. new image formats that came out recently JPG2000 JPGXR WebPeak, with superior compression and quality characteristics compared to these older JPGs and PNG fileformats. encoding your images in these new fileformats means that they would load faster and consume less cellular data. however, browser support for these new types is still not completely there yet, so let's focus on these 4 for now. 

Main takeaway - you want to pick the right format of images, and compress them as much as possible without minimizing their quality. 

LESSON 5: IMAGE OPTIMIZATION

Minimize Images
// if you want transparency, use PNG.

// if you want animations, use GIF.

// if you want colorful, detailed images, use JPG. 

// if you want simple icons, logos, and illustrations, use SVGs.

// reduce PNG with TinyPNG. (does not reduce image quality) input a huge (3.8MB) image. and you can reduce it to 1.1MB  without losing any quality saves 71%.

// reduce JPG with JPEG-optimizer. (does not reduce image quality). input huge (13.2MB) image. New filesize is 13.5kb (99.9% savings in filesize). it still displays a pretty clear image on a webpage. 

// Try to choose simple illustrations over highly detailed photographs. whenever you are building a website or a webapp, be conscious of the images you are using. do you really need a super detailed photo of your dog, or can you just use a dog icon.

// Always use lower JPEG image quality (30-60%).you can just change filesize by photoshop or whatever.

// Resize image based on size it will be displayed. You want to match up the image resolution to the size it is actually displayed on a website. for e.g. if you are displaying an image that is only 500px wide (e.g. css says that imagewidth is 500px), then you don't need to keep that image at 1500px. chop it down to the actual size because an image with half the width will be even less than half the size. make sure that you're using size that's appropriate for you (you will never need something that is 5000px wide). you can even adjust your images to look sharp on higher definition displays like retina or 4k. but you really don't need to go higher than that. the larger the resolution, the larger the filesize. keep things small. 

// Display different sized images for different backgrounds. we can easily do that using something called media queries. @ media screen and (min-width: 900px) {...} media queries are useful when you want to apply css styles depending on a device's general type such as screen size. specific characteristics such as the width of the view or the environment, such as the size of the screen. media screen (you want to use it on a screen that the website is being viewed on) you can also change it to media print (this means that this css style will be activiated when is in print screen mode). using css you can deliver a different bkgrnd image for the differnt screen sizes that your site provides. this means that you must sasve your images in different file sizes for them to work. media queries command - browser is smart enough to download only what it actually needs. if it doesn't need to load the massive bg image, it doesn't load it. media queries are very important for users that use different screen sizes. 

// use (Content Delivery Networks) CDNs like imigx. they take care of all the images for you. they optimize, deliver and cache your images for you. they're saying, give us all your images, just upload all your images no matter how big or unoptimized they are. and then, will give you back a URL which you can plug in to any of your websites (i.e. so you link an imgix url of the image you just updloaded) they take care of optimizeing it and making sure it's as small as possible. they also use CDN, which allows for faster access to their servers of images, instead of just uploading it ourselves.

// remove image metadata. www.verexif.com/en/index.php what they do is to remove meta tags of a photo. most photos ccontain data on not only the picture, but also info on where the photo was taken, what device it was taken on etc. upload your image, click view exif, and you get all your image metadata including GPS location and all camera information. we don't want this because of privacy and also extra data/extra size. click "remove exif" to get a new photo. you can save like 3kb off a 140kb image without compromising any image quality.

using all of the above techniques, we can save a lot of transfer between the client and the server. this is a huge issue with images. using the techniques we can make sure our website is performing. 

*/